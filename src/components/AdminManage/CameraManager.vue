<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <span>相机管理</span>
      <div class="d-flex align-center">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="搜索相机" single-line hide-details class="mr-4"
          style="max-width: 300px;"></v-text-field>
        <v-btn color="primary" @click="openDialog">
          <v-icon>mdi-plus</v-icon>
          添加相机
        </v-btn>
      </div>
    </v-card-title>

    <v-data-table :headers="headers" :items="filteredCameras" :loading="loading" loading-text="加载中...">
      <template v-slot:item.picture="{ item }">
        <v-chip color="primary">
          {{ item.picture }}
        </v-chip>
      </template>
      <template v-slot:item.post="{ item }">
        <v-img :src="item.post" max-width="80" contain></v-img>
      </template>
      <template v-slot:item.price="{ item }">
        ¥{{ item.price.toLocaleString() }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="editCamera(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteCamera(item)" class="ml-2">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <!-- 相机对话框 -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title>{{ editMode ? '编辑相机' : '添加相机' }}</v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="form.brand" label="品牌" :rules="[required]"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.model" label="型号" :rules="[required]"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.series" label="系列"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.release" label="发布日期" type="date"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select v-model="form.picture" :items="pictureOptions" label="画幅" :rules="[required]"></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.price" label="价格" type="number"
                  :rules="[required, positiveNumber]"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.pixels" label="像素" type="number"
                  :rules="[required, positiveNumber]"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.post" label="封面图片URL" :rules="[required, urlRule]"></v-text-field>
                <v-img v-if="form.post" :src="form.post" max-width="200" contain class="mt-2"></v-img>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">取消</v-btn>
          <v-btn color="primary" @click="saveCamera">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 状态管理
const cameras = ref([])
const loading = ref(false)
const dialog = ref(false)
const editMode = ref(false)
const search = ref('')
const form = ref({
  cameraid: null,
  brand: '',
  model: '',
  series: '',
  release: '',
  picture: '',
  price: 0,
  pixels: 0,
  post: ''
})

// 画幅选项
const pictureOptions = ref([
  '全画幅',
  'APS-C',
  '中画幅',
  '4/3系统',
  '1英寸',
  '1/1.7英寸'
])

// 表头配置
const headers = ref([
  { title: 'ID', key: 'cameraid' },
  { title: '品牌', key: 'brand' },
  { title: '型号', key: 'model' },
  { title: '系列', key: 'series' },
  { title: '画幅', key: 'picture' },
  { title: '封面', key: 'post' },
  { title: '价格', key: 'price' },
  { title: '像素', key: 'pixels' },
  { title: '操作', key: 'actions', sortable: false }
])

// 验证规则
const required = (v) => !!v || '此项为必填项'
const urlRule = (v) => {
  const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  return pattern.test(v) || '请输入有效的URL'
}
const positiveNumber = (v) => v > 0 || '必须为正数'

// 计算属性：过滤后的相机列表
const filteredCameras = computed(() => {
  if (!search.value) return cameras.value

  const searchTerm = search.value.toLowerCase()
  return cameras.value.filter(camera => {
    return (
      camera.brand.toLowerCase().includes(searchTerm) ||
      camera.model.toLowerCase().includes(searchTerm) ||
      camera.series.toLowerCase().includes(searchTerm) 
    )
  })
})
// 获取相机数据
const fetchCameras = async () => {
  try {
    loading.value = true
    const { data } = await axios.get('http://127.0.0.1:8000/cameras')
    cameras.value = data
  } catch (error) {
    console.error('获取相机数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 打开对话框
const openDialog = () => {
  dialog.value = true
  editMode.value = false
  form.value = {
    cameraid: null,
    brand: '',
    model: '',
    series: '',
    release: '',
    picture: '',
    price: 0,
    pixels: 0,
    post: ''
  }
}

// 编辑相机
const editCamera = (item) => {
  dialog.value = true
  editMode.value = true
  form.value = { ...item }
}

// 保存相机
const saveCamera = () => {
  // TODO: 实现保存逻辑
  dialog.value = false
}

// 删除相机
const deleteCamera = (item) => {
  // TODO: 实现删除逻辑
}

// 初始化
onMounted(() => {
  fetchCameras()
})
</script>

<style scoped>
.v-card {
  padding: 16px;
}

.v-img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px;
}

.v-chip {
  margin: 2px;
}
</style>