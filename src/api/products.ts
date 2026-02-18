import { api } from './client'
import { type Product, type ProductsResponse } from '@/types/product'

export const productsApi = {
    getAll: async (category?: string) => {
        const url = category ? `/products/category/${category}` : '/products';
        const response = await api.get<ProductsResponse>(url);
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },
};