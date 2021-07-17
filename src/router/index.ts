import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'RockPicker',
    component: () => import('../views/RockPicker.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
