import Link from "next/link"

export default function CVPage() {
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

      {/* CV Content */}
      <section className="container max-w-4xl mx-auto px-8 pt-32 pb-16">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 opacity-0 animate-fade-in-up">
            Haris Ovčina
          </h1>
          <p className="text-xl text-foreground/70 font-light mb-12 opacity-0 animate-fade-in-up animation-delay-200">
            Product Designer • Founder @ theoria
          </p>

          {/* Summary */}
          <div className="mb-12 opacity-0 animate-fade-in animation-delay-400">
            <h2 className="text-2xl font-light mb-4">Summary</h2>
            <p className="text-foreground/70 leading-relaxed">
              Product designer with 10+ years of experience creating intuitive interfaces for
              complex products. Background in architecture, now specialized in digital product
              design, UX research, and design systems. Founded theoria, a product design studio
              based in Sarajevo.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-12 opacity-0 animate-fade-in animation-delay-600">
            <h2 className="text-2xl font-light mb-6">Experience</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-1">Founder & Lead Designer</h3>
                <p className="text-foreground/60 mb-2">theoria • 2020 - Present</p>
                <p className="text-foreground/70 leading-relaxed">
                  Founded and leading a product design studio specializing in UX/UI design for
                  complex B2B SaaS products. Working with international clients to transform
                  complicated workflows into simple, intuitive interfaces.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-1">Senior Product Designer</h3>
                <p className="text-foreground/60 mb-2">Various Companies • 2014 - 2020</p>
                <p className="text-foreground/70 leading-relaxed">
                  Led design initiatives for multiple startups and established companies,
                  focusing on user research, interaction design, and building scalable design
                  systems.
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-12 opacity-0 animate-fade-in animation-delay-600">
            <h2 className="text-2xl font-light mb-6">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Design</h4>
                <ul className="text-foreground/70 space-y-1">
                  <li>• UX/UI Design</li>
                  <li>• User Research</li>
                  <li>• Design Systems</li>
                  <li>• Prototyping</li>
                  <li>• Interaction Design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tools</h4>
                <ul className="text-foreground/70 space-y-1">
                  <li>• Figma</li>
                  <li>• Adobe Creative Suite</li>
                  <li>• HTML/CSS</li>
                  <li>• React (basics)</li>
                  <li>• Framer</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-12 opacity-0 animate-fade-in animation-delay-600">
            <h2 className="text-2xl font-light mb-6">Education</h2>
            <div>
              <h3 className="text-xl font-medium mb-1">Architecture</h3>
              <p className="text-foreground/60">University • Year</p>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-border/30 pt-8 opacity-0 animate-fade-in animation-delay-600">
            <a
              href="mailto:haris@theoria.co"
              className="text-lg hover:text-foreground/70 transition-colors"
            >
              haris@theoria.co
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
