<template>
  <div>
    <!-- ====== Hero Section ====== -->
    <section class="hero" id="hero">
      <ParticleCanvas />

      <div class="hero-content">
        <img :src="logoUrl" alt="RBatis" class="hero-logo">

        <h1>RBatis</h1>
        <p class="tagline">{{ $t('tagline') }}</p>

        <div class="hero-cta">
          <a href="#/v4" class="btn btn-primary btn-lg">{{ $t('cta-start') }}</a>
        </div>

        <div class="hero-features">
          <div class="feature-card">
            <div class="icon">⚡</div>
            <h3>{{ $t('feature-perf-title') }}</h3>
            <p>{{ $t('feature-perf-desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="icon">🛡️</div>
            <h3>{{ $t('feature-safe-title') }}</h3>
            <p>{{ $t('feature-safe-desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="icon">🔌</div>
            <h3>{{ $t('feature-driver-title') }}</h3>
            <p>{{ $t('feature-driver-desc') }}</p>
          </div>
        </div>

        <div class="terminal-window">
          <div class="terminal-header">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
          </div>
          <div class="terminal-body">
            <span class="comment">{{ $t('terminal-cargo') }}</span><br>
            <span class="prompt">$</span> cargo add rbatis<br>
            <br>
            <span class="comment">{{ $t('terminal-start') }}</span><br>
            <span class="prompt">$</span> <span class="keyword">let</span> rb = <span class="keyword">RBatis</span>::<span class="function">new</span>();<br>
            <span class="prompt">$</span> rb.<span class="function">init</span>(<br>
            <span class="prompt">$</span> &nbsp;&nbsp;<span class="keyword">rbdc_sqlite</span>::<span class="keyword">driver</span>::<span class="function">SqliteDriver</span> {},<br>
            <span class="prompt">$</span> &nbsp;&nbsp;<span class="string">"sqlite://target/sqlite.db"</span><br>
            <span class="prompt">$</span> )?;<br>
            <span class="prompt">$</span> <span class="keyword">let</span> table: <span class="keyword">Vec</span>&lt;Activity&gt; = rb.<span class="function">exec_decode</span>(<span class="string">"select * from activity limit ?"</span>, vec![<span class="function">value!</span>(<span class="keyword">1</span>)]).<span class="keyword">await</span>?;<br>
            <span class="cursor"></span>
          </div>
        </div>

        <div class="scroll-down">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </div>

      <div class="scroll-indicator"><span></span></div>
    </section>

    <!-- ====== Section: Why RBatis ====== -->
    <section class="home-section" id="section-why">
      <div class="section-inner">
        <h2 class="section-title">{{ $t('sec-why-title') }}</h2>
        <p class="section-subtitle">{{ $t('sec-why-sub') }}</p>
        <div class="feature-grid-6">
          <div class="feature-card-lg">
            <div class="icon">⚡</div>
            <h3>{{ $t('sec-why-compile-title') }}</h3>
            <p>{{ $t('sec-why-compile-desc') }}</p>
          </div>
          <div class="feature-card-lg">
            <div class="icon">🔄</div>
            <h3>{{ $t('sec-why-mybatis-title') }}</h3>
            <p>{{ $t('sec-why-mybatis-desc') }}</p>
          </div>
          <div class="feature-card-lg">
            <div class="icon">🛡️</div>
            <h3>{{ $t('sec-why-safe-title') }}</h3>
            <p>{{ $t('sec-why-safe-desc') }}</p>
          </div>
          <div class="feature-card-lg">
            <div class="icon">🚀</div>
            <h3>{{ $t('sec-why-async-title') }}</h3>
            <p>{{ $t('sec-why-async-desc') }}</p>
          </div>
          <div class="feature-card-lg">
            <div class="icon">🔌</div>
            <h3>{{ $t('sec-why-driver-title') }}</h3>
            <p>{{ $t('sec-why-driver-desc') }}</p>
          </div>
          <div class="feature-card-lg">
            <div class="icon">🧩</div>
            <h3>{{ $t('sec-why-plugin-title') }}</h3>
            <p>{{ $t('sec-why-plugin-desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== Section: Dynamic SQL ====== -->
    <section class="home-section section-alt" id="section-dsql">
      <div class="section-inner">
        <h2 class="section-title">{{ $t('sec-dsql-title') }}</h2>
        <p class="section-subtitle">{{ $t('sec-dsql-sub') }}</p>
        <div class="dsql-grid">
          <div class="dsql-card dsql-card-full">
            <div class="dsql-label">crud!</div>
            <p>{{ $t('sec-dsql-crud-desc') }}</p>
            <div class="terminal-window dsql-terminal">
              <div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div>
              <div class="terminal-body">
                <span class="prompt">  </span><span class="comment">// One macro = full CRUD</span><br>
                <span class="prompt">  </span><span class="keyword">rbatis</span>::<span class="function">crud!</span>(<span class="keyword">BizActivity</span> {});<br>
                <br>
                <span class="prompt">  </span><span class="comment">// Built-in functions:</span><br>
                <span class="prompt">  </span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">insert</span>(&rb, &table).<span class="keyword">await</span>?;<br>
                <span class="prompt">  </span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">insert_batch</span>(&rb, &tables, <span class="keyword">10</span>).<span class="keyword">await</span>?;<br>
                <span class="prompt">  </span><span class="keyword">let</span> data = <span class="keyword">BizActivity</span>::<span class="function">select_by_map</span>(&rb, <span class="function">value!</span>{<span class="string">"id"</span>:<span class="string">"1"</span>}).<span class="keyword">await</span>?;<br>
                <span class="prompt">  </span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">update_by_map</span>(&rb, &table, <span class="function">value!</span>{<span class="string">"id"</span>:&table.id}).<span class="keyword">await</span>?;<br>
                <span class="prompt">  </span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">delete_by_map</span>(&rb, <span class="function">value!</span>{<span class="string">"id"</span>:<span class="string">"1"</span>}).<span class="keyword">await</span>?;
              </div>
            </div>
          </div>
          <div class="dsql-card">
            <div class="dsql-label">html_sql</div>
            <p v-html="$t('sec-dsql-html-desc')"></p>
            <div class="terminal-window dsql-terminal">
              <div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div>
              <div class="terminal-body">
                <span class="comment">&lt;select id="select_by_condition"&gt;</span><br>
                <span class="prompt">  </span>`select * from biz_activity`<br>
                <span class="prompt">  </span><span class="keyword">&lt;where&gt;</span><br>
                <span class="prompt">    </span><span class="keyword">&lt;if</span> test=<span class="string">"name != ''"</span><span class="keyword">&gt;</span><br>
                <span class="prompt">      </span>` and name like <span class="string">#{name}</span>`<br>
                <span class="prompt">    </span><span class="keyword">&lt;/if&gt;</span><br>
                <span class="prompt">  </span><span class="keyword">&lt;/where&gt;</span><br>
                <span class="keyword">&lt;/select&gt;</span>
              </div>
            </div>
          </div>
          <div class="dsql-card">
            <div class="dsql-label">py_sql</div>
            <p>{{ $t('sec-dsql-py-desc') }}</p>
            <div class="terminal-window dsql-terminal">
              <div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div>
              <div class="terminal-body">
                <span class="comment"># py_sql example</span><br>
                <span class="prompt">  </span>`select * from user`<br>
                <span class="prompt">  </span><span class="keyword">where</span> :<br>
                <span class="prompt">    </span><span class="keyword">if</span> name != <span class="string">''</span>:<br>
                <span class="prompt">      </span>` and name=<span class="string">#{name}</span>`<br>
                <span class="prompt">    </span><span class="keyword">if</span> delete_flag != <span class="keyword">0</span>:<br>
                <span class="prompt">      </span>` and delete_flag = <span class="keyword">0</span>`
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== Section: Supported Databases ====== -->
    <section class="home-section" id="section-db">
      <div class="section-inner">
        <h2 class="section-title">{{ $t('sec-db-title') }}</h2>
        <p class="section-subtitle">{{ $t('sec-db-sub') }}</p>
        <div class="db-grid">
          <a v-for="db in databases" :key="db.name" :href="db.url" class="db-item" @click.prevent="openLink(db.url)">
            <img v-if="db.iconUrl" :src="db.iconUrl" alt="" width="22" height="22">
            <span>{{ db.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ====== Section: Ecosystem ====== -->
    <section class="home-section section-alt" id="section-eco">
      <div class="section-inner">
        <h2 class="section-title">{{ $t('sec-eco-title') }}</h2>
        <p class="section-subtitle">{{ $t('sec-eco-sub') }}</p>
        <div class="eco-grid">
          <a href="https://github.com/rbatis/abs_admin" class="eco-card" target="_blank" rel="noopener">
            <div class="eco-icon">📊</div>
            <h3>abs_admin</h3>
            <p>{{ $t('sec-eco-abs') }}</p>
            <span class="eco-link">View on GitHub →</span>
          </a>
          <a href="https://github.com/feihua/salvo-admin" class="eco-card" target="_blank" rel="noopener">
            <div class="eco-icon">🔐</div>
            <h3>salvo_admin</h3>
            <p>{{ $t('sec-eco-salvo') }}</p>
            <span class="eco-link">View on GitHub →</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import ParticleCanvas from '../components/ParticleCanvas.vue'

const logoUrl = new URL('../assets/logo.png', import.meta.url).href

function openLink(url) {
  window.open(url, '_blank')
}

const mssqlIcon = new URL('../assets/db-icons/mssql.svg', import.meta.url).href
const oracleIcon = new URL('../assets/db-icons/oracle.svg', import.meta.url).href
const tdengineIcon = new URL('../assets/db-icons/tdengine.svg', import.meta.url).href

const databases = [
  { name: 'MySQL', url: 'https://crates.io/crates/rbdc-mysql', iconUrl: 'https://cdn.simpleicons.org/mysql/42b983' },
  { name: 'PostgreSQL', url: 'https://crates.io/crates/rbdc-pg', iconUrl: 'https://cdn.simpleicons.org/postgresql/42b983' },
  { name: 'SQLite', url: 'https://crates.io/crates/rbdc-sqlite', iconUrl: 'https://cdn.simpleicons.org/sqlite/42b983' },
  { name: 'MSSQL', url: 'https://crates.io/crates/rbdc-mssql', iconUrl: mssqlIcon },
  { name: 'Turso', url: 'https://crates.io/crates/rbdc-turso', iconUrl: 'https://cdn.simpleicons.org/turso/42b983' },
  { name: 'DuckDB', url: 'https://crates.io/crates/rbdc-duckdb', iconUrl: 'https://cdn.simpleicons.org/duckdb/42b983' },
  { name: 'MariaDB', url: 'https://crates.io/crates/rbdc-mysql', iconUrl: 'https://cdn.simpleicons.org/mariadb/42b983' },
  { name: 'TiDB', url: 'https://crates.io/crates/rbdc-mysql', iconUrl: 'https://cdn.simpleicons.org/tidb/42b983' },
  { name: 'CockroachDB', url: 'https://crates.io/crates/rbdc-pg', iconUrl: 'https://cdn.simpleicons.org/cockroachlabs/42b983' },
  { name: 'Oracle', url: 'https://crates.io/crates/rbdc-oracle', iconUrl: oracleIcon },
  { name: 'TDengine', url: 'https://crates.io/crates/rbdc-tdengine', iconUrl: tdengineIcon },
]
</script>
