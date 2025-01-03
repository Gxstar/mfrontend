import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from './routes/mainRoutes'
import equipmentRoutes from './routes/equipmentRoutes'
import userRoutes from './routes/userRoutes'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...mainRoutes,
    ...equipmentRoutes,
    ...userRoutes
  ]
})
// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 检查是否需要登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn()) {
    next('/login') // 跳转到登录页面
    return
  }

  // 检查是否需要管理员权限
  if (to.meta.requiresAdmin && !userStore.isAdmin()) {
    next('/') // 跳转到主页
    return
  }

  next()
})

export default router