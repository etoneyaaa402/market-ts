import { useState } from "react"
import { cn } from "@/lib/utils"

const TIPS_OPTIONS = ['Women', 'Men', 'Unisex', 'Children', 'New']

export function CatalogTips() {
  const [activeTab, setActiveTab] = useState('Women')

  return (
    <div className="flex justify-center w-full mb-10">
      <div className="inline-flex items-center border border-slate-200 rounded-full bg-white overflow-hidden shadow-sm">
        {TIPS_OPTIONS.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative px-10 py-3 text-[15px] transition-all hover:bg-slate-50/50",
              index !== TIPS_OPTIONS.length - 1 && "border-r border-slate-200",
              tab === activeTab 
                ? "text-slate-900 font-bold underline decoration-2 underline-offset-[12px]" 
                : "text-slate-500 font-normal"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}