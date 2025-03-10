<script lang="ts" setup>
import Aside from '@/layout/aside/index.vue'
import Header from '@/layout/header/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <el-header height="48px" class="header">
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
  background-color: #333;
}
.main {
  height: calc(100vh - var(--el-header-height));
}
</style>
