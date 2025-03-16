<script setup lang="ts">
import type { MenuItemVO } from '@/types/commonModel'
import { computed } from 'vue'

const props = defineProps<{
  data: MenuItemVO
}>()

const menuData = computed(() => {
  return props.data
})
</script>

<template>
  <el-sub-menu v-if="menuData.children?.length" :index="menuData.path">
    <template #title>
      <el-icon v-if="menuData.icon">
        <component :is="menuData.icon" />
      </el-icon>
      <span>{{ menuData.name }}</span>
    </template>
    <template v-for="subMenu in menuData.children" :key="subMenu.path">
      <MenuItem :data="subMenu" />
    </template>
  </el-sub-menu>

  <el-menu-item v-else :index="menuData.path">
    <el-icon v-if="menuData.icon">
      <component :is="menuData.icon" />
    </el-icon>
    <template #title>
      {{ menuData.name }}
    </template>
  </el-menu-item>
</template>
