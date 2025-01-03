<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>登录</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" label="用户名" prepend-icon="mdi-account" required></v-text-field>
              <v-text-field v-model="password" label="密码" prepend-icon="mdi-lock" type="password"
                required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="openRegisterDialog">注册</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <RegisterDialog ref="registerDialog" />
  </v-container>
  <!-- 添加snackbar组件 -->
  <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color">
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar.show = false">关闭</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import RegisterDialog from '@/components/RegisterDialog.vue'

const router = useRouter()
const userStore = useUserStore()
const username = ref('')
const password = ref('')
const registerDialog = ref(null)
// 添加snackbar状态
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})
// 检查是否已登录
onMounted(() => {
  if (userStore.isLoggedIn()) {
    router.push('/') // 如果已登录，跳转到主页
  }
})
const login = async () => {
  try {
    // 这里替换为实际的登录API调用
    const response = await fetch('http://127.0.0.1:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      throw new Error('登录失败')
    }

    const userData = await response.json()
    const data = userData.user
    // 使用userStore进行登录
    userStore.login({
      id: data.uuid,
      username: data.username,
      token: userData.token,
      role: data.role,
    })
    // 显示登录成功提示
    snackbar.value = {
      show: true,
      message: '登录成功',
      color: 'success'
    }
    // 延迟跳转
    setTimeout(() => {
      router.push('/');
    }, 1000); // 1秒后跳转
  } catch (error) {
    console.error('登录错误:', error)
    // 这里可以添加错误提示
    // 显示登录失败提示
    snackbar.value = {
      show: true,
      message: '登录失败，请检查用户名和密码',
      color: 'error'
    }
  }
}

const openRegisterDialog = () => {
  registerDialog.value.dialog = true
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>