import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from './routes/mainRoutes'
import equipmentRoutes from './routes/equipmentRoutes'
import userRoutes from './routes/userRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...mainRoutes,
    ...equipmentRoutes,
    ...userRoutes
  ]
})

export default router