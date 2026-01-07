import Link from "next/link"
import { fetchPlaygroundRepos } from "@/lib/github"
import { PlaygroundGrid } from "@/components/playground/PlaygroundGrid"

export default async function HarisPage() {
  // Fetch playground experiments from GitHub
  const experiments = await fetchPlaygroundRepos("harisovcina")

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

      {/* Personal Intro Section */}
      <section className="container max-w-6xl mx-auto px-8 pt-32 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 opacity-0 animate-fade-in-up">
            Haris Ovčina
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed mb-8 opacity-0 animate-fade-in-up animation-delay-200">
            Product designer, 10+ years.
            <br />
            Architecture background — now I design digital spaces instead.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 opacity-0 animate-fade-in animation-delay-400">
            <Link
              href="/cv"
              className="px-5 py-2.5 rounded-full border border-border/40 bg-background/60 backdrop-blur-md hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <span className="text-sm">CV</span>
            </Link>
            <a
              href="https://linkedin.com/in/harisovcina"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-border/40 bg-background/60 backdrop-blur-md hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="mailto:haris@theoria.co"
              className="px-5 py-2.5 rounded-full border border-border/40 bg-background/60 backdrop-blur-md hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section className="container max-w-6xl mx-auto px-8 py-16">
        <div className="border-t border-border/30 pt-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4 opacity-0 animate-fade-in-up animation-delay-600">
            Playground
          </h2>
          <p className="text-foreground/60 mb-12 opacity-0 animate-fade-in animation-delay-600">
            Experiments, explorations, and side projects.
          </p>

          {experiments.length > 0 ? (
            <PlaygroundGrid experiments={experiments} />
          ) : (
            <p className="text-foreground/60 opacity-0 animate-fade-in animation-delay-600">
              No experiments yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export const revalidate = 3600 // Revalidate every hour
