import type { QuotationItemDto } from "./quotation-item.dto"

export interface QuotationResultDto {
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
    items: QuotationItemDto[]
}