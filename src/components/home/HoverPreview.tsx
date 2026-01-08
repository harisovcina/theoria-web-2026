"use client"

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface Project {
  id: string
  name: string
  client: string
  summary?: string | null
  startYear: number
  endYear?: number | null
  services?: string
  heroImage: string
  deviceMockup: string
  deviceType: string
  layoutVariant: string
  caseStudySlug?: string | null
}

interface HoverPreviewProps {
  project: Project | null
  hideDevice?: boolean
}

export const HoverPreview = forwardRef<{ getDevicePosition: () => DOMRect | null }, HoverPreviewProps>(
  function HoverPreview({ project, hideDevice }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)
    const deviceRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const metaRef = useRef<HTMLDivElement>(null)
    const previousProjectId = useRef<string | null>(null)

    useImperativeHandle(ref, () => ({
      getDevicePosition: () => {
        return deviceRef.current?.getBoundingClientRect() || null
      },
    }))

  useGSAP(() => {
    if (!project) {
      // Fade out background with opacity only
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          force3D: true,
        })
      }
      // Collapse device and text with clip-path
      const clipElements = [deviceRef.current, titleRef.current, metaRef.current].filter(Boolean)
      if (clipElements.length > 0) {
        gsap.to(clipElements, {
          clipPath: "inset(50% 50% 50% 50%)",
          duration: 0.6,
          ease: "power3.in",
          force3D: true,
        })
      }
      previousProjectId.current = null
      return
    }

    // If switching between projects, crossfade
    const isNewProject = previousProjectId.current !== project.id
    previousProjectId.current = project.id

    // Background crossfade - simple opacity only, NO clip-path EVER
    if (backgroundRef.current) {
      // Force set clipPath to none to ensure no clip-path is applied
      gsap.set(backgroundRef.current, { clipPath: "none" })
      gsap.to(backgroundRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        force3D: true,
      })
    }

    // Animate device mockup based on layout variant
    if (!deviceRef.current || !titleRef.current || !metaRef.current) return

    const timeline = gsap.timeline()

    // Layout-specific animations with clip-path expand for device and text
    switch (project.layoutVariant) {
        case "A": // Centered: title above, device below - expand from top
          gsap.set(titleRef.current, { clipPath: "inset(0% 0% 100% 0%)" })
          gsap.set(deviceRef.current, { clipPath: "inset(100% 0% 0% 0%)" })
          gsap.set(metaRef.current, { clipPath: "inset(0% 0% 100% 0%)" })
          timeline
            .to(titleRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.05)
            .to(deviceRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.15)
            .to(metaRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.out", force3D: true }, 0.25)
          break

        case "B": // Left text, right device - expand from left to right
          gsap.set(titleRef.current, { clipPath: "inset(0% 100% 0% 0%)" })
          gsap.set(deviceRef.current, { clipPath: "inset(0% 0% 0% 100%)" })
          gsap.set(metaRef.current, { clipPath: "inset(0% 100% 0% 0%)" })
          timeline
            .to(titleRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.05)
            .to(deviceRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.1)
            .to(metaRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.out", force3D: true }, 0.25)
          break

        case "C": // Left device, right text - expand from right to left
          gsap.set(deviceRef.current, { clipPath: "inset(0% 0% 0% 100%)" })
          gsap.set(titleRef.current, { clipPath: "inset(0% 100% 0% 0%)" })
          gsap.set(metaRef.current, { clipPath: "inset(0% 100% 0% 0%)" })
          timeline
            .to(deviceRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.05)
            .to(titleRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.1)
            .to(metaRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.out", force3D: true }, 0.25)
          break

        case "D": // Top text, wide device bottom - expand from top
          gsap.set(titleRef.current, { clipPath: "inset(0% 0% 100% 0%)" })
          gsap.set(deviceRef.current, { clipPath: "inset(100% 0% 0% 0%)" })
          gsap.set(metaRef.current, { clipPath: "inset(0% 0% 100% 0%)" })
          timeline
            .to(titleRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.05)
            .to(deviceRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.15)
            .to(metaRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.out", force3D: true }, 0.25)
          break

        case "E": // Top device, bottom text - expand from bottom
          gsap.set(deviceRef.current, { clipPath: "inset(100% 0% 0% 0%)" })
          gsap.set(titleRef.current, { clipPath: "inset(0% 0% 100% 0%)" })
          gsap.set(metaRef.current, { clipPath: "inset(0% 0% 100% 0%)" })
          timeline
            .to(deviceRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.05)
            .to(titleRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.15)
            .to(metaRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.out", force3D: true }, 0.25)
          break

        case "F": // Editorial offset - expand from center
          gsap.set(titleRef.current, { clipPath: "inset(50% 50% 50% 50%)" })
          gsap.set(deviceRef.current, { clipPath: "inset(50% 50% 50% 50%)" })
          gsap.set(metaRef.current, { clipPath: "inset(50% 50% 50% 50%)" })
          timeline
            .to(titleRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.05)
            .to(deviceRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.1)
            .to(metaRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.out", force3D: true }, 0.25)
          break

        default:
          gsap.set([deviceRef.current, titleRef.current, metaRef.current], { clipPath: "inset(0% 0% 100% 0%)" })
          timeline
            .to(deviceRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out", force3D: true }, 0.05)
            .to(titleRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out", force3D: true }, 0.15)
            .to(metaRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.out", force3D: true }, 0.25)
      }
  }, [project])

  const getLayoutClasses = () => {
    if (!project) return "flex-col items-center justify-center gap-8"

    switch (project.layoutVariant) {
      case "A": // Centered
        return "flex-col items-end justify-center gap-8"
      case "B": // Left text, right device
        return "flex-row items-end justify-between gap-12"
      case "C": // Left device, right text
        return "flex-row-reverse items-end justify-between gap-12"
      case "D": // Top text, wide device bottom
        return "flex-col items-start justify-center gap-6"
      case "E": // Top device, bottom text
        return "flex-col-reverse items-end justify-center gap-6"
      case "F": // Editorial offset
        return "grid grid-cols-2 gap-8 items-end"
      default:
        return "flex-col items-end justify-center gap-8"
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 6 }}>
      {/* Background Image - Completely separate layer, only opacity animation */}
      {project && (
        <div
          ref={backgroundRef}
          className="absolute inset-0 opacity-0"
          style={{ willChange: "opacity" }}
        >
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background-5" />

          {/* Image Copyright Credit */}
          <div className="absolute bottom-8 right-8 z-50">
            <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
              IMAGE © {project.client}
            </p>
          </div>
        </div>
      )}

      {/* Content Layer - Device and text with clip-path animations */}
      {project && (
        <div className="absolute inset-0 flex items-center justify-center pl-32 md:pl-48">
          <div className={`flex max-w-9xl w-full p-12 md:p-24 ${getLayoutClasses()}`}>
            {/* Device Mockup */}
            {!hideDevice && (
              <div
                ref={deviceRef}
                className="relative"
                style={{ willChange: "clip-path" }}
              >
              <div className={`relative ${
                project.deviceType === "laptop"
                  ? "w-[600px] h-[400px]"
                  : "w-[280px] h-[580px]"
              }`}>
                <Image
                  src={project.deviceMockup}
                  alt={`${project.name} mockup`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
              </div>
            )}

            {/* Text Content - Hidden during case study */}
            <div
              ref={titleRef}
              className={`flex flex-col gap-4 max-w-md ${
                project.layoutVariant === "B" ? "items-start text-left" :
                project.layoutVariant === "C" ? "items-end text-right" :
                project.layoutVariant === "F" ? "items-start" :
                "items-end text-end"
              }`}
              style={{ willChange: "clip-path" }}
            >
              <div>
                <h2 className="text-4xl md:text-8xl font-extralight tracking-tight mb-2">
                  {project.name}
                </h2>
                {project.summary && (
                  <p className="text-sm md:text-xl font-extralight text-foreground mt-3">
                    {project.summary}
                  </p>
                )}
              </div>
              <div
                ref={metaRef}
                className="text-foreground space-y-1"
              >
                <p className="text-base font-mono">
                  {project.endYear ? `${project.startYear} - ${project.endYear}` : project.startYear}
                </p>
                {project.services && (
                  <p className="text-xs font-mono uppercase">
                    {JSON.parse(project.services).join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
