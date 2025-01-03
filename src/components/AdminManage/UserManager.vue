<template>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>用户管理</span>
        <v-btn color="primary" @click="openDialog">
          <v-icon>mdi-plus</v-icon>
          添加用户
        </v-btn>
      </v-card-title>
  
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        loading-text="加载中..."
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editUser(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteUser(item)" class="ml-2">mdi-delete</v-icon>
        </template>
      </v-data-table>
  
      <!-- 用户对话框 -->
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title>{{ editMode ? '编辑用户' : '添加用户' }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.username"
                label="用户名"
                :rules="[required]"
              ></v-text-field>
              <v-text-field
                v-model="form.cellphone"
                label="手机号"
                :rules="[required, phoneRule]"
              ></v-text-field>
              <v-select
                v-model="form.role"
                :items="roles"
                label="角色"
                :rules="[required]"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">取消</v-btn>
            <v-btn color="primary" @click="saveUser">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  // 状态管理
  const users = ref([])
  const loading = ref(false)
  const dialog = ref(false)
  const editMode = ref(false)
  const form = ref({
    uuid: null,
    username: '',
    cellphone: '',
    role: ''
  })
  
  // 角色选项
  const roles = ref(['管理员', '编辑', '普通用户'])
  
  // 表头配置
  const headers = ref([
    { title: 'UUID', key: 'uuid' },
    { title: '用户名', key: 'username' },
    { title: '手机号', key: 'cellphone' },
    { title: '角色', key: 'role' },
    { title: '操作', key: 'actions', sortable: false }
  ])
  
  // 验证规则
  const required = (v) => !!v || '此项为必填项'
  const phoneRule = (v) => {
    const pattern = /^1[3-9]\d{9}$/
    return pattern.test(v) || '请输入有效的手机号'
  }
  
  // 获取用户数据
  const fetchUsers = async () => {
    try {
      loading.value = true
      const { data } = await axios.get('http://127.0.0.1:8000/users')
      users.value = data
    } catch (error) {
      console.error('获取用户数据失败:', error)
    } finally {
      loading.value = false
    }
  }
  
  // 打开对话框
  const openDialog = () => {
    dialog.value = true
    editMode.value = false
    form.value = {
      uuid: null,
      username: '',
      cellphone: '',
      role: ''
    }
  }
  
  // 编辑用户
  const editUser = (item) => {
    dialog.value = true
    editMode.value = true
    form.value = { ...item }
  }
  
  // 保存用户
  const saveUser = () => {
    // TODO: 实现保存逻辑
    dialog.value = false
  }
  
  // 删除用户
  const deleteUser = (item) => {
    // TODO: 实现删除逻辑
  }
  
  // 初始化
  onMounted(() => {
    fetchUsers()
  })
  </script>
  
  <style scoped>
  .v-card {
    padding: 16px;
  }
  </style>