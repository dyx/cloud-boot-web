import type { RouteRecordRaw } from 'vue-router'
import { useUserInfoStore } from '@/stores/userInfo.ts'
import { Session } from '@/utils/storage.ts'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/sys/user',
        name: 'user',
        component: () => import('@/views/sys/user/index.vue'),
      },
      {
        path: '/sys/role',
        name: 'role',
        component: () => import('@/views/sys/role/index.vue'),
      },
      {
        path: '/sys/menu',
        name: 'menu',
        component: () => import('@/views/sys/menu/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = Session.getToken()

  // 已登录状态访问登录页，跳转到首页
  if (to.path === '/login' && token) {
    next('/')
    return
  }

  // 需要登录权限的页面，未登录时跳转到登录页
  if (to.path !== '/login' && !token) {
    next('/login')
    return
  }

  await useUserInfoStore().fetchUserInfo()

  next()
})

export default router
