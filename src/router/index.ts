import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }, // Richiede autenticazione
    },
  ],
})

// Route Guard per proteggere l'area admin
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Rotta protetta - verifica autenticazione
    if (!authStore.checkAuth()) {
      // Non autenticato - reindirizza al login
      next({ name: 'admin-login' })
    } else {
      // Autenticato - procedi
      next()
    }
  } else if (to.name === 'admin-login' && authStore.checkAuth()) {
    // Già autenticato e cerca di accedere al login - reindirizza all'admin
    next({ name: 'admin' })
  } else {
    // Rotta pubblica - procedi
    next()
  }
})

export default router
