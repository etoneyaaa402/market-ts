import { useNavigate, useSearch } from '@tanstack/react-router'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

// Твои оригинальные категории
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
    { id: 'sport', name: 'Sport', slug: 'sports-accessories', sub: [] },
    { id: 'beauty', name: 'Beauty', slug: 'beauty', sub: [] },
]

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const activeCategory = (search as any)?.category

  const handleCategoryClick = (slug?: string) => {
    navigate({
      to: '/',
      search: (prev: any) => ({ ...prev, category: slug }),
    })
    onClose()
  }

  return (
    <div className="flex flex-col h-full bg-white pt-12 pb-6 px-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-slate-800 px-2">Categories</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {CATEGORIES.map((cat) => (
          <AccordionItem key={cat.id} value={cat.id} className="border-none mb-1">
            <div className="flex items-center">
              <button
                onClick={() => handleCategoryClick(cat.slug)}
                className={cn(
                  "flex-1 text-left py-3 px-2 text-lg font-bold transition-all",
                  activeCategory === cat.slug 
                    ? "text-slate-900 underline decoration-2 underline-offset-8" 
                    : "text-slate-700 hover:text-slate-900"
                )}
              >
                {cat.name}
              </button>

              {cat.sub.length > 0 && (
                <AccordionTrigger className="w-12 h-12 p-0 hover:no-underline justify-center border-none focus:ring-0" />
              )}
            </div>

            {cat.sub.length > 0 && (
              <AccordionContent className="pl-6 pt-1 pb-2 flex flex-col gap-1">
                {cat.sub.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleCategoryClick(sub.slug)}
                    className={cn(
                      "w-full text-left py-3 px-2 text-base transition-all",
                      activeCategory === sub.slug 
                        ? "text-slate-900 font-bold underline decoration-1 underline-offset-8" 
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

      <div className="mt-auto pt-10 flex flex-col gap-6 px-2 text-sm font-medium text-slate-400">
        <hr className="border-slate-100" />
        <button onClick={onClose} className="text-left hover:text-slate-600">About us</button>
        <button onClick={onClose} className="text-left hover:text-slate-600">All shops</button>
        <button onClick={onClose} className="text-left hover:text-slate-600">Become a merchant</button>
      </div>
    </div>
  )
}