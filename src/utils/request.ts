import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useUserInfoStore } from '@/stores/userInfo.ts'
import { Session } from '@/utils/storage.ts'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = Session.getToken()
    if (token) {
      config.headers!.Authorization = `${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use((response: AxiosResponse<any>) => {
  if (response.data.code !== 0) {
    ElMessage.error(response.data.msg)
    throw response.data
  }
  return response.data
}, (error) => {
  const status = Number(error.response.status) || 200
  if (status === 401) {
    ElMessageBox.alert('令牌已过期，请重新登录', '', {
      callback: () => {
        Session.clear()
        useUserInfoStore().clearUserInfo()
        window.location.href = '/login'
      },
    })
  }
  if (status === 500) {
    ElMessage.error('内部服务器错误')
  }
  return Promise.reject(error.response.data)
})

export default service
