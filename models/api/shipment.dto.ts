import type { CarrierDto } from "./carrier.dto"
import type { CityDto } from "./city.dto"
import type { CountryDto } from "./country.dto"
import type { CustomerDto } from "./customer.dto"
import type { DeviceDto } from "./device.dto"
import type { ShipmentStatusDto } from "./shipment-status.dto"
import type { ShipmentStopDto } from "./shipment-stop.dto"
import type { TransportModeDto } from "./transport-mode.dto"

export interface ShipmentDto {
    shipmentId: number
    trackingNumber: string
    statusId: number
    status: ShipmentStatusDto
    destinationCityId: number
    destinationCity: CityDto
    destinationCountryId: number
    destinationCountry: CountryDto
    originCityId: number
    originCity: CityDto
    originCountryId: number
    originCountry: CountryDto
    actualDeparture?: string
    actualArrival?: string
    estimatedArrival?: string
    estimatedDeparture?: string
    carrierId: number
    shippingCarrier: CarrierDto
    customerId: number
    customer: CustomerDto
    transportModeId: number
    transportMode: TransportModeDto
    devices: DeviceDto[]
    currentStopId: number
    stops: ShipmentStopDto[]
}