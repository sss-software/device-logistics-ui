import { SHIPMENT_STATUS_MAP } from "@/constants/shipment-status-icons";
import type { ShipmentStatusDto } from "@/models/api/shipment-status.dto";
import type { UiStatus } from "@/models/ui/status.model";

export function resolveShipmentStatus(status: ShipmentStatusDto): UiStatus {
    const mapping = SHIPMENT_STATUS_MAP[status.shipmentStatusId]

    if (mapping) {
        return {
            id: status.shipmentStatusId,
            name: status.name,
            icon: mapping.icon,
            color: mapping.color
        }
    }

    return {
        id: status.shipmentStatusId,
        name: status.name,
        icon: 'mdi-help-circle',
        color: 'grey'
    }
}
