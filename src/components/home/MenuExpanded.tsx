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
      className="fixed inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-auto px-6"
    >
      <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />

      <nav ref={linksRef} className="relative z-10 space-y-8 sm:space-y-10 text-center max-w-3xl w-full">
        <Link
          href="/about"
          className="block text-5xl sm:text-6xl md:text-8xl font-normal tracking-tighter opacity-0 translate-y-8 hover:text-foreground/60 transition-all duration-300 leading-[1.1]"
        >
          About
        </Link>
        <Link
          href="/haris"
          className="block text-5xl sm:text-6xl md:text-8xl font-normal tracking-tighter opacity-0 translate-y-8 hover:text-foreground/60 transition-all duration-300 leading-[1.1]"
        >
          Haris / Playground
        </Link>
      </nav>
    </div>
  )
}
