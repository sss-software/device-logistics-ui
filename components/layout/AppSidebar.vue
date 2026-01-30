<!-- <template>
  <v-navigation-drawer app permanent>
    <v-list nav>
      <v-list-item title="Dashboard" to="/" />
      <v-list-item title="Devices" to="/devices" />
      <v-list-item title="Shipments" to="/shipments" />
      <v-list-item title="Quotations" to="/quotations" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
// No logic yet
</script> -->

<template>
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
</template>

<script setup lang="ts"></script>
