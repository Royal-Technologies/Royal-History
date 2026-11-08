const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const db = new DatabaseSync(path.join(__dirname, '../database/royal_history.sqlite'));

const daysInMonths = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames = ['', 'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

let totalDays = 0;
let emptyDays = 0;
let oneEventDays = 0;
let twoEventDays = 0;
let threeOrMoreDays = 0;

const monthSummary = [];

for (let m = 1; m <= 12; m++) {
  const days = daysInMonths[m];
  const emptyList = [];
  const oneList = [];
  let mTotalEvents = 0;

  for (let d = 1; d <= days; d++) {
    totalDays++;
    const count = db.prepare('SELECT COUNT(*) as c FROM royal_history_items WHERE target_month = ? AND target_day = ?').get(m, d).c;
    mTotalEvents += count;
    if (count === 0) {
      emptyDays++;
      emptyList.push(d);
    } else if (count === 1) {
      oneEventDays++;
      oneList.push(d);
    } else if (count === 2) {
      twoEventDays++;
    } else {
      threeOrMoreDays++;
    }
  }

  monthSummary.push({
    month: monthNames[m],
    monthNum: m,
    totalDays: days,
    totalEvents: mTotalEvents,
    emptyDaysCount: emptyList.length,
    emptyDaysList: emptyList,
    oneEventCount: oneList.length,
    oneEventList: oneList
  });
}

console.log('=== CALENDAR AUDIT SUMMARY ===');
console.log('Total Calendar Days:', totalDays);
console.log('Completely Empty Days (0 events):', emptyDays);
console.log('Under-populated Days (1 event):', oneEventDays);
console.log('Days with 2 events:', twoEventDays);
console.log('Days with 3+ events:', threeOrMoreDays);
console.log('\n=== MONTH-BY-MONTH STATUS ===');
monthSummary.forEach(m => {
  console.log(m.month + ' (' + m.totalDays + ' দিনের মধ্যে ইভেন্ট আছে ' + m.totalEvents + 'টি):');
  if (m.emptyDaysCount > 0) {
    console.log('  ❌ ফাঁকা দিন (' + m.emptyDaysCount + 'টি): ' + m.emptyDaysList.join(', '));
  } else {
    console.log('  ✅ কোনো দিন ফাঁকা নেই');
  }
  if (m.oneEventCount > 0) {
    console.log('  ⚠️ মাত্র ১টি করে ইভেন্ট আছে (' + m.oneEventCount + 'টি দিন): ' + m.oneEventList.join(', '));
  }
});
