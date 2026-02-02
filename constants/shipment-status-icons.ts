import type { StatusMapping } from "@/interfaces/status-mapping.interface";

export const SHIPMENT_STATUS_MAP: Record<number, StatusMapping> = {
    1: { icon: 'mdi-clock-outline', color: 'info' },
    2: { icon: 'mdi-truck-delivery', color: 'info' },
    3: { icon: 'mdi-truck-check', color: 'success' },
    4: { icon: 'mdi-truck-alert', color: 'warning' },
    5: { icon: 'mdi-cancel', color: 'error' }
}