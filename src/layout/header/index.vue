<script setup lang="ts">
import { logout } from '@/api/login.ts'
import { useUserInfoStore } from '@/stores/userInfo.ts'
import { Session } from '@/utils/storage.ts'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfoStore = useUserInfoStore()

function handleCommand(command: string) {
  if (command === 'logout') {
    logout().then(() => {
      Session.clear()
      router.push('/login')
    })
  }
}
</script>

<template>
  <el-row align="middle" class="header-inner">
    <el-col :span="12" />
    <el-col :span="12" class="r-content">
      <el-dropdown @command="handleCommand">
        <div class="user-info">
          <el-avatar size="small" shape="circle" />
          <span class="nickname">
            {{ userInfoStore.$state.nickname }}
            <el-icon class="arrow-down">
              <ArrowDown />
            </el-icon>
          </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="personalInfo">
              个人信息
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.header-inner {
  height: var(--header-height);
  .r-content {
    text-align: right;
    .user-info {
      display: flex;
      align-items: center;
      .nickname {
        margin-left: 6px;
        cursor: pointer;
        color: #fff;
      }
      .arrow-down {
        margin-left: 0;
      }
    }
    .user-info:focus {
      outline: none;
    }
  }
}
:deep(.el-breadcrumb__inner a) {
  color: #fff !important;
  cursor: pointer !important;
}
:deep(.el-breadcrumb__inner.is-link) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
