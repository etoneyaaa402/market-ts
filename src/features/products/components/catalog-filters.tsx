import { useState } from "react"
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

const FILTER_OPTIONS = {
    Rating: ["1", "2", "3", "4", "5"],
    Weight: ["10", "20", "30", "40"],
    Brand: ["Apple", "Samsung", "Essence", "Fashion Fun", "Kawasaki"],
    Condition: ["New", "Used", "Refurbished"],
}

export function CatalogFilters() {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["3", "Apple"])
    const [activeSort, setActiveSort] = useState("ascending")
    const addFilter = (option: string) => {
        if (!selectedFilters.includes(option)) {
            setSelectedFilters((prev) => [...prev, option])
        }
    }
    const removeFilter = (filter: string) => {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    }
    return (
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-wrap gap-3">
                {Object.entries(FILTER_OPTIONS).map(([label, options]) => (
                <DropdownMenu key={label}>
                    <DropdownMenuTrigger asChild>
                    <Button 
                        variant="outline" 
                        className="rounded-full border-slate-200 px-6 py-5 text-[15px] font-normal hover:border-[#e67e7e] data-[state=open]:border-[#e67e7e] transition-colors"
                    >
                        {label} <ChevronDown className="ml-2 h-4 w-4 text-slate-900 fill-current" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="rounded-2xl p-2 min-w-[160px]">
                    {options.map((option) => (
                        <DropdownMenuItem 
                            key={option} 
                            onClick={() => addFilter(option)}
                            className="rounded-lg py-2 cursor-pointer text-[15px] text-slate-700 focus:bg-slate-50 focus:text-[#e67e7e]"
                        >
                        {option}
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                ))}
            </div>

            {selectedFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1">
                    {selectedFilters.map((filter) => (
                        <Badge 
                            key={filter} 
                            variant="secondary" 
                            className="bg-slate-100 hover:bg-slate-200 text-slate-500 font-normal px-4 py-1.5 rounded-full border-none flex items-center gap-2 text-[14px] transition-all"
                        >
                        {filter}
                        <button 
                            onClick={() => removeFilter(filter)}
                            className="hover:bg-slate-300 rounded-full p-0.5 transition-colors"
                        >
                            <X className="h-3 w-3" />
                        </button>
                        </Badge>
                    ))}
                    
                    <button 
                        onClick={() => setSelectedFilters([])}
                        className="text-xs text-slate-400 hover:text-[#e67e7e] ml-2 underline underline-offset-4"
                    >
                        Clear all
                    </button>
                </div>
            )}

            <div className="flex items-center gap-4 text-[15px] text-slate-400 mt-2">
                <span>Sort by:</span>
                <button 
                    onClick={() => setActiveSort("ascending")}
                    className={cn(
                        "underline-offset-4 decoration-1 transition-colors",
                        activeSort === "ascending" ? "text-[#e67e7e] underline" : "hover:text-slate-600"
                    )}
                >
                Ascending price
                </button>
                <button 
                    onClick={() => setActiveSort("descending")}
                    className={cn(
                        "underline-offset-4 decoration-1 transition-colors",
                        activeSort === "descending" ? "text-[#e67e7e] underline" : "hover:text-slate-600"
                    )}
                >
                Descending price
                </button>
            </div>
        </div>
    )
}