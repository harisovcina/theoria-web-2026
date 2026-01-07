"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

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
  comingSoon: boolean
  caseStudySlug?: string | null
}

interface ProjectPillsProps {
  projects: Project[]
  onHover: (project: Project | null) => void
  onClick: (project: Project) => void
}

export function ProjectPills({ projects, onHover, onClick }: ProjectPillsProps) {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (project: Project) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    onHover(project)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      onHover(null)
      hoverTimeoutRef.current = null
    }, 200) // 200ms delay before showing default state
  }

  return (
    <div className="flex flex-col gap-3">
      {projects.map((project) => (
        <button
          key={project.id}
          className={cn(
            "group relative px-6 py-4 rounded-2xl border-2 border-foreground/10",
            "bg-foreground/5 backdrop-blur-sm",
            "transition-all duration-300 ease-out",
            "hover:bg-foreground hover:text-background hover:border-foreground",
            "hover:shadow-lg hover:shadow-foreground/10",
            "text-left pointer-events-auto",
            "active:scale-[0.98]",
            project.comingSoon && "opacity-50 hover:opacity-70"
          )}
          onMouseEnter={() => handleMouseEnter(project)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClick(project)}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-base sm:text-lg font-medium tracking-tight">
                {project.name}
              </span>
              <span className="text-xs text-foreground/50 group-hover:text-background/70 uppercase tracking-widest font-medium">
                {project.client}
              </span>
            </div>
            {project.comingSoon && (
              <span className="text-xs opacity-60 uppercase tracking-widest font-bold bg-foreground/10 group-hover:bg-background/20 px-3 py-1 rounded-full w-fit">
                Soon
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
