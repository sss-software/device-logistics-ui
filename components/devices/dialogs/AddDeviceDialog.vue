<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="500"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-bold">Add Device</span>
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Form -->
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="device.name" label="Device Name" required />
          <v-text-field v-model="device.serialNumber" label="Serial Number" required />
          <v-text-field
            v-model="device.dailyRate"
            label="Daily Rate"
            type="number"
            min="0"
            required
          />

          <v-select
            v-model="device.statusId"
            :items="statusOptions"
            label="Device Status"
            item-value="id"
            item-title="name"
            required
          />

          <v-text-field v-model="device.shipmentId" label="Shipment ID (optional)" type="number" />
        </v-form>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="secondary" @click="cancel"> Cancel </v-btn>
          <v-btn color="primary" :disabled="!valid" @click="submit"> Add Device </v-btn>
        </v-card-actions>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const valid = ref(false)
const form = ref()

const device = reactive({
  name: '',
  serialNumber: '',
  dailyRate: 0,
  statusId: 1,
  shipmentId: undefined as number | undefined,
})

// Device status options (same as service mapping)
const statusOptions = [
  { id: 1, name: 'Available' },
  { id: 2, name: 'In Use' },
  { id: 3, name: 'Inactive' },
]

function submit() {
  if (!form.value.validate()) return

  console.log('Add Device:', device)

  emit('update:modelValue', false)
}
function cancel() {
  emit('update:modelValue', false)
}
</script>
