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
    <div className="flex flex-col gap-2.5">
      {projects.map((project) => (
        <button
          key={project.id}
          className={cn(
            "group relative px-5 py-2.5 rounded-full border border-border/40",
            "bg-background/60 backdrop-blur-md",
            "transition-all duration-200 ease-out",
            "hover:bg-foreground hover:text-background hover:border-foreground",
            "hover:shadow-md hover:scale-[1.02]",
            "text-left pointer-events-auto",
            "active:scale-[0.98]",
            project.comingSoon && "opacity-40 hover:opacity-50"
          )}
          onMouseEnter={() => handleMouseEnter(project)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClick(project)}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal whitespace-nowrap">
              {project.name}
            </span>
            {project.comingSoon && (
              <span className="text-[10px] opacity-70 uppercase tracking-wider">
                Soon
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
