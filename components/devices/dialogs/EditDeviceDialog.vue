<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="500"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-bold">Edit Device</span>
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Form -->
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="localDevice.name" label="Device Name" required />
          <v-text-field v-model="localDevice.serialNumber" label="Serial Number" required />
          <v-text-field
            v-model="localDevice.dailyRate"
            label="Daily Rate"
            type="number"
            min="0"
            required
          />

          <v-select
            v-model="localDevice.status"
            :items="statusOptions"
            item-title="name"
            return-object
            label="Device Status"
            required
          />

          <v-text-field
            v-model="localDevice.shipmentId"
            label="Shipment ID (optional)"
            type="number"
          />
        </v-form>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="cancel"> Cancel </v-btn>
        <v-btn color="primary" :disabled="!valid" @click="submit"> Save Changes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { UiDevice } from '@/models/ui/device.model'

// Props & emits
const props = defineProps<{
  modelValue: boolean
  device: UiDevice | null
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'updateDevice', device: UiDevice): void
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
    }
  },
  { immediate: true },
)

const statusOptions = [
  { id: 1, name: 'Available', icon: 'mdi-check-circle', color: 'green' },
  { id: 2, name: 'In Use', icon: 'mdi-progress-clock', color: 'blue' },
  { id: 3, name: 'Inactive', icon: 'mdi-cancel', color: 'grey' },
]

function submit() {
  if (!form.value.validate()) return

  emit('updateDevice', { ...localDevice })

  emit('update:modelValue', false)
}

function cancel() {
  emit('update:modelValue', false)
}
</script>
