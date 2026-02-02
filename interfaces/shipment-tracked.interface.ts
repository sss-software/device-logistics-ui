import type { UiShipmentStop } from "@/models/ui/shipment-stop.model"

export interface TrackedShipment {
    trackingNumber: string
    overallStatus: string
    currentStep: number
    stops: UiShipmentStop[]
}