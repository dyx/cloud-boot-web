<script lang="ts" setup>
import Aside from '@/layout/aside/index.vue'
import Header from '@/layout/header/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <el-header class="header">
          <Header />
        </el-header>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.header {
  --el-header-height: var(--header-height);
  background-color: var(--header-background-color);
}
.main {
  --el-main-padding: var(--main-padding);
  margin: var(--main-margin);
  height: calc(100vh - var(--header-height) - var(--el-main-padding) * 2 - var(--main-margin) * 2);
  border: 1px solid #e4e7ed;
  background-color: var(--main-background-color);
}
</style>
