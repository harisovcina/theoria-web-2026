import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const AUTHORIZED_ADMINS = ["haris.ovcina@gmail.com"]
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"

// POST /api/admin/projects - Create project
export async function POST(req: NextRequest) {
  try {
    // Check authentication (bypass in dev mode)
    if (!BYPASS_AUTH_IN_DEV) {
      const session = await auth()
      if (!session?.user?.email || !AUTHORIZED_ADMINS.includes(session.user.email)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const body = await req.json()

    // Get the highest order number and increment
    const maxOrder = await db.project.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const project = await db.project.create({
      data: {
        name: body.name,
        client: body.client,
        summary: body.summary || null,
        startYear: parseInt(body.startYear),
        endYear: body.endYear ? parseInt(body.endYear) : null,
        services: JSON.stringify(body.services || []),
        industry: JSON.stringify(body.industry || []),
        website: body.website || null,
        heroImage: body.heroImage,
        deviceMockup: body.deviceMockup,
        deviceType: body.deviceType,
        layoutVariant: body.layoutVariant,
        caseStudy: body.caseStudy || null,
        caseStudySlug: body.caseStudySlug || null,
        comingSoon: body.comingSoon ?? true,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/admin/projects")

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
