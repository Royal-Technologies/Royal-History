/**
 * Royal History — Bulk JSON Data Importer
 */
'use strict';

const fs = require('fs');
const path = require('path');
const db = require('./db');

const importPath = path.join(__dirname, '../database/imports.json');

if (!fs.existsSync(importPath)) {
  console.log(`[Import] File not found: ${importPath}`);
  console.log('[Import] Please create database/imports.json with an array of events.');
  process.exit(0);
}

try {
  const content = fs.readFileSync(importPath, 'utf8').trim();
  if (!content) {
    console.log('[Import] database/imports.json is empty.');
    process.exit(0);
  }

  const items = JSON.parse(content);
  if (!Array.isArray(items)) {
    throw new Error('Import data must be a JSON array of event objects.');
  }

  console.log(`[Import] Importing ${items.length} items...`);
  db.bulkInsertItems(items);
  console.log(`[Import] Successfully imported ${items.length} items to database!`);
} catch (err) {
  console.error('[Import] Failed to import:', err.message);
  process.exit(1);
}
