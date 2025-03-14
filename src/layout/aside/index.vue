<script setup lang="ts">
const menuList = [
  {
    menuId: 0,
    name: '首页',
    path: '/home',
  },
  {
    menuId: 1,
    name: '用户管理',
    path: '/user',
  },
  {
    menuId: 2,
    name: '菜单管理',
    path: '/menu',
  },
]
function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}
</script>

<template>
  <el-aside width="200px" class="aside">
    <div class="logo">
      Cloud Boot
    </div>
    <el-menu
      router
      background-color="#545c64"
      text-color="#fff"
      default-active="1"
      class="menu"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item v-for="item in menuList" :key="item.menuId" :index="item.path">
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.aside {
  background-color: #545c64;
  .logo {
    height: var(--el-header-height);
    line-height: var(--el-header-height);
    width: var(--el-aside-width);
    text-align: center;
    color: #fff;
  }
  .menu {
    border-right: none;
    height: calc(100vh - var(--el-header-height));
  }
}
</style>
