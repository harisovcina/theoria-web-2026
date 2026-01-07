"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { X } from "lucide-react"

interface MenuExpandedProps {
  isExpanded: boolean
  onClose: () => void
}

export function MenuExpanded({ isExpanded, onClose }: MenuExpandedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !linksRef.current || !closeButtonRef.current) return

    if (isExpanded) {
      const timeline = gsap.timeline()
      timeline
        .to(containerRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          closeButtonRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0.1
        )
        .to(
          linksRef.current.children,
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",
          },
          0.2
        )
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isExpanded])

  if (!isExpanded) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-auto"
    >
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />

      {/* Close Button - Top Right */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-8 right-8 z-30 w-12 h-12 rounded-full bg-foreground/5 backdrop-blur-sm border border-border/30 flex items-center justify-center opacity-0 scale-90 transition-all duration-200 hover:bg-foreground/10 hover:scale-110 active:scale-95"
        aria-label="Close menu"
      >
        <X className="w-5 h-5 text-foreground" />
      </button>

      <nav ref={linksRef} className="relative z-10 space-y-6 text-center">
        <Link
          href="/about"
          className="block text-4xl md:text-6xl font-light tracking-tight opacity-0 translate-y-8 hover:text-foreground/70 transition-colors"
        >
          About
        </Link>
        <Link
          href="/haris"
          className="block text-4xl md:text-6xl font-light tracking-tight opacity-0 translate-y-8 hover:text-foreground/70 transition-colors"
        >
          Haris / Playground
        </Link>
      </nav>
    </div>
  )
}
