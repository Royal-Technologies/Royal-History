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
 * Smart Selection for Today's Card:
 * 1. Matches today's target_month and target_day.
 * 2. If preferredCategory is supplied, filter by category.
 * 3. Smart rotation by used_count ASC, then last_used_at ASC, then priority DESC.
 * 4. Fallback: if no item exists for today's exact date, pick lowest used_count item from database.
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
  const items = db.prepare('SELECT * FROM royal_history_items WHERE is_active = 1 ORDER BY target_month ASC, target_day ASC, event_year ASC').all();
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
  markItemUsed,
  recordGeneration,
  deleteItem,
  exportToJson
};
