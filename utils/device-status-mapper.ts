import { DEVICE_STATUS_MAP } from "@/constants/device-status-icons";
import type { DeviceStatusDto } from "@/models/api/device-status.dto";
import type { UiStatus } from "@/models/ui/status.model";

export function resolveDeviceStatus(status: DeviceStatusDto): UiStatus {
    const mapping = DEVICE_STATUS_MAP[status.deviceStatusId]

    if (mapping) {
        return {
            id: status.deviceStatusId,
            name: status.name,
            icon: mapping.icon,
            color: mapping.color
        }
    }

    return {
        id: status.deviceStatusId,
        name: status.name,
        icon: 'mdi-help-circle',
        color: 'grey'
    }
}
