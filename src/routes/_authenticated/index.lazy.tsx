import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/api/products';
import { CatalogSidebar } from '@/features/products/components/catalog-sidebar'
import { CatalogFilters } from '@/features/products/components/catalog-filters'
import { CatalogTips } from '@/features/products/components/catalog-tips'
import { ProductCard } from '@/features/products/components/product-card'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: HomePage,
})

function HomePage() {
  const { category } = Route.useSearch()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', category],
    queryFn: () => productsApi.getAll(category),
  })
  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <CatalogTips/>
        <div className="flex gap-10">
          <CatalogSidebar/>
          <div className="flex-1">
            <CatalogFilters/>
            {/* <h1 className="text-3xl font-bold text-slate-800 mb-8 lowercase">
              {category ? category.replace('-', ' ') : 'all products'}
            </h1> */}
            {isLoading && (
              <div className="grid grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-slate-100 animate-pulse rounded-[32px]" />
                ))}
              </div>
            )}

            {isError && <p className="text-red-500">Error loading products.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {data?.products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isNew={index % 3 === 0} 
                  isReserved={index === 2 || index === 5}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}