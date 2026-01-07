"use client"

import { useState, useRef } from "react"
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
  const hoverPreviewRef = useRef<{ getDevicePosition: () => DOMRect | null }>(null)

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
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
        className="fixed inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: hoveredProject ? 0 : 1, zIndex: 5 }}
      >
        <div className="text-center space-y-8 px-8 max-w-4xl">
          <h1 className="text-7xl md:text-9xl font-light tracking-tighter lowercase opacity-0 animate-fade-in-up">
            theoria
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto font-light opacity-0 animate-fade-in-up animation-delay-200">
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
        <div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-10 opacity-0 animate-fade-in animation-delay-600">
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
        <div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-10 opacity-0 animate-fade-in animation-delay-600">
          <MenuPill
            onClick={() => setPageState(pageState === "menu" ? "default" : "menu")}
            isExpanded={pageState === "menu"}
          />
        </div>
      )}
    </main>
  )
}
