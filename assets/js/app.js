/**
 * Royal History — Frontend Client Engine
 * Brand: Royal History — ইতিহাসের এই দিনে
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */

'use strict';

(function () {
  let allEvents = [];
  let filteredEvents = [];
  let currentCategory = 'all';
  let todayHistory = null;
  let activePreviewItem = null;
  let currentPreviewLayout = 'kiswah-gold-ribbon';
  let currentPreviewTheme = 'royal-emerald';
  let activeShareBlob = null;

  function toBengaliDigits(num) {
    if (num === null || num === undefined) return '';
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ── 1. Init Theme (Dark/Light) ──
  function initTheme() {
    const saved = localStorage.getItem('royal_history_theme');
    if (saved === 'light') {
      document.body.classList.add('light');
    }
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        const isLight = document.body.classList.contains('light');
        localStorage.setItem('royal_history_theme', isLight ? 'light' : 'dark');
        toggleBtn.innerText = isLight ? '🌙 ডার্ক মোড' : '☀️ লাইট মোড';
      });
      if (document.body.classList.contains('light')) {
        toggleBtn.innerText = '🌙 ডার্ক মোড';
      }
    }
  }

  // ── 2. Load Today's Featured Card ──
  async function loadTodayCard() {
    try {
      if (window.ROYAL_TODAY_HISTORY) {
        todayHistory = window.ROYAL_TODAY_HISTORY;
      } else {
        const res = await fetch('cards/today.json?t=' + Date.now());
        if (res.ok) {
          todayHistory = await res.json();
        }
      }

      if (todayHistory) {
        renderTodayShowcase(todayHistory);
      }
    } catch (e) {
      console.warn('Could not load today.json:', e);
    }
  }

  function renderTodayShowcase(data) {
    const todayImg = document.getElementById('todayImg');
    const todayYear = document.getElementById('todayYear');
    const todayTitle = document.getElementById('todayTitle');
    const todaySummary = document.getElementById('todaySummary');
    const todayBadgeCat = document.getElementById('todayBadgeCat');
    const todayBadgeDate = document.getElementById('todayBadgeDate');
    const btnDownloadToday = document.getElementById('btnDownloadToday');
    const btnCopyCaption = document.getElementById('btnCopyCaption');
    const btnShareToday = document.getElementById('btnShareToday');

    if (todayImg) {
      todayImg.src = 'cards/today.png?t=' + Date.now();
    }

    const hasMultiEvents = Array.isArray(data.events) && data.events.length > 0;

    if (todayBadgeDate) {
      todayBadgeDate.innerText = '📅 ' + (data.dateText || data.eventDate || 'আজকের দিন');
    }

    if (hasMultiEvents) {
      if (todayBadgeCat) {
        todayBadgeCat.innerText = `🏛️ ${toBengaliDigits(data.events.length)}টি বিশেষ ঐতিহাসিক ঘটনা`;
      }
      if (todayYear) {
        todayYear.innerText = 'ইতিহাসের পাতায় আজকের স্মরণীয় ঘটনাবলী';
      }
      if (todayTitle) {
        todayTitle.style.display = 'none';
      }
      if (todaySummary) {
        todaySummary.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${data.events.map((ev, i) => `
              <div style="background:var(--card-bg); padding:12px 14px; border-radius:8px; border-left:3px solid var(--gold);">
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px; color:var(--gold); font-weight:700; margin-bottom:4px;">
                  <span>#${toBengaliDigits(i + 1)} • ${ev.event_year_display || `${toBengaliDigits(ev.event_year)} খ্রিস্টাব্দ`}</span>
                  <span class="badge ${ev.category === 'bangladesh' ? 'badge-emerald' : 'badge-gold'}" style="font-size:11px; padding:2px 8px;">${ev.category === 'bangladesh' ? '🇧🇩 বাংলাদেশ' : '🌍 বিশ্ব'}</span>
                </div>
                <strong style="font-size:15px; color:var(--text); line-height:1.4;">${escapeHtml(ev.title)}</strong>
                <p style="font-size:13px; color:var(--text-muted); margin-top:4px; line-height:1.5;">“${escapeHtml(ev.summary || ev.description)}”</p>
              </div>
            `).join('')}
          </div>
        `;
      }
    } else {
      if (todayYear) {
        todayYear.innerText = toBengaliDigits(data.eventYear) + ' খ্রিস্টাব্দ';
      }
      if (todayTitle) {
        todayTitle.style.display = 'block';
        todayTitle.innerText = data.title || '';
      }
      if (todaySummary) {
        todaySummary.innerText = data.summary || data.description || '';
      }
      if (todayBadgeCat) {
        let label = '📜 ইতিহাসের এই দিনে';
        if (data.category === 'bangladesh') label = '🇧🇩 বাংলাদেশ';
        else if (data.category === 'world') label = '🌍 বিশ্ব';
        todayBadgeCat.innerText = label;
      }
    }

    if (btnDownloadToday) {
      btnDownloadToday.href = 'cards/today.png';
      btnDownloadToday.download = `RoyalHistory-${data.cardId || 'Today'}.png`;
    }

    if (btnCopyCaption) {
      btnCopyCaption.onclick = () => {
        if (data.caption) {
          navigator.clipboard.writeText(data.caption);
          showToast('✅ পোস্টের ক্যাপশন ক্লিপবোর্ডে কপি হয়েছে!');
        }
      };
    }

    if (btnShareToday) {
      btnShareToday.onclick = () => {
        openShareModal(data);
      };
    }
  }

  // ── 3. Load All Events & Populate UI ──
  async function loadAllEvents() {
    try {
      const res = await fetch('database/items.json?t=' + Date.now());
      if (res.ok) {
        allEvents = await res.json();
      }
    } catch (e) {
      console.warn('Could not load database/items.json:', e);
    }

    updateStats();
    applyFilters();
  }

  function updateStats() {
    const totalEl = document.getElementById('statTotal');
    const bdEl = document.getElementById('statBD');
    const worldEl = document.getElementById('statWorld');
    const todayEl = document.getElementById('statToday');

    const total = allEvents.length;
    const bdCount = allEvents.filter(x => x.category === 'bangladesh').length;
    const worldCount = allEvents.filter(x => x.category === 'world').length;

    const now = new Date();
    const currDay = now.getDate();
    const currMonth = now.getMonth() + 1;
    const todayCount = allEvents.filter(x => x.target_day === currDay && x.target_month === currMonth).length;

    if (totalEl) totalEl.innerText = toBengaliDigits(total);
    if (bdEl) bdEl.innerText = toBengaliDigits(bdCount);
    if (worldEl) worldEl.innerText = toBengaliDigits(worldCount);
    if (todayEl) todayEl.innerText = toBengaliDigits(todayCount);
  }

  // ── 4. Filtering & Search ──
  function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const monthSelect = document.getElementById('monthSelect');
    const daySelect = document.getElementById('daySelect');
    const typeSelect = document.getElementById('typeSelect');

    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const selectedMonth = monthSelect ? parseInt(monthSelect.value, 10) : 0;
    const selectedDay = daySelect ? parseInt(daySelect.value, 10) : 0;
    const selectedType = typeSelect ? typeSelect.value : 'all';

    filteredEvents = allEvents.filter(item => {
      // Category match
      if (currentCategory !== 'all' && item.category !== currentCategory) {
        return false;
      }
      // Month match
      if (selectedMonth > 0 && item.target_month !== selectedMonth) {
        return false;
      }
      // Day match
      if (selectedDay > 0 && item.target_day !== selectedDay) {
        return false;
      }
      // Event Type match
      if (selectedType !== 'all' && item.event_type !== selectedType) {
        return false;
      }
      // Query match (title, summary, description, tags, year, location)
      if (query) {
        const titleMatch = (item.title || '').toLowerCase().includes(query);
        const descMatch = (item.description || '').toLowerCase().includes(query);
        const sumMatch = (item.summary || '').toLowerCase().includes(query);
        const tagsMatch = (item.tags || '').toLowerCase().includes(query);
        const locMatch = (item.location || '').toLowerCase().includes(query);
        const yearMatch = String(item.event_year || '').includes(query) || toBengaliDigits(item.event_year).includes(query);
        const dateMatch = (item.event_date || '').toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !sumMatch && !tagsMatch && !locMatch && !yearMatch && !dateMatch) {
          return false;
        }
      }
      return true;
    });

    renderEventsGrid(filteredEvents);
  }

  function renderEventsGrid(items) {
    const grid = document.getElementById('eventsGrid');
    const countEl = document.getElementById('filteredCount');
    if (!grid) return;

    if (countEl) {
      countEl.innerText = toBengaliDigits(items.length) + 'টি ঘটনা সংরক্ষিত';
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
          <h3>কোনো ঐতিহাসিক ঘটনা পাওয়া যায়নি</h3>
          <p>অনুসন্ধানের শব্দ পরিবর্তন করে বা অন্য ক্যাটাগরি ও তারিখ নির্বাচন করে চেষ্টা করুন।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map((item, index) => {
      let catBadgeClass = 'badge-gold';
      let catLabel = '📜 ইতিহাসের এই দিনে';
      if (item.category === 'bangladesh') {
        catBadgeClass = 'badge-emerald';
        catLabel = '🇧🇩 বাংলাদেশ';
      } else if (item.category === 'world') {
        catBadgeClass = 'badge-blue';
        catLabel = '🌍 বিশ্ব';
      }

      const yearBn = toBengaliDigits(item.event_year);
      const dateText = item.event_date || `${item.target_day} তারিখ`;

      return `
        <div class="history-card" data-uid="${item.uid}">
          <div class="history-card-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="card-num">#${toBengaliDigits(index + 1)}</span>
              <span class="badge ${catBadgeClass}">${catLabel}</span>
            </div>
            <span class="history-year-tag">${yearBn}</span>
          </div>

          <h3>${escapeHtml(item.title)}</h3>
          <p>“${escapeHtml(item.summary || item.description)}”</p>

          ${item.significance ? `
            <div class="card-sig-box">
              ✨ <strong>তাৎপর্য:</strong> ${escapeHtml(item.significance)}
              ${item.location ? ` | 📍 ${escapeHtml(item.location)}` : ''}
            </div>
          ` : ''}

          <div class="card-ref-box" style="margin-bottom:12px;">
            📌 <strong>তথ্যসূত্র:</strong> ${escapeHtml(item.reference || 'রয়েল হিস্ট্রি মহাফেজখানা')}
          </div>

          <div class="history-card-footer">
            <span>📅 ${dateText}</span>
            <div class="history-card-actions">
              <button class="btn btn-glass btn-icon btn-copy-summary" data-id="${item.id}" title="উদ্ধৃতি কপি করুন">✍️</button>
              <button class="btn btn-glass btn-icon btn-copy-caption" data-id="${item.id}" title="সম্পূর্ণ ক্যাপশন কপি করুন">📋</button>
              <button class="btn btn-gold btn-icon btn-build-card" data-id="${item.id}">🖼️ কার্ড বানান</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    grid.querySelectorAll('.btn-copy-summary').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = allEvents.find(x => x.id === id);
        if (item) {
          navigator.clipboard.writeText(`“${item.summary || item.description}”\n— [${item.title}, ${item.event_year_display || item.event_year}]`);
          showToast('✍️ মূল সারসংক্ষেপ কপি হয়েছে!');
        }
      });
    });

    grid.querySelectorAll('.btn-copy-caption').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = allEvents.find(x => x.id === id);
        if (item) {
          const cap = buildItemCaption(item);
          navigator.clipboard.writeText(cap);
          showToast('📋 পোস্টের ক্যাপশন কপি হয়েছে!');
        }
      });
    });

    grid.querySelectorAll('.btn-build-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = allEvents.find(x => x.id === id);
        if (item) openPreviewModal(item);
      });
    });
  }

  function buildItemCaption(item) {
    let catLabel = '📜 ইতিহাসের এই দিনে';
    if (item.category === 'bangladesh') catLabel = '🇧🇩 বাংলাদেশ ইতিহাস';
    else if (item.category === 'world') catLabel = '🌍 বিশ্ব ইতিহাস';

    const yearBn = toBengaliDigits(item.event_year);

    return `🏛️ ${catLabel} | Royal History — ইতিহাসের এই দিনে

📅 ${item.event_date || `${item.target_day} তারিখ`} | ${item.event_year_display || `${yearBn} খ্রিস্টাব্দ`}
⭐ ${item.title}

“${item.summary || item.description}”

${item.description && item.description !== item.summary ? `📖 বিস্তারিত ইতিহাস:\n${item.description}\n\n` : ''}${item.significance ? `✨ ঐতিহাসিক তাৎপর্য: ${item.significance}\n` : ''}${item.location ? `📍 স্থান: ${item.location}\n` : ''}📌 তথ্যসূত্র: ${item.reference || 'রয়েল হিস্ট্রি মহাফেজখানা'}

—
কারিগরি সহায়তায়: Royal Technologies (https://www.royaltechbd.com/)
ওয়েবসাইট ও পূর্ণাঙ্গ আর্কাইভ: https://royal-technologies.github.io/Royal-History/

#RoyalHistory #ItihasherEiDine #OnThisDay #BangladeshHistory #WorldHistory #TodayInHistory #RoyalTechnologies #ইতিহাসেরএইদিনে`;
  }

  // ── 5. Live Card Preview & Customizer Modal (20 Layouts × 10 Themes) ──
  function openPreviewModal(item) {
    activePreviewItem = item;
    const modal = document.getElementById('previewModal');
    if (!modal) return;

    const layoutSelect = document.getElementById('previewLayoutSelect');
    if (layoutSelect) {
      if (item.layout) currentPreviewLayout = item.layout;
      layoutSelect.value = currentPreviewLayout;
    }

    const themeSelect = document.getElementById('previewThemeSelect');
    if (themeSelect) {
      if (item.theme) currentPreviewTheme = item.theme;
      else if (item.category === 'bangladesh') currentPreviewTheme = 'royal-emerald';
      else if (item.category === 'world') currentPreviewTheme = 'midnight-navy';
      themeSelect.value = currentPreviewTheme;
    }

    renderPreviewCanvas(item, currentPreviewLayout, currentPreviewTheme);
    modal.classList.add('open');
  }

  function closePreviewModal() {
    const modal = document.getElementById('previewModal');
    if (modal) modal.classList.remove('open');
  }

  function renderPreviewCanvas(item, layoutKey, themeKey) {
    const canvas = document.getElementById('previewCanvas');
    if (!canvas || !window.HistoryCardTemplate) return;

    window.HistoryCardTemplate.renderCard(canvas, item, { layout: layoutKey, theme: themeKey });

    // Prepare blob for sharing
    canvas.toBlob(blob => {
      activeShareBlob = blob;
    }, 'image/png');
  }

  // ── 6. Share Modal ──
  function openShareModal(data) {
    const modal = document.getElementById('shareModal');
    if (!modal) return;

    const btnShareCopyImage = document.getElementById('btnShareCopyImage');
    const btnShareWhatsApp = document.getElementById('btnShareWhatsApp');
    const btnShareFacebook = document.getElementById('btnShareFacebook');
    const btnShareCopyCaption = document.getElementById('btnShareCopyCaption');

    const caption = data.caption || buildItemCaption(data);
    const pageUrl = window.location.href;

    if (btnShareCopyImage) {
      btnShareCopyImage.onclick = async () => {
        if (activeShareBlob && navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': activeShareBlob })]);
            showToast('📋 কার্ড ইমেজ ক্লিপবোর্ডে কপি হয়েছে! (ফেসবুকে Ctrl+V দিন)');
            closeShareModal();
            return;
          } catch (_) {}
        }
        showToast('⚠️ ইমেজ ডাউনলোড করে শেয়ার করুন।');
      };
    }

    if (btnShareWhatsApp) {
      btnShareWhatsApp.onclick = () => {
        window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(caption + '\n\n' + pageUrl), '_blank');
        closeShareModal();
      };
    }

    if (btnShareFacebook) {
      btnShareFacebook.onclick = () => {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl), '_blank');
        closeShareModal();
      };
    }

    if (btnShareCopyCaption) {
      btnShareCopyCaption.onclick = () => {
        navigator.clipboard.writeText(caption);
        showToast('📋 সম্পূর্ণ ক্যাপশন কপি হয়েছে!');
        closeShareModal();
      };
    }

    modal.classList.add('open');
  }

  function closeShareModal() {
    const modal = document.getElementById('shareModal');
    if (modal) modal.classList.remove('open');
  }

  // ── 7. Setup Event Listeners ──
  function setupListeners() {
    // Category pill buttons
    document.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        applyFilters();
      });
    });

    // Inputs
    ['searchInput', 'monthSelect', 'daySelect', 'typeSelect'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', applyFilters);
      if (el) el.addEventListener('change', applyFilters);
    });

    // Preview Modal Layout & Theme Select
    const layoutSelect = document.getElementById('previewLayoutSelect');
    if (layoutSelect) {
      layoutSelect.addEventListener('change', (e) => {
        currentPreviewLayout = e.target.value;
        if (activePreviewItem) renderPreviewCanvas(activePreviewItem, currentPreviewLayout, currentPreviewTheme);
      });
    }

    const themeSelect = document.getElementById('previewThemeSelect');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        currentPreviewTheme = e.target.value;
        if (activePreviewItem) renderPreviewCanvas(activePreviewItem, currentPreviewLayout, currentPreviewTheme);
      });
    }

    // Random Combo Button (20 Layouts × 10 Themes = 200 Combos)
    const btnRandomTheme = document.getElementById('btnRandomTheme');
    if (btnRandomTheme) {
      btnRandomTheme.addEventListener('click', () => {
        if (!window.HistoryCardTemplate) return;
        const layouts = window.HistoryCardTemplate.LAYOUT_KEYS || Object.keys(window.HistoryCardTemplate.LAYOUTS || {});
        const themes = window.HistoryCardTemplate.THEME_KEYS || Object.keys(window.HistoryCardTemplate.THEMES || {});

        currentPreviewLayout = layouts[Math.floor(Math.random() * layouts.length)];
        currentPreviewTheme = themes[Math.floor(Math.random() * themes.length)];

        if (layoutSelect) layoutSelect.value = currentPreviewLayout;
        if (themeSelect) themeSelect.value = currentPreviewTheme;

        if (activePreviewItem) renderPreviewCanvas(activePreviewItem, currentPreviewLayout, currentPreviewTheme);
        showToast('🎲 নতুন র‍্যান্ডম ডিজাইন ও কালার কম্বিনেশন রেন্ডার হয়েছে!');
      });
    }

    // Download Preview Button
    const btnDownloadPreview = document.getElementById('btnDownloadPreview');
    if (btnDownloadPreview) {
      btnDownloadPreview.addEventListener('click', () => {
        const canvas = document.getElementById('previewCanvas');
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `RoyalHistory-${activePreviewItem?.uid || 'Card'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('📥 কার্ড ডাউনলোড শুরু হয়েছে!');
      });
    }

    // Share Preview Button
    const btnSharePreview = document.getElementById('btnSharePreview');
    if (btnSharePreview) {
      btnSharePreview.addEventListener('click', () => {
        if (activePreviewItem) openShareModal(activePreviewItem);
      });
    }

    // Copy Preview Caption Button
    const btnCopyPreviewCaption = document.getElementById('btnCopyPreviewCaption');
    if (btnCopyPreviewCaption) {
      btnCopyPreviewCaption.addEventListener('click', () => {
        if (activePreviewItem) {
          navigator.clipboard.writeText(buildItemCaption(activePreviewItem));
          showToast('📋 ক্যাপশন কপি হয়েছে!');
        }
      });
    }

    // Modal Close buttons
    const previewModalClose = document.getElementById('previewModalClose');
    if (previewModalClose) previewModalClose.addEventListener('click', closePreviewModal);

    const shareModalClose = document.getElementById('shareModalClose');
    if (shareModalClose) shareModalClose.addEventListener('click', closeShareModal);

    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
      previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) closePreviewModal();
      });
    }

    const shareModal = document.getElementById('shareModal');
    if (shareModal) {
      shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) closeShareModal();
      });
    }

    // Stat cards click to filter
    const statCardTotal = document.getElementById('statCardTotal');
    if (statCardTotal) {
      statCardTotal.addEventListener('click', () => {
        const btn = document.querySelector('.pill-btn[data-category="all"]');
        if (btn) btn.click();
      });
    }
    const statCardBD = document.getElementById('statCardBD');
    if (statCardBD) {
      statCardBD.addEventListener('click', () => {
        const btn = document.querySelector('.pill-btn[data-category="bangladesh"]');
        if (btn) btn.click();
      });
    }
    const statCardWorld = document.getElementById('statCardWorld');
    if (statCardWorld) {
      statCardWorld.addEventListener('click', () => {
        const btn = document.querySelector('.pill-btn[data-category="world"]');
        if (btn) btn.click();
      });
    }
    const statCardToday = document.getElementById('statCardToday');
    if (statCardToday) {
      statCardToday.addEventListener('click', () => {
        const now = new Date();
        const mSelect = document.getElementById('monthSelect');
        const dSelect = document.getElementById('daySelect');
        if (mSelect) mSelect.value = String(now.getMonth() + 1);
        if (dSelect) dSelect.value = String(now.getDate());
        applyFilters();
      });
    }
  }

  // DOM Loaded
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupListeners();
    loadTodayCard();
    loadAllEvents();
  });
})();
