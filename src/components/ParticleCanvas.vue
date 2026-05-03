<template>
  <canvas id="particles-canvas"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { initParticles, destroyParticles } from '../utils/particles.js'

onMounted(() => initParticles('particles-canvas'))
onUnmounted(() => destroyParticles())
</script>
