"use client"

import { Download } from "lucide-react"

export function SavePDFButton() {
  const handleSavePDF = () => {
    window.print()
  }

  return (
    <button
      onClick={handleSavePDF}
      data-print-hidden="true"
      className="fixed bottom-8 left-8 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/40 bg-background/60 backdrop-blur-md hover:bg-foreground hover:text-background transition-all duration-200"
      aria-label="Save as PDF"
    >
      <Download className="w-4 h-4" />
      <span className="text-sm">Save PDF</span>
    </button>
  )
}
