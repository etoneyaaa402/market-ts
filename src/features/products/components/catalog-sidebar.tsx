import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { useState  } from "react"

const CATEGORIES = [
    { id: 'all', name: 'All products', sub: [{ id: 'shoes', name: 'Shoes' }] },
    { id: 'apparel', name: 'Apparel', sub: [] },
    { 
        id: 'acc', 
        name: 'Accessories', 
        sub: [{ id: 'belts', name: 'Belts' }, { id: 'hats', name: 'Hats' }] 
    },
    { id: 'sport', name: 'Sport', sub: [] },
    { id: 'beauty', name: 'Beauty', sub: [] },
]

export function CatalogSidebar() {
    const [activeId, setActiveId] = useState('belts');
    return (
        <aside className="w-64 shrink-0 pr-8">
            <h2 className="text-base font-bold mb-3 text-slate-400">Categories</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-1">
                {CATEGORIES.map((cat) => (
                <AccordionItem key={cat.id} value={cat.id} className="border-none">
                    {cat.sub.length > 0 ? (
                    <>
                        <AccordionTrigger 
                        className={cn(
                            "py-1 hover:no-underline font-bold text-xl text-slate-800 justify-between",
                            cat.id === activeId && "underline decoration-2 underline-offset-8"
                        )}
                        >
                        {cat.name}
                        </AccordionTrigger>
                        <AccordionContent className="pl-6 pt-2 pb-2">
                        {cat.sub.map((sub) => (
                            <div key={sub.id} className="space-y-2">
                                <button
                                    onClick={() => setActiveId(sub.id)}
                                    className={cn(
                                        "block text-xl text-slate-500 hover:text-slate-900 transition-colors py-1",
                                        sub.id === activeId && "text-slate-900 underline decoration-1 underline-offset-[12px]"
                                    )}
                                    >
                                    {sub.name}
                                </button>
                            </div>
                        ))}
                        </AccordionContent>
                    </>
                    ) : (
                    <button
                        onClick={() => setActiveId(cat.id)}
                        className={cn(
                        "w-full text-left py-2 font-bold text-xl text-slate-800 hover:text-slate-600 transition-colors",
                        cat.id === activeId && "underline decoration-2 underline-offset-8"
                        )}
                    >
                        {cat.name}
                    </button>
                    )}
                </AccordionItem>
                ))}
            </Accordion>
        </aside>
    )
}