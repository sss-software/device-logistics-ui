import type { StatusMapping } from "@/interfaces/status-mapping.interface";

export const DEVICE_STATUS_MAP: Record<number, StatusMapping> = {
    1: { icon: 'mdi-check-circle', color: 'success' },
    2: { icon: 'mdi-progress-clock', color: 'warning' },
    3: { icon: 'mdi-close-circle', color: 'error' },
}

