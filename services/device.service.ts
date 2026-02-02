import { httpClient } from '@/api/httpClient'
import type { IDeviceService } from '@/interfaces/device-service.interface'
import type { ApiResponse } from '@/models/api/apiResponse'
import type { DeviceDto } from '@/models/api/device.dto'
import type { UiDevice } from '@/models/ui/device.model'
import type { AxiosError } from 'axios'
import { logger } from '@/logging/logger'
import { resolveDeviceStatus } from '@/utils/device-status-mapper'
import { resolveShipmentStatus } from '@/utils/shipment-status-mapper'
import type { DeviceStatisticsDto } from '@/models/api/device-statistcs.dto'
import type { UiDeviceStatistics } from '@/models/ui/device.statistics.model'

export class DeviceService implements IDeviceService {

    public async getDevices(): Promise<UiDevice[]> {
        const apiDevices = await this.fetchDevicesFromApi()
        return apiDevices.map(d => this.toUiDevice(d))
    }

    public async getDevicesByStatus(): Promise<UiDeviceStatistics[]> {
        const apiDeviceStatistics = await this.fetchDeviceByStatusFromApi()
        return apiDeviceStatistics.map(d => this.toUiDeviceStatistics(d))
    }

    private async fetchDeviceByStatusFromApi(): Promise<DeviceStatisticsDto[]> {
        try {
            const response = await httpClient.get<ApiResponse<DeviceStatisticsDto[]>>('/dashboard/devices-by-status')
            const apiResult = response.data

            if (!apiResult.success) {
                logger.warn('Devices API returned unsuccessful result', {
                    errors: apiResult.errors,
                    exceptionDetails: apiResult.exceptionDetails,
                })
                return []
            }

            return apiResult.data
        } catch (error) {
            const axiosError = error as AxiosError
            logger.error('Failed to fetch device statistics: devices-by-status', {
                status: axiosError.response?.status,
                data: axiosError.response?.data,
            })
            throw new Error('Unable to load statistics: devices-by-status')
        }
    }

    private async fetchDevicesFromApi(): Promise<DeviceDto[]> {
        try {
            const response = await httpClient.get<ApiResponse<DeviceDto[]>>('/devices')
            const apiResult = response.data

            if (!apiResult.success) {
                logger.warn('Devices API returned unsuccessful result', {
                    errors: apiResult.errors,
                    exceptionDetails: apiResult.exceptionDetails,
                })
                return []
            }

            return apiResult.data
        } catch (error) {
            const axiosError = error as AxiosError
            logger.error('Failed to fetch devices', {
                status: axiosError.response?.status,
                data: axiosError.response?.data,
            })
            throw new Error('Unable to load devices')
        }
    }

    private toUiDevice(dto: DeviceDto): UiDevice {
        return {
            deviceId: dto.deviceId,
            name: dto.name,
            serialNumber: dto.serialNumber,
            dailyRate: dto.dailyRate,
            shipmentId: dto.shipmentId,
            status: resolveDeviceStatus(dto.status),
            shipmentStatus: dto.shipmentId ? resolveShipmentStatus(dto.shipmentStatus) : undefined
        }
    }

    private toUiDeviceStatistics(dto: DeviceStatisticsDto): UiDeviceStatistics {
        return {
            count: dto.count,
            status: dto.status
        }
    }
}
