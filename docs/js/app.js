/* ============================================
   rbatis.io - Application Logic
   ============================================ */

(function () {
  'use strict';

  console.log('[rbatis] app.js loaded');

  var currentLang = 'en';

  /* ---- Home Page i18n Dictionary ---- */
  var homeI18n = {
    'nav-home':        { en: 'Home',        zh: '首页' },
    'nav-v4-docs':     { en: 'V4 Docs',     zh: 'V4 文档' },
    'tagline':         { en: 'Compile-time ORM for Rust', zh: 'Rust 编译期 ORM' },
    'feature-perf-title':    { en: 'High Performance',    zh: '高性能' },
    'feature-perf-desc':     { en: 'Zero-cost dynamic SQL compiled at build time', zh: '编译期零成本动态 SQL' },
    'feature-safe-title':    { en: 'Type Safe',          zh: '类型安全' },
    'feature-safe-desc':     { en: '100% safe Rust, compile-time query verification', zh: '100% 安全的 Rust，编译期查询验证' },
    'feature-driver-title':  { en: 'Driver Abstraction',  zh: '驱动抽象' },
    'feature-driver-desc':   { en: 'Pluggable database drivers via rbdc trait system', zh: '通过 rbdc trait 系统实现可插拔驱动' },
    'terminal-cargo':  { en: '# Cargo.toml', zh: '# Cargo.toml' },
    'terminal-start':  { en: '# Quick start', zh: '# 快速开始' },
    'cta-start':       { en: 'Get Started',   zh: '快速开始' },
    'cta-github':      { en: 'View on GitHub', zh: '查看 GitHub' },
    'footer-contrib':  { en: '© RBatis Contributors', zh: '© RBatis Contributors' },
    'footer-github':   { en: 'GitHub',        zh: 'GitHub' }
  };

  function applyHomeI18n(lang) {
    lang = lang || currentLang;
    console.log('[rbatis] applyHomeI18n:', lang);
    var els = document.querySelectorAll('[data-i18n]');
    els.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (homeI18n[key]) {
        el.textContent = homeI18n[key][lang] || homeI18n[key].en;
      }
    });
    // Update html lang
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    // Update title if on home page
    if (!document.getElementById('doc-layout') || document.getElementById('doc-layout').style.display !== 'flex') {
      document.title = lang === 'zh' ? 'RBatis - Rust 编译期 ORM' : 'RBatis - Compile-time ORM for Rust';
    }
  }

  function getLang() {
    var stored = localStorage.getItem('rbatis-lang');
    return stored || 'en';
  }

  function saveLang(lang) {
    console.log('[rbatis] saveLang:', lang);
    currentLang = lang;
    localStorage.setItem('rbatis-lang', lang);
    var btns = document.querySelectorAll('.lang-btn');
    btns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    applyHomeI18n(lang);
  }

  /* ---- Markdown Loading ---- */
  function loadAndRender(version, lang) {
    lang = lang || currentLang;
    var filename = lang === 'zh' ? 'README-zh.md' : 'README.md';
    var path = version + '/' + filename;
    var contentEl = document.getElementById('content');

    console.log('[rbatis] loadAndRender: lang=' + lang + ' path=' + path);

    if (!contentEl) {
      console.error('[rbatis] #content element not found!');
      return;
    }

    // Show skeleton
    contentEl.innerHTML =
      '<div class="skeleton-container">' +
        '<div class="skeleton-block h2"></div>' +
        '<div class="skeleton-block body"></div>' +
        '<div class="skeleton-block body-wide"></div>' +
        '<div class="skeleton-block body"></div>' +
        '<div class="skeleton-block h3"></div>' +
        '<div class="skeleton-block body"></div>' +
        '<div class="skeleton-block body-wide"></div>' +
        '<div class="skeleton-block code"></div>' +
        '<div class="skeleton-block h2"></div>' +
        '<div class="skeleton-block body"></div>' +
        '<div class="skeleton-block code"></div>' +
      '</div>';

    fetch(path)
      .then(function (res) {
        console.log('[rbatis] fetch status:', res.status, res.statusText);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        console.log('[rbatis] markdown length:', text.length);

        if (!text.trim()) {
          contentEl.innerHTML = '<div class="error-state"><p>' + (lang === 'zh' ? '此文档为空。' : 'This documentation section is empty.') + '</p></div>';
          return;
        }

        marked.setOptions({ gfm: true, breaks: true });
        var html = marked.parse(text);
        contentEl.innerHTML = '<div class="content">' + html + '</div>';

        buildSidebar(text, version);
        if (typeof Prism !== 'undefined') {
          Prism.highlightAll();
        } else {
          console.warn('[rbatis] Prism not loaded');
        }
        addAnchorLinks();
        document.title = 'RBatis V4 - ' + (lang === 'zh' ? '文档' : 'Documentation');
        console.log('[rbatis] render complete');
      })
      .catch(function (err) {
        console.error('[rbatis] loadAndRender error:', err);
        contentEl.innerHTML =
          '<div class="error-state">' +
            '<h2>' + (lang === 'zh' ? '文档加载失败' : 'Failed to load documentation') + '</h2>' +
            '<p>' + err.message + '</p>' +
            '<p style="font-size:0.8em;color:#888">' + (lang === 'zh' ? '请求路径: ' : 'Requested: ') + path + '</p>' +
            '<a href="#/" class="btn btn-primary">' + (lang === 'zh' ? '返回首页' : 'Return Home') + '</a>' +
          '</div>';
      });
  }

  /* ---- Sidebar ---- */
  function buildSidebar(markdown, version) {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Use the rendered DOM headings instead of parsing markdown,
    // so IDs always match what marked.js generated.
    var headings = [];
    var headingEls = document.querySelectorAll('.content h2, .content h3, .content h4');
    headingEls.forEach(function (el) {
      var level = parseInt(el.tagName.slice(1));
      var text = el.textContent.replace(/#$/, '').trim();
      var id = el.id || text.toLowerCase().replace(/[^\w\s一-鿿-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
      if (!el.id) el.id = id; // ensure it has an id
      headings.push({ level: level, text: text, id: id });
    });

    // Fallback: parse markdown if no DOM headings found
    if (headings.length === 0) {
      markdown.split('\n').forEach(function (line) {
        var match = line.match(/^(#{2,4})\s+(.+)/);
        if (match) {
          var text = match[2].replace(/`([^`]+)`/g, '$1');
          var id = text.toLowerCase().replace(/[^\w\s一-鿿-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
          headings.push({ level: match[1].length, text: text, id: id });
        }
      });
    }

    var html = '<div class="sidebar-header">V4 ' + (currentLang === 'zh' ? '文档' : 'Documentation') + '</div>';
    html += '<nav class="sidebar-nav">';
    headings.forEach(function (h) {
      html += '<a href="#' + h.id + '" class="sidebar-link sidebar-h' + h.level + '">' + h.text + '</a>';
    });
    html += '</nav>';
    sidebar.innerHTML = html;

    // Smooth scroll
    sidebar.querySelectorAll('.sidebar-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var id = link.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Scroll spy
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          document.querySelectorAll('.sidebar-link').forEach(function (l) { l.classList.remove('active'); });
          var active = document.querySelector('.sidebar-link[href="#' + entry.target.id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -80% 0px' });
    document.querySelectorAll('.content h2, .content h3, .content h4').forEach(function (h) { observer.observe(h); });
  }

  function addAnchorLinks() {
    document.querySelectorAll('.content h2, .content h3, .content h4').forEach(function (heading) {
      if (!heading.id) return;
      var a = document.createElement('a');
      a.className = 'anchor-link';
      a.href = '#' + heading.id;
      a.textContent = '#';
      heading.prepend(a);
    });
  }

  /* ---- Router ---- */
  function showHome() {
    console.log('[rbatis] route: home');
    document.getElementById('hero').style.display = '';
    document.getElementById('doc-layout').style.display = 'none';
    document.getElementById('content').innerHTML = '';
    document.getElementById('sidebar').innerHTML = '';
    document.title = currentLang === 'zh' ? 'RBatis - Rust 编译期 ORM' : 'RBatis - Compile-time ORM for Rust';
    if (typeof ParticleNetwork !== 'undefined') ParticleNetwork.init('particles-canvas');
    applyHomeI18n(currentLang);
    window.scrollTo(0, 0);
  }

  function showDocs() {
    console.log('[rbatis] route: docs, currentLang=' + currentLang);
    document.getElementById('hero').style.display = 'none';
    document.getElementById('doc-layout').style.display = 'flex';
    document.getElementById('sidebar').classList.add('active');
    loadAndRender('v4', currentLang);
    window.scrollTo(0, 0);
  }

  function resolveRoute() {
    var hash = window.location.hash.slice(1) || '/';
    console.log('[rbatis] resolveRoute:', hash);
    if (hash === '/') { showHome(); return; }
    showDocs();
  }

  /* ===== Init ===== */
  function init() {
    console.log('[rbatis] init()');

    // Load saved language
    currentLang = getLang();
    saveLang(currentLang);
    console.log('[rbatis] initial lang:', currentLang);

    // Language toggle
    var langToggle = document.getElementById('langToggle');
    if (langToggle) {
      console.log('[rbatis] found langToggle, attaching click handler');
      langToggle.addEventListener('click', function (e) {
        var btn = e.target.closest('.lang-btn');
        if (!btn) {
          console.log('[rbatis] click not on .lang-btn');
          return;
        }
        var lang = btn.getAttribute('data-lang');
        console.log('[rbatis] lang btn clicked:', lang, 'current:', currentLang);
        if (lang === currentLang) return;

        saveLang(lang);
        console.log('[rbatis] after saveLang, currentLang=', currentLang);

        // If on docs page, reload content with the new language
        var hash = window.location.hash.slice(1);
        console.log('[rbatis] hash after click:', hash);
        if (hash !== '/') {
          console.log('[rbatis] reloading docs with lang:', lang);
          loadAndRender('v4', lang);
        } else {
          console.log('[rbatis] on home page, no reload needed');
        }
      });
    } else {
      console.error('[rbatis] #langToggle NOT FOUND!');
    }

    // Mobile menu
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () { links.classList.toggle('open'); });
      links.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () { links.classList.remove('open'); });
      });
    }

    // Back to top
    var backBtn = document.getElementById('backToTop');
    if (backBtn) {
      window.addEventListener('scroll', function () {
        backBtn.classList.toggle('visible', window.scrollY > 400);
      });
      backBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Route
    window.addEventListener('hashchange', resolveRoute);
    console.log('[rbatis] initial hash:', window.location.hash);
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/';
    } else {
      resolveRoute();
    }
  }

  // Ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
