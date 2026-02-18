import { createFileRoute } from '@tanstack/react-router'

export type ProductSearch = {
  category?: string
}

export const Route = createFileRoute('/_authenticated/')({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      category: search.category as string || undefined,
    }
  },
})
