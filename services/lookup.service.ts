import { httpClient } from '@/api/httpClient'
import type { ApiResponse } from '@/models/api/apiResponse'
import type { CityDto } from '@/models/api/city.dto'
import type { CountryDto } from '@/models/api/country.dto'
import type { CustomerDto } from '@/models/api/customer.dto'
import type { DeviceLookupDto } from '@/models/api/device-lookup.dto'
import type { DeviceStatusDto } from '@/models/api/device-status.dto'
import type { ShipmentStatusDto } from '@/models/api/shipment-status.dto'
import type { SupportTierDto } from '@/models/api/support-tier.dto'
import type { TransportModeDto } from '@/models/api/transport-mode.dto'

export class LookupService {
    async getCountries(): Promise<CountryDto[]> {
        const res = await httpClient.get<CountryDto[]>('/lookups/countries')
        console.log('Customers statuses (JSON):', JSON.stringify(res.data, null, 2))
        return res.data

    }

    async getCities(): Promise<CityDto[]> {
        const res = await httpClient.get<CityDto[]>('/lookups/cities')
        return res.data
    }

    async getShipmentStatuses(): Promise<ShipmentStatusDto[]> {
        const res = await httpClient.get<ApiResponse<ShipmentStatusDto[]>>('/lookups/shipment-statuses')
        return res.data.data
    }

    async getDeviceStatuses(): Promise<DeviceStatusDto[]> {
        const res = await httpClient.get<ApiResponse<DeviceStatusDto[]>>('/lookups/device-statuses')
        return res.data.data
    }

    async getTransportModes(): Promise<TransportModeDto[]> {
        const res = await httpClient.get<ApiResponse<TransportModeDto[]>>('/lookups/transport-modes')
        return res.data.data
    }

    async getSupportTiers(): Promise<SupportTierDto[]> {
        const res = await httpClient.get<SupportTierDto[]>('/lookups/support-tiers')
        return res.data

    }

    async getCustomers(): Promise<CustomerDto[]> {
        const res = await httpClient.get<CustomerDto[]>('/lookups/customers')
        return res.data
    }

    async getDeviceLookups(): Promise<DeviceLookupDto[]> {
        const res = await httpClient.get<DeviceLookupDto[]>('/lookups/devices')
        console.log('Device Lookups (JSON):', JSON.stringify(res.data, null, 2))
        return res.data
    }
}
