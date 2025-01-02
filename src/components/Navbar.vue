<template>
    <v-app-bar color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>摄影数据库</v-app-bar-title>

        <template v-slot:append>
            <!-- 添加主页按钮 -->
            <v-btn icon @click="goHome">
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <!-- 添加用户名显示 -->
            <v-chip v-if="isLoggedIn" class="ma-2" >
                <v-icon start>mdi-account</v-icon>
                <div>{{ userStore.user.username }}</div>
            </v-chip>
            <v-btn @click="handleAuthClick">
                <v-icon v-if="!isLoggedIn">mdi-login</v-icon>
                <v-icon v-else>mdi-logout</v-icon>
                <div v-if="!isLoggedIn">登录</div>
                <div v-else>登出</div>
            </v-btn>
        </template>
    </v-app-bar>
    <!-- 添加snackbar组件 -->
    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color">
        {{ snackbar.message }}
        <template v-slot:actions>
            <v-btn variant="text" @click="snackbar.show = false">关闭</v-btn>
        </template>
    </v-snackbar>
    <v-navigation-drawer v-model="drawer" color="drawer">
        <v-list>
            <v-list-item to="/" link class="d-flex justify-start align-center">
                <v-avatar size="small">
                    <v-icon color="primary">mdi-home</v-icon>
                </v-avatar>
                <span class="text-body-2">主页</span>
            </v-list-item>
            <v-list-item to="/camera" link class="d-flex justify-start align-center">
                <v-avatar size="small">
                    <v-icon color="primary">mdi-camera</v-icon>
                </v-avatar>
                <span class="text-body-2">相机</span>
            </v-list-item>
            <v-list-item to="/lens" link class="d-flex justify-start align-center">
                <v-avatar size="small">
                    <v-icon color="primary">mdi-camera-iris</v-icon>
                </v-avatar>
                <span class="text-body-2">镜头</span>
            </v-list-item>
            <v-list-group value="brands">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" color="primary">
                        <v-avatar size="small">
                            <v-icon color="primary">mdi-collapse-all</v-icon>
                        </v-avatar>
                        <span class="text-body-2">品牌</span>
                    </v-list-item>
                </template>
                <v-list-item v-for="brand in brands" :key="brand.id" @click="navigateToBrand(brand.id)">
                    <v-list-item-title>{{ brand.cname }}</v-list-item-title>
                </v-list-item>
            </v-list-group>
            <v-list-item to="/about" link class="d-flex justify-start align-center">
                <v-avatar size="small">
                    <v-icon color="primary">mdi-information</v-icon>
                </v-avatar>
                <span class="text-body-2">关于</span>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const drawer = ref(false)
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn());
// console.log("是否登录"+ isLoggedIn.value);
// console.log("用户信息"+ userStore.user.username);
const brands = ref([])
// 添加snackbar状态
const snackbar = ref({
    show: false,
    message: '',
    color: 'success'
})
// 添加返回主页方法
const goHome = () => {
    router.push('/')
}
const handleAuthClick = () => {
    if (isLoggedIn.value) {
        // 登出逻辑
        userStore.logout()
        // 显示登出成功提示
        snackbar.value = {
            show: true,
            message: '登出成功',
            color: 'success'
        }
        router.push('/')
    } else {
        // 跳转到登录页面
        router.push('/login')
    }
}

// 获取品牌数据
const fetchBrands = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/brands')
        brands.value = response.data
    } catch (error) {
        console.error('获取品牌数据失败:', error)
    }
}

// 导航到品牌详情页
const navigateToBrand = (brandId) => {
    router.push(`/brands/${brandId}`)
    drawer.value = false // 导航后关闭drawer
}

// 组件挂载时获取品牌数据
onMounted(() => {
    fetchBrands()
})
</script>

<style scoped></style>