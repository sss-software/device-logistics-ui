<template>
  <v-sheet class="pa-4 mt-4" rounded="lg">
    <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-3" />

    <template v-if="shipment">
      <div class="text-h6 font-weight-bold mb-2">
        Shipment {{ shipment.trackingNumber }} — {{ shipment.overallStatus }}
      </div>

      <v-stepper
        :model-value="shipment.currentSequence"
        alt-labels
        hide-actions
        class="custom-stepper"
      >
        <v-stepper-header>
          <template v-for="(stop, index) in shipment.stops" :key="stop.shipmentStopId">
            <v-stepper-item
              :value="stop.sequenceNumber"
              :complete="shipment.currentSequence > stop.sequenceNumber"
              :color="getStepColor(stop)"
              :title="stop.title"
            />
            <v-divider
              v-if="index < shipment.stops.length - 1"
              :color="shipment.currentSequence > stop.sequenceNumber ? 'green' : ''"
              :thickness="shipment.currentSequence > stop.sequenceNumber ? 5 : 5"
            />
          </template>
        </v-stepper-header>
      </v-stepper>
    </template>

    <v-alert v-else-if="!loading" type="warning" variant="tonal">
      No shipment found with tracking number <strong>{{ trackingNumber }}</strong
      >.
    </v-alert>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ShipmentService } from '@/services/shipment.service'
import type { UiShipmentTracked } from '@/models/ui/shipment-tracked.model'
import type { UiShipmentStop } from '@/models/ui/shipment-stop.model'

const props = defineProps<{
  trackingNumber: string
}>()

const loading = ref(false)
const shipment = ref<UiShipmentTracked | null>(null)

const service = new ShipmentService()

const getStepColor = (stop: UiShipmentStop) => {
  if (stop.sequenceNumber < shipment.value!.currentSequence) return 'green'
  if (stop.sequenceNumber === shipment.value!.currentSequence) return 'blue'
  return 'grey'
}

watch(
  () => props.trackingNumber,
  async (newTrackingNumber) => {
    if (!newTrackingNumber) return

    loading.value = true
    shipment.value = null

    shipment.value = await service.getShipmentByTrackingNumber(newTrackingNumber)

    loading.value = false
  },
  { immediate: true },
)
</script>

<style scoped>
.custom-stepper .v-stepper__step {
  border-width: 3px;
}

.custom-stepper .v-stepper__divider {
  border-top-width: 4px;
  border-color: #888888;
}

.custom-stepper .v-stepper__step::before {
  background-color: #c0c0c0;
  height: 4px;
}
</style>
