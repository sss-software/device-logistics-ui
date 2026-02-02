export interface ApiResponse<T> {
    success: boolean
    message: string
    errors: string[] | null
    exceptionDetails: unknown | null
    data: T
}