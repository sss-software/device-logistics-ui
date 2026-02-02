export interface UiShipmentStop {
    shipmentStopId: number
    shipmentId: number
    countryId: number
    country: string | undefined
    cityId: number
    city: string | undefined
    sequenceNumber: number
    title: string
}