import request from '@/utils/request.ts'

export function login(data: any) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}
