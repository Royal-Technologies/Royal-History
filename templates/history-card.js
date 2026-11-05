/**
 * Royal History — 1080x1080 Historical Multi-Event Card Engine
 * 10 Architectural Frames + 10 Scenic Backgrounds = 20 Layouts × 10 Royal Themes = 200 Unique Styles
 * Brand: Royal History — ইতিহাসের এই দিনে
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.HistoryCardTemplate = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const W = 1080;
  const H = 1080;

  // ═════════════════════════════════════════════════════════════════
  // 1. TEN ROYAL COLOR THEMES (১০টি কালার থিম — হুবহু Royal Noor-এর মতো)
  // ═════════════════════════════════════════════════════════════════
  const THEMES = {
    'royal-emerald': {
      key: 'royal-emerald',
      name: '১. পান্না সবুজ (Royal Emerald)',
      bgGrad: ['#011710', '#05291E', '#093E2F'],
      cardBg: '#042118',
      primaryGold: '#E5C383',
      secondaryGold: '#BF9546',
      accentGold: '#F9ECCE',
      titleColor: '#FFFFFF',
      bodyColor: '#FAF6EE',
      metaColor: '#D8BF89',
      yearColor: '#F9ECCE',
      borderColor: 'rgba(229, 195, 131, 0.45)',
      subtleLine: 'rgba(229, 195, 131, 0.18)',
      badgeBg: 'rgba(229, 195, 131, 0.15)',
      badgeBorder: 'rgba(229, 195, 131, 0.35)',
      badgeText: '#F9ECCE',
      isDark: true
    },
    'midnight-navy': {
      key: 'midnight-navy',
      name: '২. গভীর নীলকান্ত (Midnight Navy)',
      bgGrad: ['#030C1A', '#081A36', '#0E2850'],
      cardBg: '#071830',
      primaryGold: '#EAC875',
      secondaryGold: '#C59E3F',
      accentGold: '#FDF2D4',
      titleColor: '#FFFFFF',
      bodyColor: '#F1F5F9',
      metaColor: '#D4B365',
      yearColor: '#FDF2D4',
      borderColor: 'rgba(234, 200, 117, 0.45)',
      subtleLine: 'rgba(234, 200, 117, 0.18)',
      badgeBg: 'rgba(234, 200, 117, 0.15)',
      badgeBorder: 'rgba(234, 200, 117, 0.35)',
      badgeText: '#FDF2D4',
      isDark: true
    },
    'imperial-black': {
      key: 'imperial-black',
      name: '৩. কাবার গিলাফ ক্ল্যাসিক ব্ল্যাক (Imperial Black)',
      bgGrad: ['#0A0A0C', '#131418', '#1D1E24'],
      cardBg: '#101115',
      primaryGold: '#F0D18A',
      secondaryGold: '#C99E3A',
      accentGold: '#FFF0C7',
      titleColor: '#FFFFFF',
      bodyColor: '#F3F4F6',
      metaColor: '#D8B868',
      yearColor: '#FFF0C7',
      borderColor: 'rgba(240, 209, 138, 0.48)',
      subtleLine: 'rgba(240, 209, 138, 0.18)',
      badgeBg: 'rgba(240, 209, 138, 0.14)',
      badgeBorder: 'rgba(240, 209, 138, 0.35)',
      badgeText: '#FFF0C7',
      isDark: true
    },
    'warm-parchment': {
      key: 'warm-parchment',
      name: '৪. ভিন্টেজ পাণ্ডুলিপি (Warm Parchment)',
      bgGrad: ['#F5E6CA', '#EBD5B3', '#DEC19B'],
      cardBg: '#FAF1DC',
      primaryGold: '#8B5A2B',
      secondaryGold: '#B8860B',
      accentGold: '#663B14',
      titleColor: '#2B1705',
      bodyColor: '#3A200B',
      metaColor: '#6B421E',
      yearColor: '#7C3F00',
      borderColor: 'rgba(139, 90, 43, 0.45)',
      subtleLine: 'rgba(139, 90, 43, 0.20)',
      badgeBg: 'rgba(139, 90, 43, 0.12)',
      badgeBorder: 'rgba(139, 90, 43, 0.35)',
      badgeText: '#4A2800',
      isDark: false
    },
    'royal-maroon': {
      key: 'royal-maroon',
      name: '৫. দামেস্ক ভেলভেট লাল (Royal Maroon)',
      bgGrad: ['#20030A', '#380714', '#500C1F'],
      cardBg: '#28060F',
      primaryGold: '#E6BC77',
      secondaryGold: '#BF9243',
      accentGold: '#FBE4B5',
      titleColor: '#FFFFFF',
      bodyColor: '#FFF1F2',
      metaColor: '#E6BC77',
      yearColor: '#FBE4B5',
      borderColor: 'rgba(230, 188, 119, 0.45)',
      subtleLine: 'rgba(230, 188, 119, 0.18)',
      badgeBg: 'rgba(230, 188, 119, 0.15)',
      badgeBorder: 'rgba(230, 188, 119, 0.35)',
      badgeText: '#FBE4B5',
      isDark: true
    },
    'ottoman-turquoise': {
      key: 'ottoman-turquoise',
      name: '৬. তোপকাপি রাজকীয় ফিরোজা (Ottoman Turquoise)',
      bgGrad: ['#011B1E', '#042D33', '#07434C'],
      cardBg: '#032328',
      primaryGold: '#DFC07B',
      secondaryGold: '#B89745',
      accentGold: '#F8ECC9',
      titleColor: '#FFFFFF',
      bodyColor: '#ECFEFF',
      metaColor: '#DFC07B',
      yearColor: '#F8ECC9',
      borderColor: 'rgba(223, 192, 123, 0.45)',
      subtleLine: 'rgba(223, 192, 123, 0.18)',
      badgeBg: 'rgba(223, 192, 123, 0.15)',
      badgeBorder: 'rgba(223, 192, 123, 0.35)',
      badgeText: '#F8ECC9',
      isDark: true
    },
    'desert-amber': {
      key: 'desert-amber',
      name: '৭. আরব্য মরুভূমি সূর্যাস্ত ও জাফরান স্বর্ণ (Desert Amber)',
      bgGrad: ['#1F1003', '#351C06', '#4C2809'],
      cardBg: '#281504',
      primaryGold: '#EDB568',
      secondaryGold: '#C58C36',
      accentGold: '#FDE1A9',
      titleColor: '#FFFFFF',
      bodyColor: '#FEF9EF',
      metaColor: '#EDB568',
      yearColor: '#FDE1A9',
      borderColor: 'rgba(237, 181, 104, 0.45)',
      subtleLine: 'rgba(237, 181, 104, 0.18)',
      badgeBg: 'rgba(237, 181, 104, 0.15)',
      badgeBorder: 'rgba(237, 181, 104, 0.35)',
      badgeText: '#FDE1A9',
      isDark: true
    },
    'amethyst-violet': {
      key: 'amethyst-violet',
      name: '৮. আত্মিক প্রশান্তিময় বেগুনি (Amethyst Violet)',
      bgGrad: ['#14071F', '#230E36', '#361752'],
      cardBg: '#1B092A',
      primaryGold: '#E4BD77',
      secondaryGold: '#BC9444',
      accentGold: '#FCE7B8',
      titleColor: '#FFFFFF',
      bodyColor: '#FAF5FF',
      metaColor: '#E4BD77',
      yearColor: '#FCE7B8',
      borderColor: 'rgba(228, 189, 119, 0.45)',
      subtleLine: 'rgba(228, 189, 119, 0.18)',
      badgeBg: 'rgba(228, 189, 119, 0.15)',
      badgeBorder: 'rgba(228, 189, 119, 0.35)',
      badgeText: '#FCE7B8',
      isDark: true
    },
    'andalusian-mihrab': {
      key: 'andalusian-mihrab',
      name: '৯. আন্দালুসীয় কর্ডোবা স্থাপত্য (Andalusian Mihrab)',
      bgGrad: ['#160D05', '#29180A', '#3E2410'],
      cardBg: '#211307',
      primaryGold: '#E8BF73',
      secondaryGold: '#BF953F',
      accentGold: '#FCEAB2',
      titleColor: '#FFFFFF',
      bodyColor: '#FBF5EE',
      metaColor: '#E8BF73',
      yearColor: '#FCEAB2',
      borderColor: 'rgba(232, 191, 115, 0.45)',
      subtleLine: 'rgba(232, 191, 115, 0.18)',
      badgeBg: 'rgba(232, 191, 115, 0.15)',
      badgeBorder: 'rgba(232, 191, 115, 0.35)',
      badgeText: '#FCEAB2',
      isDark: true
    },
    'classic-ivory': {
      key: 'classic-ivory',
      name: '১০. শুভ্র আইভরি পেপার ও চারকোল সোনা (Classic Ivory)',
      bgGrad: ['#F8F9FA', '#EDF0F2', '#E2E6EA'],
      cardBg: '#FFFFFF',
      primaryGold: '#334155',
      secondaryGold: '#64748B',
      accentGold: '#0F172A',
      titleColor: '#0F172A',
      bodyColor: '#1E293B',
      metaColor: '#475569',
      yearColor: '#0F172A',
      borderColor: 'rgba(51, 65, 85, 0.35)',
      subtleLine: 'rgba(51, 65, 85, 0.15)',
      badgeBg: 'rgba(51, 65, 85, 0.08)',
      badgeBorder: 'rgba(51, 65, 85, 0.25)',
      badgeText: '#0F172A',
      isDark: false
    }
  };

  // ═════════════════════════════════════════════════════════════════
  // 2. TWENTY DISTINCT LAYOUT ARCHITECTURES (১০টি ফ্রেম + ১০টি সিনিক = ২০টি)
  // ═════════════════════════════════════════════════════════════════
  const LAYOUTS = {
    // 🏛️ ১০টি আর্কিটেকচারাল ফ্রেম (Layouts 1 to 10)
    'mihrab-arch': {
      key: 'mihrab-arch',
      name: '১. মেহরাব আর্চ তোরণ (Mihrab Sanctuary Arch)',
      desc: 'মসজিদ ও ঐতিহাসিক প্রাসাদের মেহরাব খিলান অনুপ্রাণিত স্থাপত্য ফ্রেম'
    },
    'royal-minimal': {
      key: 'royal-minimal',
      name: '২. রাজকীয় মিনিমালিজম (Royal Modern Luxury)',
      desc: 'আধুনিক সূক্ষ্ম গোল্ডেন লাইন ও মিনিমাল আর্কিটেকচার'
    },
    'geometric-mandala': {
      key: 'geometric-mandala',
      name: '৩. জ্যামিতিক রজেট ও মান্ডালা (Sacred Rosette)',
      desc: 'কেন্দ্রীয় ১৬-কোণা জ্যামিতিক রজেট ও নক্ষত্র'
    },
    'illuminated-manuscript': {
      key: 'illuminated-manuscript',
      name: '৪. প্রাচীন পাণ্ডুলিপি ফ্রেম (Illuminated Manuscript)',
      desc: 'ঐতিহাসিক প্রাচীন পাণ্ডুলিপি ও স্বর্ণালী কারতুশ সীমানা'
    },
    'iznik-tiles': {
      key: 'iznik-tiles',
      name: '৫. অটোমান ইজনিক টাইলস (Ottoman Iznik Border)',
      desc: 'অটোমান প্রাসাদ ও ভবনের জ্যামিতিক টাইলস সীমানা'
    },
    'architectural-pillars': {
      key: 'architectural-pillars',
      name: '৬. রাজকীয় স্তম্ভ ও তোরণ (Royal Twin Pillars)',
      desc: 'দুই পাশের মহিমান্বিত স্বর্ণস্তম্ভ ও উপরের রাজতোরণ'
    },
    'celestial-crescent': {
      key: 'celestial-crescent',
      name: '৭. হিলাল ও সেলিস্টিয়াল গ্যালাক্সি (Celestial Crescent)',
      desc: 'উজ্জ্বল স্বর্ণালী অর্ধচন্দ্র ও তারকাময় মহাজাগতিক আবহ'
    },
    'alhambra-palace': {
      key: 'alhambra-palace',
      name: '৮. আন্দালুসীয় আলহামব্রা (Alhambra Arabesque)',
      desc: 'আলহামব্রা প্রাসাদের বহু-খাঁজযুক্ত খিলান ও লতাপাতা'
    },
    'octagram-medallion': {
      key: 'octagram-medallion',
      name: '৯. আটকোণা মেডেলিয়ন (Rub el Hizb Seal)',
      desc: 'আটকোণা চ্যাম্ফার্ড বর্ডার ও ঐতিহাসিক সিল'
    },
    'kiswah-gold-ribbon': {
      key: 'kiswah-gold-ribbon',
      name: '১০. কাবার গিলাফ স্বর্ণসূত্র ফিতা (Kiswah Silk Ribbon)',
      desc: 'কাবার গিলাফের অনুকরণে প্রশস্ত স্বর্ণলতা ফিতা ফ্রেম'
    },

    // 🌄 ১০টি শৈল্পিক ক্যানভাস ও সিনিক ব্যাকগ্রাউন্ড (Layouts 11 to 20)
    'scenic-mountain-twilight': {
      key: 'scenic-mountain-twilight',
      name: '১১. গোধূলি বেলার পাহাড় (Mountain Twilight)',
      desc: 'গোলাপী ও বেগুনি গোধূলি আকাশের নিচে দূর পাহাড়ের স্তরীভূত ছায়া'
    },
    'scenic-kaaba-parchment': {
      key: 'scenic-kaaba-parchment',
      name: '১২. ভিন্টেজ কাবা পাণ্ডুলিপি (Kaaba Vintage Sketch)',
      desc: 'প্রাচীন পাণ্ডুলিপির ওপর পবিত্র কাবা শরীফ ও মিনারের শৈল্পিক স্কেচ'
    },
    'scenic-rehal-quran': {
      key: 'scenic-rehal-quran',
      name: '১৩. কাঠের রেহাল ও গ্রন্থ স্টুডিও (Rehal Studio)',
      desc: 'কাঠের রেহালে উন্মুক্ত প্রাচীন গ্রন্থ ও আধুনিক মিনিমালিস্ট ফ্রেম'
    },
    'scenic-desert-stars': {
      key: 'scenic-desert-stars',
      name: '১৪. তারকাময় মরুভূমি (Desert Dunes & Stars)',
      desc: 'গভীর রাতের তারকাময় আকাশ ও আলোকিত মরু বালিয়াড়ি'
    },
    'scenic-golden-clouds': {
      key: 'scenic-golden-clouds',
      name: '১৫. সোনালী সূর্যাস্ত মেঘমালা (Golden Sunset Clouds)',
      desc: 'গোধূলির সোনালী সূর্যরশ্মি ও মোহময় মেঘমালার আবহ'
    },
    'scenic-mosque-dusk': {
      key: 'scenic-mosque-dusk',
      name: '১৬. গোধূলি মনুমেন্ট ও গম্বুজ (Dome at Dusk)',
      desc: 'গভীর নীল গোধূলি আকাশে মহিমান্বিত গম্বুজ ও মিনারের অবয়ব'
    },
    'scenic-medina-sanctuary': {
      key: 'scenic-medina-sanctuary',
      name: '১৭. শ্যামলিম প্রাঙ্গণ (Emerald Sanctuary)',
      desc: 'শ্যামলিম আবহ, সোনালী নূর ও জ্যামিতিক আভা'
    },
    'scenic-alabaster-gold': {
      key: 'scenic-alabaster-gold',
      name: '১৮. শুভ্র আইভরি ও সোনা (Alabaster Minimal Gold)',
      desc: 'শুভ্র শ্বেতশুভ্র ব্যাকগ্রাউন্ড ও সূক্ষ্ম স্বর্ণালী কারুকাজ'
    },
    'scenic-crimson-horizon': {
      key: 'scenic-crimson-horizon',
      name: '১৯. রক্তিম দামেস্ক দিগন্ত (Crimson Dusk Horizon)',
      desc: 'গোধূলির রক্তিম দিগন্ত ও দূর দিগন্তের ছায়াময় দৃশ্য'
    },
    'scenic-kiswah-night': {
      key: 'scenic-kiswah-night',
      name: '২০. কাবার কালো রেশম (Kiswah Midnight Silk)',
      desc: 'কাবার গিলাফের খাঁটি কালো রেশম ও সোনালী হরফের এমব্রয়ডারি'
    }
  };

  const THEME_KEYS = Object.keys(THEMES);
  const LAYOUT_KEYS = Object.keys(LAYOUTS);

  function toBengaliDigits(num) {
    if (num === null || num === undefined) return '';
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
  }

  function drawRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  }

  function drawIslamicStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    ctx.save();
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawCrescentMoon(ctx, cx, cy, radius, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI / 2, Math.PI / 2, false);
    ctx.arc(cx + radius * 0.45, cy, radius * 0.85, Math.PI / 2, -Math.PI / 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawCornerBrackets(ctx, x, y, w, h, size, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    // Top-Left
    ctx.beginPath(); ctx.moveTo(x, y + size); ctx.lineTo(x, y); ctx.lineTo(x + size, y); ctx.stroke();
    // Top-Right
    ctx.beginPath(); ctx.moveTo(x + w - size, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + size); ctx.stroke();
    // Bottom-Left
    ctx.beginPath(); ctx.moveTo(x, y + h - size); ctx.lineTo(x, y + h); ctx.lineTo(x + size, y + h); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(x + w - size, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - size); ctx.stroke();
    ctx.restore();
  }

  function wrapText(ctx, text, maxWidth) {
    if (!text) return [];
    const words = text.trim().split(/\s+/);
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // ═════════════════════════════════════════════════════════════════
  // 3. SCENIC BACKGROUNDS RENDERER (১০টি ক্যানভাস আর্ট)
  // ═════════════════════════════════════════════════════════════════
  function renderScenicBackground(ctx, layoutKey, cardX, cardY, cardW, cardH) {
    ctx.save();
    drawRoundRect(ctx, cardX, cardY, cardW, cardH, 20);
    ctx.clip();

    switch (layoutKey) {
      // 11. Mountain Twilight
      case 'scenic-mountain-twilight': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#E76F51');
        sky.addColorStop(0.25, '#C7517E');
        sky.addColorStop(0.55, '#56357A');
        sky.addColorStop(0.85, '#1B1A47');
        sky.addColorStop(1, '#0C0C24');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Mountain Ridges
        ctx.fillStyle = 'rgba(40, 24, 75, 0.6)';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH - 140);
        ctx.bezierCurveTo(cardX + 200, cardY + cardH - 260, cardX + 450, cardY + cardH - 160, cardX + 650, cardY + cardH - 240);
        ctx.bezierCurveTo(cardX + 800, cardY + cardH - 290, cardX + 900, cardY + cardH - 180, cardX + cardW, cardY + cardH - 210);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH);
        ctx.fill();

        ctx.fillStyle = 'rgba(24, 15, 48, 0.85)';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH - 80);
        ctx.bezierCurveTo(cardX + 280, cardY + cardH - 170, cardX + 500, cardY + cardH - 100, cardX + 750, cardY + cardH - 180);
        ctx.bezierCurveTo(cardX + 880, cardY + cardH - 220, cardX + 940, cardY + cardH - 130, cardX + cardW, cardY + cardH - 140);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH);
        ctx.fill();

        const vig = ctx.createRadialGradient(W/2, H/2, 100, W/2, H/2, 480);
        vig.addColorStop(0, 'rgba(10, 8, 26, 0.35)');
        vig.addColorStop(1, 'rgba(10, 8, 26, 0.78)');
        ctx.fillStyle = vig;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 12. Kaaba Vintage Parchment
      case 'scenic-kaaba-parchment': {
        const bg = ctx.createRadialGradient(W/2, H/2, 120, W/2, H/2, 540);
        bg.addColorStop(0, '#FAF5EC');
        bg.addColorStop(0.6, '#F2E8D7');
        bg.addColorStop(1, '#E2D1B8');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Kaaba sketch at top
        ctx.save();
        ctx.strokeStyle = 'rgba(109, 76, 39, 0.45)';
        ctx.fillStyle = 'rgba(109, 76, 39, 0.10)';
        ctx.lineWidth = 1.6;
        const kX = W / 2;
        const kY = cardY + 95;
        ctx.beginPath();
        ctx.moveTo(kX, kY + 30); ctx.lineTo(kX - 32, kY + 12); ctx.lineTo(kX - 32, kY - 22); ctx.lineTo(kX, kY - 8); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(kX, kY + 30); ctx.lineTo(kX + 32, kY + 12); ctx.lineTo(kX + 32, kY - 22); ctx.lineTo(kX, kY - 8); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.restore();
        break;
      }

      // 13. Rehal & Manuscript Studio
      case 'scenic-rehal-quran': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#383236');
        bg.addColorStop(0.5, '#252023');
        bg.addColorStop(1, '#151214');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        ctx.save();
        const rX = W / 2;
        const rY = cardY + 95;
        ctx.strokeStyle = '#D4AF37';
        ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rX, rY + 8);
        ctx.bezierCurveTo(rX - 30, rY - 14, rX - 60, rY - 8, rX - 68, rY - 26);
        ctx.lineTo(rX - 68, rY - 48);
        ctx.bezierCurveTo(rX - 60, rY - 32, rX - 30, rY - 36, rX, rY - 16);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rX, rY + 8);
        ctx.bezierCurveTo(rX + 30, rY - 14, rX + 60, rY - 8, rX + 68, rY - 26);
        ctx.lineTo(rX + 68, rY - 48);
        ctx.bezierCurveTo(rX + 60, rY - 32, rX + 30, rY - 36, rX, rY - 16);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
        break;
      }

      // 14. Desert Dunes & Starfield
      case 'scenic-desert-stars': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#060A18');
        sky.addColorStop(0.4, '#0F1838');
        sky.addColorStop(0.7, '#1E234D');
        sky.addColorStop(1, '#0C0A14');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        const stars = [
          [120, 100, 1.8], [240, 140, 1.2], [380, 80, 2.2], [520, 130, 1.4], [700, 95, 2.0], [850, 120, 1.5],
          [180, 220, 1.4], [310, 280, 1.8], [490, 240, 1.2], [660, 270, 2.4], [820, 230, 1.3], [930, 260, 1.9]
        ];
        stars.forEach(([sx, sy, sr]) => {
          ctx.beginPath();
          ctx.arc(cardX + sx * (cardW / 1000), cardY + sy * (cardH / 1000), sr, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        // Dunes
        ctx.fillStyle = 'rgba(212, 175, 55, 0.25)';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH);
        ctx.bezierCurveTo(cardX + 250, cardY + cardH - 90, cardX + 600, cardY + cardH - 30, cardX + cardW, cardY + cardH - 70);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.fill();
        break;
      }

      // 15. Golden Sunset Clouds
      case 'scenic-golden-clouds': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#781D29');
        sky.addColorStop(0.3, '#B84A39');
        sky.addColorStop(0.6, '#D97706');
        sky.addColorStop(0.85, '#451A03');
        sky.addColorStop(1, '#1C0A04');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        const vig = ctx.createRadialGradient(W/2, H/2, 80, W/2, H/2, 480);
        vig.addColorStop(0, 'rgba(20, 8, 10, 0.35)');
        vig.addColorStop(1, 'rgba(20, 8, 10, 0.80)');
        ctx.fillStyle = vig;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 16. Mosque Dome at Dusk
      case 'scenic-mosque-dusk': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#0A1128');
        sky.addColorStop(0.4, '#1C2541');
        sky.addColorStop(0.7, '#3A506B');
        sky.addColorStop(1, '#0B132B');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Silhouette of Mosque Dome
        ctx.save();
        ctx.fillStyle = '#060B18';
        const mX = W / 2;
        const mY = cardY + cardH;
        ctx.beginPath();
        ctx.arc(mX, mY - 40, 110, Math.PI, 0);
        ctx.lineTo(mX + 110, mY);
        ctx.lineTo(mX - 110, mY);
        ctx.fill();
        drawCrescentMoon(ctx, cardX + 130, cardY + 120, 18, '#F5D77F');
        ctx.restore();
        break;
      }

      // 17. Medina Emerald Sanctuary
      case 'scenic-medina-sanctuary': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#011F16');
        bg.addColorStop(0.5, '#053E2C');
        bg.addColorStop(1, '#021811');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        const halo = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 450);
        halo.addColorStop(0, 'rgba(46, 213, 115, 0.12)');
        halo.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
        halo.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
        ctx.fillStyle = halo;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 18. Alabaster Minimal Gold
      case 'scenic-alabaster-gold': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#FFFFFF');
        bg.addColorStop(0.5, '#F8FAFC');
        bg.addColorStop(1, '#F1F5F9');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 19. Crimson Dusk Horizon
      case 'scenic-crimson-horizon': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#38060E');
        bg.addColorStop(0.4, '#7F1D1D');
        bg.addColorStop(0.7, '#991B1B');
        bg.addColorStop(0.9, '#450A0A');
        bg.addColorStop(1, '#1A0407');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 20. Kiswah Midnight Silk
      case 'scenic-kiswah-night': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#07080A');
        bg.addColorStop(0.5, '#12141A');
        bg.addColorStop(1, '#08090C');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        ctx.save();
        const bandY = cardY + 110;
        const bandH = 40;
        ctx.fillStyle = 'rgba(212, 175, 55, 0.16)';
        ctx.fillRect(cardX + 24, bandY, cardW - 48, bandH);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2;
        ctx.strokeRect(cardX + 24, bandY, cardW - 48, bandH);
        ctx.restore();
        break;
      }
    }

    ctx.restore();
  }

  // ═════════════════════════════════════════════════════════════════
  // 4. ARCHITECTURAL FRAMES RENDERER (১০টি জ্যামিতিক আর্কিটেকচার)
  // ═════════════════════════════════════════════════════════════════
  function renderLayoutFrame(ctx, layoutKey, theme, cardX, cardY, cardW, cardH) {
    ctx.save();

    // Scenic Photo Frames
    if (layoutKey.startsWith('scenic-')) {
      if (layoutKey === 'scenic-kaaba-parchment' || layoutKey === 'scenic-alabaster-gold') {
        ctx.strokeStyle = layoutKey === 'scenic-alabaster-gold' ? 'rgba(212, 175, 55, 0.65)' : 'rgba(109, 76, 39, 0.45)';
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();
        drawRoundRect(ctx, cardX + 22, cardY + 22, cardW - 44, cardH - 44, 12);
        ctx.stroke();
        drawCornerBrackets(ctx, cardX + 28, cardY + 28, cardW - 56, cardH - 56, 26, '#D4AF37');
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
        ctx.lineWidth = 1.4;
        ctx.strokeRect(cardX + 20, cardY + 20, cardW - 40, cardH - 40);
        drawCornerBrackets(ctx, cardX + 20, cardY + 20, cardW - 40, cardH - 40, 22, 'rgba(255, 255, 255, 0.75)');
      }
      ctx.restore();
      return;
    }

    switch (layoutKey) {
      // 1. মেহরাব আর্চ
      case 'mihrab-arch': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        const archL = cardX + 75;
        const archR = cardX + cardW - 75;
        const archBase = cardY + 260;
        const archApex = cardY + 45;
        ctx.beginPath();
        ctx.moveTo(archL, archBase);
        ctx.lineTo(archL, cardY + 140);
        ctx.bezierCurveTo(archL - 10, archApex + 20, W / 2 - 60, archApex - 12, W / 2, archApex - 12);
        ctx.bezierCurveTo(W / 2 + 60, archApex - 12, archR + 10, archApex + 20, archR, cardY + 140);
        ctx.lineTo(archR, archBase);
        ctx.stroke();

        drawIslamicStar(ctx, W / 2, archApex - 12, 8, 8, 4, theme.primaryGold);
        drawCornerBrackets(ctx, cardX + 28, cardY + 28, cardW - 56, cardH - 56, 32, theme.primaryGold);
        break;
      }

      // 2. রাজকীয় মিনিমাল
      case 'royal-minimal': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1.8;
        ctx.strokeRect(cardX + 20, cardY + 20, cardW - 40, cardH - 40);

        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1;
        ctx.strokeRect(cardX + 28, cardY + 28, cardW - 56, cardH - 56);

        ctx.fillStyle = theme.primaryGold;
        ctx.fillRect(cardX + 20, cardY + cardH / 2 - 40, 3, 80);
        ctx.fillRect(cardX + cardW - 23, cardY + cardH / 2 - 40, 3, 80);
        break;
      }

      // 3. রজেট ও মান্ডালা
      case 'geometric-mandala': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        ctx.save();
        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1.2;
        for (let angle = 0; angle < Math.PI; angle += Math.PI / 8) {
          ctx.beginPath();
          ctx.ellipse(W / 2, cardY + 68, 54, 18, angle, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
        drawIslamicStar(ctx, W / 2, cardY + 68, 8, 10, 5, theme.primaryGold);
        drawCornerBrackets(ctx, cardX + 28, cardY + 28, cardW - 56, cardH - 56, 34, theme.primaryGold);
        break;
      }

      // 4. মদিনা পাণ্ডুলিপি
      case 'illuminated-manuscript': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2.5;
        drawRoundRect(ctx, cardX + 14, cardY + 14, cardW - 28, cardH - 28, 14);
        ctx.stroke();

        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1.2;
        drawRoundRect(ctx, cardX + 22, cardY + 22, cardW - 44, cardH - 44, 10);
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 28, cardY + 28, cardW - 56, cardH - 56, 30, theme.primaryGold);
        break;
      }

      // 5. অটোমান ইজনিক টাইলস
      case 'iznik-tiles': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(cardX + 20, cardY + 20, cardW - 40, cardH - 40);

        const step = 48;
        ctx.fillStyle = theme.subtleLine;
        for (let x = cardX + 32; x < cardX + cardW - 32; x += step) {
          ctx.beginPath();
          ctx.arc(x, cardY + 20, 3, 0, Math.PI * 2);
          ctx.arc(x, cardY + cardH - 20, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      // 6. রাজকীয় স্তম্ভ
      case 'architectural-pillars': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        // Left pillar
        ctx.strokeStyle = theme.subtleLine;
        ctx.strokeRect(cardX + 26, cardY + 80, 14, cardH - 160);
        // Right pillar
        ctx.strokeRect(cardX + cardW - 40, cardY + 80, 14, cardH - 160);
        break;
      }

      // 7. হিলাল ও গ্যালাক্সি
      case 'celestial-crescent': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        drawCrescentMoon(ctx, cardX + cardW - 80, cardY + 80, 18, theme.primaryGold);
        break;
      }

      // 8. আন্দালুসীয় আলহামব্রা
      case 'alhambra-palace': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2.2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 26, cardY + 26, cardW - 52, cardH - 52, 38, theme.primaryGold);
        break;
      }

      // 9. আটকোণা সিল
      case 'octagram-medallion': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        const chamf = 36;
        ctx.beginPath();
        ctx.moveTo(cardX + chamf, cardY + 16);
        ctx.lineTo(cardX + cardW - chamf, cardY + 16);
        ctx.lineTo(cardX + cardW - 16, cardY + chamf);
        ctx.lineTo(cardX + cardW - 16, cardY + cardH - chamf);
        ctx.lineTo(cardX + cardW - chamf, cardY + cardH - 16);
        ctx.lineTo(cardX + chamf, cardY + cardH - 16);
        ctx.lineTo(cardX + 16, cardY + cardH - chamf);
        ctx.lineTo(cardX + 16, cardY + chamf);
        ctx.closePath();
        ctx.stroke();
        break;
      }

      // 10. কাবার গিলাফ স্বর্ণলতা ফিতা
      case 'kiswah-gold-ribbon':
      default: {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2.5;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1;
        drawRoundRect(ctx, cardX + 24, cardY + 24, cardW - 48, cardH - 48, 12);
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 32, theme.primaryGold);
        break;
      }
    }

    ctx.restore();
  }

  // ═════════════════════════════════════════════════════════════════
  // 5. MAIN CARD RENDERING FUNCTION (20 LAYOUTS × 10 THEMES)
  // ═════════════════════════════════════════════════════════════════
  function renderCard(canvas, data, options) {
    options = options || {};
    const layoutKey = options.layout || (data && data.layout) || 'kiswah-gold-ribbon';
    const themeKey = options.theme || (data && data.theme) || 'royal-emerald';

    let theme = THEMES[themeKey] || THEMES['royal-emerald'];

    // Special font contrast overrides for scenic light layouts
    if (layoutKey === 'scenic-kaaba-parchment') {
      theme = Object.assign({}, theme, {
        titleColor: '#2B1705',
        bodyColor: '#3A200B',
        metaColor: '#6B421E',
        yearColor: '#7C3F00',
        badgeBg: 'rgba(109, 76, 39, 0.12)',
        badgeBorder: 'rgba(109, 76, 39, 0.35)',
        badgeText: '#4A2800',
        isDark: false
      });
    } else if (layoutKey === 'scenic-alabaster-gold') {
      theme = Object.assign({}, theme, {
        titleColor: '#0F172A',
        bodyColor: '#1E293B',
        metaColor: '#047857',
        yearColor: '#B45309',
        badgeBg: 'rgba(217, 119, 6, 0.12)',
        badgeBorder: 'rgba(217, 119, 6, 0.35)',
        badgeText: '#92400E',
        isDark: false
      });
    } else if (layoutKey.startsWith('scenic-')) {
      theme = Object.assign({}, theme, {
        titleColor: '#FFFFFF',
        bodyColor: '#F8FAFC',
        metaColor: '#FDE68A',
        yearColor: '#FFFBEB',
        badgeBg: 'rgba(255, 255, 255, 0.16)',
        badgeBorder: 'rgba(255, 255, 255, 0.35)',
        badgeText: '#FFFBEB',
        isDark: true
      });
    }

    const ctx = canvas.getContext('2d');

    // Normalize events
    let events = [];
    if (Array.isArray(data)) {
      events = data;
    } else if (data && Array.isArray(data.events)) {
      events = data.events;
    } else if (data) {
      events = [data];
    }
    events = events.slice(0, 3);

    let dateTitle = 'ইতিহাসের এই দিনে';
    if (options.dateText) dateTitle = options.dateText;
    else if (data && data.dateText) dateTitle = data.dateText;
    else if (events.length > 0 && events[0].event_date) dateTitle = events[0].event_date;

    // 1. Canvas Outer Background
    ctx.clearRect(0, 0, W, H);
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, theme.bgGrad[0]);
    bgGrad.addColorStop(0.5, theme.bgGrad[1]);
    bgGrad.addColorStop(1, theme.bgGrad[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Main Card Bounds & Shadow
    const cardX = 44;
    const cardY = 44;
    const cardW = W - 88;
    const cardH = H - 88;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 15;

    ctx.fillStyle = theme.cardBg;
    drawRoundRect(ctx, cardX, cardY, cardW, cardH, 20);
    ctx.fill();
    ctx.restore();

    // 3. Render Scenic Background (if scenic layout 11-20)
    if (layoutKey.startsWith('scenic-')) {
      renderScenicBackground(ctx, layoutKey, cardX, cardY, cardW, cardH);
    }

    // 4. Render Architectural Frame (Layouts 1 to 20)
    renderLayoutFrame(ctx, layoutKey, theme, cardX, cardY, cardW, cardH);

    // ═════════════════════════════════════════════════════════════════
    // 5. TOP BRANDING & DATE HERO HEADER
    // ═════════════════════════════════════════════════════════════════
    const headerCenterY = cardY + 70;

    drawIslamicStar(ctx, W / 2, headerCenterY - 14, 8, 7, 3.5, theme.primaryGold);

    ctx.save();
    ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.primaryGold;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText('ROYAL HISTORY ✦ ইতিহাসের এই দিনে', W / 2, headerCenterY + 16);
    ctx.restore();

    // Date Hero Plaque Banner
    const dateBannerY = headerCenterY + 68;
    const dateHeroText = `📅 ${dateTitle} — ইতিহাসের পাতায় আজকের দিন`;

    ctx.save();
    ctx.font = 'bold 32px "Hind Siliguri", sans-serif';
    const dateMetrics = ctx.measureText(dateHeroText);
    const dateBoxW = Math.min(dateMetrics.width + 60, cardW - 120);
    const dateBoxH = 54;

    ctx.fillStyle = theme.badgeBg;
    ctx.strokeStyle = theme.primaryGold;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(W / 2 - dateBoxW / 2, dateBannerY - dateBoxH / 2, dateBoxW, dateBoxH, 27);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.titleColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dateHeroText, W / 2, dateBannerY + 2);
    ctx.restore();

    // ═════════════════════════════════════════════════════════════════
    // 6. RENDER MULTIPLE EVENTS (২ থেকে ৩টি ঐতিহাসিক ঘটনা)
    // ═════════════════════════════════════════════════════════════════
    const contentTopY = dateBannerY + 45;
    const contentBottomY = cardY + cardH - 55;
    const totalAvailH = contentBottomY - contentTopY;
    const numEvents = Math.max(events.length, 1);
    const slotH = totalAvailH / numEvents;
    const contentMaxW = cardW - 100;

    events.forEach((ev, idx) => {
      const slotY = contentTopY + (idx * slotH);
      const isLast = (idx === numEvents - 1);

      let catLabel = '📜 ইতিহাসের এই দিনে';
      if (ev.category === 'bangladesh') catLabel = '🇧🇩 বাংলাদেশ';
      else if (ev.category === 'world') catLabel = '🌍 বিশ্ব';

      let typeLabel = 'ঐতিহাসিক ঘটনা';
      if (ev.event_type === 'birth') typeLabel = '🎂 জন্মবার্ষিকী';
      else if (ev.event_type === 'demise') typeLabel = '🕊️ প্রয়াণ';
      else if (ev.event_type === 'discovery') typeLabel = '🔬 আবিষ্কার';
      else if (ev.event_type === 'milestone') typeLabel = '🚩 মাইলফলক';
      else if (ev.event_type === 'treaty') typeLabel = '📜 চুক্তি';

      const yearBn = toBengaliDigits(ev.event_year);
      const yearPillText = ev.event_year_display || `${yearBn} খ্রিস্টাব্দ`;

      // Year Pill + Category Tag
      const badgeY = slotY + 22;
      ctx.save();
      ctx.font = 'bold 16px "Hind Siliguri", sans-serif';

      const yrMetrics = ctx.measureText(yearPillText);
      const yrW = yrMetrics.width + 24;
      const yrH = 28;
      const startX = W / 2 - (contentMaxW / 2);

      ctx.fillStyle = theme.badgeBg;
      ctx.strokeStyle = theme.primaryGold;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(startX, badgeY - yrH / 2, yrW, yrH, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = theme.yearColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(yearPillText, startX + yrW / 2, badgeY + 1);

      ctx.font = '600 15px "Hind Siliguri", sans-serif';
      ctx.fillStyle = theme.metaColor;
      ctx.textAlign = 'left';
      ctx.fillText(`•   ${catLabel}   •   ${typeLabel}`, startX + yrW + 14, badgeY + 1);
      ctx.restore();

      // Title
      const titleY = badgeY + 34;
      const titleFontSize = (numEvents === 1) ? 32 : (numEvents === 2 ? 28 : 24);
      ctx.save();
      ctx.font = `bold ${titleFontSize}px "Hind Siliguri", sans-serif`;
      ctx.fillStyle = theme.titleColor;
      ctx.textAlign = 'left';

      const titleLines = wrapText(ctx, ev.title || 'ঐতিহাসিক অধ্যায়', contentMaxW);
      const titleLineH = titleFontSize * 1.35;
      const maxTitleLines = (numEvents >= 3) ? 1 : 2;

      for (let t = 0; t < Math.min(titleLines.length, maxTitleLines); t++) {
        let line = titleLines[t];
        if (t === maxTitleLines - 1 && titleLines.length > maxTitleLines) line += '...';
        ctx.fillText(line, startX, titleY + (t * titleLineH));
      }
      ctx.restore();

      // Summary
      const titleRenderedH = Math.min(titleLines.length, maxTitleLines) * titleLineH;
      const summaryY = titleY + titleRenderedH + 16;
      const summaryFontSize = (numEvents === 1) ? 22 : (numEvents === 2 ? 19 : 17);

      ctx.save();
      ctx.font = `500 ${summaryFontSize}px "Hind Siliguri", sans-serif`;
      ctx.fillStyle = theme.bodyColor;
      ctx.textAlign = 'left';

      const summaryText = ev.summary || ev.description || '';
      const summaryLines = wrapText(ctx, `“${summaryText}”`, contentMaxW);
      const summaryLineH = summaryFontSize * 1.48;
      const maxSummaryLines = (numEvents === 1) ? 4 : (numEvents === 2 ? 3 : 2);

      for (let s = 0; s < Math.min(summaryLines.length, maxSummaryLines); s++) {
        let line = summaryLines[s];
        if (s === maxSummaryLines - 1 && summaryLines.length > maxSummaryLines) line += '...”';
        ctx.fillText(line, startX, summaryY + (s * summaryLineH));
      }
      ctx.restore();

      // Divider Between Events
      if (!isLast) {
        const divY = slotY + slotH - 12;
        ctx.save();
        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 220, divY);
        ctx.lineTo(W / 2 + 220, divY);
        ctx.stroke();

        ctx.fillStyle = theme.primaryGold;
        ctx.beginPath();
        ctx.arc(W / 2, divY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    // ═════════════════════════════════════════════════════════════════
    // 7. FOOTER (Source & Royal Technologies Brand Watermark)
    // ═════════════════════════════════════════════════════════════════
    const footerY = cardY + cardH - 32;

    ctx.save();
    ctx.font = '15px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'left';
    ctx.fillText('তথ্যসূত্র: রয়েল হিস্ট্রি আর্কাইভ ও জাতীয় মহাফেজখানা', cardX + 44, footerY);

    ctx.textAlign = 'right';
    ctx.fillStyle = theme.primaryGold;
    ctx.font = 'bold 16px "Hind Siliguri", sans-serif';
    ctx.fillText('Royal Technologies ✦ www.royaltechbd.com', cardX + cardW - 44, footerY);
    ctx.restore();
  }

  return {
    THEMES,
    LAYOUTS,
    THEME_KEYS,
    LAYOUT_KEYS,
    toBengaliDigits,
    renderCard,
    wrapText,
    drawIslamicStar,
    drawCrescentMoon,
    drawCornerBrackets
  };
});
