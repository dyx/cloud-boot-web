import request from '@/utils/request.ts'

export function getCurrentUserInfo() {
  return request({
    url: '/user/user/current',
    method: 'get',
  })
}

export function getUserPage(params: any) {
  return request({
    url: '/user/user/page',
    method: 'get',
    params,
  })
}

export function listUsers(params: any) {
  return request({
    url: '/user/user/list',
    method: 'get',
    params,
  })
}

export function getUserById(id: string) {
  return request({
    url: `/user/user/${id}`,
    method: 'get',
  })
}

export function saveUser(data: any) {
  return request({
    url: `/user/user`,
    method: 'post',
    data,
  })
}

export function updateUserById(id: string, data: any) {
  return request({
    url: `/user/user/${id}`,
    method: 'put',
    data,
  })
}

export function removeUserById(id: string) {
  return request({
    url: `/user/user/${id}`,
    method: 'delete',
  })
}
