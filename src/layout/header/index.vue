<script setup lang="ts">

</script>

<template>
  <div class="header">
    <el-row align="middle" class="header-inner">
      <el-col :span="12">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/user">用户</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" class="r-content">
        <el-dropdown>
          <div class="user-info">
            <el-avatar size="small" shape="circle" />
            <span class="nickname">
              admin
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.header {
  .header-inner {
    height: var(--el-header-height);
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
        .el-icon--right {
          margin-left: 0;
        }
      }
      .user-info:focus {
        outline: none;
      }
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
