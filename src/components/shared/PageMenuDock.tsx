"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MenuDock } from "@/components/home/MenuDock"
import { Project } from "@/types"

interface PageMenuDockProps {
  projects?: Project[]
}

export function PageMenuDock({ projects = [] }: PageMenuDockProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleProjectClick = (project: Project) => {
    if (project.comingSoon) return
    router.push(`/work/${project.slug}`)
  }

  return (
    <MenuDock
      onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
      isMenuOpen={isMenuOpen}
      isCaseStudy={false}
      onBackClick={() => router.push("/")}
      projects={projects}
      onProjectClick={handleProjectClick}
    />
  )
}
