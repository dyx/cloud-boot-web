<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/login.ts'
import { useUserInfoStore } from '@/stores/userInfo.ts'
import { rsaEncrypt } from '@/utils/crypto.ts'
import { Session } from '@/utils/storage.ts'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import './login.scss'

interface LoginForm {
  username: string
  password: string
}

const remember = ref(false)
const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  username: 'admin',
  password: '123456',
})

const rules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
})

async function handleLogin() {
  if (!loginFormRef.value)
    return
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loginForm.password = await rsaEncrypt(loginForm.password)
      const loginRes = await login(loginForm)
      Session.setToken(loginRes.data.tokenValue)

      await useUserInfoStore().fetchUserInfo()

      router.push('/home')
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="particles-bg">
      <div v-for="n in 60" :key="n" class="particle" />
    </div>

    <div class="login-form">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        @submit.prevent="handleLogin"
      >
        <h2 class="form-title">
          欢迎登录
        </h2>

        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            class="login-btn"
          >
            立即登录
          </el-button>
        </el-form-item>

        <div class="form-footer">
          <el-checkbox v-model="remember">
            记住我
          </el-checkbox>
          <el-link type="info">
            忘记密码？
          </el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
