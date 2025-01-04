<template>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>镜头管理</span>
        <v-btn color="primary" @click="openDialog">
          <v-icon>mdi-plus</v-icon>
          添加镜头
        </v-btn>
      </v-card-title>
  
      <v-data-table
        :headers="headers"
        :items="processedLenses"
        :loading="loading"
        loading-text="加载中..."
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editLens(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteLens(item)" class="ml-2">mdi-delete</v-icon>
        </template>
      </v-data-table>
  
      <!-- 镜头对话框 -->
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title>{{ editMode ? '编辑镜头' : '添加镜头' }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.model"
                label="型号"
                :rules="[required]"
              ></v-text-field>
              <v-text-field
                v-model="form.brand"
                label="品牌"
                :rules="[required]"
              ></v-text-field>
              <v-text-field
                v-model="form.series"
                label="系列"
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.minfocal"
                    label="最小焦距(mm)"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.maxfocal"
                    label="最大焦距(mm)"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.minaperture"
                    label="最小光圈"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.maxaperture"
                    label="最大光圈"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="form.price"
                label="价格"
                :rules="[required]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">取消</v-btn>
            <v-btn color="primary" @click="saveLens">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  const lenses = ref([])
  const loading = ref(false)
  const dialog = ref(false)
  const editMode = ref(false)
  
  const form = ref({
    lensid: null,
    model: '',
    brand: '',
    series: '',
    minfocal: '',
    maxfocal: '',
    minaperture: '',
    maxaperture: '',
    price: ''
  })
  
  const headers = ref([
    { title: 'ID', key: 'lensid' },
    { title: '型号', key: 'model' },
    { title: '品牌', key: 'brand' },
    { title: '系列', key: 'series' },
    { title: '焦距范围', key: 'focal_range' },
    { title: '光圈范围', key: 'aperture_range' },
    { title: '价格', key: 'price' },
    { title: '操作', key: 'actions', sortable: false }
  ])
  
  const processedLenses = computed(() => {
    return lenses.value.map(lens => ({
      ...lens,
      focal_range: `${lens.minfocal}-${lens.maxfocal}mm`,
      aperture_range: `f/${lens.minaperture}-f/${lens.maxaperture}`
    }))
  })
  
  const required = (v) => !!v || '此项为必填项'
  
  const fetchLenses = async () => {
    try {
      loading.value = true
      const { data } = await axios.get('http://127.0.0.1:8000/lenses')
      lenses.value = data
    } catch (error) {
      console.error('获取镜头数据失败:', error)
    } finally {
      loading.value = false
    }
  }
  
  const openDialog = () => {
    dialog.value = true
    editMode.value = false
    form.value = {
      lensid: null,
      model: '',
      brand: '',
      series: '',
      minfocal: '',
      maxfocal: '',
      minaperture: '',
      maxaperture: '',
      price: ''
    }
  }
  
  const editLens = (item) => {
    dialog.value = true
    editMode.value = true
    form.value = { ...item }
  }
  
  const saveLens = () => {
    // TODO: 实现保存逻辑
    dialog.value = false
  }
  
  const deleteLens = (item) => {
    // TODO: 实现删除逻辑
  }
  
  onMounted(() => {
    fetchLenses()
  })
  </script>