import { createFileRoute } from '@tanstack/react-router'

export type ProductSearch = {
  category?: string,
  brand?: string
  rating?: string
  weight?: string
  condition?: string
  sortBy?: 'asc' | 'desc',
  q?: string
}

export const Route = createFileRoute('/_authenticated/')({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      category: search.category as string || undefined,
      brand: search.brand as string || undefined,
      rating: search.rating as string || undefined,
      weight: search.weight as string || undefined,
      condition: search.condition as string || undefined,
      sortBy: (search.sortBy as 'asc' | 'desc') || undefined,
      q: search.q as string || undefined,
    }
  },
})
