<script setup lang="ts">
import logo from '@/assets/vite.svg'
import MenuItem from '@/layout/aside/MenuItem.vue'
import { useLayoutStore } from '@/stores/layout.ts'
import { useUserInfoStore } from '@/stores/userInfo.ts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userInfoStore = useUserInfoStore()
const layoutStore = useLayoutStore()
const activeMenu = computed(() => route.path)
const menuData = computed(() => userInfoStore.menuList)
const isCollapse = computed(() => layoutStore.isCollapse)

function toggleCollapse() {
  layoutStore.toggleCollapse()
}
</script>

<template>
  <el-aside class="aside" :style="{ width: isCollapse ? 'var(--el-aside-collapse-width)' : 'var(--el-aside-width)' }">
    <div class="logo-container" :class="{ 'is-collapse': isCollapse }">
      <div class="logo-wrapper">
        <img :src="logo" alt="logo" class="logo">
        <transition name="fade-slide">
          <span v-show="!isCollapse" class="text">Cloud Boot</span>
        </transition>
      </div>
    </div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      class="menu"
    >
      <template v-for="item in menuData" :key="item.path">
        <MenuItem :data="item" />
      </template>
    </el-menu>
    <div class="collapse-button" @click="toggleCollapse">
      <el-icon :class="{ 'rotate-180': isCollapse }">
        <arrow-left />
      </el-icon>
    </div>
  </el-aside>
</template>

<style lang="scss" scoped>
.aside {
  background-color: #545c64;
  position: relative;
  transition: width 0.3s ease;

  .logo-container {
    height: var(--el-header-height);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &.is-collapse {
      .logo-wrapper {
        justify-content: center;
        padding: 0 8px;
      }
    }

    .logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 16px;
      transition: all 0.3s ease;

      .logo {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        transition: transform 0.3s ease;
      }

      .text {
        margin-left: 8px;
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .fade-slide {
      &-enter-active,
      &-leave-active {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transition-property: opacity, transform;
      }

      &-enter-from,
      &-leave-to {
        opacity: 0;
        transform: translateX(-16px);
      }

      &-enter-to,
      &-leave-from {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
  .menu {
    border-right: none;
    height: calc(100vh - var(--el-header-height));
  }
  .collapse-button {
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &:hover {
      background: #f5f7fa;
      transform: translateY(-50%) scale(1.1);
    }

    .el-icon {
      transition: transform 0.3s;
      font-size: 12px;
      color: #666;
      margin-left: -4px;

      &.rotate-180 {
        transform: rotate(180deg) translateX(2px);
      }
    }
  }
}
</style>
