<script setup lang="ts">
import type { SaveRoleDTO } from '@/types/sys/role'
import type { FormRules } from 'element-plus'
import { saveRole } from '@/api/sys/role.ts'
import FormDialog from '@/components/FormDialog.vue'
import { computed, reactive, ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['refresh', 'update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
const form = ref<SaveRoleDTO>({
})
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  description: [
    { max: 256, message: '长度不能超过 256 个字符', trigger: 'blur' },
  ],
})

async function handleSubmit() {
  saveRole(form.value)
    .then(() => {
      emit('refresh')
      dialogVisible.value = false
    })
}
</script>

<template>
  <FormDialog v-model="dialogVisible" title="新增" :model="form" :rules="formRules" @submit="handleSubmit">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
  </FormDialog>
</template>

<style lang="scss" scoped>

</style>
