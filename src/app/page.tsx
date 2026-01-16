import { db } from "@/lib/db"
import { HomePageWrapper } from "@/components/home/HomePageWrapper"

// Force dynamic rendering to avoid database access during build
export const dynamic = 'force-dynamic'

export default async function Home() {
  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  })

  return <HomePageWrapper projects={projects} />
}
