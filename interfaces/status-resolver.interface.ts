import type { UiStatus } from '@/models/ui/status.model'

export interface StatusResolver {
    resolveDeviceStatus(statusId: number): UiStatus
}