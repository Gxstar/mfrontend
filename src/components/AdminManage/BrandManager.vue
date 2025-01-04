<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <span>品牌管理</span>
      <v-btn color="primary" @click="openDialog">
        <v-icon>mdi-plus</v-icon>
        添加品牌
      </v-btn>
    </v-card-title>

    <v-data-table :headers="headers" :items="brands" :loading="loading" loading-text="加载中...">
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
            <v-text-field v-model="form.cname" label="中文名" :rules="[required]"></v-text-field>
            <v-text-field v-model="form.brand" label="英文名" :rules="[required]"></v-text-field>
            <v-text-field v-model="form.logo" label="Logo URL" :rules="[required, urlRule]"></v-text-field>
            <v-text-field v-model="form.website" label="官网" :rules="[required, urlRule]"></v-text-field>
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
// 添加获取token的函数
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user?.token // 使用可选链操作符防止user为null时出错
}

const headers = ref([
  { title: 'ID', key: 'brandid' },
  { title: '中文名', key: 'cname' },
  { title: '英文名', key: 'brand' },
  { title: 'Logo', key: 'logo' },
  { title: '官网', key: 'website' },
  { title: '相机标志', key: 'xjbz' },
  { title: '镜头标志', key: 'jtbz' },
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

/**
 * 保存品牌的异步函数
 * 该函数根据编辑模式的开启与否来决定是添加新品牌还是编辑现有品牌
 * 在保存成功后，会重新获取品牌列表数据，并关闭对话框
 * 如果保存失败，则会在控制台输出错误信息，并弹出失败提示
 */
const saveBrand = async () => {
  try {
    loading.value = true
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    }

    if (editMode.value) {
      // 编辑现有品牌
      await axios.put(
        `http://127.0.0.1:8000/brands/${form.value.brandid}`,
        form.value,
        config
      )
    } else {
      // 添加新品牌
      await axios.post(
        'http://127.0.0.1:8000/brands',
        form.value,
        config
      )
    }
    await fetchBrands() // 重新获取数据
    dialog.value = false
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败，请检查权限或稍后重试')
  } finally {
    loading.value = false
  }
}

const deleteBrand = async (item) => {
  if (confirm(`确定要删除品牌 ${item.cname} 吗？`)) {
    try {
      loading.value = true
      await axios.delete(
        `http://127.0.0.1:8000/brands/${item.brandid}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      )
      await fetchBrands() // 重新获取数据
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请检查权限或稍后重试')
    } finally {
      loading.value = false
    }
  }
}

onMounted(() => {
  fetchBrands()
})
</script>