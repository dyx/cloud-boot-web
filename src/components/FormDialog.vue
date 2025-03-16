<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title: string
  width?: string
  labelWidth?: string
  rules?: FormRules
  inline?: boolean
  model: Record<string, any>
}>(), {
  width: '40%',
  labelWidth: '80px',
  inline: false,
})

const emit = defineEmits(['update:modelValue', 'submit'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()

function handleClose() {
  dialogVisible.value = false
  formRef.value?.resetFields()
}

async function handleSubmit() {
  try {
    const valid = await formRef.value?.validate()
    if (!valid)
      return

    emit('submit', () => {
      dialogVisible.value = false
      formRef.value?.resetFields()
    })
  }
  catch (error) {
    console.error('Form submit error:', error)
  }
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :title="title"
    :width="width"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :inline="inline"
      :model="model"
      :rules="rules"
      :label-width="labelWidth"
    >
      <slot />
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
