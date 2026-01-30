<template>
  <v-row class="ma-0 pa-4 fill-height" dense>
    <v-col cols="12" md="6" class="d-flex">
      <DeviceStatusChart class="flex-grow-1" />
    </v-col>

    <v-col cols="12" md="6" class="d-flex">
      <ShipmentStatusChart class="flex-grow-1" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import DeviceStatusChart from '@/components/dashboard/charts/DeviceStatusChart.vue'
import ShipmentStatusChart from '@/components/dashboard/charts/ShipmentStatusChart.vue'
</script>
