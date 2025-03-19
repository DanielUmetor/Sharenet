import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ContactPage from '@/views/ContactPage.vue';
import WorkshopsPage from '@/views/WorkshopsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  },
  {
    path: '/workshops',
    name: 'Workshops',
    component: WorkshopsPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;