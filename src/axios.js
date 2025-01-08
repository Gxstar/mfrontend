import axios from 'axios'
import { API_BASE_URL } from './api'

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL
})

export default axiosInstance