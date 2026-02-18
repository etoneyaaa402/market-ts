import { useMemo } from 'react'
import type { Product } from '@/types/product'
import type { ProductSearch } from '@/routes/_authenticated/index'

export const useFilteredProducts = (products: Product[] | undefined, filters: ProductSearch) => {
  return useMemo(() => {
    if (!products) return []

    let result = [...products]

    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand)
    }

    if (filters.rating) {
      result = result.filter((p) => p.rating >= Number(filters.rating))
    }

    if (filters.sortBy === 'asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, filters])
}