"use client"

import { cn } from "@/lib/utils"
import { MenuIcon } from "lucide-react"

interface MenuPillProps {
  onClick: () => void
  isExpanded: boolean
}

export function MenuPill({ onClick, isExpanded }: MenuPillProps) {
  return (
    <button
      className={cn(
        "px-6 py-4 rounded-2xl border-2 border-foreground/10",
        "bg-foreground/5 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:bg-foreground hover:text-background hover:border-foreground",
        "hover:shadow-lg hover:shadow-foreground/10",
        "pointer-events-auto",
        "active:scale-[0.98]",
        isExpanded && "bg-foreground text-background border-foreground shadow-lg shadow-foreground/10"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <MenuIcon className="w-5 h-5" />
        <span className="text-base sm:text-lg font-medium tracking-tight">Menu</span>
      </div>
    </button>
  )
}
