import type { ShipmentDto } from '@/models/api/shipment.dto'
import type { UiShipment } from '@/models/ui/shipment.model'
import type { UiDevice } from '@/models/ui/device.model'
import type { UiShipmentStop } from '@/models/ui/shipment-stop.model'
import type { ShipmentStopDto } from '@/models/api/shipment-stop.dto'
import type { DeviceDto } from '@/models/api/device.dto'
import type { UiShipmentTracked } from '@/models/ui/shipment-tracked.model'
import type { AxiosError } from 'axios'
import type { ApiResponse } from '@/models/api/apiResponse'
import { httpClient } from '@/api/httpClient'
import { logger } from '@/logging/logger'
import { resolveShipmentStatus } from '@/utils/shipment-status-mapper'
import { resolveDeviceStatus } from '@/utils/device-status-mapper'
import { useLookupStore } from '@/stores/lookup-store'
import type { UiShipmentStatistics } from '@/models/ui/shipment.statistics.model'
import type { ShipmentStatisticsDto } from '@/models/api/shipment-statistcs.dto'

export class ShipmentService {
    private lookupStore = useLookupStore()

    public async getShipments(): Promise<UiShipment[]> {
        const apiShipments = await this.fetchShipmentsFromApi()
        return apiShipments.map((d) => this.toUiShipment(d))
    }

    public async getShipmentByTrackingNumber(trackingNumber: string): Promise<UiShipmentTracked | null> {
        const apiResult = await this.getShipmentByTrackingNumberFromApi(trackingNumber)
        if (!apiResult) return null

        return this.toUiShipmentTracked(apiResult)
    }

    public async getShipmentsByStatus(): Promise<UiShipmentStatistics[]> {
        const apiShipmentStatistics = await this.fetchShipmentsByStatusFromApi()
        return apiShipmentStatistics.map(d => this.toUiShipmentStatistics(d))
    }

    private async fetchShipmentsFromApi(): Promise<ShipmentDto[]> {
        try {
            const response = await httpClient.get<ApiResponse<ShipmentDto[]>>('/shipments')

            const apiResult = response.data

            if (!apiResult.success) {
                logger.warn('Shipments API returned unsuccessful result', {
                    errors: apiResult.errors,
                    exceptionDetails: apiResult.exceptionDetails,
                })
                return []
            }
            return apiResult.data
        } catch (error) {
            const axiosError = error as AxiosError

            logger.error('Failed to fetch shipments', {
                status: axiosError.response?.status,
                data: axiosError.response?.data,
            })

            throw new Error('Unable to load shipments')
        }
    }

    private async getShipmentByTrackingNumberFromApi(trackingNumber: string): Promise<ShipmentDto | null> {
        try {
            const response = await httpClient.get<ApiResponse<ShipmentDto>>(`/shipments/${trackingNumber}`)
            const apiResult = response.data

            if (!apiResult.success) {
                logger.warn('Shipments API returned unsuccessful result', {
                    errors: apiResult.errors,
                    exceptionDetails: apiResult.exceptionDetails,
                })
                return null
            }

            return apiResult.data
        } catch (error) {
            const axiosError = error as AxiosError

            if (axiosError.response?.status === 404) {
                logger.warn('Shipment not found', { trackingNumber })
                return null
            }

            logger.error('Error fetching shipment by tracking number', {
                trackingNumber,
                status: axiosError.response?.status,
                data: axiosError.response?.data,
            })

            throw new Error('Unable to load shipment')
        }
    }


    private async fetchShipmentsByStatusFromApi(): Promise<ShipmentStatisticsDto[]> {
        try {
            const response = await httpClient.get<ApiResponse<ShipmentStatisticsDto[]>>('/dashboard/shipments-by-status')
            const apiResult = response.data

            if (!apiResult.success) {
                logger.warn('Shipments API returned unsuccessful result', {
                    errors: apiResult.errors,
                    exceptionDetails: apiResult.exceptionDetails,
                })
                return []
            }

            return apiResult.data
        } catch (error) {
            const axiosError = error as AxiosError
            logger.error('Failed to fetch shipment statistics: shipments-by-status', {
                status: axiosError.response?.status,
                data: axiosError.response?.data,
            })
            throw new Error('Unable to load statistics: shipments-by-status')
        }
    }

    private toUiShipmentTracked(dto: ShipmentDto): UiShipmentTracked {
        const stops = dto.stops
            .map((s) => this.toUiShipmentStop(s))
            .sort((a, b) => a.sequenceNumber - b.sequenceNumber)

        const currentIndex = dto.stops.findIndex(
            (s) => s.shipmentStopId === dto.currentStopId
        )

        return {
            trackingNumber: dto.trackingNumber,
            overallStatus: "In transit",
            currentSequence: currentIndex >= 0 ? currentIndex + 1 : 0,
            stops
        }
    }

    private toUiShipment(dto: ShipmentDto): UiShipment {
        return {
            shipmentId: dto.shipmentId,
            trackingNumber: dto.trackingNumber,
            originCity: dto.originCity.name,
            originCountry: dto.originCountry.name,
            destinationCity: dto.destinationCity.name,
            destinationCountry: dto.destinationCountry.name,
            actualDeparture: dto.actualDeparture ? this.formatDate(dto.actualDeparture) : undefined,
            actualArrival: dto.actualArrival ? this.formatDate(dto.actualArrival) : undefined,
            estimatedDeparture: dto.estimatedDeparture ? this.formatDate(dto.estimatedDeparture) : undefined,
            estimatedArrival: dto.estimatedArrival ? this.formatDate(dto.estimatedArrival) : undefined,
            customer: dto.customer ? dto.customer.name : undefined,
            carrier: dto.shippingCarrier ? dto.shippingCarrier.name : undefined,
            transportMode: dto.transportMode ? dto.transportMode.name : undefined,
            status: resolveShipmentStatus(dto.status),
            currentStopId: dto.currentStopId,
            devices: dto.devices.map((d) => this.toUiDevice(d)),
            stops: dto.stops.map((s) => this.toUiShipmentStop(s)),
        }
    }

    private formatDate(dateStr: string): string {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-ZA', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    private toUiShipmentStatistics(dto: ShipmentStatisticsDto): UiShipmentStatistics {
        return {
            count: dto.count,
            status: dto.status
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
        }
    }

    private toUiShipmentStop(dto: ShipmentStopDto): UiShipmentStop {
        return {
            shipmentStopId: dto.shipmentStopId,
            shipmentId: dto.shipmentId,
            countryId: dto.countryId,
            cityId: dto.cityId,
            country: this.lookupStore.countryById(dto.countryId),
            city: this.lookupStore.cityById(dto.cityId),
            sequenceNumber: dto.sequenceNumber,
            title: this.lookupStore.countryCodeById(dto.countryId) + " - " + this.lookupStore.cityById(dto.cityId),
        }
    }
}
