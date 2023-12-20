import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import {auth} from "@/firebase/config";


// @ts-ignore
const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({name: 'login'})
  } else {
    next()
  }
}

// @ts-ignore
const userAuth = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
    next({name: 'app'})
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: userAuth

    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      beforeEnter: userAuth

    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: userAuth

    },
    {
      path: '/app',
      name: 'app',
      component: () => import('../views/AppView.vue'),
      beforeEnter: requireAuth

    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      beforeEnter: requireAuth
    },
  ]
})

export default router
