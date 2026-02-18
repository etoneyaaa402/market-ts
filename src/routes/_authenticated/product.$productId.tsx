import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/api/products'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const Route = createFileRoute('/_authenticated/product/$productId')({
  component: ProductPage,
})

const SHIPPING_COSTS: Record<string, string> = {
  "Germany": "5.00",
  "USA": "15.00",
  "France": "7.50",
  "UK": "10.00",
  "Japan": "20.00"
}

function ProductPage() {
  const { productId } = Route.useParams()
  const [isAdded, setIsAdded] = useState(false)
  const [shippingCountry, setShippingCountry] = useState("Germany")

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getById(productId),
  })

  if (isLoading) return <div className="p-10 text-center">Loading...</div>
  if (isError || !product) return <div className="p-10 text-center">Product not found</div>

  return (
    <div className="max-w-[1440px] mx-auto px-6 bg-white">
      <div className="flex flex-col gap-4 mb-4">
        <Link to="/" className="flex items-center text-[#e67e7e] font-semibold hover:underline text-xl">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to catalog
        </Link>

        <div className="flex gap-12 text-sm">
          <div>
            <p className="text-slate-400 uppercase font-medium mb-1">Category</p>
            <p className="font-bold text-slate-800">{product.category}</p>
          </div>
          <div>
            <p className="text-slate-400 uppercase font-medium mb-1">Brand</p>
            <p className="font-bold text-slate-800">{product.brand || "Generic"}</p>
          </div>
          <div>
            <p className="text-slate-400 uppercase font-medium mb-1">Availability</p>
            <p className="font-bold text-slate-800">In Stock</p>
          </div>
        </div>
      </div>

      <hr className="mb-6 border-slate-100" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <div className="bg-[#fcfcfc] rounded-[40px] p-12 flex items-center justify-center aspect-square">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">{product.title}</h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-y-6 mb-10">
            <div>
              <span className="text-slate-400 text-lg">Price:</span>
              <span className="text-2xl font-bold ml-2">{product.price.toLocaleString('de-DE')},99 €</span>
            </div>
            <div>
              <span className="text-slate-400 text-lg">Color:</span>
              <span className="text-lg font-bold ml-2">Mixed (Default)</span>
            </div>
            <div>
              <span className="text-slate-400 text-lg">Size:</span>
              <span className="text-lg font-bold ml-2">Universal</span>
            </div>
            <div>
              <span className="text-slate-400 text-lg">Delivery:</span>
              <span className="text-lg font-bold ml-2">1-5 working days</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium">Shipping to:</span>
              <Select value={shippingCountry} onValueChange={setShippingCountry}>
                <SelectTrigger className="w-[180px] bg-white rounded-xl border-slate-200">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(SHIPPING_COSTS).map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-slate-500">
              Shipping cost from <span className="font-bold text-slate-700">{SHIPPING_COSTS[shippingCountry]}.00 €</span>
            </p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-[#2d2d2d] hover:bg-[#1a1a1a] text-white py-8 rounded-full text-xl font-bold">
              Buy Now
            </Button>
            
            <Button 
              onClick={() => setIsAdded(true)}
              disabled={isAdded}
              className={cn(
                "flex-1 py-8 rounded-full text-xl font-bold transition-all",
                isAdded 
                  ? "bg-slate-100 text-slate-400 hover:bg-slate-100" 
                  : "bg-[#e67e7e] hover:bg-[#d66e6e] text-white"
              )}
            >
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
