

// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ConfiguratorView from '../views/ConfiguratorView.vue';
import SummaryView from '../views/SummaryView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/configurator',
    name: 'configurator',
    component: ConfiguratorView
  },
  {
    path: '/summary',
    name: 'summary',
    component: SummaryView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
