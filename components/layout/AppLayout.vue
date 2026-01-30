<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title> Device Logistics Portal </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app permanent>
      <v-list nav class="px-2">
        <v-list-item
          to="/"
          title="Dashboard"
          prepend-icon="mdi-view-dashboard"
          rounded="lg"
          color="primary"
        />

        <v-list-item
          to="/devices"
          title="Devices"
          prepend-icon="mdi-devices"
          rounded="lg"
          color="primary"
        />

        <v-list-item
          to="/shipments"
          title="Shipments"
          prepend-icon="mdi-truck-delivery"
          rounded="lg"
          color="primary"
        />

        <v-list-item
          to="/quotations"
          title="Quotations"
          prepend-icon="mdi-file-document-outline"
          rounded="lg"
          color="primary"
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- <v-main class="bg-grey-lighten-4">
      <v-container fluid class="fill-height">
        <v-row>
          <v-col>
            <h1>Welcome to the Dashboard</h1>
            <p>This is where your main content will go.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main> -->
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
</script>

<style scoped></style>
