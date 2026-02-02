import type { QuotationItem } from "./quotation-item.interface"

export interface QuotationData {
    quotationId: number
    quotationNumber: string
    customerId: number
    durationMonths: number
    subTotal: number
    exportDuty: number
    insuranceCost: number
    handlingCost: number
    taxAmount: number
    totalAmount: number
    validUntil: string
    items: QuotationItem[]
}