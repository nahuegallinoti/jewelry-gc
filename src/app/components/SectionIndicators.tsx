"use client"
import { sections } from "../data/sections"

interface SectionIndicatorsProps {
  currentSection: number
  navigateTo: (index: number) => void
}

export default function SectionIndicators({ currentSection, navigateTo }: SectionIndicatorsProps) {
  return (
    <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2 sm:space-x-3">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => navigateTo(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            currentSection === index ? "bg-white w-4 sm:w-6" : "bg-white/50 hover:bg-white/70"
          }`}
          aria-label={`Navegar a la sección ${section.id}`}
        />
      ))}
    </div>
  )
} 