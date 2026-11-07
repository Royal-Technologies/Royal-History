/**
 * Add 7 November Historic Events (Bangladesh & World)
 */
'use strict';

const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const dbPath = path.join(__dirname, '../database/royal_history.sqlite');
const db = new DatabaseSync(dbPath);

const events = [
  {
    category: 'bangladesh',
    event_type: 'milestone',
    event_year: 2024,
    event_year_display: '২০২৪ খ্রিস্টাব্দ',
    event_date: '৭ নভেম্বর',
    target_day: 7,
    target_month: 11,
    title: 'অন্তর্বর্তীকালীন সরকার কর্তৃক রাষ্ট্র সংস্কারের রূপরেখা ও জাতীয় ঐকমত্যের ঐতিহাসিক উদ্যোগ',
    summary: '২০২৪ সালের ৭ নভেম্বর: জুলাই ছাত্র-জনতার গণঅভ্যুত্থান পরবর্তী নতুন বাংলাদেশ গঠনে রাষ্ট্র সংস্কার ও সংবিধান পর্যালোচনায় গুরুত্বপূর্ণ অগ্রগতি সূচিত হয়।',
    description: '২০২৪ সালের ৭ নভেম্বর জুলাই ছাত্র-জনতার সফল অভ্যুত্থানের পর ড. মুহাম্মদ ইউনূসের নেতৃত্বাধীন অন্তর্বর্তীকালীন সরকার রাষ্ট্রকাঠামো মেরামতে বিভিন্ন সংস্কার কমিশনের কার্যক্রম ও জাতীয় ঐকমত্য প্রতিষ্ঠার রোডম্যাপ দ্রুত গতিতে এগিয়ে নেয়।',
    significance: 'স্বৈরাচারমুক্ত বাংলাদেশে নতুন গণতান্ত্রিক ও প্রাতিষ্ঠানিক ভিত্তি প্রতিষ্ঠার ঐতিহাসিক পর্যায়।',
    location: 'ঢাকা, বাংলাদেশ',
    reference: 'জাতীয় গণমাধ্যম ও সরকারি প্রেস রিলিজ',
    tags: 'জুলাই_বিপ্লব,রাষ্ট্র_সংস্কার,অন্তর্বর্তীকালীন_সরকার',
    priority: 3
  },
  {
    category: 'bangladesh',
    event_type: 'event',
    event_year: 1971,
    event_year_display: '১৯৭১ খ্রিস্টাব্দ',
    event_date: '৭ নভেম্বর',
    target_day: 7,
    target_month: 11,
    title: 'মুক্তিযুদ্ধে যৌথ কমান্ড গঠন ও হানাদারদের বিরুদ্ধে চূড়ান্ত গেরিলা আক্রমণ তীব্রতর',
    summary: '১৯৭১ সালের ৭ নভেম্বর: স্বাধীনতা যুদ্ধের চূড়ান্ত পর্বে মুক্তিবাহিনীর গেরিলা হামলা তীব্রতর হয় এবং ঢাকা অভিমুখী যৌথ অভিযানের প্রস্তুতি সূচিত হয়।',
    description: '১৯৭১ সালের ৭ নভেম্বর পাকিস্তানি দখলদার বাহিনীর ওপর মুক্তিবাহিনী ও ভারতীয় মিত্রবাহিনীর যৌথ সামরিক পরিকল্পনা ও গেরিলা প্রতিরোধ আক্রমণ ব্যাপক তীব্রতা লাভ করে, যা শত্রুসেনাদের মনোবল ভেঙে দেয়।',
    significance: 'মহান মুক্তিযুদ্ধে পাকিস্তানি দখলদারদের পতন ত্বরান্বিত করার সন্ধিক্ষণ।',
    location: 'বাংলাদেশ রণক্ষেত্র',
    reference: 'মুক্তিযুদ্ধ বিষয়ক মন্ত্রণালয় ও দলিলপত্র',
    tags: 'মুক্তিযুদ্ধ,গেরিলা_যুদ্ধ,১৯৭১',
    priority: 2
  },
  {
    category: 'world',
    event_type: 'event',
    event_year: 1917,
    event_year_display: '১৯১৭ খ্রিস্টাব্দ',
    event_date: '৭ নভেম্বর',
    target_day: 7,
    target_month: 11,
    title: 'রাশিয়ায় ঐতিহাসিক অক্টোবর বিপ্লব ও সোভিয়েত সমাজতন্ত্রের গোড়াপত্তন',
    summary: '১৯১৭ সালের ৭ নভেম্বর: ভি. আই. লেনিনের নেতৃত্বে রাশিয়ায় ঐতিহাসিক বলশেভিক বিপ্লব সংঘটিত হয় এবং বিশ্বে প্রথম সমাজতান্ত্রিক রাষ্ট্রের সূচনা ঘটে।',
    description: '১৯১৭ সালের ৭ নভেম্বর (গ্রেগরীয় ক্যালেন্ডার) ভ্লাদিমির লেনিনের নেতৃত্বে রাশিয়ার বলশেভিক দল পেত্রোগ্রাদের শীতকালীন প্রাসাদ দখল করে জার সাম্রাজ্যের অবসান ঘটায় এবং সোভিয়েত সমাজতান্ত্রিক শাসনব্যবস্থার সূচনা করে।',
    significance: 'বিংশ শতাব্দীর বিশ্বরাজনীতি ও সমাজতান্ত্রিক আদর্শের সবচেয়ে যুগান্তকারী বিপ্লব।',
    location: 'সেন্ট পিটার্সবার্গ (পেত্রোগ্রাদ), রাশিয়া',
    reference: 'বিশ্ব ইতিহাস মহাফেজখানা ও এনসাইক্লোপিডিয়া ব্রিটানিকা',
    tags: 'বলশেভিক_বিপ্লব,লেনিন,সোভিয়েত_ইউনিয়ন,বিশ্ব_ইতিহাস',
    priority: 3
  },
  {
    category: 'world',
    event_type: 'birth',
    event_year: 1867,
    event_year_display: '১৮৬৭ খ্রিস্টাব্দ',
    event_date: '৭ নভেম্বর',
    target_day: 7,
    target_month: 11,
    title: 'দুইবার নোবেলজয়ী একমাত্র নারী বিজ্ঞানী মাদাম মারি ক্যুরির জন্ম',
    summary: '১৮৬৭ সালের ৭ নভেম্বর: পোলিশ-ফরাসি মহান বিজ্ঞানী ও তেজস্ক্রিয়তার আবিষ্কারক মারি ক্যুরি জন্মগ্রহণ করেন, যিনি পদার্থবিজ্ঞান ও রসায়ন উভয় শাখায় নোবেল লাভ করেন।',
    description: '১৮৬৭ সালের ৭ নভেম্বর ওয়ারশতে জন্মগ্রহণ করেন মাদাম মারি ক্যুরি। তিনি রেডিয়াম ও পোলোনিয়াম মৌল আবিষ্কার করেন এবং দুই ভিন্ন বিজ্ঞানে নোবেল জয়ী পৃথিবীর একমাত্র অনন্য বিজ্ঞানী হিসেবে চিরস্মরণীয়।',
    significance: 'আধুনিক পারমাণবিক পদার্থবিজ্ঞান ও মানব কল্যাণে বিজ্ঞানের সর্বোচ্চ অবদানের প্রতীক।',
    location: 'ওয়ারশ, পোল্যান্ড',
    reference: 'নোবেল প্রাইজ আর্কাইভ ও রয়েল হিস্ট্রি',
    tags: 'মারি_ক্যুরি,নোবেল_পুরস্কার,বিজ্ঞান,আবিষ্কার',
    priority: 3
  },
  {
    category: 'world',
    event_type: 'milestone',
    event_year: 1944,
    event_year_display: '১৯৪৪ খ্রিস্টাব্দ',
    event_date: '৭ নভেম্বর',
    target_day: 7,
    target_month: 11,
    title: 'মার্কিন প্রেসিডেন্ট হিসেবে ফ্র্যাঙ্কলিন ডি. রুজভেল্টের রেকর্ড চতুর্থ মেয়াদে নির্বাচন জয়',
    summary: '১৯৪৪ সালের ৭ নভেম্বর: দ্বিতীয় বিশ্বযুদ্ধের উত্তাল পর্বে ফ্র্যাঙ্কলিন ডি. রুজভেল্ট মার্কিন যুক্তরাষ্ট্রের ইতিহাসে একমাত্র ব্যক্তি হিসেবে রেকর্ড চতুর্থবারের মতো প্রেসিডেন্ট নির্বাচিত হন।',
    description: '১৯৪৪ সালের ৭ নভেম্বর মার্কিন প্রেসিডেন্ট নির্বাচনে ফ্র্যাঙ্কলিন ডি. রুজভেল্ট থমাস ই. ডিউইকে পরাজিত করে চতুর্থবারের মতো হোয়াইট হাউসে প্রবেশ করেন, যা মার্কিন ইতিহাসে বিরলতম দৃষ্টান্ত।',
    significance: 'দ্বিতীয় বিশ্বযুদ্ধে মিত্রশক্তির বিজয় সুনিশ্চিত করা ও যুদ্ধোত্তর জাতিসংঘ রূপায়ণে নেতৃত্ব।',
    location: 'ওয়াশিংটন ডিসি, যুক্তরাষ্ট্র',
    reference: 'ইউএস ন্যাশনাল আর্কাইভস',
    tags: 'রুজভেল্ট,আমেরিকান_ইতিহাস,দ্বিতীয়_বিশ্বযুদ্ধ',
    priority: 2
  },
  {
    category: 'world',
    event_type: 'event',
    event_year: 2000,
    event_year_display: '২০০০ খ্রিস্টাব্দ',
    event_date: '৭ নভেম্বর',
    target_day: 7,
    target_month: 11,
    title: 'জর্জ ডব্লিউ বুশ ও আল গোরের মধ্যে মার্কিন ইতিহাসের নাটকীয় প্রেসিডেন্ট নির্বাচন',
    summary: '২০০০ সালের ৭ নভেম্বর: বুশ ও গোরের তীব্র প্রতিদ্বন্দ্বিতায় ফ্লোরিডার বিতর্কিত ভোট গণনা নিয়ে মার্কিন নির্বাচনের ইতিহাসে নজিরবিহীন রাজনৈতিক সংকট সৃষ্টি হয়।',
    description: '২০০০ সালের ৭ নভেম্বর অনুষ্ঠিত মার্কিন প্রেসিডেন্ট নির্বাচনে জর্জ ডব্লিউ বুশ ও আল গোরের ভোটের ব্যবধান ছিল অত্যন্ত সামান্য। ফ্লোরিডার ব্যালট পুনর্গণনা নিয়ে মার্কিন সুপ্রিম কোর্ট পর্যন্ত গড়ায় এই ঐতিহাসিক দ্বন্দ্ব।',
    significance: 'আধুনিক গণতন্ত্রে ব্যালট জটিলতা ও ভোট ব্যবস্থার সবচেয়ে আলোচিত নজির।',
    location: 'যুক্তরাষ্ট্র',
    reference: 'সিএনএন আর্কাইভ ও ইউএস ইলেকশন হিস্ট্রি',
    tags: 'বুশ_গোর_নির্বাচন,আমেরিকা,রাজনীতি',
    priority: 2
  }
];

const stmt = db.prepare(`
  INSERT INTO royal_history_items 
  (uid, category, event_type, event_year, event_year_display, event_date, target_day, target_month, title, summary, description, significance, location, reference, tags, priority, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const ev of events) {
  const existing = db.prepare('SELECT id FROM royal_history_items WHERE title = ?').get(ev.title);
  if (!existing) {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const uid = 'RH-' + (ev.category === 'bangladesh' ? 'BD' : 'WD') + '-1107-' + randomSuffix;
    stmt.run(
      uid, ev.category, ev.event_type, ev.event_year, ev.event_year_display, ev.event_date,
      ev.target_day, ev.target_month, ev.title, ev.summary, ev.description, ev.significance,
      ev.location, ev.reference, ev.tags, ev.priority, 1
    );
    console.log('Inserted:', ev.title);
  } else {
    console.log('Already exists:', ev.title);
  }
}

console.log('7 November events successfully saved.');
