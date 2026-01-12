"use client"

import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ExpoScaleEase } from "gsap/EasePack"
import { ProjectPills } from "./ProjectPills"
import { MenuDock } from "./MenuDock"
import { HoverPreview } from "./HoverPreview"
import { CaseStudy } from "./CaseStudy"
import { Project } from '@/types'
import { PAGE_STATES, type PageState } from '@/lib/constants'

gsap.registerPlugin(ExpoScaleEase)

interface HomePageProps {
  projects: Project[]
}

export function HomePage({ projects }: HomePageProps) {
  const [pageState, setPageState] = useState<PageState>("default")
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showLoader, setShowLoader] = useState(true)
  const [loadingPercent, setLoadingPercent] = useState(0)
  const hoverPreviewRef = useRef<{ getDevicePosition: () => DOMRect | null; reverse: () => void; play: () => void }>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const maskShapeRef = useRef<SVGRectElement>(null)
  const mainTitleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (!overlayRef.current || !maskShapeRef.current) return

    const tl = gsap.timeline()

    // Set initial state - very wide, short rounded rectangle (pill shape)
    // Centered horizontally, centered vertically
    gsap.set(maskShapeRef.current, {
      attr: {
        width: 600,   // wide
        height: 12,   // short
        x: 200,       // centered (500 - 600/2 = 300)
        y: 494,       // centered (500 - 12/2 = 494)
        rx: 12         // small rounded corners
      }
    })

    // Loading counter
    tl.to({}, {
      duration: 1,
      onUpdate: function() {
        setLoadingPercent(Math.round(this.progress() * 100))
      }
    })

    // Fade out loader
    tl.to({}, {
      duration: 0.3,
      onComplete: () => setShowLoader(false)
    })

    // Step 1: Grow vertically to 80% viewport height (800 in our 1000 viewBox)
    tl.to(maskShapeRef.current, {
      attr: {
        height: 400,
        y: 300,        // center it (500 - 800/2 = 100)
        rx: 0,         // small rounded corners
      },
      duration: 1,
      ease: "expoScale(0.5, 7, none)"
    }, "-=0.1")

    // Step 3: Expand to full screen in all directions
    tl.to(maskShapeRef.current, {
      attr: {
        width: 10000,
        height: 10000,
        x: -4500,
        y: -4500,
        rx: 4
      },
      duration: 1.5,
      ease: "expoScale(0.5, 7, expoScale.out)"
    })

    // Fade out the overlay
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "expoScale(0.5,7,none)",
    }, "-=0.3")

    // Main title blur animation
    if (mainTitleRef.current) {
      gsap.fromTo(mainTitleRef.current,
        { filter: 'blur(128px)', opacity: 0 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.6,
          ease: "sine.inOut",
          delay: 0.6
        }
      )
    }

  }, [])

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/background-video.webm" type="video/webm" />
        </video>
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Loading Screen */}
      {showLoader && (
        <div className="fixed inset-0 bg-[#F0FFFE] flex items-center justify-center z-[1001]">
          <span className="font-mono text-sm tracking-widest uppercase text-black">
            LOADING <span>{loadingPercent}</span>%
          </span>
        </div>
      )}

      {/* Reveal Overlay - SVG mask that expands */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[1000] pointer-events-none"
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="expandingMask">
              {/* White background = visible */}
              <rect width="100%" height="100%" fill="white" />
              {/* Black shape = cutout (hides overlay, shows content) */}
              <rect
                ref={maskShapeRef}
                x="300"
                y="488"
                width="400"
                height="24"
                rx="8"
                fill="black"
              />
            </mask>
          </defs>
          {/* Light teal overlay with mask applied - black area cuts through */}
          <rect width="100%" height="100%" fill="#F0FFFE" mask="url(#expandingMask)" />
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

      {/* Default State Content */}
      <div
        ref={mainTitleRef}
        className="fixed inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: hoveredProject ? 0 : 1, zIndex: 5, paddingTop: "30vh", alignItems: "flex-start" }}
      >
        <div className="text-start space-y-4 md:space-y-6 lg:space-y-8 max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl px-8">
          {/* Main Tagline*/}
          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground font-extralight leading-none tracking-tight">
            We turn complex products into simple interfaces
          </h1>
          <p className="text-xs sm:text-sm md:text-sm text-foreground/80 font-light uppercase font-mono tracking-widest opacity-0 animate-fade-in-up animation-delay-400">
            Product design studio based in Sarajevo
          </p>
        </div>
      </div>

      {/* Project Pills - Left Side */}
      {projects.length > 0 && (
        <ProjectPills
          projects={projects}
          onHover={setHoveredProject}
          onClick={(project) => {
            setSelectedProject(project)
            setPageState("case-study")
          }}
          hoverPreviewRef={hoverPreviewRef}
        />
      )}

      {/* Hover Preview Layer - Keep visible but hide device during case study */}
      <HoverPreview
        ref={hoverPreviewRef}
        project={pageState === "case-study" ? selectedProject : hoveredProject}
        hideDevice={pageState === "case-study"}
      />

      {/* Menu Dock - Top Center */}
      <MenuDock
        onMenuClick={() => setPageState(pageState === "menu" ? "default" : "menu")}
        isMenuOpen={pageState === "menu"}
        isCaseStudy={pageState === "case-study"}
        onBackClick={() => {
          setSelectedProject(null)
          setPageState("default")
        }}
        projects={projects}
        onProjectHover={setHoveredProject}
        onProjectClick={(project) => {
          setSelectedProject(project)
          setPageState("case-study")
        }}
      />
    </main>
  )
}
