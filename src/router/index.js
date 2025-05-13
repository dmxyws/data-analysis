import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home' // 根路径重定向到 /home
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue') // 首页组件
  },
  {
    path: '/:pathMatch(.*)*', // 匹配所有未定义的路由
    name: 'NotFound',
    component: () => import('../views/NotFound.vue') // 404页
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
