import type { ShipmentStopDto } from "./shipment-stop.dto"
export interface ShipmentTrackedDto {
    trackingNumber: string
    overallStatus: string
    currentStep: number
    stops: ShipmentStopDto[]
}