/**
 * Case Study Component Registry
 *
 * This file exports all custom case study components.
 * When adding a new case study:
 * 1. Create a new component file in this directory
 * 2. Import and export it here
 * 3. Add it to the caseStudyComponents map with its slug as the key
 * 4. Set the caseStudySlug in the admin panel to match the slug
 */

import { ExampleCaseStudy } from "./ExampleCaseStudy"
import { CaseStudySematext } from "./CaseStudySematext"
import { CaseStudyKindbody } from "./CaseStudyKindbody"


// Map of slug -> component
export const caseStudyComponents: Record<string, React.ComponentType<any>> = {
  "example": ExampleCaseStudy,
  "sematext": CaseStudySematext,
  "kindbody": CaseStudyKindbody,
  // Add your custom case studies here:
  // "acme-corp": AcmeCorpCaseStudy,
  // "tech-startup": TechStartupCaseStudy,
}
