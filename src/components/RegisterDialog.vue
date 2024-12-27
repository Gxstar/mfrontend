<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>注册</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="register">
            <v-text-field
              v-model="username"
              label="用户名"
              prepend-icon="mdi-account"
              :rules="[v => !!v || '用户名不能为空']"
              required
            ></v-text-field>
            
            <v-text-field
              v-model="phone"
              label="手机号"
              prepend-icon="mdi-phone"
              :rules="[v => !!v || '手机号不能为空']"
              required
            ></v-text-field>
            
            <v-text-field
              v-model="password"
              label="密码"
              prepend-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :rules="[v => !!v || '密码不能为空']"
              required
            ></v-text-field>
            
            <v-text-field
              v-model="confirmPassword"
              label="确认密码"
              prepend-icon="mdi-lock-check"
              :type="showPassword ? 'text' : 'password'"
              :error="!passwordMatch"
              :error-messages="passwordMatch ? '' : '密码不一致'"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="register" :disabled="!formValid">注册</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const dialog = ref(false)
  const username = ref('')
  const phone = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const showPassword = ref(false)
  
  const passwordMatch = computed(() => {
    return password.value === confirmPassword.value
  })
  
  const formValid = computed(() => {
    return username.value && phone.value && password.value && passwordMatch.value
  })
  
  const register = () => {
    // 这里添加注册逻辑
    dialog.value = false
  }
  
  defineExpose({
    dialog
  })
  </script>