"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ProjectPills } from "./ProjectPills"
import { MenuPill } from "./MenuPill"
import { HoverPreview } from "./HoverPreview"
import { MenuExpanded } from "./MenuExpanded"
import { CaseStudy } from "./CaseStudy"

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

interface HomePageProps {
  projects: Project[]
}

type PageState = "default" | "preview" | "case-study" | "menu"

export function HomePage({ projects }: HomePageProps) {
  const [pageState, setPageState] = useState<PageState>("default")
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showLoader, setShowLoader] = useState(true)
  const [loadingPercent, setLoadingPercent] = useState(0)
  const hoverPreviewRef = useRef<{ getDevicePosition: () => DOMRect | null }>(null)
  const maskOverlayRef = useRef<HTMLDivElement>(null)
  const logoShapeRef = useRef<SVGGElement>(null)

  useGSAP(() => {
    if (!maskOverlayRef.current || !logoShapeRef.current) return

    const tl = gsap.timeline()

    // Loading counter
    tl.to({}, {
      duration: 1.5,
      onUpdate: function() {
        setLoadingPercent(Math.round(this.progress() * 100))
      }
    })

    // Fade out loader
    tl.to({}, {
      duration: 0.3,
      onComplete: () => setShowLoader(false)
    })

    // Scale up the logo HOLE to reveal content
    tl.to(logoShapeRef.current, {
      scale: 1000,
      duration: 1.2,
      ease: "power3.inOut",
      transformOrigin: "center center"
    }, "-=0.1")

    // Fade out the mask overlay
    tl.to(maskOverlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out"
    }, "-=0.2")

  }, [])

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Loading Screen */}
      {showLoader && (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-[1001]">
          <span className="font-mono text-sm tracking-widest uppercase text-foreground/80">
            LOADING <span>{loadingPercent}</span>%
          </span>
        </div>
      )}

      {/* SVG Mask Overlay */}
      <div
        ref={maskOverlayRef}
        className="fixed inset-0 z-[1000] pointer-events-none"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="logo-reveal-mask">
              {/* WHITE = overlay visible (covers content) */}
              <rect width="100%" height="100%" fill="white"/>

              {/* BLACK = overlay hidden (content shows through) */}
              {/* Simple circle as a HOLE that will scale up */}
              <g ref={logoShapeRef}>
                <circle cx="500" cy="500" r="40" fill="black"/>
              </g>
            </mask>
          </defs>

          {/* Dark overlay - masked so logo cutout reveals content */}
          <rect width="100%" height="100%" fill="#0C0E15" mask="url(#logo-reveal-mask)"/>
        </svg>
      </div>
      {/* Case Study Layer */}
      {pageState === "case-study" && (
        <CaseStudy
          project={selectedProject}
          deviceStartPosition={hoverPreviewRef.current?.getDevicePosition() || null}
          onClose={() => {
            setSelectedProject(null)
            setPageState("default")
          }}
        />
      )}

      {/* Menu Expanded Layer */}
      <MenuExpanded isExpanded={pageState === "menu"} />

      {/* Default State Content */}
      <div
        className="fixed inset-0 flex items-start md:items-center justify-start md:justify-center pointer-events-none transition-opacity duration-300 pt-12 md:pt-0 pl-12 md:pl-0"
        style={{ opacity: hoveredProject ? 0 : 1, zIndex: 5 }}
      >
        <div className="text-left md:text-center space-y-6 md:space-y-8 max-w-4xl pr-12 md:pr-0">
          {/* Logo */}
          <div className="opacity-0 animate-fade-in-up">
            <Image
              src="/logo.svg"
              alt="Theoria"
              width={400}
              height={100}
              className="w-64 md:w-96 h-auto mx-0 md:mx-auto"
              priority
            />
          </div>

          <p className="text-xl md:text-2xl text-foreground/70 max-w-sm md:max-w-2xl font-light opacity-0 animate-fade-in-up animation-delay-200">
            We turn complex products into simple interfaces.
          </p>
          <p className="text-sm md:text-base text-foreground/50 font-light opacity-0 animate-fade-in-up animation-delay-400">
            Product design studio, Sarajevo.
          </p>
        </div>
      </div>

      {/* Hover Preview Layer - Keep visible but hide device during case study */}
      <HoverPreview
        ref={hoverPreviewRef}
        project={pageState === "case-study" ? selectedProject : hoveredProject}
        hideDevice={pageState === "case-study"}
      />

      {/* Project Pills - Left Side */}
      {projects.length > 0 && (
        <div className="fixed left-12 md:left-12 top-auto md:top-1/2 bottom-12 md:bottom-auto md:-translate-y-1/2 z-10 opacity-0 animate-fade-in animation-delay-600">
          <div className="flex flex-col gap-4">
            <ProjectPills
              projects={projects}
              onHover={setHoveredProject}
              onClick={(project) => {
                setSelectedProject(project)
                setPageState("case-study")
              }}
            />

            {/* Separator */}
            <div className="h-px bg-border/30 mx-3" />

            {/* Menu Pill */}
            <MenuPill
              onClick={() => setPageState(pageState === "menu" ? "default" : "menu")}
              isExpanded={pageState === "menu"}
            />
          </div>
        </div>
      )}

      {/* Menu Pill Only (when no projects) */}
      {projects.length === 0 && (
        <div className="fixed left-12 md:left-12 top-auto md:top-1/2 bottom-12 md:bottom-auto md:-translate-y-1/2 z-10 opacity-0 animate-fade-in animation-delay-600">
          <MenuPill
            onClick={() => setPageState(pageState === "menu" ? "default" : "menu")}
            isExpanded={pageState === "menu"}
          />
        </div>
      )}
    </main>
  )
}
