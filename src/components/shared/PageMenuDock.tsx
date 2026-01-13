"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MenuDock } from "@/components/home/MenuDock"

export function PageMenuDock() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <MenuDock
      onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
      isMenuOpen={isMenuOpen}
      isCaseStudy={false}
      onBackClick={() => router.push("/")}
    />
  )
}
