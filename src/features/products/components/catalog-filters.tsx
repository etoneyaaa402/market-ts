import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Route, type ProductSearch } from '@/routes/_authenticated/index'

const FILTER_OPTIONS = {
    Rating: ["1", "2", "3", "4", "5"],
    Weight: ["10", "20", "30", "40"],
    Brand: ["Apple", "Samsung", "Essence", "Fashion Fun", "Kawasaki"],
    Condition: ["New", "Used", "Refurbished"],
}

export function CatalogFilters() {
    const search = useSearch({ from: '/_authenticated/' })
    const navigate = useNavigate({ from: Route.fullPath })
    
    const updateFilter = (key: keyof ProductSearch, value: string) => {
        navigate({
          search: (prev) => ({ ...prev, [key]: value }),
        })
    }
    const removeFilter = (key: keyof ProductSearch) => {
        navigate({
          search: (prev) => {
            const next = { ...prev }
            delete next[key]
            return next
          },
        })
    }
    const activeChips = Object.entries(search).filter(
        ([key, value]) => value && key !== 'category' && key !== 'sortBy'
    )
    return (
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {Object.entries(FILTER_OPTIONS).map(([label, options]) => {
              const searchKey = label.toLowerCase() as keyof ProductSearch
              const isActive = !!search[searchKey]
    
              return (
                <DropdownMenu key={label}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={cn(
                        "rounded-full border-slate-200 px-6 py-5 text-[15px] font-normal transition-all",
                        isActive ? "border-[#e67e7e] text-[#e67e7e]" : "hover:border-[#e67e7e]"
                      )}
                    >
                      {label} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="rounded-2xl p-2 min-w-[160px]">
                    {options.map((option) => (
                      <DropdownMenuItem 
                        key={option} 
                        onClick={() => updateFilter(searchKey, option)}
                        className="rounded-lg py-2 cursor-pointer text-[15px] text-slate-700 focus:bg-slate-50 focus:text-[#e67e7e]"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            })}
          </div>
    
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeChips.map(([key, value]) => (
                <Badge 
                  key={key} 
                  variant="secondary" 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-500 font-normal px-4 py-1.5 rounded-full border-none flex items-center gap-2 text-[14px]"
                >
                  {value}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFilter(key as keyof ProductSearch)} 
                  />
                </Badge>
              ))}
            </div>
          )}
    
          <div className="flex items-center gap-4 text-[15px] text-slate-400 mt-2">
            <span>Sort by:</span>
            <button 
              onClick={() => updateFilter('sortBy', 'asc')}
              className={cn(
                "underline-offset-4 decoration-1",
                search.sortBy === 'asc' ? "text-[#e67e7e] underline font-medium" : "hover:text-slate-600"
              )}
            >
              Ascending price
            </button>
            <button 
              onClick={() => updateFilter('sortBy', 'desc')}
              className={cn(
                "underline-offset-4 decoration-1",
                search.sortBy === 'desc' ? "text-[#e67e7e] underline font-medium" : "hover:text-slate-600"
              )}
            >
              Descending price
            </button>
          </div>
        </div>
    )
}