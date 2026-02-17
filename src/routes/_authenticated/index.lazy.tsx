import { createLazyFileRoute } from '@tanstack/react-router'
import { CatalogSidebar } from '@/features/products/components/catalog-sidebar'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto flex min-h-screen px-6 py-10">
        <CatalogSidebar/>
        <div className="flex-1 pl-4">
          <div className="text-slate-300 h-full flex items-center justify-center">
            Content area (Products & Filters will be here)
          </div>
        </div>
      </div>
    </div>
  )
}