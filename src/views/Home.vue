<template>
  <div>
    <!-- ====== Hero Section ====== -->
    <section class="hero" id="hero">
      <ParticleCanvas />

      <div class="hero-content">
        <div class="hero-title-row">
          <img :src="logoUrl" alt="RBatis" class="hero-logo">
          <h1>RBatis</h1>
        </div>
        <p class="tagline">{{ $t('tagline') }}</p>

        <div class="hero-cta">
          <a href="#/v4" class="btn btn-primary btn-lg">{{ $t('cta-start') }}</a>
        </div>

        <div class="hero-features">
          <div class="feature-card reveal reveal-delay-1">
            <div class="icon">⚡</div>
            <h3>{{ $t('feature-perf-title') }}</h3>
            <p>{{ $t('feature-perf-desc') }}</p>
          </div>
          <div class="feature-card reveal reveal-delay-2">
            <div class="icon">🛡️</div>
            <h3>{{ $t('feature-safe-title') }}</h3>
            <p>{{ $t('feature-safe-desc') }}</p>
          </div>
          <div class="feature-card reveal reveal-delay-3">
            <div class="icon">🔌</div>
            <h3>{{ $t('feature-driver-title') }}</h3>
            <p>{{ $t('feature-driver-desc') }}</p>
          </div>
        </div>

        <div class="terminal-window reveal reveal-delay-4">
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
        <h2 class="section-title reveal">{{ $t('sec-why-title') }}</h2>
        <p class="section-subtitle reveal reveal-delay-1">{{ $t('sec-why-sub') }}</p>
        <div class="feature-grid-6">
          <div class="feature-card-lg reveal reveal-delay-1">
            <div class="icon">⚡</div>
            <h3>{{ $t('sec-why-compile-title') }}</h3>
            <p>{{ $t('sec-why-compile-desc') }}</p>
          </div>
          <div class="feature-card-lg reveal reveal-delay-2">
            <div class="icon">🔄</div>
            <h3>{{ $t('sec-why-mybatis-title') }}</h3>
            <p>{{ $t('sec-why-mybatis-desc') }}</p>
          </div>
          <div class="feature-card-lg reveal reveal-delay-3">
            <div class="icon">🛡️</div>
            <h3>{{ $t('sec-why-safe-title') }}</h3>
            <p>{{ $t('sec-why-safe-desc') }}</p>
          </div>
          <div class="feature-card-lg reveal reveal-delay-4">
            <div class="icon">🚀</div>
            <h3>{{ $t('sec-why-async-title') }}</h3>
            <p>{{ $t('sec-why-async-desc') }}</p>
          </div>
          <div class="feature-card-lg reveal reveal-delay-5">
            <div class="icon">🔌</div>
            <h3>{{ $t('sec-why-driver-title') }}</h3>
            <p>{{ $t('sec-why-driver-desc') }}</p>
          </div>
          <div class="feature-card-lg reveal reveal-delay-6">
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
        <h2 class="section-title reveal">{{ $t('sec-dsql-title') }}</h2>
        <p class="section-subtitle reveal reveal-delay-1">{{ $t('sec-dsql-sub') }}</p>
        <div class="dsql-grid">
          <div class="dsql-card dsql-card-full reveal reveal-delay-1">
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
          <div class="dsql-card reveal reveal-delay-2">
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
          <div class="dsql-card reveal reveal-delay-3">
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

    <!-- ====== Section: AI & Developer Experience ====== -->
    <section class="home-section section-ai" id="section-ai">
      <div class="section-inner">
        <div class="ai-badge reveal">AI</div>
        <h2 class="section-title reveal">{{ $t('sec-ai-title') }}</h2>
        <p class="section-subtitle reveal reveal-delay-1">{{ $t('sec-ai-sub') }}</p>
        <div class="ai-grid">
          <!-- Card: rbdc-mcp -->
          <div class="ai-card reveal reveal-delay-1">
            <div class="ai-card-glow"></div>
            <div class="ai-card-content">
              <div class="ai-card-header">
                <div class="ai-card-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h3>{{ $t('ai-mcp-title') }}</h3>
                  <span class="ai-tag">MCP</span>
                </div>
              </div>
              <p>{{ $t('ai-mcp-desc') }}</p>
              <div class="terminal-window ai-terminal">
                <div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div>
                <div class="terminal-body">
                  <span class="comment">{{ $t('ai-mcp-terminal-label') }}</span><br>
                  <span class="prompt">  </span>{<br>
                  <span class="prompt">  </span>&nbsp;&nbsp;<span class="string">"mcpServers"</span>: {<br>
                  <span class="prompt">  </span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"rbdc-mcp"</span>: {<br>
                  <span class="prompt">  </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"command"</span>: <span class="string">"rbdc-mcp"</span>,<br>
                  <span class="prompt">  </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"args"</span>: [<span class="string">"--database-url"</span>, <span class="string">"sqlite://./database.db"</span>]<br>
                  <span class="prompt">  </span>&nbsp;&nbsp;&nbsp;&nbsp;}<br>
                  <span class="prompt">  </span>&nbsp;&nbsp;}<br>
                  <span class="prompt">  </span>}
                </div>
              </div>
              <a href="https://github.com/rbatis/rbdc-mcp" class="ai-link" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub →
              </a>
            </div>
          </div>

          <!-- Card: rbatis-skill -->
          <div class="ai-card reveal reveal-delay-2">
            <div class="ai-card-glow"></div>
            <div class="ai-card-content">
              <div class="ai-card-header">
                <div class="ai-card-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3>{{ $t('ai-skill-title') }}</h3>
                  <span class="ai-tag">Skill</span>
                </div>
              </div>
              <p>{{ $t('ai-skill-desc') }}</p>
              <div class="terminal-window ai-terminal">
                <div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div>
                <div class="terminal-body">
                  <span class="comment">{{ $t('ai-skill-terminal-label') }}</span><br>
                  <span class="prompt">  </span><span class="comment"># User asks naturally:</span><br>
                  <span class="prompt">$</span> how do I define a table struct with RBatis?<br>
                  <br>
                  <span class="prompt">  </span><span class="comment"># Claude responds with code:</span><br>
                  <span class="prompt">  </span><span class="keyword">#[derive(Clone, Debug, Serialize, Deserialize)]</span><br>
                  <span class="prompt">  </span><span class="keyword">pub struct</span> <span class="function">User</span> {<br>
                  <span class="prompt">  </span>&nbsp;&nbsp;  <span class="keyword">pub</span> id: <span class="keyword">Option</span>&lt;<span class="keyword">i32</span>&gt;,<br>
                  <span class="prompt">  </span>&nbsp;&nbsp;  <span class="keyword">pub</span> name: <span class="keyword">Option</span>&lt;<span class="keyword">String</span>&gt;,<br>
                  <span class="prompt">  </span>}
                </div>
              </div>
              <a href="https://github.com/rbatis/rbatis-skill" class="ai-link" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== Section: Supported Databases ====== -->
    <section class="home-section" id="section-db">
      <div class="section-inner">
        <h2 class="section-title reveal">{{ $t('sec-db-title') }}</h2>
        <p class="section-subtitle reveal reveal-delay-1">{{ $t('sec-db-sub') }}</p>
        <div class="db-grid">
          <a v-for="(db, i) in databases" :key="db.name" :href="db.url" class="db-item reveal" :class="'reveal-delay-' + ((i % 6) + 1)" @click.prevent="openLink(db.url)">
            <img v-if="db.iconUrl" :src="db.iconUrl" alt="" width="22" height="22">
            <span>{{ db.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ====== Section: Ecosystem ====== -->
    <section class="home-section section-alt" id="section-eco">
      <div class="section-inner">
        <h2 class="section-title reveal">{{ $t('sec-eco-title') }}</h2>
        <p class="section-subtitle reveal reveal-delay-1">{{ $t('sec-eco-sub') }}</p>
        <div class="eco-grid">
          <a href="https://github.com/rbatis/abs_admin" class="eco-card reveal reveal-delay-1" target="_blank" rel="noopener">
            <div class="eco-icon">📊</div>
            <h3>abs_admin</h3>
            <p>{{ $t('sec-eco-abs') }}</p>
            <span class="eco-link">View on GitHub →</span>
          </a>
          <a href="https://github.com/feihua/salvo-admin" class="eco-card reveal reveal-delay-2" target="_blank" rel="noopener">
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
import { onMounted, onUnmounted } from 'vue'
import ParticleCanvas from '../components/ParticleCanvas.vue'
import { initScrollReveal } from '../utils/scrollReveal.js'

const logoUrl = new URL('../assets/logo.png', import.meta.url).href

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

function openLink(url) {
  window.open(url, '_blank')
}

let destroyReveal = null

onMounted(() => {
  destroyReveal = initScrollReveal()
})

onUnmounted(() => {
  if (destroyReveal) destroyReveal()
})
</script>
