/**
 * Royal History — Daily Generation & Publishing Engine
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

// ── 4. Retrieve History Item ──
let item = null;

if (forcedUid) {
  item = db.getItemByUid(forcedUid);
  if (!item) {
    console.warn(`[Warning] No item found with UID: ${forcedUid}`);
  }
}

if (!item) {
  item = db.getTodayHistoryItem(currentMonth, currentDay, forcedCategory);
}

if (!item) {
  console.error('[Error] No history events found in the database. Please run npm run init-db first.');
  process.exit(1);
}

console.log(`[Royal History] Selected Event: [${item.uid}] "${item.title}" (${item.event_year_display || item.event_year})`);

// ── 5. Smart Theme Selection ──
let selectedTheme = forcedTheme;
if (!selectedTheme) {
  // If Bangladesh category, prioritize independence-emerald or archival-gold
  if (item.category === 'bangladesh') {
    const bdThemes = ['independence-emerald', 'archival-gold', 'terracotta-heritage', 'vintage-parchment', 'imperial-maroon'];
    const idx = (currentDay + item.id) % bdThemes.length;
    selectedTheme = bdThemes[idx];
  } else if (item.category === 'world') {
    const worldThemes = ['archival-gold', 'sapphire-epoch', 'midnight-charcoal', 'antique-bronze', 'desert-monument'];
    const idx = (currentDay + item.id) % worldThemes.length;
    selectedTheme = worldThemes[idx];
  } else {
    const allThemes = Object.keys(HistoryCardTemplate.THEMES);
    const idx = (currentDay + item.id) % allThemes.length;
    selectedTheme = allThemes[idx];
  }
}

console.log(`[Royal History] Applied Theme: ${selectedTheme}`);

// ── 6. Render Card Canvas ──
const canvas = createCanvas(1080, 1080);
HistoryCardTemplate.renderCard(canvas, item, { theme: selectedTheme });

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

// ── 8. Build Formatted Social Media Caption ──
let catLabel = 'ইতিহাসের এই দিনে';
if (item.category === 'bangladesh') catLabel = 'বাংলাদেশ ইতিহাস';
else if (item.category === 'world') catLabel = 'বিশ্ব ইতিহাস';

const caption = `🏛️ ${catLabel} | Royal History — ইতিহাসের এই দিনে

📅 ${item.event_date || `${currentDay} তারিখ`} | ${item.event_year_display || `${item.event_year} খ্রিস্টাব্দ`}
⭐ ${item.title}

“${item.summary || item.description}”

${item.description && item.description !== item.summary ? `📖 বিস্তারিত পটভূমি:\n${item.description}\n\n` : ''}${item.significance ? `✨ ঐতিহাসিক তাৎপর্য: ${item.significance}\n` : ''}${item.location ? `📍 স্থান: ${item.location}\n` : ''}📌 তথ্যসূত্র: ${item.reference || 'রয়েল হিস্ট্রি মহাফেজখানা'}

—
কারিগরি সহায়তায়: Royal Technologies (https://www.royaltechbd.com/)
ওয়েবসাইট ও পূর্ণাঙ্গ আর্কাইভ: https://royal-technologies.github.io/Royal-History/

#RoyalHistory #ItihasherEiDine #OnThisDay #BangladeshHistory #WorldHistory #TodayInHistory #RoyalTechnologies #ইতিহাসেরএইদিনে`;

const metadata = {
  cardId: cardId,
  uid: item.uid,
  category: item.category,
  eventType: item.event_type,
  eventYear: item.event_year,
  eventYearDisplay: item.event_year_display,
  eventDate: item.event_date,
  title: item.title,
  summary: item.summary,
  description: item.description,
  significance: item.significance,
  location: item.location,
  reference: item.reference,
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
  db.markItemUsed(item.id);
  db.recordGeneration({
    cardId: cardId,
    itemId: item.id,
    itemUid: item.uid,
    category: item.category,
    eventYear: item.event_year,
    title: item.title,
    theme: selectedTheme,
    layout: 'archival-plaque',
    imagePath: `cards/${cardId}.png`,
    jsonPath: 'cards/today.json',
    caption: caption
  });
}

console.log(`[Success] Today's Royal History card generated successfully!`);
console.log(`  - PNG: ${todayPngPath}`);
console.log(`  - JSON: ${todayJsonPath}`);
if (!isPreview) console.log(`  - Archive: ${archivePngPath}`);
