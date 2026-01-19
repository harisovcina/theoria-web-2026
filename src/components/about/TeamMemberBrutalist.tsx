"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { MailIcon, LinkedinIcon, FileTextIcon } from "lucide-react"
import { gsap, useGSAP } from "@/lib/gsap"

interface TeamMemberProps {
  member: {
    id: string
    name: string
    role: string
    babyPhoto: string
    adultPhoto: string
    email: string | null
    linkedin: string | null
    cvLink: string | null
  }
  index: number
}

export function TeamMemberBrutalist({ member, index }: TeamMemberProps) {
  const [showAdult, setShowAdult] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      // Hover animation
      const hoverTimeline = gsap.timeline({ paused: true })

      hoverTimeline
        .to(imageRef.current, {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(cardRef.current, {
          y: -8,
          duration: 0.4,
          ease: "power2.out"
        }, 0)

      cardRef.current?.addEventListener('mouseenter', () => {
        hoverTimeline.play()
        setShowAdult(true)
      })

      cardRef.current?.addEventListener('mouseleave', () => {
        hoverTimeline.reverse()
        setShowAdult(false)
      })

    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={cardRef}
      className="team-member-card relative bg-background border-2 border-foreground overflow-hidden cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Index number - brutalist detail */}
      <div className="absolute top-2 right-2 z-20 font-mono text-xs opacity-30 bg-background px-2 py-1 border border-foreground">
        {(index + 1).toString().padStart(2, '0')}
      </div>

      {/* Photo Container */}
      <div ref={imageRef} className="relative w-full aspect-square overflow-hidden bg-foreground/5">
        {/* Baby Photo (Default) */}
        <Image
          src={member.babyPhoto}
          alt={`${member.name} - Baby photo`}
          fill
          className={`object-cover transition-opacity duration-700 ${
            showAdult ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Adult Photo (On Hover) */}
        <Image
          src={member.adultPhoto}
          alt={`${member.name} - Adult photo`}
          fill
          className={`object-cover transition-opacity duration-700 ${
            showAdult ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay effect */}
        <div
          className={`absolute inset-0 mix-blend-multiply transition-opacity duration-700 ${
            showAdult ? "opacity-20" : "opacity-0"
          }`}
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)'
          }}
        />
      </div>

      {/* Info Section */}
      <div className="p-4 border-t-2 border-foreground bg-background">
        {/* Name & Role */}
        <div className="mb-3">
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-tight mb-1">
            {member.name}
          </h3>
          <p className="font-mono text-xs uppercase opacity-60 tracking-wider">
            {member.role}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 pt-2 border-t border-foreground/20">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center justify-center w-8 h-8 border border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-200"
              title="Email"
              onClick={(e) => e.stopPropagation()}
            >
              <MailIcon className="w-4 h-4" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 border border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-200"
              title="LinkedIn"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {member.cvLink && (
            <a
              href={member.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 border border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-200"
              title="CV"
              onClick={(e) => e.stopPropagation()}
            >
              <FileTextIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-foreground opacity-10" />
    </div>
  )
}
