import type { UiStatus } from './status.model'

export interface UiDevice {
    deviceId: number
    name: string
    serialNumber: string
    dailyRate: number
    status: UiStatus
    shipmentStatus?: UiStatus
    shipmentId?: number
}
