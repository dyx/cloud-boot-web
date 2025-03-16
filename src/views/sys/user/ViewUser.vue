<script setup lang="ts">
import type { ViewUserVO } from '@/types/sys/user'
import { getUserById } from '@/api/sys/user'
import ViewDialog from '@/components/ViewDialog.vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  id: string
}>()
const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
const form = ref<ViewUserVO>({})

function handleInit() {
  getUserById(props.id).then(res => form.value = res.data)
}

watch(() => props.modelValue, (value) => {
  if (value) {
    handleInit()
  }
})
</script>

<template>
  <ViewDialog v-model="dialogVisible">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="form.nickname" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="form.status" />
    </el-form-item>
  </ViewDialog>
</template>
