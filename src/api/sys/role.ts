import request from '@/utils/request.ts'

export function getRolePage(params: any) {
  return request({
    url: '/user/role/page',
    method: 'get',
    params,
  })
}

export function listRolesByUserId(userId: string) {
  return request({
    url: `/user/role/user/${userId}`,
    method: 'get',
  })
}

export function getRoleById(id: string) {
  return request({
    url: `/user/role/${id}`,
    method: 'get',
  })
}

export function saveRole(data: any) {
  return request({
    url: `/user/role`,
    method: 'post',
    data,
  })
}

export function updateRoleById(id: string, data: any) {
  return request({
    url: `/user/role/${id}`,
    method: 'put',
    data,
  })
}

export function removeRoleById(id: string) {
  return request({
    url: `/user/role/${id}`,
    method: 'delete',
  })
}
