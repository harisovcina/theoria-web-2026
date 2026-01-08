import { db } from "@/lib/db"
import { HomePage } from "@/components/home/HomePage"

// Force dynamic rendering to avoid database access during build
export const dynamic = 'force-dynamic'

export default async function Home() {
  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      name: true,
      client: true,
      summary: true,
      startYear: true,
      endYear: true,
      heroImage: true,
      deviceMockup: true,
      deviceType: true,
      layoutVariant: true,
      comingSoon: true,
      caseStudy: true,
      caseStudySlug: true,
      services: true,
      industry: true,
      website: true,
    },
  })

  return <HomePage projects={projects} />
}
