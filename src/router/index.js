import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Docs from '../views/Docs.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/v4', component: Docs },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
