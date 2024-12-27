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
                <v-text-field
                  v-model="username"
                  label="用户名"
                  prepend-icon="mdi-account"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="密码"
                  prepend-icon="mdi-lock"
                  type="password"
                  required
                ></v-text-field>
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
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import RegisterDialog from '@/components/RegisterDialog.vue'
  
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const registerDialog = ref(null)
  
  const login = () => {
    // 这里添加实际的登录逻辑
    isLoggedIn.value = true
    router.push('/')
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