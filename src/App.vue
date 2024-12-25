<template>
  <VApp>
    <Navbar />
    <v-main color="#fafafa">
      <router-view></router-view>
    </v-main>
  </VApp>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>