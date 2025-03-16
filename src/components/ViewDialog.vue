<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { computed, ref } from 'vue'

export interface ViewDialogField {
  label: string
  prop: string
  formatter?: (value: any) => string | number
}

const props = withDefaults(defineProps<{
  modelValue: boolean
  id?: string | number
  model?: Record<string, any>
  title?: string
  width?: string
  labelWidth?: string
}>(), {
  title: '查看详情',
  width: '40%',
  labelWidth: '80px',
})
const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
const formRef = ref<FormInstance>()
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
  >
    <el-form
      ref="formRef"
      :model="model"
      :label-width="labelWidth"
      disabled
    >
      <slot />
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  color: #666;
  font-weight: 400;
}
</style>
