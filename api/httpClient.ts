import axios from 'axios'
import { API_BASE } from '@/environments/development'

export const httpClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
})
