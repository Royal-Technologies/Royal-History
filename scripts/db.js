/**
 * Royal History — SQLite Database Engine
 * Brand: Royal History — ইতিহাসের এই দিনে
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dbDir = path.join(rootDir, 'database');
const dbPath = path.join(dbDir, 'royal_history.sqlite');
const schemaPath = path.join(dbDir, 'schema.sql');
const seedPath = path.join(dbDir, 'seed-history.json');
const itemsJsonPath = path.join(dbDir, 'items.json');

let _dbInstance = null;

function getDb() {
  if (_dbInstance) return _dbInstance;

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Use Node.js built-in DatabaseSync (Node 22+)
  try {
    const { DatabaseSync } = require('node:sqlite');
    _dbInstance = new DatabaseSync(dbPath);
  } catch (err) {
    try {
      const Database = require('better-sqlite3');
      _dbInstance = new Database(dbPath);
    } catch (e2) {
      throw new Error('SQLite engine not available. Please ensure Node.js 22+ is used.');
    }
  }

  return _dbInstance;
}

/**
 * Initialize database schema and seed data
 */
function initDatabase() {
  const db = getDb();
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Run schema commands
  const statements = schemaSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    db.exec(stmt + ';');
  }

  // Check if items already exist
  const countRow = db.prepare('SELECT COUNT(*) as count FROM royal_history_items').get();
  const count = Number(countRow.count || 0);

  if (count === 0 && fs.existsSync(seedPath)) {
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    bulkInsertItems(seedData);
    console.log(`[Database] Initialized with ${seedData.length} curated history events.`);
  } else {
    console.log(`[Database] Database ready with ${count} existing history items.`);
  }

  // Sync database to items.json for frontend web UI
  exportToJson();
}

/**
 * Insert a single history item
 */
function insertItem(item) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO royal_history_items 
    (uid, category, event_type, event_year, event_year_display, event_date, target_day, target_month, title, summary, description, significance, location, reference, tags, priority, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const categoryPrefix = item.category === 'bangladesh' ? 'BD' : (item.category === 'world' ? 'WD' : 'DAY');
  const monthPad = String(item.target_month || 1).padStart(2, '0');
  const dayPad = String(item.target_day || 1).padStart(2, '0');
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const uid = item.uid || `RH-${categoryPrefix}-${monthPad}${dayPad}-${randomSuffix}`;

  const yearDisplay = item.event_year_display || `${item.event_year} খ্রিস্টাব্দ`;

  stmt.run(
    uid,
    item.category || 'on_this_day',
    item.event_type || 'event',
    parseInt(item.event_year, 10) || 1971,
    yearDisplay,
    item.event_date || `${item.target_day} নভেম্বর`,
    parseInt(item.target_day, 10) || 1,
    parseInt(item.target_month, 10) || 1,
    item.title,
    item.summary || item.description,
    item.description || item.summary,
    item.significance || null,
    item.location || null,
    item.reference || 'রয়েল হিস্ট্রি আর্কাইভ',
    item.tags || '',
    parseInt(item.priority, 10) || 1,
    item.is_active !== undefined ? (item.is_active ? 1 : 0) : 1
  );

  exportToJson();
  return uid;
}

/**
 * Bulk insert items
 */
function bulkInsertItems(items) {
  const db = getDb();
  for (const item of items) {
    insertItem(item);
  }
}

/**
 * Get all active history items
 */
function getAllItems() {
  const db = getDb();
  return db.prepare('SELECT * FROM royal_history_items WHERE is_active = 1 ORDER BY target_month ASC, target_day ASC, event_year ASC').all();
}

/**
 * Get item by UID
 */
function getItemByUid(uid) {
  const db = getDb();
  return db.prepare('SELECT * FROM royal_history_items WHERE uid = ?').get(uid);
}

/**
 * Smart Selection for Today's Card with Multiple Events:
 * Returns up to `limit` events (default 3) for today's month & day.
 * Balances across categories (Bangladesh, World, On This Day) and rotates by used_count ASC.
 */
function getTodayHistoryEvents(month, day, limit = 4) {
  const db = getDb();

  // Fetch all events for today's date
  const events = db.prepare(`
    SELECT * FROM royal_history_items 
    WHERE is_active = 1 AND target_month = ? AND target_day = ?
    ORDER BY used_count ASC, last_used_at ASC, priority DESC
  `).all(month, day);

  if (events && events.length >= 2) {
    const selected = [];
    const categories = ['bangladesh', 'world'];
    
    // First try to pick 1 from each category available today
    for (const cat of categories) {
      if (selected.length >= limit) break;
      const found = events.find(e => e.category === cat && !selected.some(s => s.id === e.id));
      if (found) selected.push(found);
    }

    // Fill remaining slots from the rest of today's events
    for (const e of events) {
      if (selected.length >= limit) break;
      if (!selected.some(s => s.id === e.id)) {
        selected.push(e);
      }
    }

    // বর্তমান সালের ঘটনা আগে থাকবে (Descending Order by Year)
    selected.sort((a, b) => (b.event_year || 0) - (a.event_year || 0));
    return selected;
  }

  const selected = events ? [...events] : [];
  if (selected.length < limit) {
    const fallbacks = db.prepare(`
      SELECT * FROM royal_history_items 
      WHERE is_active = 1
      ORDER BY used_count ASC, last_used_at ASC, priority DESC
    `).all();

    for (const fb of fallbacks) {
      if (selected.length >= limit) break;
      if (!selected.some(s => s.id === fb.id)) {
        selected.push(fb);
      }
    }
  }

  // বর্তমান সালের ঘটনা আগে থাকবে (Descending Order by Year)
  selected.sort((a, b) => (b.event_year || 0) - (a.event_year || 0));
  return selected;
}

/**
 * Fetch ALL events for a specific date (for comprehensive text caption / body)
 * বর্তমান সালের ঘটনা আগে থাকবে (ORDER BY event_year DESC)
 */
function getAllEventsForDate(month, day) {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM royal_history_items 
    WHERE is_active = 1 AND target_month = ? AND target_day = ?
    ORDER BY event_year DESC
  `).all(month, day);
  return rows || [];
}

/**
 * Smart Selection for Today's Card (Single fallback)
 */
function getTodayHistoryItem(month, day, preferredCategory = null) {
  const db = getDb();

  // Try exact date match first
  let query = 'SELECT * FROM royal_history_items WHERE is_active = 1 AND target_month = ? AND target_day = ?';
  const params = [month, day];

  if (preferredCategory) {
    query += ' AND category = ?';
    params.push(preferredCategory);
  }

  query += ' ORDER BY used_count ASC, last_used_at ASC, priority DESC LIMIT 1';

  let item = db.prepare(query).get(...params);

  // If preferred category had no match, try any category for today's date
  if (!item && preferredCategory) {
    item = db.prepare(`
      SELECT * FROM royal_history_items 
      WHERE is_active = 1 AND target_month = ? AND target_day = ?
      ORDER BY used_count ASC, last_used_at ASC, priority DESC LIMIT 1
    `).get(month, day);
  }

  // Fallback: If no event on this exact date yet, pick least-used landmark event
  if (!item) {
    item = db.prepare(`
      SELECT * FROM royal_history_items 
      WHERE is_active = 1 
      ORDER BY used_count ASC, last_used_at ASC, priority DESC LIMIT 1
    `).get();
  }

  return item;
}

/**
 * Update usage tracking after card generation
 */
function markItemUsed(id) {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE royal_history_items 
    SET used_count = used_count + 1, last_used_at = ?, updated_at = ?
    WHERE id = ?
  `).run(now, now, id);

  exportToJson();
}

function markItemsUsed(ids) {
  if (!Array.isArray(ids)) ids = [ids];
  const db = getDb();
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    UPDATE royal_history_items 
    SET used_count = used_count + 1, last_used_at = ?, updated_at = ?
    WHERE id = ?
  `);
  for (const id of ids) {
    if (id) stmt.run(now, now, id);
  }
  exportToJson();
}

/**
 * Record generation history
 */
function recordGeneration(data) {
  const db = getDb();
  db.prepare(`
    INSERT INTO generation_history 
    (card_id, item_id, item_uid, category, event_year, title, theme, layout, image_path, json_path, caption)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.cardId,
    data.itemId,
    data.itemUid,
    data.category,
    data.eventYear,
    data.title,
    data.theme,
    data.layout,
    data.imagePath,
    data.jsonPath,
    data.caption
  );
}

/**
 * Delete item
 */
function deleteItem(id) {
  const db = getDb();
  db.prepare('DELETE FROM royal_history_items WHERE id = ?').run(id);
  exportToJson();
}

/**
 * Export active items to database/items.json for static frontend
 */
function exportToJson() {
  const db = getDb();
  const items = db.prepare('SELECT * FROM royal_history_items WHERE is_active = 1 ORDER BY event_year DESC, target_month DESC, target_day DESC').all();
  fs.writeFileSync(itemsJsonPath, JSON.stringify(items, null, 2), 'utf8');
}

module.exports = {
  getDb,
  initDatabase,
  insertItem,
  bulkInsertItems,
  getAllItems,
  getItemByUid,
  getTodayHistoryItem,
  getTodayHistoryEvents,
  getAllEventsForDate,
  markItemUsed,
  markItemsUsed,
  recordGeneration,
  deleteItem,
  exportToJson
};
