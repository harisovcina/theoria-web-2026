"use client"

import { useRef } from "react"
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
      <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[999]">
        <div
          ref={dockRef}
          style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
          className={cn(
            "relative px-2 py-1 rounded-full",
            "bg-background/10",
            "border border-foreground/10",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]"
          )}
        >
          <div className="flex items-center justify-between gap-32 w-full">
            {/* Left Button */}
            <button
              onClick={isCaseStudy ? onBackClick : onMenuClick}
              className={cn(
                "rounded-full flex items-center justify-center gap-2",
                isCaseStudy
                  ? "px-2 py-2 bg-foreground/10"
                  : "w-10 h-10"
              )}
            >
              {isCaseStudy ? (
                <>
                  <ChevronLeft className="w-4 h-4" />
                </>
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
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Menu */}
      {isMenuOpen && !isCaseStudy && (
        <div className="fixed inset-0 z-20 flex items-center justify-center" onClick={onMenuClick}>
          <nav className="space-y-8 text-center" onClick={(e) => e.stopPropagation()}>
            <Link href="/about" className="block text-base font-mono uppercase tracking-[0.3em]">
              About
            </Link>
            <Link href="/haris" className="block text-base font-mono uppercase tracking-[0.3em]">
              Playground
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
