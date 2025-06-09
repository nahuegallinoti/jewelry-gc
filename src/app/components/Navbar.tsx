"use client"
import Image from "next/image"
import { Menu } from "lucide-react"
import { sections } from "../data/sections"

interface NavbarProps {
  currentSection: number
  navigateTo: (index: number) => void
  setIsMenuOpen: (open: boolean) => void
}

export default function Navbar({ currentSection, navigateTo, setIsMenuOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-sm shadow-lg border-b border-gray-200 pr-2">
      <div className="max-w-full w-full px-4 sm:px-6 py-2 sm:py-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 sm:space-x-3 group" onClick={(e) => { e.preventDefault(); navigateTo(0); }}>
          <Image
            src="/logo.jpeg"
            alt="Logo GABICA"
            width={50}
            height={50}
            className="rounded-xl shadow-lg border border-gray-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 bg-white"
            priority
          />
        </a>
        {/* Navegación de escritorio */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <div className="flex space-x-4 lg:space-x-8">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => navigateTo(index)}
                className={`text-xs lg:text-sm uppercase tracking-wider transition-colors ${
                  currentSection === index ? "text-[#fdcc73]" : "hover:text-[#fdcc73]"
                }`}
              >
                {section.id}
              </button>
            ))}
          </div>
        </div>
        {/* Botón menú móvil */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  )
} 