"use client"

import { useRef } from "react"
import Image from "next/image"
import { CaseStudyProps } from '@/types'
import { useFadeIn, useParallax, useSplitTextReveal, useFadeInStagger, useScaleIn, useSlideIn } from '@/hooks/useCaseStudyAnimations'
import { ANIMATION } from '@/lib/animations'
import { FlipWordDemo } from './FlipWordDemo'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

// Register ScrambleText plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrambleTextPlugin)
}

/**
 * Sematext Case Study
 * Technical, refined aesthetic with light blue accents
 * Emphasis on data, observability, and systematic design
 */

// TODO: MAJOR REFACTOR - This component has 17 refs! This is excessive and against GSAP best practices
// TODO: Refactor to use GSAP context pattern: const ctx = gsap.context(() => { ... }, containerRef)
// TODO: Replace all individual element refs with CSS class selectors
// TODO: Keep only containerRef for scoping - all animations should use CSS selectors within that scope
// TODO: Example pattern:
//   useGSAP(() => {
//     const ctx = gsap.context(() => {
//       gsap.from('.hero-headline', { y: 100, opacity: 0 })
//       gsap.from('.hero-number', { y: 150, opacity: 0.03 })
//       gsap.from('.section-intro', { y: 30 })
//     }, containerRef)
//     return () => ctx.revert()
//   }, [])
// TODO: This would eliminate 16 refs and make the code much cleaner and more maintainable

export function CaseStudySematext({ project }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLElement>(null)
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null)
  const heroNumberRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const section1HeadlineRef = useRef<HTMLHeadingElement>(null)
  const section1ScrambleRef = useRef<HTMLSpanElement>(null)
  const section1ImageRef = useRef<HTMLDivElement>(null)
  const section2HeadlineRef = useRef<HTMLHeadingElement>(null)
  const section2StatsRef = useRef<HTMLDivElement>(null)
  const problemBlockRef = useRef<HTMLDivElement>(null)
  const solutionBlockRef = useRef<HTMLDivElement>(null)
  const section3HeadlineRef = useRef<HTMLHeadingElement>(null)
  const section3StatsRef = useRef<HTMLDivElement>(null)
  const section4HeadlineRef = useRef<HTMLHeadingElement>(null)
  const galleryRef = useRef<HTMLElement>(null)
  const closingRef = useRef<HTMLElement>(null)
  const parallaxImageRef = useRef<HTMLDivElement>(null)

  // TODO: Replace custom hooks (useSlideIn, useParallax, useFadeIn) with direct gsap.context() pattern
  // TODO: All these hooks are passing refs - should use CSS selectors instead
  // TODO: Consolidate all animations into a single useGSAP hook with gsap.context()
  // TODO: Current approach: 17 separate hook calls with 17 refs = unmaintainable
  // TODO: Better approach: 1 useGSAP hook, 1 containerRef, CSS selectors for targets
  // TODO: Example refactor:
  //   useGSAP(() => {
  //     const ctx = gsap.context(() => {
  //       gsap.from('.hero-headline .cs-animate-word', { x: -60, stagger: 0.075 })
  //       gsap.to('.hero-number', { y: 150, scrollTrigger: {...} })
  //       gsap.from('.section-intro', { y: 30, scrollTrigger: {...} })
  //     }, containerRef)
  //     return () => ctx.revert()
  //   }, [])

  // Hero: Character reveal on "running" - sliding from left
  useSlideIn(heroHeadlineRef, scrollerRef, {
    direction: 'left',
    distance: 60,
    duration: ANIMATION.duration.slow,
    stagger: 0.075,
    ease: ANIMATION.ease.outMedium,
    delay: ANIMATION.delay.medium,
    selector: '.cs-animate-word',
  })

  // Hero: Background number parallax
  useParallax(heroNumberRef, scrollerRef, {
    y: 150,
    opacity: 0.03,
    trigger: heroHeadlineRef,
  })

  // Intro: Gentle fade in
  useFadeIn(introRef, scrollerRef, {
    y: 30,
    duration: ANIMATION.duration.slow,
    start: ANIMATION.scroll.start75,
  })

  // Section 1: Image parallax
  useParallax(section1ImageRef, scrollerRef, {
    y: -50,
    scale: 1.08,
    selector: 'img',
    start: ANIMATION.scroll.startBottom,
    end: ANIMATION.scroll.endTop,
  })

  // Section 1: ScrambleText animation for "evolves"
  useGSAP(() => {
    if (!section1ScrambleRef.current) return

    const element = section1ScrambleRef.current

    // Find the scrollable container (case study content area)
    const scroller = element.closest('.overflow-y-auto') as HTMLElement

    gsap.to(element, {
      duration: 1.6,
      ease: "power2.inOut",
      scrambleText: {
        text: "evolves",
        chars: "lowerCase",
        revealDelay: 0.5,
        tweenLength: false,
      },
      scrollTrigger: {
        trigger: section1HeadlineRef.current,
        start: "top 75%",
        scroller: scroller || undefined,
      }
    })
  }, { scope: containerRef })


  // Section 2: Blur-to-sharp reveal on "clarity"
  useSplitTextReveal(section2HeadlineRef, scrollerRef, {
    type: 'chars',
    selector: '.cs-animate-word',
    blur: 6,
    duration: ANIMATION.duration.normal,
    stagger: 0.02,
    ease: ANIMATION.ease.sine,
    start: ANIMATION.scroll.start75,
  })

  // Section 2: Problem block slide from left
  useSlideIn(problemBlockRef, scrollerRef, {
    direction: 'left',
    distance: 60,
    duration: ANIMATION.duration.slow,
    ease: ANIMATION.ease.outMedium,
  })

  // Section 2: Solution block slide from right
  useSlideIn(solutionBlockRef, scrollerRef, {
    direction: 'right',
    distance: 60,
    duration: ANIMATION.duration.slow,
    ease: ANIMATION.ease.outMedium,
  })

  // Section 4: Word reveal
  useSplitTextReveal(section4HeadlineRef, scrollerRef, {
    type: 'words',
    selector: '.cs-animate-word',
    x: -10,
    duration: ANIMATION.duration.fast,
    stagger: 0.02,
    start: ANIMATION.scroll.start75,
  })

  // Gallery: Staggered image reveal
  useScaleIn(galleryRef, scrollerRef, {
    selector: '.cs-gallery-item',
    scale: 0.98,
    y: 20,
    duration: ANIMATION.duration.medium,
    stagger: ANIMATION.stagger.fast,
    ease: ANIMATION.ease.outMedium,
  })

  // Parallax background image
  useParallax(parallaxImageRef, scrollerRef, {
    yPercent: 30,
    start: ANIMATION.scroll.startBottom,
    end: ANIMATION.scroll.endTop,
  })

  // Closing: Gentle fade in
  useFadeIn(closingRef, scrollerRef, {
    y: 30,
    duration: ANIMATION.duration.slow,
    start: ANIMATION.scroll.start75,
  })

  return (
    <div ref={containerRef} className="cs-sematext min-h-screen relative">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12">
        {/* Background number */}
        <div
          ref={heroNumberRef}
          className="absolute top-0 right-0 text-[clamp(15rem,35vw,30rem)] font-extralight leading-none text-sky-400/[0.02] select-none pointer-events-none"
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

              <h1 ref={heroHeadlineRef} className="cs-hero-headline">
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
      <section ref={introRef} className="cs-section">
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
              <h2 ref={section1HeadlineRef} className="cs-section-headline">
                A system that <span ref={section1ScrambleRef} className="cs-animate-word inline-block">xj%4#8s9gg2&!ty/</span>
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
          <div ref={section1ImageRef} className="h-100vh relative">
            <Image
              src="/img/sematext/study-ds.png"
              alt="Design system components"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Onboarding */}
      <section className="cs-section">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number-accent">
                02 / First Impression
              </div>
            </div>
            <div className="md:col-span-10">
              <h2 ref={section2HeadlineRef} className="cs-section-headline">
                From checklist to <span className="cs-animate-word inline-block">clarity</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <div ref={problemBlockRef} className="cs-problem-block">
              <div className="cs-eyebrow-error">× Problem</div>
              <p className="cs-subheadline">
                Old onboarding: bullet points you had to complete and revisit. Status checks. Long, low-quality tutorial videos. Tedious. Users bounced.
              </p>
            </div>

            <div ref={solutionBlockRef} className="cs-solution-block">
              <div className="cs-eyebrow cs-eyebrow-accent">✓ Solution</div>
              <p className="cs-subheadline">
                A visual node map of the entire platform. Hover a module, see dependencies. Click, see features. Start creating apps, monitors, status pages — all from one view.
              </p>
            </div>
          </div>

          <div ref={section2StatsRef} className="cs-stats-grid">
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

          <div ref={parallaxImageRef} className="cs-image-wide mt-16">
            <Image
              src="/img/sematext/study-onboarding.png"
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
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-1">
              <div className="cs-section-number-vertical cs-section-number-accent">
                03 / Core Flow
              </div>
            </div>
            <div className="md:col-span-11">
              <h2 ref={section3HeadlineRef} className="cs-section-headline">
                <span className="inline-block"><span className="cs-strikethrough-word">Vertical</span></span> rhythm, <span className="cs-animate-word inline-block text-sky-400">horizontal</span> clarity
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-6">
              <div className="cs-eyebrow">Before</div>
              <p className="cs-body-text">
                Horizontal stepper. Looked clean at first, got overcrowded fast. Users lost context.
              </p>
            </div>

            <div className="space-y-6">
              <div className="cs-eyebrow cs-eyebrow-accent">After</div>
              <p className="cs-body-text">
                Vertical timeline layout. Scroll-driven. Each choice reveals what's next. You learn as you go.
              </p>
            </div>

            <div className="space-y-6">
              <div className="cs-eyebrow">Impact</div>
              <p className="cs-body-text">
                One cohesive experience, not a fragmented wizard. Users stay oriented throughout.
              </p>
            </div>
          </div>

          <div ref={section3StatsRef} className="cs-stats-grid">
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

          <div className="md:ml-24 mt-16">
            <div className="cs-image-container">
              <Image
                src="/img/sematext/study-flow.png"
                alt="App creation flow"
                width={1600}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonial */}
      <section className="cs-section">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <h2 ref={section4HeadlineRef} className="cs-section-headline-center">
            Built for people who <span className="cs-animate-word inline-block text-sky-400">don't have time</span> for bad UX
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
      <section ref={galleryRef} className="cs-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            <div className="cs-gallery-item md:col-span-7 aspect-[4/3] cs-image-container">
              <Image src="/img/sematext/study-screen1.png" alt="Dashboard view" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-5 aspect-[4/3] cs-image-container">
              <Image src="/img/sematext/study-flow-2.png" alt="Flow screen" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-5 aspect-[4/3] cs-image-container">
              <Image src="/img/sematext/study-flow-3.png" alt="Flow detail" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-7 aspect-[4/3] cs-image-container">
              <Image src="/img/sematext/study-ds.png" alt="Design system" width={800} height={450} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section ref={closingRef} className="cs-section">
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

      {/* Flip Word Demo */}
      <FlipWordDemo />

    </div>
  )
}
