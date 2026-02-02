import type { UiDevice } from "@/models/ui/device.model";

export interface IDeviceService {
    getDevices(): Promise<UiDevice[]>
}