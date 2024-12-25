<template>
    <v-app-bar color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>摄影数据库</v-app-bar-title>

        <template v-slot:append>
            <v-btn>
                <v-icon v-if="!isLoggedIn">mdi-login</v-icon>
                <v-icon v-else>mdi-logout</v-icon>
                <div v-if="!isLoggedIn">登录</div>
                <div v-else>登出</div>
            </v-btn>
        </template>
    </v-app-bar>

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
import { ref } from 'vue'

const drawer = ref(false)
const isLoggedIn = ref(false)
</script>

<style scoped></style>