import request from '@/utils/request.ts'

export function login(data: any) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}
