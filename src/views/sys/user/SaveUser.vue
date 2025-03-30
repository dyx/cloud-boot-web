<script setup lang="ts">
import type { SaveUserDTO } from '@/types/sys/user'
import type { FormRules } from 'element-plus'
import { saveUser } from '@/api/sys/user.ts'
import FormDialog from '@/components/FormDialog.vue'
import { computed, reactive, ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['refresh', 'update:modelValue'])

const statusOptions = reactive([
  {
    value: '1',
    label: '启用',
  },
  {
    value: '2',
    label: '停用',
  },
])
const dialogVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
const form = ref<SaveUserDTO>({
  status: '1',
})
const formRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' },
  ],
  nickname: [
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { max: 30, message: '最长 30 个字符', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'blur' },
  ],
})

async function handleSubmit() {
  saveUser(form.value)
    .then(() => {
      emit('refresh')
      dialogVisible.value = false
    })
}
</script>

<template>
  <FormDialog v-model="dialogVisible" title="新增" :model="form" :rules="formRules" @submit="handleSubmit">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" />
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
      <el-select v-model="form.status">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </FormDialog>
</template>

<style lang="scss" scoped>

</style>
