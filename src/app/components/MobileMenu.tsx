"use client"
import Image from "next/image"
import { X } from "lucide-react"
import { sections } from "../data/sections"

interface MobileMenuProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  currentSection: number
  navigateTo: (index: number) => void
}

export default function MobileMenu({ isMenuOpen, setIsMenuOpen, currentSection, navigateTo }: MobileMenuProps) {
  if (!isMenuOpen) return null
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="w-full px-4 sm:px-6 py-2 sm:py-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 group">
          <Image
            src="/logo.jpeg"
            alt="Logo GABICA"
            width={32}
            height={32}
            className="rounded-full shadow-lg border border-[#D4AF37] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 bg-white logo-glow"
            priority
          />
        </a>
        <button className="p-2" onClick={() => setIsMenuOpen(false)}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 space-y-6">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => {
              navigateTo(index)
              setIsMenuOpen(false)
            }}
            className={`text-base sm:text-lg uppercase tracking-wider transition-colors ${
              currentSection === index ? "text-[#D4AF37]" : ""
            }`}
          >
            {section.id}
          </button>
        ))}
      </div>
    </div>
  )
} 