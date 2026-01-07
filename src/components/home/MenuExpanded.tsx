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
      {/* Background with noise texture */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl">
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Close Button - Top Right */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-8 right-8 z-30 w-12 h-12 rounded-full bg-foreground/5 backdrop-blur-sm border border-border/30 flex items-center justify-center opacity-0 scale-90 transition-all duration-200 hover:bg-foreground/10 hover:scale-110 active:scale-95"
        aria-label="Close menu"
      >
        <X className="w-5 h-5 text-foreground" />
      </button>

      <nav ref={linksRef} className="relative z-10 space-y-8 text-center">
        <Link
          href="/about"
          className="block text-sm md:text-base font-mono uppercase tracking-[0.3em] opacity-0 translate-y-8 hover:tracking-[0.4em] hover:text-foreground/70 transition-all duration-300"
        >
          About
        </Link>
        <Link
          href="/haris"
          className="block text-sm md:text-base font-mono uppercase tracking-[0.3em] opacity-0 translate-y-8 hover:tracking-[0.4em] hover:text-foreground/70 transition-all duration-300"
        >
          Playground
        </Link>
      </nav>
    </div>
  )
}
