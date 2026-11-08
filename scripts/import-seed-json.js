/**
 * Universal Seed JSON Importer
 * Usage: node scripts/import-seed-json.js <seed_file.json>
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const dbPath = path.join(__dirname, '../database/royal_history.sqlite');
const db = new DatabaseSync(dbPath);

const fileName = process.argv[2];
if (!fileName) {
  console.error('Usage: node scripts/import-seed-json.js <seed_file.json>');
  process.exit(1);
}

const filePath = path.isAbsolute(fileName) ? fileName : path.join(__dirname, '..', fileName);
if (!fs.existsSync(filePath)) {
  console.error('File not found:', filePath);
  process.exit(1);
}

const raw = fs.readFileSync(filePath, 'utf8');
const events = JSON.parse(raw);

console.log(`[Import] Processing ${events.length} events from ${path.basename(filePath)}...`);

const stmt = db.prepare(`
  INSERT INTO royal_history_items 
  (uid, category, event_type, event_year, event_year_display, event_date, target_day, target_month, title, summary, description, significance, location, reference, tags, priority, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

let inserted = 0;
let skipped = 0;

for (const ev of events) {
  const existing = db.prepare('SELECT id FROM royal_history_items WHERE title = ?').get(ev.title);
  if (!existing) {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const prefix = ev.category === 'bangladesh' ? 'BD' : 'WD';
    const monthPad = String(ev.target_month).padStart(2, '0');
    const dayPad = String(ev.target_day).padStart(2, '0');
    const uid = `RH-${prefix}-${monthPad}${dayPad}-${randomSuffix}`;

    const yearDisplay = ev.event_year_display || `${ev.event_year} খ্রিস্টাব্দ`;

    stmt.run(
      uid,
      ev.category,
      ev.event_type || 'event',
      parseInt(ev.event_year, 10),
      yearDisplay,
      ev.event_date || `${ev.target_day} তারিখ`,
      parseInt(ev.target_day, 10),
      parseInt(ev.target_month, 10),
      ev.title,
      ev.summary || ev.description,
      ev.description || ev.summary,
      ev.significance || null,
      ev.location || null,
      ev.reference || 'রয়েল হিস্ট্রি আর্কাইভ',
      ev.tags || '',
      parseInt(ev.priority, 10) || 1,
      1
    );
    inserted++;
  } else {
    skipped++;
  }
}

console.log(`[Success] Inserted: ${inserted}, Skipped (Already existed): ${skipped}`);
require('./db').exportToJson();
console.log('[Success] Synced database to database/items.json');
