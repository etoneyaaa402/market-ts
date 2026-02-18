import { api } from './client'
import type { ProductsResponse } from '@/types/product'

export const productsApi = {
    getAll: async () => {
        const response = await api.get<ProductsResponse>('/products?limit=30');
        return response.data;
    },
};