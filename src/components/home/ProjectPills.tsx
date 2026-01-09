"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Project } from '@/types'

interface ProjectPillsProps {
  projects: Project[]
  onHover: (project: Project | null) => void
  onClick: (project: Project) => void
}

export function ProjectPills({ projects, onHover, onClick }: ProjectPillsProps) {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (project: Project) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    onHover(project)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      onHover(null)
    }, 200)
  }

  return (
    <div className={cn(
      "fixed z-10 pointer-events-none",
      // Mobile: 2-column grid at bottom
      "left-4 right-4 bottom-16 grid grid-cols-2 gap-1 w-fit",
      // Tablet: 2-column grid at bottom-left
      "md:left-8 md:right-auto md:bottom-24 md:grid-cols-2 md:gap-2 md:w-fit",
      // Desktop: vertical stack (1 column), centered vertically on left
      "xl:left-12 xl:top-[50vh] xl:bottom-auto xl:flex xl:flex-col"
    )}>
      {projects.map((project) => (
        <button
          key={project.id}
          className={cn(
            "group flex items-center gap-2 w-fit px-5 py-2.5 rounded-full",
            "bg-background/10 backdrop-blur-custom border border-foreground/5",
            "opacity-0 animate-fade-in animation-delay-600",
            "transition-[background-color,color,border-color,box-shadow,opacity] duration-200 ease-out",
            "hover:bg-foreground hover:text-background hover:border-foreground hover:shadow-md",
            "text-left pointer-events-auto",
            project.comingSoon && "opacity-40 hover:opacity-50"
          )}
          onMouseEnter={() => handleMouseEnter(project)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClick(project)}
        >
          <span className="text-xs font-normal font-mono uppercase tracking-widest whitespace-nowrap">
            {project.name}
          </span>
          {project.comingSoon && (
            <span className="text-[8px] opacity-70 text-violet-500 uppercase tracking-wider">
              Soon
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
