/**
 * Royal History — 1080x1080 Historical Multi-Event Card Engine
 * Supports Multiple Events per Day with Date as the Hero Header
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
  // 1. TEN HISTORICAL COLOR PALETTES (১০টি প্রিমিয়াম থিম)
  // ═════════════════════════════════════════════════════════════════
  const THEMES = {
    'vintage-parchment': {
      key: 'vintage-parchment',
      name: 'প্রাচীন পাণ্ডুলিপি (Vintage Parchment)',
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
    'independence-emerald': {
      key: 'independence-emerald',
      name: 'স্বাধীনতা ও ঐতিহ্য (Independence Emerald)',
      bgGrad: ['#012014', '#043423', '#084832'],
      cardBg: '#032619',
      primaryGold: '#E5C383',
      secondaryGold: '#BF9546',
      accentGold: '#E63946',
      titleColor: '#FFFFFF',
      bodyColor: '#F4F9F5',
      metaColor: '#E5C383',
      yearColor: '#FBE9B8',
      borderColor: 'rgba(229, 195, 131, 0.45)',
      subtleLine: 'rgba(229, 195, 131, 0.20)',
      badgeBg: 'rgba(229, 195, 131, 0.15)',
      badgeBorder: 'rgba(229, 195, 131, 0.35)',
      badgeText: '#FBE9B8',
      isDark: true
    },
    'archival-gold': {
      key: 'archival-gold',
      name: 'রাজকীয় মহাফেজখানা (Archival Gold)',
      bgGrad: ['#0A0E17', '#121824', '#1A2332'],
      cardBg: '#0F1520',
      primaryGold: '#F3CF7A',
      secondaryGold: '#CFA244',
      accentGold: '#FFE5A3',
      titleColor: '#FFFFFF',
      bodyColor: '#EDF2F7',
      metaColor: '#F3CF7A',
      yearColor: '#FBD38D',
      borderColor: 'rgba(243, 207, 122, 0.45)',
      subtleLine: 'rgba(243, 207, 122, 0.20)',
      badgeBg: 'rgba(243, 207, 122, 0.14)',
      badgeBorder: 'rgba(243, 207, 122, 0.35)',
      badgeText: '#FFE5A3',
      isDark: true
    },
    'imperial-maroon': {
      key: 'imperial-maroon',
      name: 'ঐতিহাসিক রক্তিম আভা (Imperial Maroon)',
      bgGrad: ['#23050C', '#3B0A15', '#4E101F'],
      cardBg: '#2A070F',
      primaryGold: '#E2B872',
      secondaryGold: '#BE9347',
      accentGold: '#F8DFAD',
      titleColor: '#FFFFFF',
      bodyColor: '#FFF1F2',
      metaColor: '#E2B872',
      yearColor: '#F8DFAD',
      borderColor: 'rgba(226, 184, 114, 0.45)',
      subtleLine: 'rgba(226, 184, 114, 0.20)',
      badgeBg: 'rgba(226, 184, 114, 0.15)',
      badgeBorder: 'rgba(226, 184, 114, 0.35)',
      badgeText: '#F8DFAD',
      isDark: true
    },
    'midnight-charcoal': {
      key: 'midnight-charcoal',
      name: 'ক্ল্যাসিক গ্রাফাইট (Midnight Charcoal)',
      bgGrad: ['#121316', '#1A1C21', '#24272E'],
      cardBg: '#16181D',
      primaryGold: '#D4AF37',
      secondaryGold: '#AA8825',
      accentGold: '#F4DE90',
      titleColor: '#FFFFFF',
      bodyColor: '#E2E8F0',
      metaColor: '#D4AF37',
      yearColor: '#F4DE90',
      borderColor: 'rgba(212, 175, 55, 0.40)',
      subtleLine: 'rgba(212, 175, 55, 0.18)',
      badgeBg: 'rgba(212, 175, 55, 0.14)',
      badgeBorder: 'rgba(212, 175, 55, 0.32)',
      badgeText: '#F4DE90',
      isDark: true
    },
    'antique-bronze': {
      key: 'antique-bronze',
      name: 'অ্যান্টিক ব্রোঞ্জ (Antique Bronze)',
      bgGrad: ['#221307', '#38200E', '#4E2F17'],
      cardBg: '#2B180B',
      primaryGold: '#DEAB68',
      secondaryGold: '#B8823E',
      accentGold: '#F8D8A7',
      titleColor: '#FFFFFF',
      bodyColor: '#FBF5EE',
      metaColor: '#DEAB68',
      yearColor: '#F8D8A7',
      borderColor: 'rgba(222, 171, 104, 0.45)',
      subtleLine: 'rgba(222, 171, 104, 0.20)',
      badgeBg: 'rgba(222, 171, 104, 0.15)',
      badgeBorder: 'rgba(222, 171, 104, 0.35)',
      badgeText: '#F8D8A7',
      isDark: true
    },
    'sapphire-epoch': {
      key: 'sapphire-epoch',
      name: 'নীলকান্ত ইতিহাস (Sapphire Epoch)',
      bgGrad: ['#031024', '#071F42', '#0C2D5C'],
      cardBg: '#051833',
      primaryGold: '#60A5FA',
      secondaryGold: '#3B82F6',
      accentGold: '#93C5FD',
      titleColor: '#FFFFFF',
      bodyColor: '#EFF6FF',
      metaColor: '#93C5FD',
      yearColor: '#BFDBFE',
      borderColor: 'rgba(96, 165, 250, 0.40)',
      subtleLine: 'rgba(96, 165, 250, 0.18)',
      badgeBg: 'rgba(96, 165, 250, 0.14)',
      badgeBorder: 'rgba(96, 165, 250, 0.35)',
      badgeText: '#BFDBFE',
      isDark: true
    },
    'terracotta-heritage': {
      key: 'terracotta-heritage',
      name: 'টেরাকোটা ও প্রত্নতত্ত্ব (Terracotta Heritage)',
      bgGrad: ['#2E1005', '#481B0B', '#602613'],
      cardBg: '#391508',
      primaryGold: '#F59E0B',
      secondaryGold: '#D97706',
      accentGold: '#FDE68A',
      titleColor: '#FFFFFF',
      bodyColor: '#FFFBEB',
      metaColor: '#F59E0B',
      yearColor: '#FDE68A',
      borderColor: 'rgba(245, 158, 11, 0.42)',
      subtleLine: 'rgba(245, 158, 11, 0.18)',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.35)',
      badgeText: '#FDE68A',
      isDark: true
    },
    'desert-monument': {
      key: 'desert-monument',
      name: 'মরুভূমির প্রাচীন ভাস্কর্য (Desert Monument)',
      bgGrad: ['#1C1004', '#321D09', '#462A10'],
      cardBg: '#261607',
      primaryGold: '#E6A23C',
      secondaryGold: '#C07E23',
      accentGold: '#F7D08A',
      titleColor: '#FFFFFF',
      bodyColor: '#FEF9EF',
      metaColor: '#E6A23C',
      yearColor: '#F7D08A',
      borderColor: 'rgba(230, 162, 60, 0.42)',
      subtleLine: 'rgba(230, 162, 60, 0.18)',
      badgeBg: 'rgba(230, 162, 60, 0.15)',
      badgeBorder: 'rgba(230, 162, 60, 0.35)',
      badgeText: '#F7D08A',
      isDark: true
    },
    'classic-ivory': {
      key: 'classic-ivory',
      name: 'শুভ্র আইভরি আর্কাইভ (Classic Ivory)',
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

  function toBengaliDigits(num) {
    if (num === null || num === undefined) return '';
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
  }

  function drawVintageCorner(ctx, x, y, size, color, flipX = 1, flipY = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flipX, flipY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(0, size);
    ctx.lineTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.moveTo(8, size - 8);
    ctx.lineTo(8, 8);
    ctx.lineTo(size - 8, 8);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(14, 14, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawCompassRose(ctx, cx, cy, radius, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    const points = 4;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = (i % 2 === 0) ? radius * 1.35 : radius * 0.35;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

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
  // 2. MAIN CARD RENDERING FUNCTION (MULTIPLE EVENTS SUPPORT)
  // ═════════════════════════════════════════════════════════════════

  function renderCard(canvas, data, options) {
    options = options || {};
    const themeKey = options.theme || (data && data.theme) || 'archival-gold';
    const theme = THEMES[themeKey] || THEMES['archival-gold'];
    const ctx = canvas.getContext('2d');

    // Normalize events array: supports array, data.events, or single item
    let events = [];
    if (Array.isArray(data)) {
      events = data;
    } else if (data && Array.isArray(data.events)) {
      events = data.events;
    } else if (data) {
      events = [data];
    }

    // Limit to max 3 events for visual balance and elegance
    events = events.slice(0, 3);

    // Determine common date
    let dateTitle = 'ইতিহাসের এই দিনে';
    if (options.dateText) {
      dateTitle = options.dateText;
    } else if (data && data.dateText) {
      dateTitle = data.dateText;
    } else if (events.length > 0 && events[0].event_date) {
      dateTitle = events[0].event_date;
    }

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
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 20);
    ctx.fill();
    ctx.restore();

    // 3. Delicate Double Borders
    ctx.save();
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(cardX + 16, cardY + 16, cardW - 32, cardH - 32);

    ctx.strokeStyle = theme.subtleLine;
    ctx.lineWidth = 1;
    ctx.strokeRect(cardX + 24, cardY + 24, cardW - 48, cardH - 48);
    ctx.restore();

    // 4. Vintage Ornate Corners
    const cornerSize = 38;
    drawVintageCorner(ctx, cardX + 30, cardY + 30, cornerSize, theme.primaryGold, 1, 1);
    drawVintageCorner(ctx, cardX + cardW - 30, cardY + 30, cornerSize, theme.primaryGold, -1, 1);
    drawVintageCorner(ctx, cardX + 30, cardY + cardH - 30, cornerSize, theme.primaryGold, 1, -1);
    drawVintageCorner(ctx, cardX + cardW - 30, cardY + cardH - 30, cornerSize, theme.primaryGold, -1, -1);

    // ═════════════════════════════════════════════════════════════════
    // 5. TOP BRANDING & DATE HERO HEADER
    // ═════════════════════════════════════════════════════════════════
    const headerCenterY = cardY + 70;
    
    // Top Brand Subtitle
    drawCompassRose(ctx, W / 2, headerCenterY - 14, 11, theme.primaryGold);

    ctx.save();
    ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.primaryGold;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText('ROYAL HISTORY ✦ ইতিহাসের এই দিনে', W / 2, headerCenterY + 16);
    ctx.restore();

    // Date Hero Plaque Banner (NOT a single giant year)
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

      // Category & Type label
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

      // ── Event Badge Row (Pill with Year + Category + Type) ──
      const badgeY = slotY + 22;
      ctx.save();
      ctx.font = 'bold 16px "Hind Siliguri", sans-serif';
      
      // Year Pill (Neat and balanced, NOT giant)
      const yrMetrics = ctx.measureText(yearPillText);
      const yrW = yrMetrics.width + 24;
      const yrH = 28;
      const startX = W / 2 - (contentMaxW / 2);

      ctx.fillStyle = theme.isDark ? 'rgba(212, 175, 55, 0.22)' : 'rgba(139, 90, 43, 0.16)';
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

      // Category & Type Tag next to Year Pill
      ctx.font = '600 15px "Hind Siliguri", sans-serif';
      ctx.fillStyle = theme.metaColor;
      ctx.textAlign = 'left';
      ctx.fillText(`•   ${catLabel}   •   ${typeLabel}`, startX + yrW + 14, badgeY + 1);
      ctx.restore();

      // ── Event Title ──
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
        if (t === maxTitleLines - 1 && titleLines.length > maxTitleLines) {
          line += '...';
        }
        ctx.fillText(line, startX, titleY + (t * titleLineH));
      }
      ctx.restore();

      // ── Event Summary / Quote ──
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
        if (s === maxSummaryLines - 1 && summaryLines.length > maxSummaryLines) {
          line += '...”';
        }
        ctx.fillText(line, startX, summaryY + (s * summaryLineH));
      }
      ctx.restore();

      // ── Ornate Divider Between Events ──
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

    // Reference (Left)
    ctx.save();
    ctx.font = '15px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'left';
    ctx.fillText('তথ্যসূত্র: রয়েল হিস্ট্রি আর্কাইভ ও জাতীয় মহাফেজখানা', cardX + 44, footerY);

    // Credits (Right) - Prominent Royal Technologies
    ctx.textAlign = 'right';
    ctx.fillStyle = theme.primaryGold;
    ctx.font = 'bold 16px "Hind Siliguri", sans-serif';
    ctx.fillText('Royal Technologies ✦ www.royaltechbd.com', cardX + cardW - 44, footerY);
    ctx.restore();
  }

  return {
    THEMES,
    THEME_KEYS: Object.keys(THEMES),
    toBengaliDigits,
    renderCard,
    wrapText,
    drawVintageCorner,
    drawCompassRose
  };
});
