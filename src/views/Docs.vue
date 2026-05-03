<template>
  <div class="doc-layout">
    <aside class="sidebar" :class="{ active: sidebarOpen }" id="sidebar">
      <div class="sidebar-header">V4 {{ isZh ? '文档' : 'Documentation' }}</div>
      <nav class="sidebar-nav">
        <a
          v-for="h in headings"
          :key="h.id"
          :href="'#' + h.id"
          class="sidebar-link"
          :class="['sidebar-h' + h.level, { active: activeHeading === h.id }]"
          @click.prevent="scrollToHeading(h.id)"
        >{{ h.text }}</a>
      </nav>
    </aside>
    <main class="content-area doc" @click="sidebarOpen = false">
      <div id="content" class="content" v-html="html"></div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, inject, watch } from 'vue'
import { marked } from 'marked'
import readmeEn from '../assets/v4/README.md?raw'
import readmeZh from '../assets/v4/README-zh.md?raw'

const lang = inject('lang')
const isZh = computed(() => lang.value === 'zh')

const html = ref('')
const headings = ref([])
const activeHeading = ref('')
const sidebarOpen = ref(true)

let observer = null

marked.setOptions({ gfm: true, breaks: true })

function renderDoc() {
  const raw = isZh.value ? readmeZh : readmeEn
  html.value = '<div class="content">' + marked.parse(raw) + '</div>'
}

function buildSidebar() {
  nextTick(() => {
    const els = document.querySelectorAll('.content h2, .content h3, .content h4')
    const list = []
    els.forEach((el) => {
      const level = parseInt(el.tagName.slice(1))
      const text = el.textContent.replace(/#$/, '').trim()
      let id = el.id
      if (!id) {
        id = text.toLowerCase().replace(/[^\w\s一-鿿-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
        el.id = id
      }
      list.push({ level, text, id })
    })
    headings.value = list

    // Scroll spy
    if (observer) observer.disconnect()
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeHeading.value = entry.target.id
        }
      })
    }, { rootMargin: '-80px 0px -80% 0px' })
    els.forEach((h) => observer.observe(h))

    // Anchor links
    document.querySelectorAll('.content h2, .content h3, .content h4').forEach((heading) => {
      if (!heading.id) return
      const a = document.createElement('a')
      a.className = 'anchor-link'
      a.href = '#' + heading.id
      a.textContent = '#'
      heading.prepend(a)
    })

    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll()
    }
  })
}

function scrollToHeading(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  sidebarOpen.value = false
}

watch(lang, () => {
  renderDoc()
  buildSidebar()
  document.title = 'RBatis V4 - ' + (isZh.value ? '文档' : 'Documentation')
})

onMounted(() => {
  renderDoc()
  buildSidebar()
  document.title = 'RBatis V4 - ' + (isZh.value ? '文档' : 'Documentation')
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>
