import type { AxiosError } from 'axios'
import { logger } from '@/logging/logger'
import type { QuotationResultDto } from '@/models/api/quotation-result.dto'
import type { ApiResponse } from '@/models/api/apiResponse'
import { httpClient } from '@/api/httpClient'
import type { CreateQuotationRequestDto } from '@/models/api/quotation-create-request.dto'

export class QuotationService {

    public async createQuotation(
        payload: CreateQuotationRequestDto
    ): Promise<QuotationResultDto> {
        return await this.createQuotationFromApi(payload)
    }

    private async createQuotationFromApi(payload: CreateQuotationRequestDto
    ): Promise<QuotationResultDto> {
        try {
            const response = await httpClient.post<ApiResponse<QuotationResultDto>>('/quotations/create', payload)

            const apiResult = response.data

            if (!apiResult.success || !apiResult.data) {
                logger.warn('Quotation API returned unsuccessful result', {
                    errors: apiResult.errors,
                    exceptionDetails: apiResult.exceptionDetails,
                })
                throw new Error('Quotation creation failed')
            }

            return apiResult.data
        } catch (error) {
            const axiosError = error as AxiosError
            logger.error('Failed to create quotation', {
                status: axiosError.response?.status,
                data: axiosError.response?.data,
            })
            throw error
        }
    }
}
