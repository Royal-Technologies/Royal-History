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

  // Bengali month names
  const BN_MONTHS = [
    '', 'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  function toBengaliDigits(num) {
    if (num === null || num === undefined) return '';
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
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
    if (todayYear) {
      todayYear.innerText = toBengaliDigits(data.eventYear) + ' খ্রিস্টাব্দ';
    }
    if (todayTitle) {
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
    if (todayBadgeDate) {
      todayBadgeDate.innerText = '📅 ' + (data.eventDate || 'আজকের দিন');
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
      btnShareToday.onclick = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: data.title,
              text: data.caption,
              url: window.location.href
            });
          } catch (_) {}
        } else {
          navigator.clipboard.writeText(data.caption);
          showToast('✅ পোস্টের বিবরণ কপি হয়েছে!');
        }
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
    const typeSelect = document.getElementById('typeSelect');

    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const selectedMonth = monthSelect ? parseInt(monthSelect.value, 10) : 0;
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
      // Event Type match
      if (selectedType !== 'all' && item.event_type !== selectedType) {
        return false;
      }
      // Query match (title, summary, tags, year)
      if (query) {
        const titleMatch = (item.title || '').toLowerCase().includes(query);
        const descMatch = (item.description || '').toLowerCase().includes(query);
        const tagsMatch = (item.tags || '').toLowerCase().includes(query);
        const yearMatch = String(item.event_year || '').includes(query) || toBengaliDigits(item.event_year).includes(query);
        const dateMatch = (item.event_date || '').toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !tagsMatch && !yearMatch && !dateMatch) {
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
      countEl.innerText = toBengaliDigits(items.length) + 'টি ঘটনা প্রদর্শিত হচ্ছে';
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
          <h3>কোনো ঐতিহাসিক ঘটনা পাওয়া যায়নি</h3>
          <p>অনুসন্ধানের শব্দ পরিবর্তন করে বা অন্য ক্যাটাগরি নির্বাচন করে চেষ্টা করুন।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
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
            <span class="badge ${catBadgeClass}">${catLabel}</span>
            <span class="history-year-tag">${yearBn}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.summary || item.description}</p>
          <div class="history-card-footer">
            <span>📅 ${dateText}</span>
            <div class="history-card-actions">
              <button class="btn btn-glass btn-icon btn-view-modal" data-id="${item.id}">বিস্তারিত দেখুন</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    grid.querySelectorAll('.btn-view-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = allEvents.find(x => x.id === id);
        if (item) openModal(item);
      });
    });
  }

  // ── 5. Modal Engine ──
  function openModal(item) {
    const modal = document.getElementById('eventModal');
    if (!modal) return;

    let catLabel = '📜 ইতিহাসের এই দিনে';
    if (item.category === 'bangladesh') catLabel = '🇧🇩 বাংলাদেশ';
    else if (item.category === 'world') catLabel = '🌍 বিশ্ব';

    const yearBn = toBengaliDigits(item.event_year);

    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalYear').innerText = `${yearBn} খ্রিস্টাব্দ (${item.event_date || ''})`;
    document.getElementById('modalCategory').innerText = catLabel;
    document.getElementById('modalSummary').innerText = item.summary || '';
    document.getElementById('modalDesc').innerText = item.description || '';
    document.getElementById('modalSignificance').innerText = item.significance ? `✨ তাৎপর্য: ${item.significance}` : '';
    document.getElementById('modalLocation').innerText = item.location ? `📍 স্থান: ${item.location}` : '';
    document.getElementById('modalRef').innerText = item.reference ? `📌 তথ্যসূত্র: ${item.reference}` : '';

    const btnCopyModal = document.getElementById('btnCopyModalCaption');
    if (btnCopyModal) {
      btnCopyModal.onclick = () => {
        const text = `🏛️ ${catLabel} | Royal History — ইতিহাসের এই দিনে\n\n📅 ${item.event_date} | ${yearBn} খ্রিস্টাব্দ\n⭐ ${item.title}\n\n“${item.summary || item.description}”\n\n${item.description !== item.summary ? item.description + '\n\n' : ''}${item.significance ? '✨ তাৎপর্য: ' + item.significance + '\n' : ''}📌 তথ্যসূত্র: ${item.reference || 'রয়েল হিস্ট্রি'}\n\n— Royal Technologies`;
        navigator.clipboard.writeText(text);
        showToast('✅ ক্যাপশন ক্লিপবোর্ডে কপি হয়েছে!');
      };
    }

    modal.classList.add('open');
  }

  function closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) modal.classList.remove('open');
  }

  // ── 6. Setup Event Listeners ──
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
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }

    const monthSelect = document.getElementById('monthSelect');
    if (monthSelect) {
      monthSelect.addEventListener('change', applyFilters);
    }

    const typeSelect = document.getElementById('typeSelect');
    if (typeSelect) {
      typeSelect.addEventListener('change', applyFilters);
    }

    // Modal close
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
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
        if (mSelect) {
          mSelect.value = String(now.getMonth() + 1);
          applyFilters();
        }
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
