<template>
  <v-container fluid class="shipment-details-wrapper">
    <v-card class="mb-4 devices-section">
      <v-card-title
        class="d-flex justify-space-between align-center"
        @click="devicesExpanded = !devicesExpanded"
        style="cursor: pointer"
      >
        <span class="text-h6 font-weight-bold">Devices</span>
        <v-icon>{{ devicesExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-card-title>

      <v-expand-transition>
        <div v-if="devicesExpanded" class="section-content">
          <v-data-table
            :headers="deviceHeaders"
            :items="devices"
            dense
            hide-default-footer
            class="elevation-1"
          >
            <template #item.status="{ item }">
              <v-chip
                :color="item.status.color"
                variant="flat"
                size="small"
                class="font-weight-medium"
              >
                <v-icon :icon="item.status.icon" />
                {{ item.status.name }}
              </v-chip>
            </template>

            <template #item.shipmentStatus="{ item }">
              <v-chip
                v-if="item.shipmentStatus"
                :color="item.shipmentStatus.color"
                variant="tonal"
                size="small"
              >
                <v-icon :icon="item.shipmentStatus.icon" />
                {{ item.shipmentStatus.name }}
              </v-chip>
            </template>
          </v-data-table>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card class="stops-section">
      <v-card-title
        class="d-flex justify-space-between align-center"
        @click="stopsExpanded = !stopsExpanded"
        style="cursor: pointer"
      >
        <span class="text-h6 font-weight-bold">Stops</span>
        <v-icon>{{ stopsExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-card-title>

      <v-expand-transition>
        <div v-if="stopsExpanded" lass="section-content">
          <v-data-table
            :headers="stopHeaders"
            :items="stops"
            dense
            hide-default-footer
            class="elevation-1"
          >
          </v-data-table>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UiDevice } from '@/models/ui/device.model'
import type { UiShipmentStop } from '@/models/ui/shipment-stop.model'

const props = defineProps<{
  devices: UiDevice[]
  stops: UiShipmentStop[]
}>()

const devicesExpanded = ref(true)
const stopsExpanded = ref(true)

const deviceHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Serial Number', key: 'serialNumber' },
  { title: 'Daily Rate', key: 'dailyRate' },
  { title: 'Status', key: 'status' },
]

const stopHeaders = [
  { title: 'Stop Order', key: 'sequenceNumber' },
  { title: 'City', key: 'city' },
  { title: 'Country', key: 'country' },
]

const devices = props.devices
const stops = props.stops
</script>

<style scoped>
.v-data-table th,
.v-data-table td {
  cursor: default;
}

.shipment-details-wrapper {
  max-width: 90%;
  margin: 16px auto;
  padding: 0 16px;
}

.section-header {
  cursor: pointer;
  user-select: none;
}

.devices-section {
  background-color: #f5f9ff;
  border-left: 4px solid #1976d2;
}

.stops-section {
  background-color: #f9f7f2;
  border-left: 4px solid #ff9800;
}

:deep(.v-data-table-header__content) {
  font-weight: bold !important;
}
</style>
