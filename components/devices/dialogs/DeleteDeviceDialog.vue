<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="500"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-bold">Delete Device</span>
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="localDevice.name" label="Device Name" readonly />
          <v-text-field v-model="localDevice.serialNumber" label="Serial Number" readonly />
          <v-text-field v-model="localDevice.dailyRate" label="Daily Rate" type="number" readonly />

          <v-text-field v-model="localDevice.status.name" label="Device Status" readonly />

          <v-text-field v-model="localDevice.shipmentId" label="Shipment ID" readonly />

          <!-- Confirmation Checkbox -->
          <v-checkbox v-model="confirmDelete" label="I confirm that I want to delete this device" />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="cancel"> Cancel </v-btn>
        <v-btn color="error" :disabled="!confirmDelete" @click="submit"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { UiDevice } from '@/models/ui/device.model'

const props = defineProps<{
  modelValue: boolean
  device: UiDevice | null
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'deleteDevice', device: UiDevice): void
}>()

const valid = ref(false)
const form = ref()

const localDevice = reactive<UiDevice>({
  deviceId: 0,
  name: '',
  serialNumber: '',
  dailyRate: 0,
  status: { id: 1, name: 'Available', icon: 'mdi-check-circle', color: 'green' },
  shipmentStatus: undefined,
  shipmentId: undefined,
})

const confirmDelete = ref(false)

watch(
  () => props.device,
  (newDevice) => {
    if (newDevice) {
      localDevice.deviceId = newDevice.deviceId
      localDevice.name = newDevice.name
      localDevice.serialNumber = newDevice.serialNumber
      localDevice.dailyRate = newDevice.dailyRate
      localDevice.status = { ...newDevice.status }
      localDevice.shipmentStatus = newDevice.shipmentStatus
        ? { ...newDevice.shipmentStatus }
        : undefined
      localDevice.shipmentId = newDevice.shipmentId
      confirmDelete.value = false // reset checkbox when dialog opens
    }
  },
  { immediate: true },
)

function submit() {
  emit('deleteDevice', { ...localDevice })
  emit('update:modelValue', false)
}

function cancel() {
  emit('update:modelValue', false)
  confirmDelete.value = false
}
</script>
