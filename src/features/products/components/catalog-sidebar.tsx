import { useNavigate, useSearch } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/index' 
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"


const CATEGORIES = [
    { id: 'all', name: 'All products', slug: undefined, sub: [] },
    { 
        id: 'electronics', 
        name: 'Electronics', 
        slug: 'mobile-accessories',
        sub: [
          { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' },
          { id: 'laptops', name: 'Laptops', slug: 'laptops' }
        ] 
    },
    { 
        id: 'kitchen-accessories', 
        name: 'Kitchen accessories',
        slug: 'kitchen-accessories', 
        sub: [{ id: 'home-decoration', name: 'Home decoration', slug: 'home-decoration'}] 
    },
    { id: 'sport', name: 'Sport', slug: 'sports-accessories',sub: [] },
    { id: 'beauty', name: 'Beauty', slug: 'beauty',sub: [] },
]

export function CatalogSidebar() {
    const search = useSearch({ from: '/_authenticated/' })
    const activeCategory = search.category
    const navigate = useNavigate({ from: Route.fullPath })
    const handleCategoryClick = (slug?: string) => {
        navigate({
          search: (prev) => ({
            ...prev,
            category: slug,
          }),
        })
    }
    return (
        <aside className="w-64 shrink-0 pr-8">
        <h2 className="text-xl font-bold mb-8 text-slate-800">Categories</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-1">
          {CATEGORIES.map((cat) => (
            <AccordionItem key={cat.id} value={cat.id} className="border-none">
              <div className="flex items-center group">
                <button
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={cn(
                    "flex-1 text-left py-2 font-bold text-xl transition-colors",
                    activeCategory === cat.slug ? "text-slate-900 underline decoration-2 underline-offset-8" : "text-slate-800 hover:text-[#e67e7e]"
                  )}
                >
                  {cat.name}
                </button>
  
                {cat.sub.length > 0 && (
                  <AccordionTrigger className="w-10 h-10 p-0 hover:no-underline justify-center" />
                )}
              </div>
  
              {cat.sub.length > 0 && (
                <AccordionContent className="pl-6 pt-2 pb-2 flex flex-col items-start gap-4">
                  {cat.sub.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleCategoryClick(sub.slug)}
                      className={cn(
                        "text-xl transition-colors",
                        activeCategory === sub.slug 
                          ? "text-slate-900 underline decoration-1 underline-offset-[12px]" 
                          : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {sub.name}
                    </button>
                  ))}
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
    )
}