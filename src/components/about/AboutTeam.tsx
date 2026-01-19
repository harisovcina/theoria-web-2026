"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import { TeamMemberBrutalist } from "./TeamMemberBrutalist"

interface TeamMember {
  id: string
  name: string
  role: string
  babyPhoto: string
  adultPhoto: string
  email: string | null
  linkedin: string | null
  cvLink: string | null
}

interface AboutTeamProps {
  teamMembers: TeamMember[]
}

export function AboutTeam({ teamMembers }: AboutTeamProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate title on scroll
      gsap.from(titleRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        }
      })

      // Animate grid items with stagger
      const items = gridRef.current?.querySelectorAll('.team-member-card')
      if (items && items.length > 0) {
        gsap.from(items, {
          y: 100,
          opacity: 0,
          rotateX: -15,
          stagger: {
            each: 0.1,
            from: "start"
          },
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            end: "top 40%",
            scrub: 1.5
          }
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [teamMembers])

  if (teamMembers.length === 0) {
    return (
      <section ref={sectionRef} className="relative min-h-[50vh] flex items-center justify-center px-4 md:px-8 py-32">
        <div className="border-4 border-foreground p-8 md:p-16">
          <p className="font-mono text-xl md:text-3xl uppercase">
            TEAM DATA LOADING...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative px-4 md:px-8 py-24 md:py-32">
      {/* Section label - brutalist style */}
      <div className="absolute top-8 right-4 md:right-8 font-mono text-xs opacity-30 rotate-90 origin-top-right">
        SECTION_02
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24">
          <h2
            ref={titleRef}
            className="text-[15vw] md:text-[10vw] font-black uppercase leading-none tracking-tighter border-b-4 border-foreground inline-block pb-2 md:pb-4"
          >
            TEAM
          </h2>
          <div className="mt-4 font-mono text-xs md:text-sm opacity-40">
            [{teamMembers.length.toString().padStart(2, '0')} MEMBERS]
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          style={{ perspective: '1000px' }}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberBrutalist
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground opacity-20" />
    </section>
  )
}
