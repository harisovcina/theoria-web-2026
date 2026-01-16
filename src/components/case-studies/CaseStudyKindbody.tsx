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

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)
}

/**
 * Kindbody Case Study
 * Warm, human-centered healthcare aesthetic with pale yellow accents
 * Emphasis on trust, precision, and compassion
 *
 * ✅ Refactored to use simplified animation pattern from Sematext
 * - Minimal parallax effects
 * - No overlapping scrub triggers
 * - Clean, smooth scrolling behavior
 */

export function CaseStudyKindbody({ project }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const scroller = containerRef.current?.closest('.overflow-y-auto') as HTMLElement

      // Hero: Word reveal on "compassion"
      gsap.fromTo('.hero-headline .cs-animate-word',
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          stagger: 0.075,
          ease: 'back.inOut',
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

      // Company: Gentle fade in
      gsap.fromTo('.company-section',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.company-section',
            start: ANIMATION.scroll.start75,
          }
        }
      )

      // Role: ScrambleText animation on "trust"
      const roleScramble = containerRef.current?.querySelector('.role-scramble')
      if (roleScramble) {
        gsap.to(roleScramble, {
          duration: 1.6,
          ease: "power2.inOut",
          scrambleText: {
            text: "trust.",
            chars: "lowerCase",
            revealDelay: 0.5,
            tweenLength: false,
          },
          scrollTrigger: {
            scroller,
            trigger: '.role-section',
            start: "top 75%",
          }
        })
      }

      // Challenge: Word reveal
      const challengeWords = containerRef.current?.querySelectorAll('.challenge-headline .cs-animate-word')
      if (challengeWords?.length) {
        gsap.fromTo(challengeWords,
          { x: -10, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: ANIMATION.duration.fast,
            stagger: 0.02,
            scrollTrigger: {
              scroller,
              trigger: '.challenge-headline',
              start: ANIMATION.scroll.start75,
            }
          }
        )
      }

      // Challenge: Problem checklist
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

      // Challenge: Solution checklist
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

      // Challenge: Before/After Images
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

      // Stats: Animated numbers (without percentage for Kindbody)
      const statsNumbers = containerRef.current?.querySelectorAll('.stats-grid .cs-stat-number')
      statsNumbers?.forEach((stat) => {
        const target = parseInt((stat as HTMLElement).getAttribute('data-target') || '0')
        const obj = { value: 0 }

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            scroller,
            trigger: '.stats-grid',
            start: 'top 75%',
          },
          onUpdate: () => {
            // Format with commas for large numbers (1,800)
            const formatted = Math.round(obj.value).toLocaleString()
            stat.textContent = formatted
          }
        })
      })

      // Process: Headline word reveal
      const processWords = containerRef.current?.querySelectorAll('.process-headline .cs-animate-word')
      if (processWords?.length) {
        gsap.fromTo(processWords,
          { x: -10, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: ANIMATION.duration.fast,
            stagger: 0.02,
            scrollTrigger: {
              scroller,
              trigger: '.process-headline',
              start: ANIMATION.scroll.start75,
            }
          }
        )
      }

      // Process Step 1: Image from left, text stagger
      gsap.from('.process-step1-image', {
        x: -60,
        opacity: 0,
        duration: ANIMATION.duration.slow,
        ease: ANIMATION.ease.outMedium,
        scrollTrigger: {
          scroller,
          trigger: '.process-step1-image',
          start: 'top 75%',
        }
      })
      gsap.from('.process-step1-text .cs-text-reveal', {
        y: 30,
        opacity: 0,
        duration: ANIMATION.duration.medium,
        stagger: ANIMATION.stagger.fast,
        delay: ANIMATION.delay.short,
        scrollTrigger: {
          scroller,
          trigger: '.process-step1-text',
          start: 'top 75%',
        }
      })

      // Process Step 2: Image from right, text stagger
      gsap.from('.process-step2-image', {
        x: 60,
        opacity: 0,
        duration: ANIMATION.duration.slow,
        ease: ANIMATION.ease.outMedium,
        scrollTrigger: {
          scroller,
          trigger: '.process-step2-image',
          start: 'top 75%',
        }
      })
      gsap.from('.process-step2-text .cs-text-reveal', {
        y: 30,
        opacity: 0,
        duration: ANIMATION.duration.medium,
        stagger: ANIMATION.stagger.fast,
        delay: ANIMATION.delay.short,
        scrollTrigger: {
          scroller,
          trigger: '.process-step2-text',
          start: 'top 75%',
        }
      })

      // Process Step 3: Image from left, text stagger
      gsap.from('.process-step3-image', {
        x: -60,
        opacity: 0,
        duration: ANIMATION.duration.slow,
        ease: ANIMATION.ease.outMedium,
        scrollTrigger: {
          scroller,
          trigger: '.process-step3-image',
          start: 'top 75%',
        }
      })
      gsap.from('.process-step3-text .cs-text-reveal', {
        y: 30,
        opacity: 0,
        duration: ANIMATION.duration.medium,
        stagger: ANIMATION.stagger.fast,
        delay: ANIMATION.delay.short,
        scrollTrigger: {
          scroller,
          trigger: '.process-step3-text',
          start: 'top 75%',
        }
      })

      // Impact Quote: Soft scale in
      gsap.from('.impact-quote', {
        scale: 0.95,
        opacity: 0,
        duration: ANIMATION.duration.xSlow,
        ease: ANIMATION.ease.sine,
        scrollTrigger: {
          scroller,
          trigger: '.impact-quote',
          start: ANIMATION.scroll.start75,
        }
      })

      // Takeaway: Gentle fade in
      gsap.from('.takeaway-section', {
        y: 40,
        opacity: 0,
        duration: ANIMATION.duration.verySlow,
        scrollTrigger: {
          scroller,
          trigger: '.takeaway-section',
          start: ANIMATION.scroll.start75,
        }
      })

      // Closing: Fade in
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
    <div ref={containerRef} className="cs-kindbody min-h-screen relative">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12">
        {/* Soft background number */}
        <div
          className="hero-number absolute top-0 right-0 text-[clamp(15rem,35vw,30rem)] font-extralight leading-none text-amber-300/[0.06] select-none pointer-events-none"
          style={{ letterSpacing: '-0.05em' }}
        >
          ✦
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="cs-badge cs-badge-accent">
                  Healthcare
                </span>
                <span className="cs-badge cs-badge-accent">
                  2023 — 2025
                </span>
              </div>

              <h1 className="hero-headline cs-hero-headline">
                When precision meets <span className="cs-animate-word inline-block text-amber-300">compassion</span>
              </h1>
            </div>

            <div className="cs-tags">
              {['IVF', 'Product Design', 'Clinical Tools', 'Patient Portal'].map((tag) => (
                <span key={tag} className="cs-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 space-y-6 text-foreground/60">
            <div className="cs-meta-group">
              <div className="cs-eyebrow">Company</div>
              <div className="cs-meta-value">Kindbody</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow">Role</div>
              <div className="cs-meta-value">Lead Product Designer</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow">Focus</div>
              <div className="cs-meta-value">Clinical EMR<br/>Provider Tools<br/>Patient Portal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Visual */}
      <section className="relative h-[70vh] overflow-hidden px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto h-full cs-image-container">
          <Image
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1920&q=80"
            alt="Modern medical laboratory environment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>
      </section>

      {/* The Company */}
      <section className="company-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">Context</div>
          </div>
          <div className="md:col-span-7">
            <p className="cs-intro-text">
              Kindbody is a fertility care platform redefining how people build families — 20+ US clinics offering egg freezing, IVF, and genetic testing. At its peak, valued at $1.8 billion.
            </p>
          </div>
          <div className="md:col-span-3 text-sm font-light text-foreground/50 leading-relaxed">
            <p>A platform where precision isn't just a feature — it's a responsibility.</p>
          </div>
        </div>
      </section>

      {/* Section 1: Building Trust */}
      <section className="role-section cs-section relative h-screen">
        <div className="h-full grid lg:grid-cols-2 gap-4">
          {/* Left column - Text */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-6">
              <div className="cs-section-number cs-section-number-accent">
                01 / Foundation
              </div>
              <h2 className="cs-section-headline">
                Designing for <span className="role-scramble cs-animate-word inline-block">xj%4#8s9gg2&!ty/</span>
              </h2>
            </div>
            <div className="cs-body-text space-y-4">
              <p>
                Lead Product Designer (2023–2025). Owned internal clinical tools — provider calendar, EMR, lab workflows — and patient-facing experiences like medication tracking, cycle updates, and fertility calculators.
              </p>
              <p>
                When you're building tools that help people create families, precision isn't optional. It's everything.
              </p>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="h-100vh relative">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
              alt="Healthcare professional working on digital tools"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="challenge-section cs-section">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number-accent">
                02 / Challenge
              </div>
            </div>
            <div className="md:col-span-10">
              <h2 className="challenge-headline cs-section-headline">
                From fragmented<br />
                to <span className="cs-animate-word inline-block">trusted</span>
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
                High-stakes workflow, low-trust tools
              </p>

              {/* Animated Checklist */}
              <div className="space-y-4">
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Spreadsheets and paper logs for life-changing decisions</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Data scattered across multiple disconnected systems</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">No real-time collaboration between lab and providers</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">One mistake could impact someone's future family</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Visual Comparison */}
          <div className="before-after-images grid md:grid-cols-2 gap-6 md:gap-8 my-16">
            {/* Error state - Left */}
            <div className="ba-image relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80"
                alt="Before - Fragmented workflow"
                fill
                className="object-cover"
              />
              {/* Error overlay with red tones */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-red-900/35 to-red-800/15 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-red-500/10"></div>
              {/* Subtle noise texture */}
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                backgroundSize: '150px 150px'
              }}></div>
            </div>

            {/* Clean state - Right */}
            <div className="ba-image relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
                alt="After - Unified platform"
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
                A unified platform built for precision
              </p>

              {/* Solution Checklist */}
              <div className="space-y-4">
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Real-time embryo tracking with visual timelines</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Unified EMR connecting lab, providers, and patients</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Built-in safeguards preventing critical errors</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Designed with embryologists, trusted by doctors</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid cs-stats-grid">
            <div className="cs-stat">
              <div className="cs-stat-number cs-stat-number-accent" data-target="20">0</div>
              <div className="cs-stat-label">clinics nationwide</div>
            </div>
            <div className="cs-stat">
              <div className="cs-stat-number cs-stat-number-accent" data-target="1800">0</div>
              <div className="cs-stat-label">cycles per month</div>
            </div>
            <div className="cs-stat col-span-2 md:col-span-1">
              <div className="cs-stat-text">Zero</div>
              <div className="cs-stat-label">critical errors</div>
            </div>
          </div>

          <div className="cs-image-wide mt-16">
            <Image
              src="https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1920&q=80"
              alt="Scientific precision - embryology lab work"
              width={1600}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="cs-section">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-1">
              <div className="cs-section-number-vertical cs-section-number-accent">
                03 / Process
              </div>
            </div>
            <div className="md:col-span-11">
              <h2 className="process-headline cs-section-headline">
                Earning <span className="cs-animate-word inline-block text-amber-300">trust</span>
              </h2>
            </div>
          </div>

          {/* Step 1 */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="process-step1-text cs-step-text md:col-span-5 space-y-6">
              <div className="cs-text-reveal cs-eyebrow">The Problem</div>
              <p className="cs-text-reveal cs-subheadline">
                Designing for healthcare means working with doctors and nurses who don't speak "product."
              </p>
              <p className="cs-text-reveal cs-body-text italic">
                Early sketches got looks that said "you don't understand what happens in the lab." They were right.
              </p>
            </div>
            <div className="process-step1-image cs-step-image md:col-span-7">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80"
                alt="Medical professionals in discussion"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="process-step2-image cs-step-image md:col-span-7 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&q=80"
                alt="Learning in the lab environment"
                fill
                className="object-cover"
              />
            </div>
            <div className="process-step2-text cs-step-text md:col-span-5 md:order-2 space-y-6">
              <div className="cs-text-reveal cs-eyebrow cs-eyebrow-accent">The Shift</div>
              <p className="cs-text-reveal cs-subheadline">
                So we changed approach. We observed. We learned the difference between a Day 3 embryo and a blastocyst.
              </p>
              <p className="cs-text-reveal cs-body-text">
                We understood why a single misclick is unacceptable when someone's future child is on the line.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="process-step3-text cs-step-text md:col-span-5 space-y-6">
              <div className="cs-text-reveal cs-eyebrow">The Breakthrough</div>
              <p className="cs-text-reveal cs-subheadline">
                Once we found a shared language, everything clicked.
              </p>
              <p className="cs-text-reveal cs-body-text">
                Doctors became collaborators. The skeptical head nurse became our biggest advocate.
              </p>
            </div>
            <div className="process-step3-image cs-step-image md:col-span-7">
              <Image
                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80"
                alt="Collaborative healthcare design work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Quote */}
      <section className="impact-quote cs-section">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="relative">
            <div className="cs-quote-mark">"</div>
            <p className="text-[clamp(2rem,6vw,4rem)] font-extralight leading-[1.2] text-foreground/90 relative z-10" style={{ letterSpacing: '-0.02em' }}>
              We built tools that embryologists could trust with someone's future
            </p>
          </div>
        </div>
      </section>

      {/* Full-Width Lab Image */}
      <section className="relative h-[80vh] overflow-hidden px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto h-full cs-image-container">
          <Image
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
            alt="Medical laboratory precision work"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-6 px-8">
              <div className="text-[clamp(4rem,12vw,10rem)] font-extralight text-amber-300/30 leading-none">
                1.8B
              </div>
              <p className="text-xl md:text-2xl font-light text-foreground/70 max-w-2xl mx-auto">
                Peak valuation. 20+ clinics. Thousands of patients. One design system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Takeaway */}
      <section className="takeaway-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">Lesson</div>
          </div>
          <div className="md:col-span-10 space-y-12">
            <h2 className="cs-section-headline">
              The<br/>Takeaway
            </h2>
            <blockquote className="cs-subheadline max-w-4xl">
              This wasn't about clever UI patterns. It was about earning trust from people where mistakes have real consequences. The best design work happens when you shut up and learn someone else's language first.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="closing-section cs-section">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="cs-divider-vertical"></div>
          <div className="inline-flex items-center gap-4 text-xs uppercase tracking-widest text-foreground/30">
            <span>Lead Product Designer</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>2023–2025</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>Kindbody</span>
          </div>
          <div className="cs-divider-vertical"></div>
        </div>
      </section>

    </div>
  )
}
