"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface MenuExpandedProps {
  isExpanded: boolean
}

export function MenuExpanded({ isExpanded }: MenuExpandedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !linksRef.current) return

    if (isExpanded) {
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
