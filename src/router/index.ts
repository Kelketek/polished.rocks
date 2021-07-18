import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'RockPicker',
    component: () => import('../views/RockPicker.vue')
  },
  {
    path: '/import',
    name: 'Import',
    component: () => import('../views/Import.vue')
  },
  {
    path: '/tumbler',
    name: 'Tumbler',
    component: () => import('../views/Tumbler.vue')
  },
  {
    path: '/wash',
    name: 'Wash',
    component: () => import('../views/Wash.vue')
  },
  {
    path: '/hackathon',
    name: 'Credits',
    component: () => import('../views/Credits.vue')
  },
  {
    path: '/trophy',
    name: 'Trophy',
    component: () => import('../views/Trophy.vue')
  },
  {
    path: '/shared',
    name: 'Shared',
    component: () => import('../views/Shared.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
