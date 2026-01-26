# Case Study Improvements: Adding Context & Narrative

## Problem Analysis

Both Sematext and Kindbody case studies jump directly into solutions without establishing:
- Business context (why does this company/problem matter?)
- Relationship origin (how did we get this project?)
- Initial state (what was broken?)
- Project goals (what were we hired to do?)

This makes the work feel like a feature list rather than a compelling story.

---

## Sematext Case Study - Proposed Changes

### Current Structure Issues

**What's Missing:**
1. No introduction to what Sematext does or why it matters
2. No explanation of how the partnership started
3. No clear problem statement before jumping to solutions
4. Feels like "here's what we built" vs "here's the problem we solved"

### Proposed New Structure

#### **Section 0: The Company & The Challenge** (NEW - Add before current "Overview")

**Layout:** Grid with section number + two-column split

**Left Column - The Company:**
```
Sematext Cloud is an observability platform used by engineering teams at
ASOS, WebMD, and MIT to monitor logs, infrastructure, traces, and synthetics.

In a market dominated by Datadog, New Relic, and Splunk, Sematext competes
on precision and price—offering full-stack monitoring without the enterprise
bloat.

When your platform monitors the infrastructure that keeps the internet
running, "good enough" UI isn't an option.
```

**Right Column - The Challenge:**
```
The Problem:
Platform felt dated. New users got lost. Power users built workarounds.
Competitors had slicker interfaces and bigger marketing budgets.

The Brief:
Modernize the platform without breaking the workflows that power users
depend on. Make onboarding intuitive. Build a design system that could
scale with the product.

The Reality:
This wasn't a 3-month agency engagement. It became a 5-year embedded
partnership.
```

#### **Update Section: Overview** (Currently exists, rewrite intro)

**Current intro:**
```
Sematext helps engineering teams monitor everything: logs, infrastructure,
traces, synthetics. Trusted by ASOS, WebMD, MIT.
```

**Proposed rewrite:**
```
We started in 2021 with a straightforward brief: make observability less
overwhelming for teams who don't have dedicated DevOps engineers.

What began as a design system project evolved into something bigger—two
complete platform redesigns, dozens of shipped features, and an ongoing
partnership that's now in its fifth year.

This is what happens when you embed with a product team instead of
handing off Figma files.
```

#### **Section 01: Foundation** (Keep, minor tweaks)

**Add context paragraph before existing content:**
```
Before we could redesign anything, we needed a foundation. The product
had grown organically—new features bolted on, inconsistent patterns,
no shared component library.

We built a design system not as a static Figma file, but as a living
system that could evolve with the product. Information density over
whitespace. Built for power users who live in dashboards.
```

#### **Section 02: First Impression** (Keep structure, enhance intro)

**Add "Why this mattered" before problem/solution:**
```
Onboarding is where most observability platforms lose people. The old
Sematext onboarding was a checklist of tasks—install agents, configure
monitors, watch tutorial videos.

Users bounced. Trial conversions suffered. Something had to change.
```

#### **Section 03: Core Flow** (Keep structure, enhance intro)

**Add "The compounding problem" before problem/solution:**
```
As Sematext added more monitoring types (logs, infrastructure, synthetics,
experience), the app creation flow buckled under its own complexity.

What started as a simple 3-step wizard had ballooned into a fragmented
experience where users lost context between steps.
```

---

## Kindbody Case Study - Proposed Changes

### Current Structure Issues

**What's Missing:**
1. Context section exists but comes AFTER the hero (backwards)
2. No explanation of the partnership origin
3. Missing the emotional/business stakes upfront
4. "Building trust" section doesn't set up WHY trust was the core challenge
5. No "before state" visualization of the chaos

### Proposed New Structure

#### **Section -1: The Landscape** (NEW - Before Hero)

**Layout:** Full-width text section, minimal, sets the stage

```
One in six couples face infertility. The journey to parenthood through
IVF is clinical, expensive, and emotionally exhausting.

The technology supporting this journey? Often stuck in the 1990s.

Kindbody set out to change that—20+ US clinics offering egg freezing,
IVF, and genetic testing, backed by a platform built for modern healthcare.

At its peak: valued at $1.8 billion. The expectation: design that matched
that ambition.
```

#### **Hero Section** (Keep current hero, minor adjustment)

**Update headline from:**
```
When precision meets compassion
```

**To something more specific:**
```
When precision meets compassion
```
*(Keep this - it's good. Just needs the landscape section before it)*

#### **Section 0: How We Got Here** (NEW - After Hero Visual, before Context)

**Layout:** Grid - Left: Eyebrow + narrative, Right: Stats/Timeline

**Left Column:**
```
EYEBROW: The Beginning

In 2023, Kindbody reached out. They had ambitious growth plans but a
patchwork of tools—spreadsheets for lab tracking, disparate systems
for patient data, paper logs for critical embryo information.

They needed a Lead Product Designer who could work across two worlds:
internal clinical tools for providers and embryologists, and patient-facing
experiences for people navigating the most important journey of their lives.

The challenge wasn't just design. It was earning trust from medical
professionals who'd seen too many "tech people" promise solutions without
understanding the stakes.
```

**Right Column:**
```
Timeline: 2023–2025
Role: Lead Product Designer
Scope:
- Clinical EMR & provider tools
- Patient portal & mobile app
- Lab workflows & embryo tracking
- Design system & component library

The Stakes:
When you're building tools that help people create families, there's
no room for "move fast and break things."
```

#### **Update: Context Section** (Currently exists, move up and enhance)

**Current location:** After hero
**New location:** Remove or merge into "How We Got Here"

**Current text is good but needs more emphasis on the problem:**
```
Kindbody is a fertility care platform redefining how people build
families—20+ US clinics offering egg freezing, IVF, and genetic testing.
At its peak, valued at $1.8 billion.

But the platform didn't match the ambition. Providers worked around the
system instead of with it. Patients felt like they were navigating a
medical bureaucracy, not a modern healthcare experience.

A platform where precision isn't just a feature—it's a responsibility.
```

#### **Section 01: Building Trust** (Keep structure, rewrite intro)

**Current intro jumps to "Lead Product Designer" role.**

**Proposed intro - Set up the trust problem first:**
```
SECTION NUMBER: 01 / Foundation
HEADLINE: Designing for trust.

We didn't speak their language. Early mockups got polite nods and
skeptical looks from embryologists who'd been doing this work for decades.

"You don't understand what happens in the lab."

They were right.

This wasn't about beautiful UI. It was about building tools that medical
professionals could stake their reputation on—and that patients could
trust with their future families.
```

**Then existing content about role/responsibilities**

#### **Section 02: The Challenge** (Keep structure, add "Day in the Life" before Problem)

**Add new subsection before Problem checklist:**

**"A Day in the Life" - Paint the picture:**
```
Picture this: An embryologist managing 12 active IVF cycles across 3 labs.

Day 3: Check embryo development. Update patient records. Coordinate with
providers across time zones. Track medication schedules. Monitor genetic
testing timelines. Call patients with updates.

The tools? Excel spreadsheets. Paper logs. A patchwork of disconnected
systems that didn't talk to each other.

One misclick. One miscommunication. One embryo mislabeled.

That's someone's future child.
```

**Then existing Problem/Solution content**

#### **Section 03: The Process** (Restructure completely)

**Current structure shows images + generic text about "the shift"**

**Proposed: More specific, more honest**

**Step 1 - The Problem:**
```
EYEBROW: Week 1

Designing for healthcare means working with doctors and nurses who don't
speak "product design."

Our first mockups landed with a thud. We'd designed for what we thought
embryo tracking should look like—clean, minimal, Notion-inspired.

"Where's the development stage? Where's the quality grade? How do I see
which incubator this is in?"

We'd designed a beautiful interface for a workflow we didn't understand.
```

**Step 2 - The Shift:**
```
EYEBROW: Month 2

So we shadowed embryologists. Watched lab workflows. Learned the difference
between a Day 3 embryo and a Day 5 blastocyst. Understood why color-coding
by patient ID wasn't just a nice-to-have—it was a critical safety feature.

We stopped designing and started learning.

The breakthrough: When we prototyped a visual timeline that matched their
mental model of embryo development, the head embryologist said: "Now you're
speaking our language."
```

**Step 3 - The Breakthrough:**
```
EYEBROW: Month 4

Once we earned their trust, they became collaborators. The skeptical head
nurse who questioned every design decision became our biggest internal
advocate.

Doctors started asking: "Can we add this?" "What if we tried that?"

The work stopped being "designers vs. doctors" and became a team solving
problems together.
```

---

## Implementation Structure

### For Both Case Studies:

**New Section Types to Add:**

1. **Landscape/Context Section** (Before Hero)
   - Sets industry context
   - Explains why this problem matters
   - Creates stakes before showing solution

2. **Partnership Origin Section** (After Hero, before deep dive)
   - How did this start?
   - What was the brief?
   - What were the initial challenges?

3. **"Before State" Narrative** (Before Problem/Solution sections)
   - Paint a vivid picture of what was broken
   - Day-in-the-life storytelling
   - Emotional + practical stakes

4. **Process Honesty** (In Process sections)
   - What didn't work initially?
   - What surprised us?
   - What was the breakthrough moment?

---

## Content Principles

### What Makes Case Studies Compelling:

1. **Start with WHY** - Why does this company/problem matter to the world?
2. **Show the MESS** - What was actually broken? Paint the picture.
3. **Explain the RELATIONSHIP** - How did we earn the right to solve this?
4. **Admit the STRUGGLE** - What didn't work? What changed our approach?
5. **Prove the IMPACT** - Results, quotes, what actually changed?

### Writing Voice:

- **Confident but honest** - "We didn't get it right the first time"
- **Specific over generic** - "12 active IVF cycles across 3 labs" not "complex workflows"
- **Stakes-driven** - Always answer "why does this matter?"
- **Human** - Write like you're explaining this to a friend over coffee

---

## Next Steps

1. Review proposed copy above
2. Decide which sections to add/rewrite
3. I'll implement the structural changes in the components
4. Add new content sections with proper GSAP animations
5. Ensure images support the new narrative flow

---

## Key Metrics for Success

**Before:** Case studies feel like feature lists
**After:** Case studies tell a compelling story of problem → struggle → breakthrough → impact

Reader should think: "This team doesn't just design pretty interfaces. They solve real problems for real people."
