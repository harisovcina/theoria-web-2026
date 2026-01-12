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
 * Sematext Case Study
 * Technical, refined aesthetic with light blue accents
 * Emphasis on data, observability, and systematic design
 *
 * ✅ Refactored to use GSAP context pattern with CSS selectors
 * - Reduced from 17 refs to 1 containerRef
 * - All animations consolidated into single useGSAP block
 * - Uses CSS class selectors for targeting elements
 */

export function CaseStudySematext({ project }: CaseStudyProps) {
  // Parse case study images from database (Vercel Blob URLs)
  const images = project.caseStudyImages ? JSON.parse(project.caseStudyImages) : []

  const containerRef = useRef<HTMLDivElement>(null)

  // Consolidated GSAP animations using context pattern
  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const scroller = containerRef.current?.closest('.overflow-y-auto') as HTMLElement

      // Hero: Character reveal on "running" - sliding from left
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

      // Intro: Gentle fade in
      gsap.fromTo('.section-intro',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.section-intro',
            start: ANIMATION.scroll.start75,
          }
        }
      )

      // Section 1: Image parallax
      gsap.to('.section1-image img', {
        y: -50,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          scroller,
          trigger: '.section1-image',
          start: ANIMATION.scroll.startBottom,
          end: ANIMATION.scroll.endTop,
          scrub: true,
        }
      })

      // Section 1: ScrambleText animation for "evolves"
      const section1Scramble = containerRef.current?.querySelector('.section1-scramble')
      if (section1Scramble) {
        gsap.to(section1Scramble, {
          duration: 1.6,
          ease: "power2.inOut",
          scrambleText: {
            text: "keeps evolving.",
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

      // Section 2: Blur animation on "clarity"
      const clarityWord = containerRef.current?.querySelector('.section2-headline .cs-animate-word')
      if (clarityWord) {
        gsap.fromTo(clarityWord,
          { filter: 'blur(10px)', opacity: 0 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 1.2,
            ease: ANIMATION.ease.sine,
            scrollTrigger: {
              scroller,
              trigger: '.section2-headline',
              start: 'top 75%',
            }
          }
        )
      }

      // Section 2: Animated problem checklist
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

      // Section 2: Animated solution checklist
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

      // Section 2: Before/After Images
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

      // Section 2: Animated stat numbers
      const section2Stats = containerRef.current?.querySelectorAll('.section2-stats .cs-stat-number')
      section2Stats?.forEach((stat) => {
        const target = parseInt((stat as HTMLElement).getAttribute('data-target') || '0')
        const obj = { value: 0 }

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            scroller,
            trigger: '.section2-stats',
            start: 'top 75%',
          },
          onUpdate: () => {
            stat.textContent = Math.round(obj.value) + '%'
          }
        })
      })

      // Section 3: Animated problem checklist
      gsap.fromTo('.section3-problem-block .checklist-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: ANIMATION.ease.outMedium,
          scrollTrigger: {
            scroller,
            trigger: '.section3-problem-block',
            start: 'top 75%',
          }
        }
      )

      // Section 3: Animated solution checklist
      gsap.fromTo('.section3-solution-block .solution-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: ANIMATION.ease.outMedium,
          scrollTrigger: {
            scroller,
            trigger: '.section3-solution-block',
            start: 'top 75%',
          }
        }
      )

      // Section 3: Before/After Images
      gsap.fromTo('.section3-before-after .ba-image',
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
            trigger: '.section3-before-after',
            start: 'top 75%',
          }
        }
      )

      // Section 3: Animated stat numbers
      const section3Stats = containerRef.current?.querySelectorAll('.section3-stats .cs-stat-number')
      section3Stats?.forEach((stat) => {
        const target = parseInt((stat as HTMLElement).getAttribute('data-target') || '0')
        const obj = { value: 0 }

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            scroller,
            trigger: '.section3-stats',
            start: 'top 75%',
          },
          onUpdate: () => {
            stat.textContent = Math.round(obj.value) + '%'
          }
        })
      })

      // Section 3: Fluid word animation
      const fluidWord = containerRef.current?.querySelector('.fluid-word')
      if (fluidWord) {
        gsap.to(fluidWord, {
          y: -12,
          duration: 1.6,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        })
      }

      // Section 4: Word reveal
      const section4Words = containerRef.current?.querySelectorAll('.section4-headline .cs-animate-word')
      if (section4Words?.length) {
        gsap.fromTo(section4Words,
          { x: -10, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: ANIMATION.duration.fast,
            stagger: 0.02,
            scrollTrigger: {
              scroller,
              trigger: '.section4-headline',
              start: ANIMATION.scroll.start75,
            }
          }
        )
      }

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

      // Parallax background image
      gsap.to('.parallax-image img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          scroller,
          trigger: '.parallax-image',
          start: ANIMATION.scroll.startBottom,
          end: ANIMATION.scroll.endTop,
          scrub: true,
        }
      })

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
    <div ref={containerRef} className="cs-sematext min-h-screen relative">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12">
        {/* Background number */}
        <div
          className="hero-number absolute top-0 right-0 text-[clamp(15rem,35vw,30rem)] font-extralight leading-none text-sky-400/[0.02] select-none pointer-events-none"
          style={{ letterSpacing: '-0.05em' }}
        >
          19
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="cs-badge cs-badge-accent">
                  Case Study
                </span>
              </div>

              <h1 className="hero-headline cs-hero-headline">
                Designing for the people who keep the internet <span className="cs-animate-word inline-block text-sky-400">running.</span>
              </h1>
            </div>

            <div className="cs-tags">
              {['Observability', '·', 'DevOps', '·', 'Design Systems', '·', 'Product Design'].map((tag, index) => (
                <span key={`${tag}-${index}`} className="cs-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:col-span-4 space-y-4 text-foreground/80">
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Platform</div>
              <div className="cs-meta-value">Sematext Cloud</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Timeline</div>
              <div className="cs-meta-value">5+ years, ongoing</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Impact</div>
              <div className="cs-meta-value">2 platform redesigns<br/>1 design system<br/>40+ features shipped</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-intro cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">Overview</div>
          </div>
          <div className="md:col-span-7">
            <p className="cs-intro-text">
              Sematext helps engineering teams monitor everything: logs, infrastructure, traces, synthetics.
              Trusted by ASOS, WebMD, MIT.
            </p>
          </div>
          <div className="md:col-span-3 text-base font-light text-foreground/80 leading-relaxed">
            <p>Since then: two complete platform redesigns, a design system built from scratch, and dozens of shipped features.</p>
          </div>
        </div>
      </section>

      {/* Section 1: Design System */}
      <section className="cs-section relative h-screen">
        <div className="h-full grid lg:grid-cols-2 gap-4">
          {/* Left column - Text */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-6">
              <div className="cs-section-number cs-section-number-accent">
                01 / Foundation
              </div>
              <h2 className="section1-headline cs-section-headline">
                A system that <span className="section1-scramble cs-animate-word inline-block">xj%4#8s9gg2&!ty/</span>
              </h2>
            </div>
            <div className="cs-body-text space-y-4">
              <p>
                Started in 2021 as a way to bring consistency to a rapidly growing product. Not a static Figma library — a living system that adapts to real product needs.
              </p>
              <p>
                Components are built for dense, data-heavy interfaces where every pixel matters. Information density over whitespace.
              </p>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="section1-image h-100vh relative">
            <Image
              src={images[0] || "/img/sematext/designsystem_x2.png"}
              alt="Design system components"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Onboarding */}
      <section className="cs-section">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number-accent">
                02 / First Impression
              </div>
            </div>
            <div className="md:col-span-10">
              <h2 className="section2-headline cs-section-headline">
                From checklist<br />
                to <span className="cs-animate-word inline-block">clarity</span>
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
                Old onboarding felt like homework
              </p>

              {/* Animated Checklist */}
              <div className="space-y-4">
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Bullet points you had to complete and revisit</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Endless status checks and confusing navigation</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Long, low-quality tutorial videos nobody watched</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Users got frustrated and bounced</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Visual Comparison */}
          <div className="before-after-images grid md:grid-cols-2 gap-6 md:gap-8 my-16">
            {/* Error state - Left */}
            <div className="ba-image relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src={images[1] || "/img/sematext/onboarding-before.png"}
                alt="Before - Complex interface"
                fill
                className="object-cover"
              />
              {/* Error overlay with red tones - enhanced */}
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
                src={images[2] || "/img/sematext/onboarding-after.png"}
                alt="After - Clean interface"
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
                A visual node map of the entire platform
              </p>

              {/* Solution Checklist */}
              <div className="space-y-4">
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Hover a module, see dependencies instantly</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Click to explore features and capabilities</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Start creating apps, monitors, status pages</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Everything accessible from one unified view</p>
                </div>
              </div>
            </div>
          </div>

          <div className="section2-stats cs-stats-grid">
            <div className="cs-stat">
              <div className="cs-stat-number cs-stat-number-accent" data-target="75">0</div>
              <div className="cs-stat-label">fewer clicks</div>
            </div>
            <div className="cs-stat">
              <div className="cs-stat-number cs-stat-number-accent" data-target="70">0</div>
              <div className="cs-stat-label">faster completion</div>
            </div>
            <div className="cs-stat col-span-2 md:col-span-1">
              <div className="cs-stat-text">Ongoing</div>
              <div className="cs-stat-label">data collection</div>
            </div>
          </div>

          <div className="parallax-image cs-image-wide mt-16">
            <Image
              src={images[3] || "/img/sematext/onboarding-after.png"}
              alt="New onboarding flow"
              width={1600}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 3: App Creation Flow */}
      <section className="cs-section">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number-accent">
                03 / Core Flow
              </div>
            </div>
            <div className="md:col-span-10">
              <h2 className="section3-headline cs-section-headline">
                From fragmented<br />
                to <span className="fluid-word cs-animate-word inline-block">fluid</span>
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
            <div className="section3-problem-block md:col-span-10 space-y-8">
              <p className="cs-subheadline-lg">
                Horizontal stepper broke down under complexity
              </p>

              {/* Animated Checklist */}
              <div className="space-y-4">
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Steps got overcrowded as features grew</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Users lost context switching between steps</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">No sense of progress or completion</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Hard to revisit or modify previous choices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Visual Comparison */}
          <div className="section3-before-after grid md:grid-cols-2 gap-6 md:gap-8 my-16">
            {/* Error state - Left */}
            <div className="ba-image relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src={images[4] || "/img/sematext/app-creation-before.png"}
                alt="Before - Fragmented flow"
                fill
                className="object-cover"
              />
              {/* Error overlay with red tones - enhanced */}
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
                src={images[5] || "/img/sematext/app-creation-after1.png"}
                alt="After - Fluid flow"
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
            <div className="section3-solution-block md:col-span-10 space-y-8">
              <p className="cs-subheadline-lg">
                Vertical timeline that grows with you
              </p>

              {/* Solution Checklist */}
              <div className="space-y-4">
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Scroll-driven layout reveals next steps naturally</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">See your entire journey at a glance</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Context-aware choices guide you forward</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Jump back to any step without losing progress</p>
                </div>
              </div>
            </div>
          </div>

          <div className="section3-stats cs-stats-grid">
            <div className="cs-stat">
              <div className="cs-stat-number cs-stat-number-accent" data-target="50">0</div>
              <div className="cs-stat-label">faster (median)</div>
            </div>
            <div className="cs-stat">
              <div className="cs-stat-number cs-stat-number-accent" data-target="80">0</div>
              <div className="cs-stat-label">faster (edge cases)</div>
            </div>
            <div className="cs-stat col-span-2 md:col-span-1">
              <div className="cs-stat-text">1 scroll</div>
              <div className="cs-stat-label">full context</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonial */}
      <section className="cs-section">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <h2 className="section4-headline cs-section-headline-center">
            Built for people who <span className="cs-animate-word inline-block text-sky-400">don't have time</span> for downtime
          </h2>

          <blockquote className="cs-quote">
            <div className="cs-quote-mark">"</div>
            <p className="cs-quote-text">
              The new onboarding finally makes sense. I set up three monitors in the time it used to take to find the right video.
            </p>
            <cite className="cs-quote-cite">— Sematext user</cite>
          </blockquote>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section cs-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            <div className="cs-gallery-item md:col-span-7 aspect-[4/3] cs-image-container">
              <Image src={images[6] || "/img/sematext/study-screen1.png"} alt="Dashboard view" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-5 aspect-[4/3] cs-image-container">
              <Image src={images[7] || "/img/sematext/study-flow-2.png"} alt="Flow screen" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-5 aspect-[4/3] cs-image-container">
              <Image src={images[8] || "/img/sematext/study-flow-3.png"} alt="Flow detail" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-7 aspect-[4/3] cs-image-container">
              <Image src={images[9] || "/img/sematext/study-ds.png"} alt="Design system" width={800} height={450} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="closing-section cs-section">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="cs-divider-vertical"></div>
          <h2 className="cs-section-headline-center">
            5 years.<br/>Still shipping.
          </h2>
          <p className="cs-closing-text">
            Sematext is an ongoing partnership. The product keeps growing, the system keeps evolving, and we keep shipping. No agency handoff. No 'final deliverable.' Just continuous, embedded design.
          </p>
          <div className="cs-divider-vertical"></div>
        </div>
      </section>

    </div>
  )
}
