/**
 * Royal History — Daily Generation & Publishing Engine
 * Generates Multi-Event 1080x1080 Card for the Day
 * Brand: Royal History — ইতিহাসের এই দিনে
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');

const rootDir = path.resolve(__dirname, '..');
const db = require('./db');

// ── 1. Register Embedded Fonts ──
const fontDir = path.join(rootDir, 'assets/fonts');
const fonts = [
  { file: 'HindSiliguri-Regular.ttf', family: 'Hind Siliguri' },
  { file: 'HindSiliguri-Bold.ttf', family: 'Hind Siliguri' }
];

fonts.forEach(f => {
  const fPath = path.join(fontDir, f.file);
  if (fs.existsSync(fPath)) {
    try {
      GlobalFonts.registerFromPath(fPath, f.family);
    } catch (e) {
      console.warn(`[Font] Could not load ${f.file}:`, e.message);
    }
  }
});

// Load Card Template Engine
const templatePath = path.join(rootDir, 'templates/history-card.js');
const HistoryCardTemplate = require(templatePath);

// ── 2. Parse CLI Arguments ──
const args = process.argv.slice(2);
function getArg(name, defaultValue = null) {
  const prefix = `--${name}=`;
  const match = args.find(a => a.startsWith(prefix));
  return match ? match.slice(prefix.length) : defaultValue;
}
const isPreview = args.includes('--preview');
const forcedCategory = getArg('category', process.env.HISTORY_CATEGORY || null);
const forcedTheme = getArg('theme', process.env.HISTORY_THEME || null);
const forcedLayout = getArg('layout', process.env.HISTORY_LAYOUT || null);
const forcedUid = getArg('uid', null);

// ── 3. Date & Intelligence (Asia/Dhaka) ──
const now = new Date();
const dhakaFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Dhaka',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
});
const parts = dhakaFormatter.formatToParts(now);
const dateMap = {};
parts.forEach(p => dateMap[p.type] = p.value);
const currentYear = parseInt(dateMap.year, 10);
const currentMonth = parseInt(dateMap.month, 10);
const currentDay = parseInt(dateMap.day, 10);

console.log(`[Royal History] Running for date: ${currentDay}/${currentMonth}/${currentYear} (Asia/Dhaka)`);

// ── 4. Retrieve History Events (Multiple Events per Day) ──
let events = [];

if (forcedUid) {
  const single = db.getItemByUid(forcedUid);
  if (single) {
    events = [single];
    // Find companion events of the same date if possible
    const companions = db.getTodayHistoryEvents(single.target_month, single.target_day, 3);
    for (const comp of companions) {
      if (events.length >= 3) break;
      if (!events.some(e => e.id === comp.id)) {
        events.push(comp);
      }
    }
  }
}

if (events.length === 0) {
  events = db.getTodayHistoryEvents(currentMonth, currentDay, 3);
}

if (!events || events.length === 0) {
  console.error('[Error] No history events found in the database. Please run npm run init-db first.');
  process.exit(1);
}

console.log(`[Royal History] Selected ${events.length} Events for today's card:`);
events.forEach((ev, i) => {
  console.log(`  ${i + 1}. [${ev.event_year_display || ev.event_year}] ${ev.title} (${ev.category})`);
});

// ── 5. Smart Layout & Theme Selection (20 Layouts × 10 Themes) ──
let selectedLayout = forcedLayout;
if (!selectedLayout) {
  const allLayouts = HistoryCardTemplate.LAYOUT_KEYS;
  const idx = (currentDay + events[0].id) % allLayouts.length;
  selectedLayout = allLayouts[idx];
}

let selectedTheme = forcedTheme;
if (!selectedTheme) {
  const allThemes = HistoryCardTemplate.THEME_KEYS;
  const idx = (currentDay + events[0].id) % allThemes.length;
  selectedTheme = allThemes[idx];
}

console.log(`[Royal History] Applied Layout: ${selectedLayout}`);
console.log(`[Royal History] Applied Theme: ${selectedTheme}`);

// ── 6. Render Card Canvas (Multi-Event Layout) ──
const canvas = createCanvas(1080, 1080);
const dateText = events[0].event_date || `${currentDay} তারিখ`;
HistoryCardTemplate.renderCard(canvas, { events, dateText }, { layout: selectedLayout, theme: selectedTheme, dateText });

// ── 7. Generate Unique Card ID and Paths ──
const cardsDir = path.join(rootDir, 'cards');
if (!fs.existsSync(cardsDir)) {
  fs.mkdirSync(cardsDir, { recursive: true });
}

const yStr = String(currentYear);
const mStr = String(currentMonth).padStart(2, '0');
const dStr = String(currentDay).padStart(2, '0');
const randStr = Math.random().toString(36).substring(2, 6).toUpperCase();
const cardId = `RH-${yStr}${mStr}${dStr}-${randStr}`;

const todayPngPath = path.join(cardsDir, 'today.png');
const todayJsonPath = path.join(cardsDir, 'today.json');
const todayJsPath = path.join(cardsDir, 'today-data.js');
const archivePngPath = path.join(cardsDir, `${cardId}.png`);

const buffer = canvas.toBuffer('image/png');

// ── 8. Build Formatted Multi-Event Social Media Caption ──
const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBn(n) { return String(n).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]); }

let eventsCaptionText = '';
events.forEach(ev => {
  let catBadge = '📜 বিশ্ব ইতিহাস';
  if (ev.category === 'bangladesh') catBadge = '🇧🇩 বাংলাদেশ ইতিহাস';

  eventsCaptionText += `🔹 ${ev.event_year_display || `${toBn(ev.event_year)} খ্রিস্টাব্দ`} [${catBadge}]:
⭐ ${ev.title}
“${ev.summary || ev.description}”
${ev.significance ? `✨ তাৎপর্য: ${ev.significance}\n` : ''}\n`;
});

const caption = `🏛️ Royal History — ইতিহাসের এই দিনে
📅 ${dateText} — ইতিহাসের পাতায় আজকের স্মরণীয় ঘটনাবলী

${eventsCaptionText.trim()}

📌 তথ্যসূত্র: রয়েল হিস্ট্রি আর্কাইভ ও জাতীয় মহাফেজখানা

—
কারিগরি সহায়তায়: Royal Technologies (https://www.royaltechbd.com/)
ওয়েবসাইট ও পূর্ণাঙ্গ আর্কাইভ: https://royal-technologies.github.io/Royal-History/

#RoyalTechnologies #RoyalHistory #ItihasherEiDine #OnThisDay #BangladeshHistory #WorldHistory #TodayInHistory #ইতিহাসেরএইদিনে`;

const metadata = {
  cardId: cardId,
  dateText: dateText,
  eventCount: events.length,
  events: events,
  // Primary event for backward-compatible viewers
  uid: events[0].uid,
  category: events[0].category,
  eventYear: events[0].event_year,
  eventYearDisplay: events[0].event_year_display,
  eventDate: dateText,
  title: events[0].title,
  summary: events[0].summary,
  layout: selectedLayout,
  theme: selectedTheme,
  caption: caption,
  imageUrl: 'https://royal-technologies.github.io/Royal-History/cards/today.png',
  archiveUrl: `https://royal-technologies.github.io/Royal-History/cards/${cardId}.png`,
  generatedAt: new Date().toISOString()
};

// ── 9. Write Output Files ──
fs.writeFileSync(todayPngPath, buffer);
fs.writeFileSync(todayJsonPath, JSON.stringify(metadata, null, 2), 'utf8');
fs.writeFileSync(todayJsPath, `window.ROYAL_TODAY_HISTORY = ${JSON.stringify(metadata, null, 2)};`, 'utf8');

if (!isPreview) {
  fs.writeFileSync(archivePngPath, buffer);
  db.markItemsUsed(events.map(e => e.id));
  db.recordGeneration({
    cardId: cardId,
    itemId: events[0].id,
    itemUid: events[0].uid,
    category: events[0].category,
    eventYear: events[0].event_year,
    title: `${events.length}টি ঘটনা (${dateText})`,
    theme: selectedTheme,
    layout: selectedLayout,
    imagePath: `cards/${cardId}.png`,
    jsonPath: 'cards/today.json',
    caption: caption
  });
}

console.log(`[Success] Multi-event Royal History card generated successfully!`);
console.log(`  - PNG: ${todayPngPath}`);
console.log(`  - JSON: ${todayJsonPath}`);
if (!isPreview) console.log(`  - Archive: ${archivePngPath}`);
