import { db } from "@/lib/db"
import { PageMenuDock } from "@/components/shared/PageMenuDock"

export default async function CVPage() {
  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Menu Dock */}
      <PageMenuDock projects={projects} />

      {/* Hero Section */}
      <section className="relative px-[clamp(1rem,5vw,4rem)] pt-[clamp(8rem,15vh,12rem)]">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-16 opacity-0 animate-fade-in-up">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-foreground/5 flex-shrink-0">
                <img
                  src="/img/haris1.webp"
                  alt="Haris Ovčina"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight">
                Haris Ovčina
              </h1>
            </div>
            <p className="text-sm font-mono uppercase text-muted-foreground">
              Product Designer · Founder @ theoria
            </p>
          </div>

          {/* Separator */}
          <div className="border-t border-border/50 mb-16 opacity-0 animate-fade-in animation-delay-100" />

          {/* Summary */}
          <div className="mb-20 opacity-0 animate-fade-in animation-delay-200">
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              UX/UI and Product Designer with a background in architectural design. Innovative and efficient
              problem solver with 10+ years creating intuitive interfaces for complex systems. Founded theoria,
              a boutique design agency specializing in UX and product design, working with clients ranging from
              small startups to Fortune 500 companies.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-20 opacity-0 animate-fade-in animation-delay-300">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Experience
            </h2>

            <div className="space-y-12">
              {/* Kindbody */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/img/kb-logo-sq.svg" alt="Kindbody" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Lead UX/UI Designer</p>
                  <p className="text-xs text-muted-foreground font-mono">Sept 2022 — April 2025</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Kindbody · New York City, NY</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Led design across patient- and provider-facing tools at Kindbody, a healthcare startup that reached
                    unicorn status with a $1.8B valuation. Collaborated with product owners, developers, marketing, and
                    business teams to deliver cohesive experiences. Helped lay groundwork for scalable design by
                    collaborating on design system and improving design-engineering workflows.
                  </p>
                </div>
              </div>

              {/* Sematext */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/img/sematext-logo-sq.svg" alt="Sematext" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Lead Product Designer</p>
                  <p className="text-xs text-muted-foreground font-mono">Nov 2020 — Present</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Sematext Group, Inc. · New York City, NY</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Working as lead product designer as part of globally distributed team with multiple Fortune 100
                    clients in developing and improving new or existing solutions.
                  </p>
                </div>
              </div>

              {/* theoria */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/img/theoria-logo-sq.svg" alt="theoria" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Founder / Senior Product Designer</p>
                  <p className="text-xs text-muted-foreground font-mono">Jun 2021 — Present</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">theoria · Sarajevo, BiH</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    A boutique design agency specializing in UX and product design. Led and delivered projects across
                    diverse industries. Oversaw design strategy, client communication, and hands-on execution—from early
                    discovery to polished delivery.
                  </p>
                </div>
              </div>

              {/* Toptal */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/img/toptal.png" alt="Toptal" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">UX/UI/Product Designer</p>
                  <p className="text-xs text-muted-foreground font-mono">Sept 2018 — Present</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Toptal</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Occasionally working as freelance designer for different clients, ranging from small startups to
                    some of the largest Fortune 500 companies.
                  </p>
                </div>
              </div>

              {/* Atlantbh */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/img/atlantbh.png" alt="Atlantbh" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">UX/UI Designer</p>
                  <p className="text-xs text-muted-foreground font-mono">Sept 2017 — Nov 2020</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Atlantbh · Sarajevo, BiH</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Working for multiple Fortune 500 and FTSE 100 companies in fast-paced, agile team. Closely
                    collaborating with stakeholders, product owners and developers in delivering software solutions
                    from product concepts to full-scale projects.
                  </p>
                </div>
              </div>

              {/* CityOS Foundation */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/img/cityos.png" alt="CityOS Foundation" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Product Designer / Mentor</p>
                  <p className="text-xs text-muted-foreground font-mono">Feb 2016 — Sept 2017</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">CityOS Foundation · Sarajevo / San Francisco</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Designing open-source IoT solutions. Helped in organizing workshops and hackathons. Collaborating
                    with winners in designing and developing their solutions.
                  </p>
                </div>
              </div>

              {/* HUB 387 */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img src="/img/hub387.png" alt="HUB 387" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Product Designer / UX Designer</p>
                  <p className="text-xs text-muted-foreground font-mono">May 2015 — Feb 2016</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">HUB 387 · Sarajevo, BiH</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Working as only designer in the first startup accelerator in Bosnia and Herzegovina. Designing IoT
                    solutions such as smart beehives, hydroponic devices as well as accompanying web and mobile applications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-20 opacity-0 animate-fade-in animation-delay-400">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Skills & Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
              <div>
                <p className="text-sm font-medium mb-3">Design</p>
                <ul className="text-sm text-muted-foreground space-y-2 font-light">
                  <li>Product Strategy</li>
                  <li>Design Systems</li>
                  <li>Prototyping</li>
                  <li>Usability Testing</li>
                  <li>Visual Design</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Tools</p>
                <ul className="text-sm text-muted-foreground space-y-2 font-light">
                  <li>Figma</li>
                  <li>Sketch</li>
                  <li>Adobe Suite</li>
                  <li>3DS Max</li>
                  <li>Blender</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Development</p>
                <ul className="text-sm text-muted-foreground space-y-2 font-light">
                  <li>HTML/CSS/JS</li>
                  <li>React & Next.js</li>
                  <li>Tailwind CSS</li>
                  <li>GSAP Animations</li>
                  <li>Three.js</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Education */}
          <div className="mb-20 opacity-0 animate-fade-in animation-delay-500">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Education
            </h2>

            <div className="space-y-8">
              {/* Architecture Degree */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded bg-muted-foreground/10 flex items-center justify-center">
                  <span className="text-xs font-medium">U</span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">B.Arch - Architecture</p>
                  <p className="text-xs text-muted-foreground font-mono">Class of 2014</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Faculty of Architecture · Sarajevo, BiH</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Architecture and Related Services
                  </p>
                </div>
              </div>

              {/* Udacity Nanodegrees */}
              <div className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-l border-border/30 pl-6">
                <div className="w-8 h-8 mt-1 rounded bg-muted-foreground/10 flex items-center justify-center">
                  <span className="text-xs font-medium">U</span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Nanodegrees</p>
                  <p className="text-xs text-muted-foreground font-mono">2018</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Udacity</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Design Sprint Foundations Nanodegree · UX Designer Nanodegree
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-border/50 pt-12 opacity-0 animate-fade-in animation-delay-600">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Get in touch
            </p>
            <a
              href="mailto:haris@theoria.co"
              className="inline-block text-2xl md:text-4xl font-extralight hover:text-muted-foreground transition-colors"
            >
              haris@theoria.co
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-32" />
    </main>
  )
}
