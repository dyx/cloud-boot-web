export interface SaveUserDTO {
  username?: string
  name?: string
  password?: string
  nickname?: string
  email?: string
  phone?: string
  status?: string
}

export interface UpdateUserDTO {
  username?: string
  name?: string
  nickname?: string
  email?: string
  phone?: string
  status?: string
}

export interface ViewUserVO {
  username?: string
  name?: string
  nickname?: string
  email?: string
  phone?: string
  status?: string
}
