import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/wizard',
    name: 'Wizard',
    component: () => import('../views/WizardView.vue')
  },
  {
    path: '/fivecrowns',
    name: 'FiveCrowns',
    component: () => import('../views/FiveCrowns.vue')
  },
  {
    path: '/golf',
    name: 'Golf',
    component: () => import('../views/GolfView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
