<template>
    <v-container fluid>
        <v-card v-if="quotation">
            <!-- Header -->
            <v-card-title class="d-flex justify-start">
                <span class="text-h5 font-weight-bold">Quotation Result</span>
            </v-card-title>

            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-list dense>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quotation Number:</v-list-item-title>
                                    <v-list-item-subtitle>{{ quotation.quotationNumber }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Customer ID:</v-list-item-title>
                                    <v-list-item-subtitle>{{ quotation.customerId }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Duration (Months):</v-list-item-title>
                                    <v-list-item-subtitle>{{ quotation.durationMonths }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Valid Until:</v-list-item-title>
                                    <v-list-item-subtitle>{{ formatDate(quotation.validUntil) }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-list dense>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Sub Total:</v-list-item-title>
                                    <v-list-item-subtitle>{{ formatCurrency(quotation.subTotal)
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Export Duty:</v-list-item-title>
                                    <v-list-item-subtitle>{{ formatCurrency(quotation.exportDuty)
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Insurance Cost:</v-list-item-title>
                                    <v-list-item-subtitle>{{ formatCurrency(quotation.insuranceCost)
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Handling Cost:</v-list-item-title>
                                    <v-list-item-subtitle>{{ formatCurrency(quotation.handlingCost)
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Tax Amount:</v-list-item-title>
                                    <v-list-item-subtitle>{{ formatCurrency(quotation.taxAmount)
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Amount:</v-list-item-title>
                                    <v-list-item-subtitle class="text-h6 font-weight-bold">{{
                                        formatCurrency(quotation.totalAmount) }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>

                <!-- Quotation Items -->
                <v-divider class="my-4"></v-divider>
                <v-row>
                    <v-col cols="12">
                        <v-data-table :headers="itemHeaders" :items="quotation.items" item-key="deviceId"
                            class="elevation-1" dense>
                            <template #item.lineTotal="{ item }">
                                {{ formatCurrency(item.lineTotal) }}
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card v-else class="pa-4">
            <v-row class="d-flex justify-center">
                <v-col cols="12" class="text-center">
                    <v-alert type="error" dense>
                        Error generating quotation.
                    </v-alert>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import type { QuotationResultDto } from '@/models/api/quotation-result.dto';

defineProps<{
    quotation: QuotationResultDto | null
}>()

const itemHeaders = [
    { text: 'Device', value: 'deviceName' },
    { text: 'Support Tier', value: 'supportTierName' },
    { text: 'Line Total', value: 'lineTotal' }
]

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR'
    }).format(value)

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString()
</script>
