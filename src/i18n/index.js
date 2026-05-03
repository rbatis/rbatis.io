import { ref, readonly } from 'vue'

const messages = {
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
  'terminal-start':  { en: '# exec_decode', zh: '# exec_decode' },
  'cta-start':       { en: 'Get Started',   zh: '快速开始' },
  'sec-why-title':        { en: 'Why RBatis?',                      zh: '为什么选择 RBatis？' },
  'sec-why-sub':          { en: 'A modern, high-performance ORM for Rust with compile-time safety', zh: '一个现代、高性能的 Rust ORM，编译期安全保障' },
  'sec-why-compile-title':  { en: 'Compile-time Dynamic SQL',       zh: '编译期动态 SQL' },
  'sec-why-compile-desc':   { en: 'Zero-cost dynamic SQL powered by proc-macros at compile time. Uses Cow to minimize cloning — no ONGL engine needed.', zh: '编译期通过 proc-macro 实现的零成本动态 SQL，使用 Cow 减少克隆，无需 ONGL 引擎。' },
  'sec-why-mybatis-title':  { en: 'MyBatis3 Compatible',            zh: '兼容 MyBatis3' },
  'sec-why-mybatis-desc':   { en: 'Familiar MyBatis3 syntax support. Easily migrate existing Java projects to Rust with minimal changes.', zh: '支持熟悉的 MyBatis3 语法，轻松将 Java 项目迁移到 Rust。' },
  'sec-why-safe-title':     { en: '100% Safe Rust',                zh: '100% 安全的 Rust' },
  'sec-why-safe-desc':      { en: 'Enforces #![forbid(unsafe_code)] — compile-time query verification, zero undefined behavior.', zh: '强制 #![forbid(unsafe_code)] — 编译期查询验证，零未定义行为。' },
  'sec-why-async-title':    { en: 'Async & High Performance',       zh: '异步 & 高性能' },
  'sec-why-async-desc':     { en: 'Built on Tokio async runtime. No GC, no runtime overhead — pure zero-cost abstractions.', zh: '基于 Tokio 异步运行时，无 GC，无运行时开销 — 纯粹的零成本抽象。' },
  'sec-why-driver-title':   { en: 'Pluggable Drivers',              zh: '可插拔驱动' },
  'sec-why-driver-desc':    { en: 'JDBC-like rbdc trait system. Switch databases by changing a single line of Cargo.toml.', zh: '类似 JDBC 的 rbdc trait 系统，切换数据库只需修改一行 Cargo.toml。' },
  'sec-why-plugin-title':   { en: 'Rich Plugin System',             zh: '丰富的插件系统' },
  'sec-why-plugin-desc':    { en: 'Interceptors, auto table-sync, snowflake & ObjectId generators, pagination, and more.', zh: '拦截器、自动表同步、雪花算法 & ObjectId 生成器、分页等等。' },
  'sec-dsql-title':   { en: 'Dynamic SQL',                  zh: '动态 SQL' },
  'sec-dsql-sub':     { en: 'Two powerful dynamic SQL languages — write complex queries with ease', zh: '两种强大的动态 SQL 语言 — 轻松编写复杂查询' },
  'sec-dsql-crud-desc': { en: 'Macro that generates built-in CRUD functions for your table structs — zero boilerplate.', zh: '为表结构生成内置 CRUD 函数的宏 — 零样板代码。' },
  'sec-dsql-html-desc': { en: 'MyBatis-compatible XML syntax with &lt;if&gt;, &lt;foreach&gt;, &lt;where&gt;, &lt;trim&gt;, and &lt;choose&gt; support.', zh: '兼容 MyBatis 的 XML 语法，支持 &lt;if&gt;、&lt;foreach&gt;、&lt;where&gt;、&lt;trim&gt;、&lt;choose&gt;。' },
  'sec-dsql-py-desc':   { en: 'Python-like syntax for dynamic SQL — concise, readable, and expressive.', zh: '类似 Python 的动态 SQL 语法 — 简洁、可读、表达力强。' },
  'sec-ai-title':   { en: 'AI & Developer Experience',      zh: 'AI 与开发者体验' },
  'sec-ai-sub':     { en: 'Supercharge your RBatis workflow with AI-powered tools', zh: '使用 AI 工具赋能你的 RBatis 开发工作流' },
  'ai-mcp-title':   { en: 'rbdc-mcp',                     zh: 'rbdc-mcp' },
  'ai-mcp-desc':    { en: 'Model Context Protocol server for RBatis — let Claude interact with your database directly through natural language.', zh: 'RBatis 的 MCP 协议服务器 — 让 Claude 通过自然语言直接操作你的数据库。' },
  'ai-mcp-terminal-label': { en: '# Model Context Protocol', zh: '# MCP 协议配置' },
  'ai-skill-title': { en: 'rbatis-skill',                 zh: 'rbatis-skill' },
  'ai-skill-desc':  { en: 'Install the RBatis skill into Claude Code — then simply ask Claude natural questions about using RBatis in your projects.', zh: '将 RBatis 技能安装到 Claude Code 中 — 然后直接通过自然语言向 Claude 询问有关 RBatis 的使用问题。' },
  'ai-skill-terminal-label': { en: '# Ask Claude about RBatis',  zh: '# 向 Claude 询问 RBatis' },
  'sec-db-title':   { en: 'Supported Databases',            zh: '支持的数据库' },
  'sec-db-sub':     { en: 'Any database that implements the rbdc trait — or write your own driver', zh: '任何实现了 rbdc trait 的数据库 — 你也可以自己编写驱动' },
  'sec-eco-title':  { en: 'Ecosystem',                      zh: '生态项目' },
  'sec-eco-sub':    { en: 'Production-ready projects built with RBatis', zh: '基于 RBatis 的生产级项目' },
  'sec-eco-abs':    { en: 'Background user management system — Vue.js + RBatis + Axum', zh: '后台用户管理系统 — Vue.js + RBatis + Axum' },
  'sec-eco-salvo':  { en: 'Permission management system — React + RBatis + Salvo', zh: '后台权限管理系统 — React + RBatis + Salvo' },
  'footer-contrib':  { en: '© RBatis Contributors', zh: '© RBatis Contributors' },
  'footer-github':   { en: 'GitHub',        zh: 'GitHub' },
}

const i18nPlugin = {
  install(app) {
    const lang = ref(getLang())

    function getLang() {
      return localStorage.getItem('rbatis-lang') || 'en'
    }

    function setLang(l) {
      lang.value = l
      localStorage.setItem('rbatis-lang', l)
      document.documentElement.setAttribute('lang', l === 'zh' ? 'zh-CN' : 'en')
    }

    function t(key) {
      const entry = messages[key]
      if (!entry) return key
      return entry[lang.value] || entry.en
    }

    app.provide('lang', readonly(lang))
    app.provide('setLang', setLang)
    app.provide('t', t)

    // Initialize html lang attribute
    document.documentElement.setAttribute('lang', lang.value === 'zh' ? 'zh-CN' : 'en')

    // Also provide for template use
    app.config.globalProperties.$t = t
    app.config.globalProperties.$setLang = setLang
    app.config.globalProperties.$lang = lang
  }
}

export { i18nPlugin, messages }
