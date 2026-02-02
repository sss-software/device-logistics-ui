export interface TransportModeDto {
    transportModeId: number
    name: string
    createdBy: string
    createdOn: string
    modifiedBy: string | null
    modifiedOn: string | null
    isActive: boolean
}
