"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

export function AboutContact() {
  const sectionRef = useRef<HTMLElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !emailRef.current) return

    const ctx = gsap.context(() => {
      // Animate email characters
      const chars = emailRef.current?.querySelectorAll('.email-char')
      if (chars) {
        gsap.from(chars, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 80%",
            end: "top 50%"
          }
        })
      }

      // Animate lines
      const lines = linesRef.current?.querySelectorAll('.contact-line')
      if (lines) {
        gsap.from(lines, {
          scaleX: 0,
          stagger: 0.2,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: linesRef.current,
            start: "top 80%"
          }
        })
      }

      // Hover effect on email
      let hoverTl: gsap.core.Timeline | null = null

      emailRef.current?.addEventListener('mouseenter', () => {
        if (!chars) return
        if (hoverTl) hoverTl.kill()
        hoverTl = gsap.timeline()

        hoverTl.to(chars, {
          y: -10,
          stagger: {
            each: 0.02,
            from: "start",
            yoyo: true,
            repeat: 1
          },
          duration: 0.3,
          ease: "power2.out"
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const splitEmail = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="email-char inline-block"
        style={{ transformOrigin: '50% 100%' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-24 md:py-32">
      {/* Section label */}
      <div className="absolute top-8 left-4 md:left-8 font-mono text-xs opacity-30">
        SECTION_03 / CONTACT
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Decorative lines */}
        <div ref={linesRef} className="mb-12 md:mb-16 space-y-2">
          <div className="contact-line h-[2px] bg-foreground origin-left" />
          <div className="contact-line h-[2px] bg-foreground origin-left w-2/3" />
          <div className="contact-line h-[2px] bg-foreground origin-left w-1/3" />
        </div>

        {/* Title */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter">
            LET'S WORK
            <br />
            TOGETHER
          </h2>
        </div>

        {/* Email */}
        <a
          ref={emailRef}
          href="mailto:info@theoria.co"
          className="group block mb-16"
          style={{ perspective: '1000px' }}
        >
          <div className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none border-4 border-foreground inline-block px-4 md:px-8 py-3 md:py-6 hover:bg-foreground hover:text-background transition-colors duration-300">
            {splitEmail('info@theoria.co')}
          </div>
        </a>

        {/* Additional info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-mono text-xs md:text-sm">
          <div className="border-l-2 border-foreground pl-4">
            <div className="opacity-40 uppercase mb-2">Location</div>
            <div className="font-bold">
              Sarajevo, Bosnia<br />
              and Herzegovina
            </div>
          </div>

          <div className="border-l-2 border-foreground pl-4">
            <div className="opacity-40 uppercase mb-2">Timezone</div>
            <div className="font-bold">
              UTC+01:00<br />
              CET
            </div>
          </div>

          <div className="border-l-2 border-foreground pl-4">
            <div className="opacity-40 uppercase mb-2">Availability</div>
            <div className="font-bold">
              Open for new<br />
              projects
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-4 border-b-4 border-foreground opacity-10" />
        <div className="absolute -top-4 -left-4 w-32 h-32 border-l-4 border-t-4 border-foreground opacity-10" />
      </div>

      {/* Footer line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground" />
    </section>
  )
}
