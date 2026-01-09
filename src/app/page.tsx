import { db } from "@/lib/db"
import { HomePage } from "@/components/home/HomePage"

// Force dynamic rendering to avoid database access during build
export const dynamic = 'force-dynamic'

export default async function Home() {
  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  })

  return <HomePage projects={projects} />
}
