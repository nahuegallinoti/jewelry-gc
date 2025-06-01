"use client"

import Navbar from "./components/Navbar"
import MobileMenu from "./components/MobileMenu"
import MainSections from "./components/MainSections"
import { useState } from "react"
import { useSectionNavigation } from "./hooks/useSectionNavigation"
import { sections } from "./data/sections"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {
    currentSection,
    navigateTo,
    nextSection,
    prevSection,
    zoomLevel,
    isTransitioning
  } = useSectionNavigation(sections.length)
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-black relative flex flex-col">
      <Navbar currentSection={currentSection} navigateTo={navigateTo} setIsMenuOpen={setIsMenuOpen} />
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currentSection={currentSection} navigateTo={navigateTo} />
      <MainSections
        currentSection={currentSection}
        navigateTo={navigateTo}
        nextSection={nextSection}
        prevSection={prevSection}
        zoomLevel={zoomLevel}
        isTransitioning={isTransitioning}
      />
    </div>
  )
}