import { api } from './client'
import { type Product, type ProductsResponse } from '@/types/product'

export const productsApi = {
    getAll: async () => {
        const response = await api.get<ProductsResponse>('/products?limit=30');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },
};