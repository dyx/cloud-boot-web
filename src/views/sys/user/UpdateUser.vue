<script setup lang="ts">
import type { SaveUserDTO } from '@/types/sys/user'
import type { FormInstance } from 'element-plus'
import { getUserById, updateUserById } from '@/api/sys/user.ts'
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  id: string
}>()
const emit = defineEmits(['refresh', 'update:visible'])

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
  get: () => props.visible,
  set: val => emit('update:visible', val),
})
const formRef = ref<FormInstance>()
const form = ref<SaveUserDTO>({})
const formRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
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

function handleInit() {
  getUserById(props.id).then(res => form.value = res.data)
}
function handleClose() {
  dialogVisible.value = false
  formRef.value?.resetFields()
}
async function handleSubmit() {
  const valid = await formRef.value?.validate()
  if (!valid)
    return
  updateUserById(props.id, form.value)
    .then(() => {
      dialogVisible.value = false
      formRef.value!.resetFields()
    })
    .finally(() => emit('refresh'))
}

watch(() => props.id, () => {
  handleInit()
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="新增" width="40%" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="formRules" label-width="80px">
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
        <el-select v-model="form.status">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>
