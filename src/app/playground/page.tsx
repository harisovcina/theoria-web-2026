import Link from "next/link"
import { db } from "@/lib/db"
import { fetchPlaygroundRepos } from "@/lib/github"
import { PlaygroundGrid } from "@/components/playground/PlaygroundGrid"
import { PageMenuDock } from "@/components/shared/PageMenuDock"
import { BreakAnimation } from "@/components/playground/BreakAnimation"

export default async function HarisPage() {
  // Fetch playground experiments from GitHub
  const experiments = await fetchPlaygroundRepos("harisovcina")

  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Menu Dock */}
      <PageMenuDock projects={projects} />

      {/* Hero Section */}
      <section className="relative px-[clamp(1rem,5vw,4rem)] pt-[clamp(8rem,20vh,12rem)]">
        <div className="max-w-3xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-12 opacity-0 animate-fade-in-up">
            Where theory meets practice{" "}
            <span className="text-muted-foreground">and things occasionally <BreakAnimation /></span>
          </h1>

          {/* Separator */}
          <div className="border-t border-border/50 my-16 opacity-0 animate-fade-in animation-delay-100" />

          {/* Section Title */}
          <div className="mb-8 opacity-0 animate-fade-in animation-delay-150">
            <h3 className="font-mono text-[clamp(0.625rem,1vw,0.75rem)] uppercase tracking-[0.2em] text-muted-foreground">
              A word from our founder
            </h3>
          </div>

          {/* Founder Section - Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-[clamp(2rem,5vw,4rem)] items-start opacity-0 animate-fade-in animation-delay-200">
            {/* Avatar */}
            <div className="relative">
              <div className="w-[clamp(8rem,15vw,12rem)] h-[clamp(8rem,15vw,12rem)] rounded-full overflow-hidden border- border-foreground/5">
                <img
                  src="/img/haris1.webp"
                  alt="Haris Ovčina"
                  className="w-full h-full object-cover"
                />
              </div>
            
            </div>

            {/* Bio Column */}
            <div className="space-y-[clamp(1.5rem,3vw,2.5rem)]">
              <div>
                <h2 className="text-6xl font-extralight tracking-tight mb-3">
                  Haris Ovčina
                </h2>
                <p className="text-xs font-mono uppercase text-slate-500 font-light leading-relaxed max-w-4xl">
                  Product designer · Former architect · Code enthusiast
                </p>

                <p className="text-xs font-mono uppercase text-foreground font-light leading-relaxed max-w-4xl">
                  Sarajevo-based, globally deployed.
                </p>
              </div>

              {/* Bio Text */}
              <div className="space-y-[clamp(1rem,2vw,1.5rem)] text-base text-muted-foreground font-light leading-relaxed">
                <p>
                  I've always learned best by building. Architecture school, design systems, now code: same pattern. Make something, see where it breaks, fix it, repeat.
                </p>
                <p>
                  This page is where that happens. Experiments, half-baked ideas, things that might become something. Or not.
                </p>
                <p>
                  The polished stuff lives on my CV. This is the messy part.
                </p>
              </div>

              {/* Links - Minimal Underline Style */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/cv"
                  className="group text-[clamp(0.875rem,1vw,0.9375rem)] font-medium tracking-wide relative pb-1 transition-colors hover:text-muted-foreground"
                >
                  <span>CV</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/20 group-hover:bg-foreground/40 transition-colors" />
                </Link>
                <a
                  href="https://linkedin.com/in/harisovcina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-[clamp(0.875rem,1vw,0.9375rem)] font-medium tracking-wide relative pb-1 transition-colors hover:text-muted-foreground"
                >
                  <span>LinkedIn</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/20 group-hover:bg-foreground/40 transition-colors" />
                </a>
                <a
                  href="mailto:haris@theoria.co"
                  className="group text-[clamp(0.875rem,1vw,0.9375rem)] font-medium tracking-wide relative pb-1 transition-colors hover:text-muted-foreground"
                >
                  <span>haris@theoria.co</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/20 group-hover:bg-foreground/40 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="px-[clamp(1rem,5vw,4rem)] py-[clamp(6rem,12vw,10rem)]">
        <div className="max-w-4xl mx-auto">
          <div className="border-t border-foreground/10 pt-[clamp(4rem,8vw,6rem)]">
            <div className="mb-[clamp(2rem,4vw,3rem)] opacity-0 animate-fade-in animation-delay-400">
              <h3 className="font-mono text-[clamp(0.625rem,1vw,0.75rem)] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Latest Experiments
              </h3>
              <p className="text-xs font-mono uppercase text-foreground font-light leading-relaxed">
                Small projects, quick prototypes, and technical explorations. <br></br> Built to learn, test ideas, and occasionally just for fun.
              </p>
            </div>

            {experiments.length > 0 ? (
              <div className="opacity-0 animate-fade-in animation-delay-500">
                <PlaygroundGrid experiments={experiments} />
              </div>
            ) : (
              <p className="text-muted-foreground text-[clamp(0.875rem,1vw,0.9375rem)] opacity-0 animate-fade-in animation-delay-500">
                No experiments yet. Check back soon.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export const revalidate = 3600 // Revalidate every hour
