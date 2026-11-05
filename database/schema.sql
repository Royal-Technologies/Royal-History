-- ============================================================
-- Royal History Database Schema (SQLite)
-- Brand: Royal History — ইতিহাসের এই দিনে
-- Credits: Royal Technologies (https://www.royaltechbd.com/)
-- ============================================================

CREATE TABLE IF NOT EXISTS royal_history_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('bangladesh', 'world', 'on_this_day')),
    event_type TEXT DEFAULT 'event' CHECK(event_type IN ('event', 'birth', 'demise', 'discovery', 'treaty', 'milestone')),
    event_year INTEGER NOT NULL,
    event_year_display TEXT,
    event_date TEXT NOT NULL,
    target_day INTEGER NOT NULL,
    target_month INTEGER NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    significance TEXT,
    location TEXT,
    reference TEXT,
    tags TEXT,
    priority INTEGER DEFAULT 1,
    used_count INTEGER DEFAULT 0,
    last_used_at TEXT DEFAULT NULL,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS generation_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id TEXT NOT NULL,
    item_id INTEGER NOT NULL,
    item_uid TEXT NOT NULL,
    category TEXT NOT NULL,
    event_year INTEGER,
    title TEXT NOT NULL,
    theme TEXT NOT NULL,
    layout TEXT NOT NULL,
    image_path TEXT NOT NULL,
    json_path TEXT NOT NULL,
    caption TEXT NOT NULL,
    generated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_history_date ON royal_history_items(target_month, target_day, is_active);
CREATE INDEX IF NOT EXISTS idx_history_category ON royal_history_items(category, is_active);
CREATE INDEX IF NOT EXISTS idx_history_rotation ON royal_history_items(used_count, last_used_at);
