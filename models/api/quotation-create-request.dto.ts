export interface CreateQuotationRequestDto {
    customerId: number
    durationMonths: number
    originCountryId: number
    originCityId: number
    destinationCountryId: number
    destinationCityId: number
    supportTierId: number
    deviceIds: number[]
}