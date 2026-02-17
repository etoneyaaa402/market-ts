import { createLazyFileRoute } from '@tanstack/react-router'
import { CatalogSidebar } from '@/features/products/components/catalog-sidebar'
import { CatalogFilters } from '@/features/products/components/catalog-filters'
import { CatalogTips } from '@/features/products/components/catalog-tips'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <CatalogTips/>
        <div className="flex gap-10">
          <CatalogSidebar/>
          <div className="flex-1">
            <CatalogFilters/>
            <h1 className="text-3xl font-bold text-slate-800 mb-8 lowercase">
              selected category
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              products grid
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}