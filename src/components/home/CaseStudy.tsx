"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { XIcon } from "lucide-react"
import { marked } from "marked"
import { caseStudyComponents } from "../case-studies"

interface Project {
  id: string
  name: string
  client: string
  summary?: string | null
  startYear: number
  endYear?: number | null
  heroImage: string
  deviceMockup: string
  deviceType: string
  layoutVariant: string
  comingSoon: boolean
  caseStudy?: string | null
  caseStudySlug?: string | null
  services?: string
  industry?: string
}

interface CaseStudyProps {
  project: Project | null
  deviceStartPosition: DOMRect | null
  onClose: () => void
}

export function CaseStudy({ project, deviceStartPosition, onClose }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useGSAP(() => {
    if (!project) return

    // Initial setup
    gsap.set(overlayRef.current, { opacity: 0 })
    gsap.set(headerRef.current, { y: -50, opacity: 0 })
    gsap.set(contentRef.current, { y: 100, opacity: 0 })
    gsap.set(closeButtonRef.current, { opacity: 0 })

    const container = deviceRef.current
    const deviceInner = container?.querySelector('.device-inner')
    if (!container || !deviceInner) return

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

    // Responsive y-shift: smaller on mobile, larger on desktop
    const isMobile = window.innerWidth < 768
    const yShift = isMobile ? 150 : 500

    // Animation timeline
    const timeline = gsap.timeline()

    timeline
      // 1. Fade in dark background
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, 0)
      // 2. Move to center AND expand simultaneously from TIME 0!
      .to(deviceInner, {
        x: 0,
        width: targetWidth,
        height: targetHeight,
        duration: 0.8,
        ease: "power3.out",
      }, 0)
      // 3. ~1 second pause (let it breathe)
      .to({}, { duration: 1 })
      // 4. Content shifts down, revealing title and meta
      .to(deviceRef.current, {
        y: yShift,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      // 5. Fade in case study content and close button
      .to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.3")
      .to(closeButtonRef.current, {
        opacity: 1,
        duration: 0.3,
      }, "-=0.3")
  }, [project])

  const handleClose = () => {
    const timeline = gsap.timeline({
      onComplete: onClose,
    })

    timeline
      .to([headerRef.current, deviceRef.current, contentRef.current, closeButtonRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      }, 0.1)
  }

  if (!project) return null

  // Parse services and industry from JSON strings
  const parseJsonField = (field: string | undefined) => {
    if (!field) return []
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return field.split(",").map(s => s.trim()).filter(Boolean)
    }
  }

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
          dangerouslySetInnerHTML={{ __html: marked(project.caseStudy) }}
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
    <div ref={containerRef} className="fixed inset-0 z-50">
      {/* Dark Background Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background"
      />

      {/* Close Button - Always fixed, left side */}
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        className="fixed top-4 md:top-8 left-8 z-[1001] px-4 py-2 rounded-full bg-foreground/10 hover:bg-foreground hover:text-background transition-colors font-mono text-xs uppercase tracking-widest"
        aria-label="Close case study"
      >
        Back
      </button>

      {/* Scrollable container - everything scrolls together */}
      <div className="absolute inset-0 overflow-y-auto z-30">
        <div className="relative min-h-screen">
          {/* Header Section - Revealed after device moves down */}
          <div
            ref={headerRef}
            className="absolute top-24 md:top-32 left-0 right-0 z-10 px-4 md:px-16 pointer-events-none"
          >
            <div className="max-w-7xl mx-auto">
              {/* Large project name */}
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight leading-none mb-6 md:mb-8">
                {project.name}
              </h1>

              {/* Compact metadata - single line on desktop, stacked on mobile */}
              <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm md:text-base">
                {/* Client */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono">Client</span>
                  <span className="font-light text-foreground">{project.client}</span>
                </div>

                {/* Year */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono">Year</span>
                  <span className="font-light text-foreground tabular-nums">
                    {project.endYear ? `${project.startYear}–${project.endYear}` : project.startYear}
                  </span>
                </div>

                {/* Services */}
                {services.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono">Services</span>
                    <span className="font-light text-foreground/80">{services.join(", ")}</span>
                  </div>
                )}

                {/* Industry */}
                {industries.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono">Industry</span>
                    <span className="font-light text-foreground/80">{industries.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Device Mockup - Expands immediately from hover position */}
          <div
            ref={deviceRef}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ height: "100vh" }}
          >
            <div
              className={`device-inner relative ${
                project.deviceType === "laptop"
                  ? "w-[600px] h-[400px]"
                  : "w-[280px] h-[580px]"
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
            ref={contentRef}
            className="relative bg-background py-16 px-8 md:px-16 lg:px-24 min-h-screen z-40"
          >
            <div className="max-w-9xl mx-auto">
              {renderContent()}
            </div>

            {/* Image Copyright Credit */}
            <div className="absolute bottom-8 right-8 md:right-16 lg:right-24 z-50">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                IMAGE © {project.client}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
