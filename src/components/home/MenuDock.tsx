"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MenuDockProps {
  onMenuClick: () => void
  isMenuOpen: boolean
}

export function MenuDock({ onMenuClick, isMenuOpen }: MenuDockProps) {
  return (
    <div className="fixed top-4 md:top-8 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 pointer-events-auto">
      <div className="relative">
        {/* Frosty Glass Container */}
        <div
          className={cn(
            "relative px-4 md:px-6 py-2.5 md:py-3 rounded-full",
            "bg-background/40 backdrop-blur-xl",
            "border border-border/30",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]",
            "transition-all duration-300 ease-out",
            "hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.16)]",
            "before:absolute before:inset-0 before:rounded-full before:bg-noise before:opacity-[0.015] before:mix-blend-overlay before:pointer-events-none"
          )}
        >
          <div className="flex items-center justify-between md:justify-center md:gap-8">
            {/* Hamburger Button */}
            <button
              onClick={onMenuClick}
              className={cn(
                "group relative w-10 h-10 rounded-full",
                "flex items-center justify-center",
                "transition-all duration-300 ease-out",
                "hover:bg-foreground/5",
                "active:scale-95"
              )}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 flex flex-col items-center justify-center gap-1">
                {/* Top Line */}
                <span
                  className={cn(
                    "w-5 h-[1.5px] bg-foreground rounded-full transition-all duration-300 ease-out",
                    "group-hover:bg-foreground",
                    isMenuOpen && "rotate-45 translate-y-[5px]"
                  )}
                />
                {/* Middle Line */}
                <span
                  className={cn(
                    "w-5 h-[1.5px] bg-foreground rounded-full transition-all duration-300 ease-out",
                    "group-hover:bg-foreground",
                    isMenuOpen && "opacity-0"
                  )}
                />
                {/* Bottom Line */}
                <span
                  className={cn(
                    "w-5 h-[1.5px] bg-foreground rounded-full transition-all duration-300 ease-out",
                    "group-hover:bg-foreground",
                    isMenuOpen && "-rotate-45 -translate-y-[5px]"
                  )}
                />
              </div>
            </button>

            {/* Logo - Clickable, takes to homepage */}
            <Link
              href="/"
              className="group relative flex items-center transition-all duration-300 ease-out hover:scale-105 active:scale-95"
            >
              <Image
                src="/logo.svg"
                alt="Theoria"
                width={100}
                height={22}
                className="h-5 md:h-4 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                priority
              />
            </Link>

            {/* Visual Balance - Subtle dot indicator */}
            <div className="w-10 h-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>

        {/* Noise Texture Overlay */}
        <style jsx global>{`
          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
        `}</style>
      </div>
    </div>
  )
}
