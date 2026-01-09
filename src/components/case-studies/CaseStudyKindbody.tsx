"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CaseStudyProps } from '@/types'

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Kindbody Case Study
 * Visual editorial approach with medical imagery and immersive scroll animations
 * Healthcare aesthetic with warm, human touches
 */
export function CaseStudyKindbody({ project }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const companyRef = useRef<HTMLDivElement>(null)
  const roleImageRef = useRef<HTMLDivElement>(null)
  const challengeRef = useRef<HTMLDivElement>(null)
  const challengeImageRef = useRef<HTMLDivElement>(null)
  const processStep1Ref = useRef<HTMLDivElement>(null)
  const processStep2Ref = useRef<HTMLDivElement>(null)
  const processStep3Ref = useRef<HTMLDivElement>(null)
  const labImageRef = useRef<HTMLDivElement>(null)
  const takeawayRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    // Find the scrollable container
    const scroller = containerRef.current.closest('.overflow-y-auto') as HTMLElement

    // Hero parallax effect
    if (heroRef.current && scroller) {
      gsap.to(heroRef.current.querySelector("img"), {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          scroller: scroller,
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }

    // Company text fade in
    if (companyRef.current) {
      gsap.fromTo(companyRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            scroller: scroller,
            trigger: companyRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    // Role image slide from left
    if (roleImageRef.current) {
      gsap.fromTo(roleImageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            scroller: scroller,
            trigger: roleImageRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    // Challenge section scale up
    if (challengeRef.current) {
      gsap.fromTo(challengeRef.current.querySelector(".challenge-content"),
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            scroller: scroller,
            trigger: challengeRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    // Challenge image parallax
    if (challengeImageRef.current) {
      gsap.to(challengeImageRef.current.querySelector("img"), {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          scroller: scroller,
          trigger: challengeImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }

    // Process steps - alternating animations
    const animateProcessStep = (ref: React.RefObject<HTMLDivElement | null>, fromLeft: boolean) => {
      if (!ref.current) return
      const image = ref.current.querySelector(".step-image")
      const text = ref.current.querySelector(".step-text")

      gsap.fromTo(image,
        { x: fromLeft ? -80 : 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            scroller: scroller,
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
      gsap.fromTo(text,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            scroller: scroller,
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    animateProcessStep(processStep1Ref, true)
    animateProcessStep(processStep2Ref, false)
    animateProcessStep(processStep3Ref, true)

    // Lab image with parallax
    if (labImageRef.current) {
      gsap.to(labImageRef.current.querySelector("img"), {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          scroller: scroller,
          trigger: labImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }

    // Takeaway quote scale in
    if (takeawayRef.current) {
      gsap.fromTo(takeawayRef.current.querySelector(".takeaway-quote"),
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            scroller: scroller,
            trigger: takeawayRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

  }, [])

  return (
    <div ref={containerRef} className="space-y-32 md:space-y-48">
      {/* Opening Statement - Editorial */}
      <section className="max-w-4xl">
        <div className="space-y-8">
          <h1 className="text-3xl md:text-5xl font-light leading-relaxed text-foreground/90">
            Kindbody: When precision meets compassion
          </h1>
          <div className="flex items-center gap-6 text-sm uppercase tracking-widest text-foreground/50">
            <span>Healthcare</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>IVF</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>Product Design</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>Internal Tools</span>
          </div>
        </div>
      </section>

      {/* Hero Visual - Medical environment with parallax */}
      <section ref={heroRef} className="relative w-full h-[60vh] md:h-[75vh] -mx-4 md:-mx-8 overflow-hidden bg-foreground/5">
        <Image
          src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1920&q=80"
          alt="Modern medical laboratory environment"
          fill
          className="object-cover will-change-transform"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </section>

      {/* The Company */}
      <section ref={companyRef} className="space-y-12">
        <h2 className="text-5xl md:text-7xl font-light leading-none">
          The<br/>Company
        </h2>
        <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/80 max-w-3xl">
          Kindbody is a fertility care platform redefining how people build families — 20+ US clinics
          offering egg freezing, IVF, and genetic testing. At its peak, valued at $1.8 billion.
        </p>
      </section>

      {/* My Role - Split with image */}
      <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-light leading-none">
            My<br/>Role
          </h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/80">
            Lead Product Designer (2023–2025). Owned internal clinical tools (provider calendar, EMR)
            and patient-facing portal (medication tracking, cycle updates, fertility calculators).
          </p>
        </div>
        <div ref={roleImageRef} className="relative aspect-[4/3] bg-foreground/5 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
            alt="Healthcare professional working on digital tools"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* The Challenge - Large text emphasis */}
      <section ref={challengeRef} className="space-y-12">
        <div className="challenge-content space-y-8">
          <h2 className="text-5xl md:text-7xl font-light leading-none">
            The<br/>Challenge
          </h2>
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-foreground/80 max-w-4xl">
            After eggs are retrieved and fertilized, embryologists monitor each embryo for days —
            documenting stages, grading quality, recording procedures. This data directly impacts
            which embryos get transferred.
          </p>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/60 max-w-3xl">
            The existing process was fragmented and error-prone. We needed precision tools that
            worked at lab speed.
          </p>
        </div>
      </section>

      {/* Challenge Visual - Full width microscope/lab imagery */}
      <section ref={challengeImageRef} className="relative w-full h-[70vh] -mx-4 md:-mx-8 overflow-hidden bg-foreground/5">
        <Image
          src="https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1920&q=80"
          alt="Scientific precision - embryology lab work"
          fill
          className="object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </section>

      {/* The Process */}
      <section className="space-y-16 md:space-y-24">
        <h2 className="text-5xl md:text-7xl font-light leading-none">
          The<br/>Process
        </h2>

        {/* Step 1 - Misunderstanding */}
        <div ref={processStep1Ref} className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="step-text md:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-widest text-foreground/40">The Problem</div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/80">
              Designing for healthcare means working with doctors and nurses who don't speak "product."
            </p>
            <p className="text-lg text-foreground/60 italic">
              Early sketches got looks that said "you don't understand what happens in the lab." They were right.
            </p>
          </div>
          <div className="step-image md:col-span-7 relative aspect-video bg-foreground/5 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80"
              alt="Medical professionals in discussion"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Step 2 - The Shift */}
        <div ref={processStep2Ref} className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="step-image md:col-span-7 md:order-1 relative aspect-video bg-foreground/5 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&q=80"
              alt="Learning in the lab environment"
              fill
              className="object-cover"
            />
          </div>
          <div className="step-text md:col-span-5 md:order-2 space-y-6">
            <div className="text-xs uppercase tracking-widest text-foreground/40">The Shift</div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/80">
              So we changed approach. We observed. We learned the difference between a Day 3 embryo
              and a blastocyst.
            </p>
            <p className="text-lg text-foreground/60">
              We understood why a single misclick is unacceptable when someone's future child is on the line.
            </p>
          </div>
        </div>

        {/* Step 3 - The Breakthrough */}
        <div ref={processStep3Ref} className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="step-text md:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-widest text-foreground/40">The Breakthrough</div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/80">
              Once we found a shared language, everything clicked.
            </p>
            <p className="text-lg text-foreground/60">
              Doctors became collaborators. The skeptical head nurse became our biggest advocate.
            </p>
          </div>
          <div className="step-image md:col-span-7 relative aspect-video bg-foreground/5 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80"
              alt="Collaborative healthcare design work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Full-Width Impact Image - Lab environment */}
      <section ref={labImageRef} className="relative w-full h-[80vh] -mx-4 md:-mx-8 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
          alt="Medical laboratory precision work"
          fill
          className="object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-6 px-8">
            <p className="text-3xl md:text-5xl font-light text-foreground/90 max-w-3xl mx-auto">
              We built tools that embryologists could trust with someone's future.
            </p>
          </div>
        </div>
      </section>

      {/* The Takeaway */}
      <section ref={takeawayRef} className="max-w-4xl mx-auto">
        <div className="takeaway-quote space-y-12">
          <h2 className="text-5xl md:text-7xl font-light leading-none">
            The<br/>Takeaway
          </h2>
          <blockquote className="text-2xl md:text-4xl font-light leading-relaxed text-foreground/90">
            "This wasn't about clever UI patterns. It was about earning trust from people where
            mistakes have real consequences. The best design work happens when you shut up and
            learn someone else's language first."
          </blockquote>
        </div>
      </section>

      {/* Closing */}
      <section className="text-center pt-16 pb-8">
        <div className="inline-flex items-center gap-4 text-xs uppercase tracking-widest text-foreground/30">
          <span>Lead Product Designer</span>
          <span className="w-1 h-1 rounded-full bg-foreground/30" />
          <span>2023–2025</span>
        </div>
      </section>
    </div>
  )
}
