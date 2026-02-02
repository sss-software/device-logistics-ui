<template>
  <v-container fluid>
    <v-card>
      <!-- Title -->
      <v-card-title class="d-flex justify-start">
        <span class="text-h5 font-weight-bold">Shipment Management</span>
      </v-card-title>

      <v-sheet class="mx-4 mt-2 pa-4 tracking-section" rounded="lg">
        <v-row class="d-flex justify-center">
          <v-col cols="12" class="text-center">
            <span class="text-h6 font-weight-medium">SHIPMENT TRACKER</span>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center pa-2" dense>
          <v-col cols="12" md="6" class="d-flex align-center">
            <v-text-field
              v-model="trackingNumber"
              density="comfortable"
              prepend-inner-icon="mdi-truck-fast"
              label="Enter tracking number"
              hide-details
              clearable
              class="flex-grow-1"
              @keyup.enter="trackShipment"
            />

            <v-btn
              color="secondary"
              class="ms-3"
              prepend-icon="mdi-map-marker-path"
              height="48"
              @click="trackShipment"
            >
              Track Shipment
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="activeTrackingNumber" class="d-flex justify-center pa-2">
          <v-col cols="12" md="8">
            <ShipmentTracker :tracking-number="activeTrackingNumber" />
          </v-col>
        </v-row>
      </v-sheet>

      <v-divider class="my-6" />

      <v-sheet class="mx-4 pa-4 management-section" rounded="lg">
        <v-row class="d-flex justify-center pa-2" dense>
          <v-col cols="12" md="6" class="d-flex align-center">
            <v-text-field
              v-model="search"
              density="comfortable"
              prepend-inner-icon="mdi-magnify"
              label="Search shipments"
              hide-details
              class="flex-grow-1"
            />

            <v-btn color="primary" class="ms-3" prepend-icon="mdi-plus" height="48">
              Add Shipment
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>

      <v-row class="d-flex justify-center pa-2 mt-4">
        <v-col cols="12" class="text-center">
          <span class="text-subtitle-1 font-weight-bold">Current Shipments</span>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="shipments"
        :search="search"
        :loading="loading"
        item-value="shipmentId"
        show-expand
        class="elevation-0"
      >
        <template #item.status="{ item }">
          <v-chip :color="item.status.color" variant="flat" size="small" class="ma-1">
            <v-icon start size="small">
              {{ item.status.icon }}
            </v-icon>
            {{ item.status.name }}
          </v-chip>
        </template>
        <template #expanded-row="{ item }">
          <tr>
            <td :colspan="headers.length + 1">
              <ShipmentDetails :devices="item.devices" :stops="item.stops" />
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { ShipmentService } from '@/services/shipment.service'
import type { UiShipment } from '@/models/ui/shipment.model'
import ShipmentDetails from '@/components/shipments/ShipmentDetails.vue'
import ShipmentTracker from '@/components/shipments/ShipmentTracker.vue'

const shipments = ref<UiShipment[]>([])
const loading = ref(false)
const search = ref('')
const trackingNumber = ref('')
const activeTrackingNumber = ref('')

const trackShipment = () => {
  if (!trackingNumber.value) return
  activeTrackingNumber.value = trackingNumber.value
}

const expandedRows = reactive<Record<number, boolean>>({})

const headers = [
  { title: '', key: 'expand', width: 48 },
  { title: 'Tracking', key: 'trackingNumber' },
  { title: 'Customer', key: 'customer' },
  { title: 'Origin', key: 'originCity' },
  { title: 'Destination', key: 'destinationCity' },
  { title: 'Transport Mode', key: 'transportMode' },
  { title: 'Status', key: 'status' },
  { title: 'ETA', key: 'estimatedArrival' },
]

watch(trackingNumber, (val) => {
  if (!val) activeTrackingNumber.value = ''
})

onMounted(async () => {
  loading.value = true
  const service = new ShipmentService()
  shipments.value = await service.getShipments()
  shipments.value.forEach((s) => (expandedRows[s.shipmentId] = false))
  loading.value = false
})
</script>

<style scoped>
.tracking-section {
  background-color: rgba(var(--v-theme-primary), 0.05);
  border: 2px dashed rgba(var(--v-theme-primary), 0.4);
}

.management-section {
  background-color: rgba(var(--v-theme-surface-variant), 0.05);
}
:deep(.v-data-table-header__content) {
  font-weight: bold !important;
}
</style>
