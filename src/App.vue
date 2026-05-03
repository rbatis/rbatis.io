<template>
  <TopNav />
  <router-view />
  <SiteFooter />
  <button class="back-to-top" id="backToTop" aria-label="Back to top"
    :class="{ visible: showBackBtn }" @click="scrollToTop">&uarr;</button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TopNav from './components/TopNav.vue'
import SiteFooter from './components/SiteFooter.vue'

const showBackBtn = ref(false)

function onScroll() {
  showBackBtn.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
