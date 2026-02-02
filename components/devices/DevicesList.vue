<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex justify-start">
        <span class="text-h5 font-weight-bold">Device Management</span>
      </v-card-title>

      <v-row class="d-flex justify-center pa-2" dense>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-text-field
            v-model="search"
            density="comfortable"
            prepend-inner-icon="mdi-magnify"
            label="Search devices"
            hide-details
            clearable
            class="flex-grow-1"
          />
          <v-btn
            color="primary"
            class="ms-3"
            prepend-icon="mdi-plus"
            height="48"
            @click="showAddDialog = true"
          >
            Add Device
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center pa-2">
        <v-col cols="12" class="text-center">
          <span class="text-subtitle-1 font-weight-bold">Current Devices</span>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="devices"
        :search="search"
        :loading="loading"
        item-key="deviceId"
        class="elevation-0"
      >
        <template #item.status="{ item }">
          <v-chip :color="item.status.color" variant="flat" size="small" class="font-weight-medium">
            <v-icon start :icon="item.status.icon" />
            {{ item.status.name }}
          </v-chip>
        </template>

        <template #item.shipmentStatus="{ item }">
          <v-chip :color="item.shipmentStatus?.color" variant="tonal" size="small">
            <v-icon start :icon="item.shipmentStatus?.icon" />
            {{ item.shipmentStatus?.name }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-tooltip top>
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                size="18"
                color="primary"
                class="me-2"
                style="cursor: pointer"
                @click="openEditDialog(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Edit Device</span>
          </v-tooltip>

          <v-tooltip top>
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                size="18"
                color="error"
                class="me-2"
                style="cursor: pointer"
                @click="openDeleteDialog(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Delete Device</span>
          </v-tooltip>

          <v-tooltip top>
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                size="18"
                color="warning"
                style="cursor: pointer"
                @click="openDeactivateDialog(item)"
              >
                mdi-power
              </v-icon>
            </template>
            <span>Deactivate Device</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <AddDeviceDialog v-model="showAddDialog" />
    <EditDeviceDialog
      v-model="showEditDialog"
      :device="selectedDevice"
      @updateDevice="handleDeviceUpdate"
    />
    <DeleteDeviceDialog
      v-model="showDeleteDialog"
      :device="selectedDevice"
      @deleteDevice="handleDeviceDelete"
    />
    <DeactivateDeviceDialog
      v-model="showDeactivateDialog"
      :device="selectedDevice"
      @deactivateDevice="handleDeviceDeactivate"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UiDevice } from '@/models/ui/device.model'
import { DeviceService } from '@/services/device.service'
import AddDeviceDialog from '@/components/devices/dialogs/AddDeviceDialog.vue'
import EditDeviceDialog from '@/components/devices/dialogs/EditDeviceDialog.vue'
import DeleteDeviceDialog from '@/components/devices/dialogs/DeleteDeviceDialog.vue'
import DeactivateDeviceDialog from '@/components/devices/dialogs/DeactivateDeviceDialog.vue'

const deviceService = new DeviceService()
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const showDeactivateDialog = ref(false)
const selectedDevice = ref<UiDevice | null>(null)
const devices = ref<UiDevice[]>([])
const loading = ref(false)
const search = ref('')

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Serial Number', key: 'serialNumber' },
  { title: 'Status', key: 'status' },
  { title: 'Shipment', key: 'shipmentStatus' },
  { title: 'Daily Rate', key: 'dailyRate' },
  { title: 'Actions', key: 'actions', sortable: false },
]

function openEditDialog(device: UiDevice) {
  selectedDevice.value = device
  showEditDialog.value = true
}

function openDeleteDialog(device: UiDevice) {
  selectedDevice.value = device
  showDeleteDialog.value = true
}

function openDeactivateDialog(device: UiDevice) {
  selectedDevice.value = device
  showDeactivateDialog.value = true
}

function handleDeviceUpdate(updatedDevice: UiDevice) {
  const index = devices.value.findIndex((d) => d.deviceId === updatedDevice.deviceId)
  if (index !== -1) {
    devices.value[index] = updatedDevice
  }
}

function handleDeviceDelete(device: UiDevice) {
  devices.value = devices.value.filter((d) => d.deviceId !== device.deviceId)
  selectedDevice.value = null
}

function handleDeviceDeactivate(device: UiDevice) {
  const index = devices.value.findIndex((d) => d.deviceId === device.deviceId)
  const targetDevice = devices.value[index]

  if (targetDevice && device.status) {
    targetDevice.status = { ...device.status }
  }
}

onMounted(async () => {
  loading.value = true
  try {
    devices.value = await deviceService.getDevices()
  } finally {
    loading.value = false
  }
})
</script>
<style scoped>
:deep(.v-data-table-header__content) {
  font-weight: bold !important;
}
</style>
