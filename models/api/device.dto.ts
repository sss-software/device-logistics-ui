import type { DeviceStatusDto } from "./device-status.dto"
import type { ShipmentStatusDto } from "./shipment-status.dto"

export interface DeviceDto {
    deviceId: number
    name: string
    serialNumber: string
    statusId: number
    status: DeviceStatusDto
    shipmentId?: number
    shipmentStatus: ShipmentStatusDto
    dailyRate: number
}
