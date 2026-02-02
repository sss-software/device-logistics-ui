import type { UiDevice } from "./device.model";
import type { UiShipmentStop } from "./shipment-stop.model";
import type { UiStatus } from "./status.model";

export interface UiShipment {
    shipmentId: number
    trackingNumber: string
    originCity: string
    originCountry: string
    destinationCity: string
    destinationCountry: string
    actualDeparture?: string | undefined
    actualArrival?: string | undefined
    estimatedDeparture?: string | undefined
    estimatedArrival?: string | undefined
    customer: string | undefined
    carrier: string | undefined
    transportMode: string | undefined
    status: UiStatus
    devices: UiDevice[]
    currentStopId: number
    stops: UiShipmentStop[]
}