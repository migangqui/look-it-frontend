import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import ProfileView from './views/ProfileView.vue';
import WardrobeView from './views/WardrobeView.vue';
import { authStore } from './stores/auth_store.js';

const routes = [
  { path: '/', component: HomeView },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/wardrobe',
    component: WardrobeView,
    meta: { requiresAuth: true }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});
