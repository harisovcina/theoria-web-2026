import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/admin/Sidebar"

const AUTHORIZED_ADMINS = [
  "haris.ovcina@gmail.com",
  "harisovcina@gmail.com",
]
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"
// Temporary emergency password (will be removed once OAuth fixed)
const EMERGENCY_PASSWORD = process.env.ADMIN_EMERGENCY_PASSWORD

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // SKIP ALL AUTH - EMERGENCY ACCESS
  // TODO: Fix Google OAuth and re-enable proper auth

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-muted/30">
        {children}
      </main>
    </div>
  )
}
