// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import profileView from './src/views/profileView.vue';
import homeView from './src/views/homeView.vue';
import destinationView from './src/views/destinationView.vue';

const routes = [
  { path: '/', name: 'homeView', component: homeView },
  { path: '/profile', name: 'profileView', component: profileView },
  { path: '/destination', name: 'destinationView', component: destinationView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
