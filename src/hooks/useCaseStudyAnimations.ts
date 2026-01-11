/**
 * Case Study Animation Hooks
 *
 * Reusable GSAP animation hooks for case study components.
 * Eliminates duplication and provides consistent animation patterns.
 *
 * Usage:
 * const elementRef = useRef<HTMLDivElement>(null)
 * const scrollerRef = useRef<HTMLDivElement>(null)
 *
 * useFadeIn(elementRef, scrollerRef, { y: 40, duration: 0.8 })
 */

// TODO: DEPRECATE THIS ENTIRE FILE - These custom hooks are an anti-pattern
// TODO: GSAP team recommends using gsap.context() with CSS selectors, NOT refs
// TODO: Current approach forces components to create 15-20 refs per component
// TODO: Better approach: Components should use one containerRef + gsap.context()
// TODO: Example of what components should do instead:
//   const containerRef = useRef<HTMLDivElement>(null)
//   useGSAP(() => {
//     const ctx = gsap.context(() => {
//       gsap.from('.hero-headline', { y: 100, opacity: 0 })
//       gsap.from('.hero-image', { scale: 1.1 })
//       gsap.from('.process-step', { y: 50, opacity: 0, stagger: 0.2 })
//     }, containerRef) // Scopes all selectors to this container
//     return () => ctx.revert()
//   }, [])
// TODO: This eliminates the need for custom hooks AND individual refs
// TODO: Migration plan:
//   1. Refactor CaseStudy.tsx to use gsap.context() pattern
//   2. Refactor CaseStudySematext.tsx to use gsap.context() pattern
//   3. Refactor CaseStudyKindbody.tsx to use gsap.context() pattern
//   4. Delete this hooks file entirely
// TODO: Benefits: cleaner code, better performance, follows GSAP best practices

import { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ANIMATION } from '@/lib/animations'

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

/**
 * Configuration for fade-in animations
 */
interface FadeInOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  ease?: string
  start?: string
  stagger?: number
  delay?: number
  selector?: string  // For staggered animations
}

/**
 * Configuration for parallax animations
 */
interface ParallaxOptions {
  speed?: number
  start?: string
  end?: string
  scrub?: boolean | number
  selector?: string
  y?: number
  yPercent?: number
  scale?: number
  opacity?: number
  trigger?: RefObject<HTMLElement | null>
}

/**
 * Configuration for split text animations
 */
interface SplitTextOptions {
  type?: 'chars' | 'words' | 'lines'
  stagger?: number
  duration?: number
  ease?: string
  start?: string
  y?: number
  x?: number
  opacity?: number
  blur?: number
  selector?: string
  delay?: number
}

/**
 * Hook: Fade in animation with scroll trigger
 *
 * Common pattern for revealing elements as they enter viewport
 */
export function useFadeIn<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  scrollerRef: RefObject<HTMLElement | null>,
  options: FadeInOptions = {}
) {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = ANIMATION.duration.medium,
    ease = ANIMATION.ease.out,
    start = ANIMATION.scroll.start,
    stagger,
    delay = 0,
  } = options

  useGSAP(() => {
    if (!elementRef.current) return

    // Find the scroller element (the scrollable container)
    const scroller = scrollerRef.current || elementRef.current.closest('.overflow-y-auto') as HTMLElement
    if (!scroller) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(elementRef.current, { opacity: 1, y: 0, x: 0 })
      return
    }

    const fromVars: gsap.TweenVars = { opacity }
    if (y !== 0) fromVars.y = y
    if (x !== 0) fromVars.x = x

    const toVars: gsap.TweenVars = {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      ease,
      delay,
      scrollTrigger: {
        scroller,
        trigger: elementRef.current,
        start,
      },
    }

    if (stagger !== undefined) {
      toVars.stagger = stagger
    }

    gsap.fromTo(elementRef.current, fromVars, toVars)
  }, [])
}

/**
 * Hook: Staggered fade in for multiple elements
 *
 * Reveals child elements sequentially
 */
export function useFadeInStagger<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T | null>,
  scrollerRef: RefObject<HTMLElement | null>,
  options: FadeInOptions = {}
) {
  const {
    y = 30,
    duration = ANIMATION.duration.normal,
    ease = ANIMATION.ease.outMedium,
    start = ANIMATION.scroll.start,
    stagger = ANIMATION.stagger.normal,
    selector = '',
  } = options

  useGSAP(() => {
    if (!containerRef.current) return

    // Find the scroller element (the scrollable container)
    const scroller = scrollerRef.current || containerRef.current.closest('.overflow-y-auto') as HTMLElement
    if (!scroller) return

    const elements = containerRef.current.querySelectorAll(selector)
    if (!elements.length) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(
      elements,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          scroller,
          trigger: containerRef.current,
          start,
        },
      }
    )
  }, [])
}

/**
 * Hook: Parallax scroll effect
 *
 * Moves element at different speed than scroll for depth effect
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  scrollerRef: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const {
    speed = ANIMATION.parallax.normal,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    selector,
    y,
    yPercent,
    scale,
    opacity,
    trigger,
  } = options

  useGSAP(() => {
    if (!elementRef.current) return

    // Find the scroller element (the scrollable container)
    const scroller = scrollerRef.current || elementRef.current.closest('.overflow-y-auto') as HTMLElement

    // Skip if no scroller found
    if (!scroller) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Get the target element - either via selector or use the ref directly
    const target = selector
      ? elementRef.current.querySelector(selector)
      : elementRef.current

    // Don't animate if target doesn't exist
    if (!target) return

    const animationVars: gsap.TweenVars = {
      ease: 'none',
      scrollTrigger: {
        scroller,
        trigger: trigger?.current || elementRef.current,
        start,
        end,
        scrub,
      },
    }

    // Add animation properties
    if (y !== undefined) {
      animationVars.y = y
    } else if (yPercent !== undefined) {
      animationVars.yPercent = yPercent
    } else {
      animationVars.y = () => {
        const el = target as HTMLElement
        if (!el || !el.offsetHeight) return 0
        return el.offsetHeight * speed
      }
    }

    if (scale !== undefined) animationVars.scale = scale
    if (opacity !== undefined) animationVars.opacity = opacity

    gsap.to(target, animationVars)
  }, [])
}

/**
 * Hook: Split text reveal animation
 *
 * Animates individual characters or words
 */
export function useSplitTextReveal<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  scrollerRef: RefObject<HTMLElement | null>,
  options: SplitTextOptions = {}
) {
  const {
    type = 'chars',
    stagger = ANIMATION.stagger.fast,
    duration = ANIMATION.duration.normal,
    ease = ANIMATION.ease.out,
    start = ANIMATION.scroll.start,
    y = 0,
    x = 0,
    opacity = 0,
    blur = 0,
    selector,
    delay = 0,
  } = options

  useGSAP(() => {
    if (!elementRef.current) return

    // Find the scroller element (the scrollable container)
    const scroller = scrollerRef.current || elementRef.current.closest('.overflow-y-auto') as HTMLElement
    if (!scroller) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(elementRef.current, { opacity: 1 })
      return
    }

    // Get the target element - either via selector or use the ref directly
    const target = selector
      ? elementRef.current.querySelector(selector)
      : elementRef.current

    if (!target) return

    const split = new SplitText(target, { type })

    const targets = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines

    if (!targets) return

    const fromVars: gsap.TweenVars = { opacity }
    if (y !== 0) fromVars.y = y
    if (x !== 0) fromVars.x = x
    if (blur !== 0) fromVars.filter = `blur(${blur}px)`

    const toVars: gsap.TweenVars = {
      y: 0,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: {
        scroller,
        trigger: elementRef.current,
        start,
      },
    }

    gsap.fromTo(targets, fromVars, toVars)

    // Cleanup
    return () => {
      split.revert()
    }
  }, [])
}

/**
 * Hook: Scale in animation
 *
 * Scales element from small to full size
 */
export function useScaleIn<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  scrollerRef: RefObject<HTMLElement | null>,
  options: Partial<{ scale: number; duration: number; ease: string; start: string; selector: string; y: number; stagger: number }> = {}
) {
  const {
    scale = 0.8,
    duration = ANIMATION.duration.medium,
    ease = ANIMATION.ease.outMedium,
    start = ANIMATION.scroll.start,
    selector,
    y = 0,
    stagger,
  } = options

  useGSAP(() => {
    if (!elementRef.current) return

    const elements = selector && elementRef.current
      ? Array.from(elementRef.current.querySelectorAll(selector))
      : [elementRef.current]

    if (!elements || elements.length === 0) return

    // Find the scroller element (the scrollable container)
    const scroller = scrollerRef.current || elementRef.current.closest('.overflow-y-auto') as HTMLElement
    if (!scroller) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(elements, { scale: 1, opacity: 1, y: 0 })
      return
    }

    const fromVars: gsap.TweenVars = { scale, opacity: 0 }
    if (y !== 0) fromVars.y = y

    const toVars: gsap.TweenVars = {
      scale: 1,
      opacity: 1,
      y: 0,
      duration,
      ease,
      scrollTrigger: {
        scroller,
        trigger: elementRef.current,
        start,
      },
    }

    if (stagger !== undefined) {
      toVars.stagger = stagger
    }

    gsap.fromTo(elements, fromVars, toVars)
  }, [])
}

/**
 * Hook: Slide in from side
 *
 * Slides element from left or right
 */
export function useSlideIn<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  scrollerRef: RefObject<HTMLElement | null>,
  options: Partial<{ direction: 'left' | 'right'; distance: number; duration: number; ease: string; start: string; selector: string; stagger: number; delay: number }> = {}
) {
  const {
    direction = 'left',
    distance = 100,
    duration = ANIMATION.duration.medium,
    ease = ANIMATION.ease.outMedium,
    start = ANIMATION.scroll.start,
    selector,
    stagger,
    delay = 0,
  } = options

  useGSAP(() => {
    if (!elementRef.current) return

    // Find the scroller element (the scrollable container)
    const scroller = scrollerRef.current || elementRef.current.closest('.overflow-y-auto') as HTMLElement
    if (!scroller) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(elementRef.current, { x: 0, opacity: 1 })
      return
    }

    // Get the target element - either via selector or use the ref directly
    const target = selector
      ? elementRef.current.querySelector(selector)
      : elementRef.current

    if (!target) return

    const x = direction === 'left' ? -distance : distance

    const toVars: gsap.TweenVars = {
      x: 0,
      opacity: 1,
      duration,
      ease,
      delay,
      scrollTrigger: {
        scroller,
        trigger: elementRef.current,
        start,
      },
    }

    if (stagger !== undefined) {
      toVars.stagger = stagger
    }

    gsap.fromTo(
      target,
      { x, opacity: 0 },
      toVars
    )
  }, [])
}
