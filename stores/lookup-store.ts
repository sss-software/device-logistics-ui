import type { CityDto } from '@/models/api/city.dto'
import type { CountryDto } from '@/models/api/country.dto'
import type { CustomerDto } from '@/models/api/customer.dto'
import type { DeviceLookupDto } from '@/models/api/device-lookup.dto'
import type { DeviceStatusDto } from '@/models/api/device-status.dto'
import type { ShipmentStatusDto } from '@/models/api/shipment-status.dto'
import type { SupportTierDto } from '@/models/api/support-tier.dto'
import type { TransportModeDto } from '@/models/api/transport-mode.dto'
import { LookupService } from '@/services/lookup.service'
import { defineStore } from 'pinia'


export const useLookupStore = defineStore('lookup', {
    state: () => ({
        countries: [] as CountryDto[],
        cities: [] as CityDto[],
        customers: [] as CustomerDto[],
        shipmentStatuses: [] as ShipmentStatusDto[],
        deviceLookups: [] as DeviceLookupDto[],
        deviceStatuses: [] as DeviceStatusDto[],
        transportModes: [] as TransportModeDto[],
        supportTiers: [] as SupportTierDto[],
        loaded: false
    }),

    getters: {
        shipmentStatusById: (state) => {
            const map = new Map(state.shipmentStatuses.map(s => [s.shipmentStatusId, s.name]))
            return (id: number) => map.get(id) ?? ''
        },
        deviceStatusById: (state) => {
            const map = new Map(state.deviceStatuses.map(s => [s.deviceStatusId, s.name]))
            return (id: number) => map.get(id) ?? ''
        },
        countryById: (state) => {
            const countries = state.countries || []
            const map = new Map(countries.map(c => [c.countryId, c.name]))
            return (id: number) => map.get(id) ?? ''
        },
        countryCodeById: (state) => {
            const countries = state.countries || []
            const map = new Map(countries.map(c => [c.countryId, c.code]))
            return (id: number) => map.get(id) ?? ''
        },
        cityById: (state) => {
            const cities = state.cities || []
            const map = new Map(cities.map(c => [c.cityId, c.name]))
            return (id: number) => map.get(id) ?? ''
        },
        transportModeById: (state) => {
            const map = new Map(state.transportModes.map(t => [t.transportModeId, t.name]))
            return (id: number) => map.get(id) ?? ''
        },
        citiesByCountryId: (state) => {
            return (countryId: number | null) =>
                state.cities.filter(c => c.countryId === countryId)
        }
    },

    actions: {
        async loadAll() {
            if (this.loaded) return

            const service = new LookupService()

            const [countries, cities, shipmentStatuses, deviceStatuses, deviceLookups, transportModes, customers, supportTiers] = await Promise.all([
                service.getCountries(),
                service.getCities(),
                service.getShipmentStatuses(),
                service.getDeviceStatuses(),
                service.getDeviceLookups(),
                service.getTransportModes(),
                service.getCustomers(),
                service.getSupportTiers()
            ])

            this.countries = countries
            this.cities = cities
            this.deviceStatuses = deviceStatuses
            this.deviceLookups = deviceLookups
            this.shipmentStatuses = shipmentStatuses
            this.transportModes = transportModes
            this.customers = customers,
                this.supportTiers = supportTiers
            this.loaded = true
        }
    }
})
