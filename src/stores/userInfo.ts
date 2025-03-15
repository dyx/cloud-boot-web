import type { UserInfo } from '@/types/commonModel'
import { getCurrentUserInfo } from '@/api/sys/user.ts'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
  state: (): UserInfo => ({
    nickname: '',
    permissionList: [],
    roleList: [],
  }),
  actions: {
    async fetchUserInfo() {
      try {
        const res = await getCurrentUserInfo()
        this.$patch(res.data)
      }
      catch (error) {
        this.clearUserInfo()
        throw error
      }
    },
    clearUserInfo() {
      this.$reset()
    },
    hasPermission(code: string | string[]): boolean {
      if (!this.permissionList.length)
        return false

      if (Array.isArray(code)) {
        return code.some(c => this.permissionList.includes(c))
      }
      return this.permissionList.includes(code)
    },
  },
})
