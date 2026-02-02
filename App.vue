<template>
  <v-app>
    <v-layout class="h-screen w-screen">
      <AppHeader />
      <AppSidebar />
      <v-main class="bg-grey-lighten-4 d-flex">
        <router-view class="flex-grow-1" />
      </v-main>
    </v-layout>
  </v-app>
</template>
<style scoped>
:deep(.v-main) {
  overflow-y: auto;
}
</style>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppSidebar from './components/layout/AppSidebar.vue'
</script>
