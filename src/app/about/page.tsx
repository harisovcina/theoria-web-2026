import { db } from "@/lib/db"
import { AboutHero } from "@/components/about/AboutHero"
import { AboutTeam } from "@/components/about/AboutTeam"
import { AboutContact } from "@/components/about/AboutContact"
import { PageMenuDock } from "@/components/shared/PageMenuDock"

// Force dynamic rendering to avoid database access during build
export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const teamMembers = await db.teamMember.findMany({
    orderBy: { order: "asc" },
  })

  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Menu Dock */}
      <PageMenuDock projects={projects} />

      {/* Hero Section */}
      <AboutHero />

      {/* Team Section */}
      <AboutTeam teamMembers={teamMembers} />

      {/* Contact Section */}
      <AboutContact />
    </main>
  )
}
