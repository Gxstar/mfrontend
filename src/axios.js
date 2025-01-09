import axios from 'axios'
import { API_BASE_URL } from './api'

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 设置默认超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以根据需要添加其他默认请求头
  }
})

export default axiosInstance