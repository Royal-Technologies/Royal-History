/**
 * Royal History — 1080x1080 Historical Card Engine
 * 10 Distinct Themes × Dynamic Archival Architectures
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
      accentGold: '#E63946', // Red accent representing freedom
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

  // Convert numbers to Bengali digits
  function toBengaliDigits(num) {
    if (num === null || num === undefined) return '';
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
  }

  // ═════════════════════════════════════════════════════════════════
  // 2. VECTOR ORNAMENTS & HISTORICAL EMBLEMS
  // ═════════════════════════════════════════════════════════════════

  function drawVintageCorner(ctx, x, y, size, color, flipX = 1, flipY = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flipX, flipY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;

    // Corner bracket
    ctx.beginPath();
    ctx.moveTo(0, size);
    ctx.lineTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    // Inner filigree curve
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.moveTo(8, size - 8);
    ctx.lineTo(8, 8);
    ctx.lineTo(size - 8, 8);
    ctx.stroke();

    // Corner dot
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(14, 14, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawLaurelBranch(ctx, cx, cy, width, height, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;

    // Arc stem
    ctx.beginPath();
    ctx.arc(cx - width / 2, cy, height / 2, -Math.PI / 3, Math.PI / 3);
    ctx.stroke();

    // Small leaves along the arc
    for (let a = -Math.PI / 3; a <= Math.PI / 3; a += Math.PI / 6) {
      const lx = cx - width / 2 + (height / 2) * Math.cos(a);
      const ly = cy + (height / 2) * Math.sin(a);
      ctx.beginPath();
      ctx.ellipse(lx, ly, 7, 3, a + Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Right arc stem
    ctx.beginPath();
    ctx.arc(cx + width / 2, cy, height / 2, Math.PI * 2 / 3, Math.PI * 4 / 3);
    ctx.stroke();

    for (let a = Math.PI * 2 / 3; a <= Math.PI * 4 / 3; a += Math.PI / 6) {
      const lx = cx + width / 2 + (height / 2) * Math.cos(a);
      const ly = cy + (height / 2) * Math.sin(a);
      ctx.beginPath();
      ctx.ellipse(lx, ly, 7, 3, a - Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }

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

    // 4 sharp star points
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

    // Central core
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }

  function drawParchmentRibbon(ctx, cx, cy, width, height, theme) {
    ctx.save();
    const halfW = width / 2;
    const halfH = height / 2;

    // Background banner
    ctx.fillStyle = theme.isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.65)';
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(cx - halfW, cy - halfH);
    ctx.lineTo(cx + halfW, cy - halfH);
    ctx.lineTo(cx + halfW + 12, cy);
    ctx.lineTo(cx + halfW, cy + halfH);
    ctx.lineTo(cx - halfW, cy + halfH);
    ctx.lineTo(cx - halfW - 12, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

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
  // 3. MAIN CARD RENDERING FUNCTION
  // ═════════════════════════════════════════════════════════════════

  function renderCard(canvas, item, options) {
    options = options || {};
    const themeKey = options.theme || item.theme || 'archival-gold';
    const theme = THEMES[themeKey] || THEMES['archival-gold'];
    const ctx = canvas.getContext('2d');

    // 1. Canvas Outer Background
    ctx.clearRect(0, 0, W, H);
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, theme.bgGrad[0]);
    bgGrad.addColorStop(0.5, theme.bgGrad[1]);
    bgGrad.addColorStop(1, theme.bgGrad[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Main Card Bounds & Shadow
    const cardX = 48;
    const cardY = 48;
    const cardW = W - 96;
    const cardH = H - 96;

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
    const cornerSize = 40;
    drawVintageCorner(ctx, cardX + 30, cardY + 30, cornerSize, theme.primaryGold, 1, 1);
    drawVintageCorner(ctx, cardX + cardW - 30, cardY + 30, cornerSize, theme.primaryGold, -1, 1);
    drawVintageCorner(ctx, cardX + 30, cardY + cardH - 30, cornerSize, theme.primaryGold, 1, -1);
    drawVintageCorner(ctx, cardX + cardW - 30, cardY + cardH - 30, cornerSize, theme.primaryGold, -1, -1);

    // ═════════════════════════════════════════════════════════════════
    // 5. TOP BRANDING HEADER
    // ═════════════════════════════════════════════════════════════════
    const headerY = cardY + 70;
    
    // Brand Seal / Icon
    drawCompassRose(ctx, W / 2, headerY - 14, 11, theme.primaryGold);

    // Brand Name
    ctx.save();
    ctx.font = 'bold 20px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.primaryGold;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText('ROYAL HISTORY ✦ ইতিহাসের এই দিনে', W / 2, headerY + 16);
    ctx.restore();

    // Thin decorative line under header
    ctx.save();
    ctx.strokeStyle = theme.subtleLine;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 180, headerY + 30);
    ctx.lineTo(W / 2 + 180, headerY + 30);
    ctx.stroke();
    ctx.restore();

    // ═════════════════════════════════════════════════════════════════
    // 6. PROMINENT REGAL YEAR DISPLAY (ব্যবহারকারীর বিশেষ অনুরোধ)
    // ═════════════════════════════════════════════════════════════════
    const yearY = headerY + 115;
    const yearBn = toBengaliDigits(item.event_year || 1971);
    const dateText = item.event_date || 'ইতিহাসের এই দিনে';

    // Year Plaque Background
    const plaqueW = 320;
    const plaqueH = 100;
    drawParchmentRibbon(ctx, W / 2, yearY, plaqueW, plaqueH, theme);

    // Laurel Branches framing the grand year
    drawLaurelBranch(ctx, W / 2, yearY, 360, 90, theme.primaryGold);

    // GIANT YEAR NUMBER
    ctx.save();
    ctx.font = 'bold 78px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.yearColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = theme.isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.fillText(yearBn, W / 2, yearY - 4);
    ctx.restore();

    // Small caption below the year (e.g. "খ্রিস্টাব্দ")
    ctx.save();
    ctx.font = '600 16px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'center';
    ctx.fillText(item.event_year_display || `${yearBn} খ্রিস্টাব্দ`, W / 2, yearY + 42);
    ctx.restore();

    // ═════════════════════════════════════════════════════════════════
    // 7. DATE & CATEGORY BADGE ROW
    // ═════════════════════════════════════════════════════════════════
    const badgeRowY = yearY + 86;
    let categoryName = 'ইতিহাসের এই দিনে';
    if (item.category === 'bangladesh') categoryName = '🇧🇩 বাংলাদেশ';
    else if (item.category === 'world') categoryName = '🌍 বিশ্ব';
    else categoryName = '📜 ইতিহাসের এই দিনে';

    let eventTypeName = 'ঐতিহাসিক ঘটনা';
    if (item.event_type === 'birth') eventTypeName = '🎂 জন্মবার্ষিকী';
    else if (item.event_type === 'demise') eventTypeName = '🕊️ প্রয়াণ';
    else if (item.event_type === 'discovery') eventTypeName = '🔬 বিজ্ঞান ও আবিষ্কার';
    else if (item.event_type === 'treaty') eventTypeName = '📜 ঐতিহাসিক চুক্তি';
    else if (item.event_type === 'milestone') eventTypeName = '🚩 মাইলফলক';

    const fullBadgeText = `${categoryName}  •  📅 ${dateText}  •  ${eventTypeName}`;

    ctx.save();
    ctx.font = '600 20px "Hind Siliguri", sans-serif';
    const badgeMetrics = ctx.measureText(fullBadgeText);
    const badgeW = badgeMetrics.width + 48;
    const badgeH = 40;

    ctx.fillStyle = theme.badgeBg;
    ctx.strokeStyle = theme.badgeBorder;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(W / 2 - badgeW / 2, badgeRowY - badgeH / 2, badgeW, badgeH, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.badgeText;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fullBadgeText, W / 2, badgeRowY + 1);
    ctx.restore();

    // ═════════════════════════════════════════════════════════════════
    // 8. EVENT TITLE (Bold & Authoritative)
    // ═════════════════════════════════════════════════════════════════
    let currentContentY = badgeRowY + 45;
    const contentMaxW = cardW - 130;

    const titleText = item.title || 'ঐতিহাসিক অধ্যায়';
    let titleFontSize = 42;
    if (titleText.length > 55) titleFontSize = 34;
    else if (titleText.length > 35) titleFontSize = 38;

    ctx.save();
    ctx.font = `bold ${titleFontSize}px "Hind Siliguri", sans-serif`;
    const titleLines = wrapText(ctx, titleText, contentMaxW);
    const titleLineHeight = titleFontSize * 1.35;

    ctx.fillStyle = theme.titleColor;
    ctx.textAlign = 'center';
    for (let i = 0; i < titleLines.length; i++) {
      ctx.fillText(titleLines[i], W / 2, currentContentY + (i + 1) * titleLineHeight);
    }
    ctx.restore();

    currentContentY += titleLines.length * titleLineHeight + 25;

    // Small Gold Divider
    ctx.save();
    ctx.strokeStyle = theme.primaryGold;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 80, currentContentY);
    ctx.lineTo(W / 2 + 80, currentContentY);
    ctx.stroke();

    ctx.fillStyle = theme.primaryGold;
    ctx.beginPath();
    ctx.arc(W / 2, currentContentY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    currentContentY += 28;

    // ═════════════════════════════════════════════════════════════════
    // 9. EVENT SUMMARY / QUOTE (Archival Highlight Plaque)
    // ═════════════════════════════════════════════════════════════════
    const summaryText = item.summary || item.description || '';
    let summaryFontSize = 28;
    if (summaryText.length > 250) summaryFontSize = 23;
    else if (summaryText.length > 170) summaryFontSize = 25;
    else if (summaryText.length > 100) summaryFontSize = 28;
    else summaryFontSize = 31;

    ctx.save();
    ctx.font = `500 ${summaryFontSize}px "Hind Siliguri", sans-serif`;
    const summaryLines = wrapText(ctx, summaryText, contentMaxW - 60);
    const summaryLineHeight = summaryFontSize * 1.55;
    const summaryBoxH = (summaryLines.length * summaryLineHeight) + 40;

    // Plaque background box
    ctx.fillStyle = theme.isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)';
    ctx.strokeStyle = theme.subtleLine;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(W / 2 - (contentMaxW / 2), currentContentY, contentMaxW, summaryBoxH, 14);
    ctx.fill();
    ctx.stroke();

    // Quotation Marks or Ornaments
    ctx.fillStyle = theme.primaryGold;
    ctx.font = 'bold 36px "Hind Siliguri", sans-serif';
    ctx.fillText('“', W / 2 - (contentMaxW / 2) + 20, currentContentY + 32);

    // Text Lines
    ctx.font = `500 ${summaryFontSize}px "Hind Siliguri", sans-serif`;
    ctx.fillStyle = theme.bodyColor;
    ctx.textAlign = 'center';
    for (let i = 0; i < summaryLines.length; i++) {
      ctx.fillText(summaryLines[i], W / 2, currentContentY + 34 + (i * summaryLineHeight));
    }
    ctx.restore();

    currentContentY += summaryBoxH + 20;

    // ═════════════════════════════════════════════════════════════════
    // 10. SIGNIFICANCE & LOCATION (Optional Highlight)
    // ═════════════════════════════════════════════════════════════════
    if (item.significance || item.location) {
      let extraText = '';
      if (item.location) extraText += `📍 ${item.location}`;
      if (item.location && item.significance) extraText += '  |  ';
      if (item.significance) extraText += `✨ ${item.significance}`;

      ctx.save();
      ctx.font = 'italic 19px "Hind Siliguri", sans-serif';
      const extraLines = wrapText(ctx, extraText, contentMaxW);
      ctx.fillStyle = theme.metaColor;
      ctx.textAlign = 'center';
      for (let i = 0; i < Math.min(extraLines.length, 2); i++) {
        ctx.fillText(extraLines[i], W / 2, currentContentY + (i + 1) * 26);
      }
      ctx.restore();
    }

    // ═════════════════════════════════════════════════════════════════
    // 11. FOOTER (Source & Royal Technologies Brand Watermark)
    // ═════════════════════════════════════════════════════════════════
    const footerY = cardY + cardH - 38;

    // Reference (Left)
    ctx.save();
    ctx.font = '16px "Hind Siliguri", sans-serif';
    ctx.fillStyle = theme.metaColor;
    ctx.textAlign = 'left';
    const refText = item.reference ? `তথ্যসূত্র: ${item.reference}` : 'তথ্যসূত্র: রয়েল হিস্ট্রি মহাফেজখানা';
    ctx.fillText(refText, cardX + 44, footerY);

    // Credits (Right)
    ctx.textAlign = 'right';
    ctx.fillStyle = theme.primaryGold;
    ctx.font = '600 16px "Hind Siliguri", sans-serif';
    ctx.fillText('Royal Technologies ✦ royaltechbd.com', cardX + cardW - 44, footerY);
    ctx.restore();
  }

  return {
    THEMES,
    THEME_KEYS: Object.keys(THEMES),
    toBengaliDigits,
    renderCard,
    wrapText,
    drawVintageCorner,
    drawLaurelBranch,
    drawCompassRose
  };
});
