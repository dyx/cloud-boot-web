<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { Refresh, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

defineProps({
  form: {},
})

const emit = defineEmits(['search'])

const formRef = ref<FormInstance>()
const searchVisible = ref(true)

function handleSearch() {
  emit('search')
}

function handleReset() {
  formRef.value?.resetFields()
  handleSearch()
}
</script>

<template>
  <div>
    <el-row v-show="searchVisible" class="search">
      <el-form ref="formRef" inline :model="form">
        <slot name="form-items" />
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            查询
          </el-button>
          <el-button @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row class="operation" align="middle">
      <el-col :span="16" class="left">
        <slot name="left-actions" />
      </el-col>
      <el-col :span="8" class="right">
        <el-tooltip :content="searchVisible ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button circle :icon="Search" @click="searchVisible = !searchVisible" />
        </el-tooltip>
        <el-tooltip content="刷新" placement="top">
          <el-button circle :icon="Refresh" @click="handleSearch" />
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.operation {
  padding-bottom: 8px;

  .left {
    display: flex;
    gap: 8px;
  }

  .right {
    text-align: right;
  }
}
</style>
