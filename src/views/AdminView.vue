<template>
    <v-container>
      <v-tabs v-model="activeTab">
        <v-tab value="brand">品牌管理</v-tab>
        <v-tab value="user">用户管理</v-tab>
        <v-tab value="camera">相机管理</v-tab>
        <v-tab value="lens">镜头管理</v-tab>
      </v-tabs>
  
      <v-window v-model="activeTab">
        <v-window-item value="brand">
          <BrandManager />
        </v-window-item>
  
        <v-window-item value="user">
          <UserManager />
        </v-window-item>
  
        <v-window-item value="camera">
          <CameraManager />
        </v-window-item>
  
        <v-window-item value="lens">
          <LensManager />
        </v-window-item>
      </v-window>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import BrandManager from '@/components/AdminManage/BrandManager.vue'
  import UserManager from '@/components/AdminManage/UserManager.vue'
  import CameraManager from '@/components/AdminManage/CameraManager.vue'
  import LensManager from '@/components/AdminManage/LensManager.vue'
  
  const activeTab = ref('brand')
  </script>
  
  <style scoped>
  .v-container {
    padding: 24px;
  }
  </style>