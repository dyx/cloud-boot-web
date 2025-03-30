export interface Page<T> {
  total?: number
  records?: T[]
}

interface UserInfoVO {
  nickname: string
  menuList: MenuItemVO[]
  permissionList: string[]
  roleList: string[]
}

interface MenuItemVO {
  id?: string
  name?: string
  path?: string
  icon?: string
  children?: MenuItemVO[]
}
