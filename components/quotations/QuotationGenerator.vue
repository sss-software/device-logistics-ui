<template>
    <v-container fluid>
        <div v-if="isLoading" class="text-center my-6">
            <v-progress-circular indeterminate color="primary" size="48" />
            <div class="mt-2">Loading reference data...</div>
        </div>

        <v-row v-else justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-sheet v-if="!quotationResult" elevation="2" rounded class="pa-6">
                    <v-card-title class="text-h5 text-center mb-4">
                        Quotation Generator
                    </v-card-title>

                    <v-form ref="formRef" v-model="valid">
                        <v-select v-model="form.customerId" :items="customers" item-title="name" item-value="customerId"
                            label="Customer" :rules="[(v) => !!v || 'Customer is required']" />

                        <v-text-field v-model="form.durationMonths" label="Duration (Months)" type="number"
                            :rules="[(v) => v > 0 || 'Duration must be > 0']" class="mt-3" />

                        <v-select v-model="form.originCountryId" :items="countries" item-title="name"
                            item-value="countryId" label="Origin Country" class="mt-3" />

                        <v-select v-model="form.originCityId" :items="originCities" item-title="name"
                            item-value="cityId" label="Origin City" class="mt-3" />

                        <v-select v-model="form.destinationCountryId" :items="countries" item-title="name"
                            item-value="countryId" label="Destination Country" class="mt-3" />

                        <v-select v-model="form.destinationCityId" :items="destinationCities" item-title="name"
                            item-value="cityId" label="Destination City" class="mt-3" />

                        <v-select v-model="form.supportTierId" :items="supportTiers" item-title="name"
                            item-value="supportTierId" label="Support Tier" class="mt-3" />

                        <v-select v-model="form.deviceIds" :items="devices" item-title="name" item-value="deviceId"
                            label="Select Devices" multiple chips
                            :rules="[(v) => v.length > 0 || 'Select at least one device']" />

                        <v-btn block class="mt-6" color="primary" :loading="isSubmitting" :disabled="!valid"
                            @click="submitForm">
                            Generate Quotation
                        </v-btn>
                    </v-form>
                </v-sheet>
                <v-sheet v-else elevation="2" rounded class="pa-6">
                    <QuotationResult :quotation="quotationResult" />

                    <v-btn class="mt-6" variant="tonal" block @click="resetQuotation">
                        Generate Another Quotation
                    </v-btn>
                </v-sheet>
                <v-alert v-if="errorMessage" type="error" class="mt-4">
                    {{ errorMessage }}
                </v-alert>

            </v-col>
        </v-row>
    </v-container>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLookupStore } from '@/stores/lookup-store'
import QuotationResult from '@/components/quotations/QuotationResult.vue'
import type { QuotationResultDto } from '@/models/api/quotation-result.dto'
import { QuotationService } from '@/services/quotation.service'
import type { CreateQuotationRequestDto } from '@/models/api/quotation-create-request.dto'

interface QuotationForm {
    customerId: number | null
    durationMonths: number
    originCountryId: number | null
    originCityId: number | null
    destinationCountryId: number | null
    destinationCityId: number | null
    supportTierId: number | null
    deviceIds: number[]
}

const formRef = ref()
const valid = ref(false)

const isLoading = ref(true)
const isSubmitting = ref(false)

const quotationResult = ref<QuotationResultDto | null>(null)
const errorMessage = ref<string | null>(null)

const form = ref<QuotationForm>({
    customerId: null,
    durationMonths: 12,
    originCountryId: null,
    originCityId: null,
    destinationCountryId: null,
    destinationCityId: null,
    supportTierId: null,
    deviceIds: []
})

const lookupStore = useLookupStore()
const quotationService = new QuotationService()

onMounted(async () => {
    try {
        await lookupStore.loadAll()
    } finally {
        isLoading.value = false
    }
})

const countries = computed(() => lookupStore.countries)
const customers = computed(() => lookupStore.customers)
const supportTiers = computed(() => lookupStore.supportTiers)
const originCities = computed(() => lookupStore.cities)
const destinationCities = computed(() => lookupStore.cities)
const devices = computed(() => lookupStore.deviceLookups)

const submitForm = async () => {
    errorMessage.value = null

    const isValid = await formRef.value?.validate()
    if (!isValid) return

    isSubmitting.value = true

    try {
        const payload: CreateQuotationRequestDto = {
            customerId: form.value.customerId!,
            durationMonths: form.value.durationMonths,
            originCountryId: form.value.originCountryId!,
            originCityId: form.value.originCityId!,
            destinationCountryId: form.value.destinationCountryId!,
            destinationCityId: form.value.destinationCityId!,
            supportTierId: form.value.supportTierId!,
            deviceIds: form.value.deviceIds
        }
        console.log(payload)

        quotationResult.value = await quotationService.createQuotation(payload)
    } catch (error) {
        console.error(error)
        errorMessage.value = 'Error generating quotation'
    } finally {
        isSubmitting.value = false
    }
}

/* -----------------------------
   Reset
----------------------------- */
const resetQuotation = () => {
    quotationResult.value = null
    errorMessage.value = null

    form.value = {
        customerId: null,
        durationMonths: 12,
        originCountryId: null,
        originCityId: null,
        destinationCountryId: null,
        destinationCityId: null,
        supportTierId: null,
        deviceIds: []
    }
}
</script>
