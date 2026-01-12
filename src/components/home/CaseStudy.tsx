"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { marked } from "marked"
import { caseStudyComponents } from "../case-studies"
import { Project } from '@/types'
import { parseJsonField } from '@/lib/json-utils'

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

// Configure marked for synchronous operation
marked.use({ async: false })

// Helper function to handle marked's sync parsing
// TypeScript types don't reflect the async: false config, so we use single assertion
const parseMarkdownSync = (markdown: string): string => {
  const result = marked.parse(markdown)
  // With async: false configured, this returns a string synchronously
  return result as string
}

interface CaseStudyProps {
  project: Project | null
  deviceStartPosition: DOMRect | null
  onClose: () => void
}

export function CaseStudy({ project, deviceStartPosition, onClose }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  // Pulsating dot animation
  useGSAP(() => {
    if (!dotRef.current) return

    gsap.to(dotRef.current, {
      scale: 1.4,
      opacity: 1,
      duration: 0.8,
      ease: "back.inOut",
      repeat: -1,
      yoyo: true,
    })
  }, [])

  useGSAP(() => {
    if (!project || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Disable scrolling during animation
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.overflow = 'hidden'
      }

      // Get elements via CSS selectors
      const overlay = '.case-study-overlay'
      const header = '.case-study-header'
      const content = '.case-study-content'
      const device = '.case-study-device'
      const deviceInner = '.device-inner'

      // Initial setup
      gsap.set(overlay, { opacity: 0 })
      gsap.set(header, { y: -500, opacity: 0 })
      gsap.set(content, { y: 0, opacity: 0 })

      // Use ACTUAL device position from HoverPreview
      let startX = 0

      if (deviceStartPosition) {
        // Calculate offset from center
        const centerX = window.innerWidth / 2
        const deviceCenterX = deviceStartPosition.left + deviceStartPosition.width / 2
        startX = deviceCenterX - centerX
      }

      gsap.set(deviceInner, { x: startX })

      // Calculate target dimensions - full width with proper aspect ratio
      const targetWidth = window.innerWidth
      // Calculate height to maintain aspect ratio of the initial dimensions
      const initialWidth = project.deviceType === "laptop" ? 600 : 280
      const initialHeight = project.deviceType === "laptop" ? 400 : 580
      const aspectRatio = initialHeight / initialWidth
      const targetHeight = targetWidth * aspectRatio

      // Responsive y-shift: dynamically calculated based on screen size
      const screenWidth = window.innerWidth
      let yShift: number

      if (screenWidth < 768) {
        // Mobile
        yShift = 96
      } else if (screenWidth >= 768 && screenWidth < 1020) {
        // Medium (tablets)
        yShift = 160
      } else {
        // Desktop
        yShift = 480
      }

      // Animation timeline
      const timeline = gsap.timeline()

      timeline
        // 1. Fade in dark background
        .to(overlay, {
          opacity: 1,
          duration: 1.6,
          ease: "power1.Out",
        }, 0)
        // 2. Move to center AND expand simultaneously from TIME 0!
        .to(deviceInner, {
          x: 0,
          width: targetWidth,
          height: targetHeight,
          duration: 1.2,
          ease: "power1.inOut",
        }, 0)
        // 3. pause (let it breathe)
        .to({}, { duration: 0.2 })
        // 4. Content shifts down, revealing title and meta
        .to(device, {
          y: yShift,
          duration: 0.6,
          ease: "back.Out",
        })
        .to(header, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "back.Out",
        }, "-=1.1")
        // 5. Fade in case study content
        .to(content, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.Out",
          onComplete: () => {
            // Re-enable scrolling after animation completes
            if (scrollContainerRef.current) {
              scrollContainerRef.current.style.overflow = 'auto'
            }
          }
        }, "-=1.1")
    }, containerRef)

    return () => ctx.revert()
  }, [project])

  const handleClose = () => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: onClose,
      })

      timeline
        .to(['.case-study-header', '.case-study-device', '.case-study-content'], {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .to('.case-study-overlay', {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        }, 0.1)
    }, containerRef)
  }

  if (!project) return null

  const services = parseJsonField(project.services)
  const industries = parseJsonField(project.industry)

  const getLayoutClasses = () => {
    switch (project.layoutVariant) {
      case "A": // Centered
        return "flex-col items-center justify-center gap-8"
      case "B": // Left text, right device
        return "flex-row items-center justify-between gap-12"
      case "C": // Left device, right text
        return "flex-row-reverse items-center justify-between gap-12"
      case "D": // Top text, wide device bottom
        return "flex-col items-center justify-center gap-6"
      case "E": // Top device, bottom text
        return "flex-col-reverse items-center justify-center gap-6"
      case "F": // Editorial offset
        return "grid grid-cols-2 gap-8 items-center"
      default:
        return "flex-col items-center justify-center gap-8"
    }
  }

  const renderContent = () => {
    // Priority 1: Custom component via slug
    if (project.caseStudySlug && caseStudyComponents[project.caseStudySlug]) {
      const CustomComponent = caseStudyComponents[project.caseStudySlug]
      return <CustomComponent project={project} />
    }

    // Priority 2: Markdown content
    if (project.caseStudy && !project.comingSoon) {
      return (
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: parseMarkdownSync(project.caseStudy) }}
        />
      )
    }

    // Priority 3: Coming soon state
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-light text-foreground/60">Coming Soon</h3>
          <p className="text-foreground/40">This case study is currently being prepared.</p>
        </div>
      </div>
    )
  }

  return (
    <main
      ref={containerRef}
      className="fixed inset-0 z-50"
      role="dialog"
      aria-label={`${project.name} Case Study`}
      aria-modal="true"
    >
      {/* Dark Background Overlay */}
      <div
        className="case-study-overlay absolute inset-0 bg-background"
      />

      {/* Scrollable container - everything scrolls together */}
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden z-30">
        <div className="relative min-h-screen">
          {/* Header Section - Revealed after device moves down */}
          <div
            className="case-study-header absolute mt-24 md:mt-32 left-0 right-0 z-10 px-8 md:px-16 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto">
              {/* Large project name */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tight leading-none mb-4 md:mb-8 font-serif">
                {project.name}
              </h1>

              {/* Compact metadata - single line on desktop, stacked on mobile */}
              <div className="flex flex-wrap gap-x-12 gap-y-2 text-sm md:text-base">
                {/* Website */}
                {project.website && (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono">See Live</span>
                      <div ref={dotRef} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <a
                      href={project.website.startsWith('http') ? project.website : `https://${project.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-light text-foreground/80 hover:text-foreground transition-colors duration-200 pointer-events-auto"
                    >
                      @{project.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  </div>
                )}

                {/* Year */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono">Year</span>
                  <span className="font-light text-foreground tabular-nums">
                    {project.endYear ? `${project.startYear}–${project.endYear}` : project.startYear}
                  </span>
                </div>

                {/* Industry */}
                {industries.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono">Industry</span>
                    <span className="font-light text-foreground/80">{industries.join(", ")}</span>
                  </div>
                )}

                {/* Services */}
                {services.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono">Services</span>
                    <span className="font-light text-foreground/80">{services.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Device Mockup - Expands immediately from hover position */}
          <div
            className="case-study-device absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ height: "100vh" }}
          >
            <div
              className={`device-inner ${
                project.deviceType === "laptop"
                  ? "w-[1200px] h-[900px]"
                  : "w-[580px] h-[580px]"
              }`}
            >
              <Image
                src={project.deviceMockup}
                alt={`${project.name} mockup`}
                fill
                className="object-cover drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Spacer to push content down */}
          <div style={{ height: "100vh" }} />

          {/* Case Study Content */}
          <div
            className="case-study-content relative bg-background py-1 px-8 md:px-16 lg:px-20 xl:px-24 min-h-screen z-40"
          >
            <div className="max-w-9xl mx-auto">
              {renderContent()}
            </div>

            {/* Image Copyright Credit */}
            <div className="absolute bottom-8 right-8 md:right-16 lg:right-20 xl:right-24 z-50">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                IMAGE © {project.client}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
