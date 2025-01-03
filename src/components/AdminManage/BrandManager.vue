<template>
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
  
      <!-- 品牌对话框 -->
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title>{{ editMode ? '编辑品牌' : '添加品牌' }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.cname"
                label="中文名"
                :rules="[required]"
              ></v-text-field>
              <v-text-field
                v-model="form.brand"
                label="英文名"
                :rules="[required]"
              ></v-text-field>
              <v-text-field
                v-model="form.logo"
                label="Logo URL"
                :rules="[required, urlRule]"
              ></v-text-field>
              <v-text-field
                v-model="form.website"
                label="官网"
                :rules="[required, urlRule]"
              ></v-text-field>
              <v-checkbox
                v-model="form.xjbz"
                label="新品标志"
              ></v-checkbox>
              <v-checkbox
                v-model="form.jtbz"
                label="推荐标志"
              ></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">取消</v-btn>
            <v-btn color="primary" @click="saveBrand">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
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
  
  const headers = ref([
    { title: 'ID', key: 'brandid' },
    { title: '中文名', key: 'cname' },
    { title: '英文名', key: 'brand' },
    { title: 'Logo', key: 'logo' },
    { title: '官网', key: 'website' },
    { title: '新品标志', key: 'xjbz' },
    { title: '推荐标志', key: 'jtbz' },
    { title: '操作', key: 'actions', sortable: false }
  ])
  
  const required = (v) => !!v || '此项为必填项'
  const urlRule = (v) => {
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    return pattern.test(v) || '请输入有效的URL'
  }
  
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
  
  const openDialog = () => {
    dialog.value = true
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
  
  const editBrand = (item) => {
    dialog.value = true
    editMode.value = true
    form.value = { ...item }
  }
  
  const saveBrand = () => {
    // TODO: 实现保存逻辑
    dialog.value = false
  }
  
  const deleteBrand = (item) => {
    // TODO: 实现删除逻辑
  }
  
  onMounted(() => {
    fetchBrands()
  })
  </script>