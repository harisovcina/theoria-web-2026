"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface MenuExpandedProps {
  isExpanded: boolean
  onClose: () => void
}

export function MenuExpanded({ isExpanded, onClose }: MenuExpandedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isExpanded) {
      setShouldRender(true)
    }
  }, [isExpanded])

  useGSAP(() => {
    if (!containerRef.current || !linksRef.current) return

    if (isExpanded) {
      // Entry animation
      const timeline = gsap.timeline()
      timeline
        .to(containerRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          linksRef.current.children,
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",
          },
          0.1
        )
    } else if (shouldRender) {
      // Exit animation - reverse of entry
      const timeline = gsap.timeline()
      timeline
        .to(
          linksRef.current.children,
          {
            opacity: 0,
            y: 8,
            stagger: 0.1,
            duration: 0.3,
            ease: "power2.in",
          }
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setShouldRender(false)
          },
          0.2
        )
    }
  }, [isExpanded, shouldRender])

  if (!shouldRender) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-auto"
      onClick={onClose}
    >
      {/* Background with noise texture */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl">
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <nav ref={linksRef} className="relative z-10 space-y-8 text-center" onClick={(e) => e.stopPropagation()}>
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
