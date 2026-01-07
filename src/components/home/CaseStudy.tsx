"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { XIcon } from "lucide-react"
import { marked } from "marked"

interface Project {
  id: string
  name: string
  client: string
  year: number
  heroImage: string
  deviceMockup: string
  deviceType: string
  layoutVariant: string
  comingSoon: boolean
  caseStudy?: string | null
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

    // Calculate target dimensions
    const targetWidth = window.innerWidth * 0.85
    const targetHeight = window.innerHeight * 0.7

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
        y: 300,
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
    if (project.comingSoon || !project.caseStudy) {
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
      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: marked(project.caseStudy) }}
      />
    )
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50">
      {/* Dark Background Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background"
      />

      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        className="fixed top-8 right-8 z-50 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
        aria-label="Close case study"
      >
        <XIcon className="w-6 h-6" />
      </button>

      {/* Header Section - Revealed after device moves down */}
      <div
        ref={headerRef}
        className="fixed top-16 left-0 right-0 z-10 px-8 md:px-16 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4">
          {project.name}
        </h1>
        <div className="flex items-center justify-center gap-6 text-foreground/60 text-lg">
          <span>{project.year}</span>
          {services.length > 0 && (
            <>
              <span>•</span>
              <span>{services.join(", ")}</span>
            </>
          )}
          {industries.length > 0 && (
            <>
              <span>•</span>
              <span>{industries.join(", ")}</span>
            </>
          )}
        </div>
      </div>

      {/* Device Mockup - Expands immediately from hover position */}
      <div
        ref={deviceRef}
        className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none overflow-hidden"
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
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Scrollable Content - Revealed at the end */}
      <div
        ref={contentRef}
        className="absolute inset-0 overflow-y-auto pt-[100vh] z-20"
      >
        <div className="relative bg-background py-16 px-8 md:px-16 min-h-screen">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
