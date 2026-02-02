import type { UiShipmentStop } from "./shipment-stop.model"

export interface UiShipmentTracked {
    trackingNumber: string
    overallStatus: string
    currentSequence: number

    stops: UiShipmentStop[]
}