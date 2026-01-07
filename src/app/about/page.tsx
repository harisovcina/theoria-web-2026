import { db } from "@/lib/db"
import { TeamMember } from "@/components/about/TeamMember"
import Link from "next/link"

export default async function AboutPage() {
  const teamMembers = await db.teamMember.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-8 left-8 md:left-12 z-50">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full border border-border/40 bg-background/60 backdrop-blur-md hover:bg-foreground hover:text-background transition-all duration-200"
        >
          <span className="text-sm">← Back</span>
        </Link>
      </nav>

      {/* About Section */}
      <section className="container max-w-6xl mx-auto px-8 pt-32 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 opacity-0 animate-fade-in-up">
            World-class UX from a city most people can't point to on a map.
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
            We're a product design studio based in Sarajevo, specializing in turning complex
            products into simple, intuitive interfaces. We work with ambitious companies who
            want to create exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="container max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-12 opacity-0 animate-fade-in-up animation-delay-400">
          Team
        </h2>

        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-0 animate-fade-in animation-delay-600">
            {teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-foreground/60 opacity-0 animate-fade-in animation-delay-600">
            Team information coming soon.
          </p>
        )}
      </section>

      {/* Contact Section */}
      <section className="container max-w-6xl mx-auto px-8 py-16">
        <div className="border-t border-border/30 pt-16">
          <a
            href="mailto:info@theoria.co"
            className="text-2xl md:text-3xl font-light hover:text-foreground/70 transition-colors opacity-0 animate-fade-in-up animation-delay-600"
          >
            info@theoria.co
          </a>
        </div>
      </section>
    </main>
  )
}
