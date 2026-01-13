import Link from "next/link"
import { ClientCarousel } from "@/components/work/ClientCarousel"
import { PageMenuDock } from "@/components/shared/PageMenuDock"

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Menu Dock */}
      <PageMenuDock />

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-8 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[80vh]">
          {/* Left Column - Headline */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-tight opacity-0 animate-fade-in-up">
                We have worked with many companies, ranging from Fortune 500 to small, local startups
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
                Our client relationships are built on trust, collaboration, and a shared commitment to excellence. From global enterprises to emerging startups, we bring the same level of craft and care to every project.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="mailto:info@theoria.co"
              className="group inline-flex items-center gap-4 px-8 py-6 border border-foreground/10 hover:border-foreground/30 bg-foreground/5 hover:bg-foreground/10 backdrop-blur-sm rounded-lg transition-all duration-300 opacity-0 animate-fade-in-up animation-delay-400"
            >
              <div className="flex-1">
                <p className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-1">
                  Ready to start?
                </p>
                <p className="text-base md:text-lg font-light">
                  Got a project in mind? Let's work together
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/10 group-hover:bg-foreground group-hover:text-background transition-all duration-300 group-hover:scale-110">
                <span className="text-lg">→</span>
              </div>
            </Link>
          </div>

          {/* Right Column - Client Logos Carousel */}
          <div className="opacity-0 animate-fade-in animation-delay-400">
            <ClientCarousel />
          </div>
        </div>
      </div>
    </main>
  )
}
