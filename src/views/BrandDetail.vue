<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>{{ brand.cname }}</h1>
          <!-- 这里可以添加更多品牌详情内容 -->
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const brand = ref({})
  
  const fetchBrandDetail = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/brands/${route.params.brandId}`)
      brand.value = response.data
    } catch (error) {
      console.error('获取品牌详情失败:', error)
    }
  }
  
  onMounted(() => {
    fetchBrandDetail()
  })
  </script>