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
  const search = Route.useSearch()
  // const { category } = Route.useSearch()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', search.category],
    queryFn: () => productsApi.getAll(search.category),
  })
  const filteredProducts = data?.products.filter(product => {
    let keep = true
    if (search.q) {
      const query = search.q.toLowerCase()
      const inTitle = product.title.toLowerCase().includes(query)
      const inDesc = product.description.toLowerCase().includes(query)
      
      if (!inTitle && !inDesc) keep = false
    }
    if (search.brand && product.brand !== search.brand) keep = false
    if (search.rating) {
      const selectedRating = Number(search.rating)
      const roundedProductRating = Math.round(product.rating)
      if (roundedProductRating !== selectedRating) {
        keep = false
      }
    }
    return keep
  }) || []

  if (search.sortBy === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (search.sortBy === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price)
  }
  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* <CatalogTips/> */}
        <div className="overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          <CatalogTips />
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* <CatalogSidebar/> */}
          <div className="hidden lg:block">
            <CatalogSidebar />
          </div>
          <div className="flex-1">
            <CatalogFilters/>
            {/* <h1 className="text-3xl font-bold text-slate-800 mb-8 lowercase">
              {category ? category.replace('-', ' ') : 'all products'}
            </h1> */}
            {isLoading && (
              <div className="grid grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {isError && <p className="text-red-500">Error loading products.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 lg:gap-x-8 lg:gap-y-10">
              {filteredProducts.length === 0 && !isLoading && (
                  <div className="text-center py-20 text-slate-400">
                      No products found for "{search.q}"
                  </div>
              )}
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  isNew={product.rating > 4.5} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}