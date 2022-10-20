import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DashboardView from '../views/DashboardView.vue'
import AccessView from '../views/AccessView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import RecoverView from '../views/RecoverView.vue'
import VerifyView from '../views/VerifyView.vue'

// import { auth } from '@/firebase'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/access',
    name: 'access',
    component: AccessView,
    meta: {
      notAuthOnly: true
    }
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      notAuthOnly: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      notAuthOnly: true
    }
  },
  {
    path: '/recover',
    name: 'recover',
    component: RecoverView,
    meta: {
      notAuthOnly: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/PageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/* router.beforeEach((to, from, next) => {
  console.log('router.beforeEach : RESULT')
  console.log('from: ' + from.path + ' to: ' + to.path)
  // console.log(from.path)
  // console.log(to.path)
  // console.log(to.matched.some(record => record.meta.requiresAuth))
  // console.log(auth.currentUser)
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  // if (router.currentRoute.value.path === '/dashboard') {
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    console.log('path requires login')
    next('/login')
  } else {
    console.log('login mot required')
    next()
  }
}) */

export default router
