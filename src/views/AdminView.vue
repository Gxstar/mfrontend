<template>
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>品牌管理</span>
          <v-btn color="primary" @click="openDialog">
            <v-icon>mdi-plus</v-icon>
            添加品牌
          </v-btn>
        </v-card-title>
  
        <v-data-table
          :headers="headers"
          :items="brands"
          :loading="loading"
          loading-text="加载中..."
        >
          <template v-slot:item.logo="{ item }">
            <v-img :src="item.logo" max-width="80" contain></v-img>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="editBrand(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteBrand(item)" class="ml-2">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
  
      <!-- 添加/编辑对话框 -->
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title>{{ formTitle }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="form.cname" label="中文名"></v-text-field>
              <v-text-field v-model="form.brand" label="英文名"></v-text-field>
              <v-text-field v-model="form.logo" label="Logo URL"></v-text-field>
              <v-text-field v-model="form.website" label="官网"></v-text-field>
              <v-checkbox v-model="form.xjbz" label="相机标志"></v-checkbox>
              <v-checkbox v-model="form.jtbz" label="镜头标志"></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">取消</v-btn>
            <v-btn color="primary" @click="saveBrand">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  // 状态管理
  const brands = ref([])
  const loading = ref(false)
  const dialog = ref(false)
  const editMode = ref(false)
  const form = ref({
    brandid: null,
    cname: '',
    brand: '',
    logo: '',
    website: '',
    xjbz: false,
    jtbz: false
  })
  
  // 表头配置
  const headers = ref([
    { title: 'ID', key: 'brandid' },
    { title: '中文名', key: 'cname' },
    { title: '英文名', key: 'brand' },
    { title: 'Logo', key: 'logo' },
    { title: '官网', key: 'website' },
    { title: '是否出品相机', key: 'xjbz' },
    { title: '是否出品镜头', key: 'jtbz' },
    { title: '操作', key: 'actions', sortable: false }
  ])
  
  // 计算属性
  const formTitle = computed(() => editMode.value ? '编辑品牌' : '添加品牌')
  
  // 获取品牌数据
  const fetchBrands = async () => {
    try {
      loading.value = true
      const { data } = await axios.get('http://127.0.0.1:8000/brands')
      brands.value = data
    } catch (error) {
      console.error('获取品牌数据失败:', error)
    } finally {
      loading.value = false
    }
  }
  
  // 打开对话框
  const openDialog = (brand = null) => {
    if (brand) {
      editMode.value = true
      form.value = { ...brand }
    } else {
      editMode.value = false
      form.value = {
        brandid: null,
        cname: '',
        brand: '',
        logo: '',
        website: '',
        xjbz: false,
        jtbz: false
      }
    }
    dialog.value = true
  }
  
  // 保存品牌
  const saveBrand = () => {
    // TODO: 实现保存逻辑
    dialog.value = false
  }
  
  // 编辑品牌
  const editBrand = (brand) => {
    openDialog(brand)
  }
  
  // 删除品牌
  const deleteBrand = (brand) => {
    // TODO: 实现删除逻辑
  }
  
  // 生命周期钩子
  onMounted(() => {
    fetchBrands()
  })
  </script>
  
  <style scoped>
  .v-container {
    padding: 24px;
  }
  </style>