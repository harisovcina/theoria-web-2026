"use client"

import { useRef } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"

export function AboutHero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current) return

    const ctx = gsap.context(() => {
      // Animate title characters
      const titleChars = titleRef.current?.querySelectorAll('.char')
      if (titleChars) {
        gsap.from(titleChars, {
          y: 120,
          rotateX: -90,
          opacity: 0,
          stagger: 0.02,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2
        })
      }

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      })

      // Animate decorative lines
      const lines = linesRef.current?.querySelectorAll('.line')
      if (lines) {
        gsap.from(lines, {
          scaleX: 0,
          stagger: 0.15,
          duration: 1.5,
          ease: "power3.inOut",
          delay: 0.5
        })
      }

      // Parallax scroll effect
      gsap.to(containerRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ transformOrigin: '50% 100%' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-0"
    >
      {/* Brutal grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Decorative lines */}
      <div ref={linesRef} className="absolute inset-0 pointer-events-none">
        <div className="line absolute top-0 left-0 w-full h-[2px] bg-foreground origin-left" />
        <div className="line absolute top-0 left-0 w-[2px] h-full bg-foreground origin-top" />
        <div className="line absolute bottom-0 right-0 w-full h-[2px] bg-foreground origin-right" />
        <div className="line absolute top-0 right-0 w-[2px] h-full bg-foreground origin-top" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black uppercase leading-[0.9] mb-8 md:mb-12 tracking-tighter"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            perspective: '1000px'
          }}
        >
          {splitText('WORLD-CLASS')}
          <br />
          {splitText('UX FROM')}
          <br />
          {splitText('SARAJEVO')}
        </h1>

        {/* Subtitle */}
        <div className="border-l-4 border-foreground pl-4 md:pl-8 max-w-2xl">
          <p
            ref={subtitleRef}
            className="text-base md:text-xl lg:text-2xl font-mono uppercase tracking-wide leading-relaxed"
          >
            A PRODUCT DESIGN STUDIO TURNING COMPLEX PRODUCTS INTO SIMPLE,
            INTUITIVE INTERFACES. WE WORK WITH AMBITIOUS COMPANIES WHO WANT
            TO CREATE EXCEPTIONAL DIGITAL EXPERIENCES.
          </p>
        </div>

        {/* Coordinates - Brutalist detail */}
        <div className="mt-12 md:mt-16 font-mono text-xs md:text-sm opacity-40">
          <span className="block">43°51′44″N 18°23′21″E</span>
          <span className="block mt-1">ELEVATION: 500M</span>
        </div>
      </div>
    </section>
  )
}
