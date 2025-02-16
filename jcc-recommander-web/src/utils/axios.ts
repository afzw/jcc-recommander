import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const requester: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// **请求拦截器**
requester.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可以在这里添加 Token 或其他请求前的处理逻辑
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// **响应拦截器**
requester.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response, // 这里确保返回的类型是 T，而不是 AxiosResponse<T>
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

export default requester
