<template>
  <nav class="topbar">
    <div class="topbar-inner">
      <router-link class="topbar-brand" to="/">
        <img :src="logoUrl" alt="RBatis">
        <span>RBatis</span>
      </router-link>
      <button class="topbar-toggle" id="navToggle" aria-label="Toggle menu"
        @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </button>
      <div class="topbar-links" :class="{ open: menuOpen }" id="navLinks">
        <router-link to="/" class="nav-link" @click="closeMenu">{{ $t('nav-home') }}</router-link>
        <router-link to="/v4" class="nav-link" @click="closeMenu">{{ $t('nav-v4-docs') }}</router-link>
        <div class="lang-toggle">
          <button class="lang-btn" :class="{ active: lang === 'en' }" @click="setLang('en')">EN</button>
          <button class="lang-btn" :class="{ active: lang === 'zh' }" @click="setLang('zh')">中文</button>
        </div>
        <a :href="githubUrl" class="nav-link github-link" target="_blank" rel="noopener" aria-label="GitHub">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, inject } from 'vue'

const lang = inject('lang')
const setLang = inject('setLang')
const menuOpen = ref(false)
const githubUrl = 'https://github.com/rbatis/rbatis'
const logoUrl = new URL('../assets/logo.png', import.meta.url).href

function closeMenu() { menuOpen.value = false }
</script>

<style scoped>
/* Vue Router adds router-link-active class automatically */
.nav-link.router-link-active {
  color: var(--green-400);
  background: rgba(66, 185, 131, 0.15);
}
</style>
