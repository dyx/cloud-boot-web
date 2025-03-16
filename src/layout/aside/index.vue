<script setup lang="ts">
import MenuItem from '@/layout/aside/MenuItem.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  collapsed: boolean
  menuData: any
}>()

const route = useRoute()

const activeMenu = computed(() => route.path)
</script>

<template>
  <el-aside width="200px" class="aside">
    <div class="logo">
      Cloud Boot
    </div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :default-active="activeMenu"
      :collapse="props.collapsed"
      router
      class="el-menu-vertical"
    >
      <template v-for="item in menuData" :key="item.path">
        <MenuItem :data="item" />
      </template>
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
