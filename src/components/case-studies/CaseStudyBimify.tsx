"use client"

import { useRef } from "react"
import Image from "next/image"
import { CaseStudyProps } from '@/types'
import { ANIMATION } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { Check, X } from 'lucide-react'
import { CaseStudyTestimonial } from './CaseStudyTestimonial'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)
}

/**
 * Bimify Case Study
 * Construction tech aesthetic with orange accents
 */

export function CaseStudyBimify({ project }: CaseStudyProps) {
  const images = project.caseStudyImages ? JSON.parse(project.caseStudyImages) : []
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const scroller = containerRef.current?.closest('.overflow-y-auto') as HTMLElement

      // Context section: fade in
      gsap.fromTo('.context-section',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.context-section',
            start: 'top 75%',
          }
        }
      )

      // Hero: Word reveal on "construction"
      gsap.fromTo('.hero-headline .cs-animate-word',
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          stagger: 0.075,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            scroller,
            trigger: '.hero-headline',
            start: 'top 80%',
          }
        }
      )

      // Hero: Background number parallax
      gsap.to('.hero-number', {
        y: 150,
        opacity: 0.03,
        ease: 'none',
        scrollTrigger: {
          scroller,
          trigger: '.hero-headline',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Brief section: fade in
      gsap.fromTo('.brief-section',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.brief-section',
            start: ANIMATION.scroll.start75,
          }
        }
      )

      // Section 1: ScrambleText animation
      const section1Scramble = containerRef.current?.querySelector('.section1-scramble')
      if (section1Scramble) {
        gsap.to(section1Scramble, {
          duration: 1.6,
          ease: "power2.inOut",
          scrambleText: {
            text: "streamlined.",
            chars: "lowerCase",
            revealDelay: 0.5,
            tweenLength: false,
          },
          scrollTrigger: {
            scroller,
            trigger: '.section1-headline',
            start: "top 75%",
          }
        })
      }

      // Animated problem checklist
      gsap.fromTo('.problem-block .checklist-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: ANIMATION.ease.outMedium,
          scrollTrigger: {
            scroller,
            trigger: '.problem-block',
            start: 'top 75%',
          }
        }
      )

      // Animated solution checklist
      gsap.fromTo('.solution-block .solution-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: ANIMATION.ease.outMedium,
          scrollTrigger: {
            scroller,
            trigger: '.solution-block',
            start: 'top 75%',
          }
        }
      )

      // Before/After Images
      gsap.fromTo('.before-after-images .ba-image',
        { scale: 0.96, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            scroller,
            trigger: '.before-after-images',
            start: 'top 75%',
          }
        }
      )

      // Gallery: Staggered image reveal
      gsap.fromTo('.gallery-section .cs-gallery-item',
        { scale: 0.98, y: 20, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.medium,
          stagger: ANIMATION.stagger.fast,
          ease: ANIMATION.ease.outMedium,
          scrollTrigger: {
            scroller,
            trigger: '.gallery-section',
            start: 'top 75%',
          }
        }
      )

      // Closing: Gentle fade in
      gsap.fromTo('.closing-section',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.closing-section',
            start: ANIMATION.scroll.start75,
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="cs-bimify min-h-screen relative">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12">
        <div
          className="hero-number absolute top-0 right-0 text-[clamp(15rem,35vw,30rem)] font-extralight leading-none text-orange-400/[0.02] select-none pointer-events-none"
          style={{ letterSpacing: '-0.05em' }}
        >
          20
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="cs-badge cs-badge-accent">
                  Case Study
                </span>
              </div>

              <h1 className="hero-headline cs-hero-headline">
                Making <span className="cs-animate-word inline-block text-orange-400">construction</span> software that doesn't get in the way.
              </h1>
            </div>

            <div className="cs-tags">
              {['Construction Tech', '·', 'SaaS', '·', 'Product Design', '·', 'Design System'].map((tag, index) => (
                <span key={`${tag}-${index}`} className="cs-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:col-span-4 space-y-4 text-foreground/80">
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Platform</div>
              <div className="cs-meta-value">Bimify</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Timeline</div>
              <div className="cs-meta-value">2022 — 2024</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Impact</div>
              <div className="cs-meta-value">Complete redesign<br/>1 design system<br/>20+ features shipped</div>
            </div>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="context-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">Context</div>
          </div>
          <div className="md:col-span-10">
            <p className="cs-intro-text">
              Construction management software is notorious for being clunky, overcomplicated, and stuck in the past. Bimify is a BIM management platform used by construction teams across Europe to coordinate projects, manage documentation, and collaborate in real-time. <span className="text-orange-400">When your users are on job sites juggling multiple tools, every click matters.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Voice - Aleksandar Testimonial */}
      <CaseStudyTestimonial
        quote="We needed a designer who could think like an engineer and design like an architect. The work transformed Bimify from a functional tool into something our users actually want to use every day."
        avatarUrl="/img/bimify/aleksandar-avatar.png"
        name="Aleksandar Balicevac"
        title="Founder"
        company="Bimify"
        accentColor="orange-400"
      />

      {/* The Brief */}
      <section className="brief-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">The Brief</div>
          </div>
          <div className="md:col-span-7">
            <p className="cs-intro-text">
              Redesign the platform to reduce friction for field teams while maintaining the <span className="text-orange-400">power features</span> that engineers depend on.
            </p>
          </div>
          <div className="md:col-span-3 text-sm font-light text-foreground/70 leading-relaxed space-y-4">
            <p>The challenge: construction professionals don't have patience for learning curves.</p>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">2022 — 2024</p>
          </div>
        </div>
      </section>

      {/* Section 1: Foundation */}
      <section className="cs-section relative h-screen">
        <div className="max-w-7xl mx-auto h-full grid lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-6">
              <div className="cs-section-number cs-section-number-accent">
                01 / Foundation
              </div>
              <h2 className="section1-headline cs-section-headline">
                From complex to <span className="section1-scramble cs-animate-word inline-block">xj%4#8s9gg2&!ty/</span>
              </h2>
            </div>
            <div className="cs-body-text space-y-4">
              <p>
                The old Bimify interface tried to do everything at once. Navigation was nested three levels deep. Core features were buried behind obscure icons. Users needed training sessions just to upload a file.
              </p>
              <p>
                We stripped everything back. Built a design system that prioritized clarity over cleverness. Information architecture based on actual workflows, not feature lists.
              </p>
            </div>
          </div>

          <div className="h-100vh relative">
            <Image
              src={images[0] || "/img/bimify/foundation.png"}
              alt="Bimify design system"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Core Flow */}
      <section className="cs-section">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number-accent">
                02 / Core Flow
              </div>
            </div>
            <div className="md:col-span-10">
              <h2 className="section2-headline cs-section-headline">
                Making file management<br />
                actually manageable
              </h2>
            </div>
          </div>

          {/* Problem Section */}
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number text-pink-600">
                × Problem
              </div>
            </div>
            <div className="problem-block md:col-span-10 space-y-8">
              <p className="cs-subheadline-lg">
                Construction teams drowning in files
              </p>

              <div className="space-y-4">
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Uploading BIM files required 6 different steps</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">No way to preview files without downloading</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Version control was manual and error-prone</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Teams kept reverting to email attachments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Visual Comparison */}
          <div className="before-after-images grid md:grid-cols-2 gap-6 md:gap-8 my-16">
            <div className="ba-image relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src={images[1] || "/img/bimify/before.png"}
                alt="Before - Complex interface"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-red-900/35 to-red-800/15 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-red-500/10"></div>
            </div>

            <div className="ba-image relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src={images[2] || "/img/bimify/after.png"}
                alt="After - Streamlined interface"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Solution Section */}
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number text-emerald-700">
                ✓ Solution
              </div>
            </div>
            <div className="solution-block md:col-span-10 space-y-8">
              <p className="cs-subheadline-lg">
                Drag, drop, done
              </p>

              <div className="space-y-4">
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">One-click upload with automatic categorization</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Real-time 3D preview directly in browser</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Automatic version control with visual diff</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Collaborative annotations and markup tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section cs-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            <div className="cs-gallery-item md:col-span-7 aspect-[4/3] cs-image-container">
              <Image src={images[3] || "/img/bimify/gallery1.png"} alt="Dashboard view" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-5 aspect-[4/3] cs-image-container">
              <Image src={images[4] || "/img/bimify/gallery2.png"} alt="File management" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-5 aspect-[4/3] cs-image-container">
              <Image src={images[5] || "/img/bimify/gallery3.png"} alt="3D preview" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-7 aspect-[4/3] cs-image-container">
              <Image src={images[6] || "/img/bimify/gallery4.png"} alt="Design system" width={800} height={450} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Outro */}
      <section className="closing-section cs-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="cs-divider-accent"></div>
              <div className="cs-eyebrow">Outro</div>
            </div>
            <div className="md:col-span-10 space-y-8">
              <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-extralight leading-[1.1] tracking-tight" style={{ letterSpacing: '-0.03em' }}>
                From tool to teammate.
              </h2>
              <p className="text-lg md:text-xl font-light leading-relaxed text-foreground/70 max-w-3xl">
                Bimify now powers construction projects across Europe. The redesign reduced onboarding time by 80%, cut support tickets in half, and turned skeptical contractors into advocates. Sometimes the best design is the one that gets out of your way.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
