import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from './routes/mainRoutes'
import equipmentRoutes from './routes/equipmentRoutes'
import userRoutes from './routes/userRoutes'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
// import axios from '@/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...mainRoutes,
    ...equipmentRoutes,
    ...userRoutes
  ]
})
// 添加全局路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const userData = JSON.parse(localStorage.getItem('user'));
  const token = userData?.token ?? null;
  // 检查是否需要登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn()) {
    next('/login') // 跳转到登录页面
    return
  }

  // 如果已登录，验证token有效性
  if (userStore.isLoggedIn()) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/verify-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data.valid) {
        userStore.logout()
        next('/')
        return
      }
    } catch (error) {
      console.error('Token验证失败:', error)
      userStore.logout()
      next('/')
      return
    }
  }

  // 检查是否需要管理员权限
  if (to.meta.requiresAdmin && !userStore.isAdmin()) {
    next('/') // 跳转到主页
    return
  }

  next()
})

export default router