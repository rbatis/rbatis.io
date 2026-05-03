<template>
  <footer class="site-footer">
    <p>
      <span>{{ $t('footer-contrib') }}</span> &mdash;
      <a :href="githubUrl" target="_blank" rel="noopener">{{ $t('footer-github') }}</a>
    </p>
  </footer>
</template>

<script setup>
const githubUrl = 'https://github.com/rbatis/rbatis'
</script>
