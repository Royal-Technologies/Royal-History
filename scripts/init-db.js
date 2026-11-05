/**
 * Royal History — Database Initialization Script
 */
'use strict';

const db = require('./db');

console.log('[Royal History] Initializing database...');
try {
  db.initDatabase();
  console.log('[Royal History] Database initialized successfully!');
} catch (error) {
  console.error('[Royal History] Database initialization failed:', error);
  process.exit(1);
}
