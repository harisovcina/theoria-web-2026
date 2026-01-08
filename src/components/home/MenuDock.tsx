"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

interface MenuDockProps {
  onMenuClick: () => void
  isMenuOpen: boolean
  isCaseStudy?: boolean
  onBackClick?: () => void
}

export function MenuDock({ onMenuClick, isMenuOpen, isCaseStudy = false, onBackClick }: MenuDockProps) {
  const dockRef = useRef<HTMLDivElement>(null)
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false)

  // Manage menu mount/unmount with delay for exit animation
  useEffect(() => {
    if (isMenuOpen) {
      setShouldRenderMenu(true)
    } else if (shouldRenderMenu) {
      const timer = setTimeout(() => setShouldRenderMenu(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isMenuOpen, shouldRenderMenu])

  useGSAP(() => {
    if (!dockRef.current) return

    if (isCaseStudy) {
      // Expand to full width
      const targetWidth = window.innerWidth - 128
      gsap.to(dockRef.current, {
        width: targetWidth,
        duration: 0.8,
        ease: "power3.inOut",
      })
    } else {
      // Collapse back to original size
      gsap.to(dockRef.current, {
        width: "auto",
        duration: 0.8,
        ease: "power3.inOut",
      })
    }
  }, [isCaseStudy])

  return (
    <>
      {/* Dock */}
      <div
        ref={dockRef}
        className={cn(
          "fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[999] opacity-0 animate-fade-in animation-delay-800",
          "flex items-center justify-between gap-32 px-2 py-1 rounded-full",
          "bg-background/5 backdrop-blur-custom",
          "border border-white/10",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]"
        )}
      >
        {/* Left Button */}
        <button
          onClick={isCaseStudy ? onBackClick : onMenuClick}
          className={cn(
            "rounded-full flex items-center justify-center gap-2",
            isCaseStudy ? "px-2 py-2 bg-foreground/10" : "w-10 h-10"
          )}
        >
          {isCaseStudy ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <div className="w-4 h-4 flex flex-col items-center justify-center gap-1">
              <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "rotate-45 translate-y-[5.5px]")} />
              <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "opacity-0")} />
              <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "-rotate-45 -translate-y-[5.5px]")} />
            </div>
          )}
        </button>

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="theoria"
            width={100}
            height={22}
            className="h-4 w-24"
            priority
          />
        </Link>

        {/* Right Spacer */}
        <div className="w-10 h-10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        </div>
      </div>

      {/* Expanded Menu */}
      {shouldRenderMenu && !isCaseStudy && (
        <div
          className={cn(
            "fixed inset-0 z-[900] flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-custom",
            "transition-all duration-500 ease-out",
            isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
          onClick={onMenuClick}
        >
          {/* Gradient Accents */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-[120px] opacity-0 animate-fade-in animation-delay-200 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] opacity-0 animate-fade-in animation-delay-300 pointer-events-none" />

          {/* Navigation Links */}
          <nav
            className="relative z-10 flex flex-col items-center gap-12"
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { href: "/about", label: "About", number: "01" },
              { href: "/haris", label: "Playground", number: "02" }
            ].map(({ href, label, number }) => (
              <Link
                key={href}
                href={href}
                className="group relative opacity-0 animate-fade-in-up animation-delay-400"
              >
                <span className="absolute -left-16 top-1/2 -translate-y-1/2 font-mono text-xs text-foreground/30 group-hover:text-foreground/50 transition-colors duration-300">
                  {number}
                </span>
                <h2 className="text-base uppercase font-mono tracking-widest leading-none transition-all duration-500 ease-out group-hover:tracking-[8]">
                  {label}
                </h2>
                <div className="absolute inset-0 -z-10 bg-foreground/0 group-hover:bg-foreground/10 blur-xl transition-all duration-500 rounded-full scale-0 group-hover:scale-150" />
              </Link>
            ))}
          </nav>

          {/* Close Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-foreground/30 opacity-0 animate-fade-in animation-delay-600">
            Click anywhere to close
          </div>
        </div>
      )}
    </>
  )
}
