import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    {
      name: 'nojekyll',
      closeBundle() {
        const dest = resolve(__dirname, 'docs/.nojekyll')
        writeFileSync(dest, '')
      },
    },
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
