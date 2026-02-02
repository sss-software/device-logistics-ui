import type { UiShipment } from "@/models/ui/shipment.model";

export interface IShipmentService {
    getShipments(): Promise<UiShipment[]>
}