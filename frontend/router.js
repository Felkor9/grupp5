// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import profileView from './src/views/profileView.vue';
import homeView from './src/views/homeView.vue';

const routes = [
  { path: '/', name: 'homeView', component: homeView },
  { path: '/profile', name: 'profileView', component: profileView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
