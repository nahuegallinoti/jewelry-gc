import { useState } from "react"

export function useSectionNavigation(sectionsLength: number) {
  const [currentSection, setCurrentSection] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = (index: number) => {
    if (index === currentSection || isTransitioning) return
    setIsTransitioning(true)
    setZoomLevel(index > currentSection ? 1.8 : 0.6)
    setTimeout(() => {
      setCurrentSection(index)
      setZoomLevel(1)
      setTimeout(() => setIsTransitioning(false), 800)
    }, 600)
  }
  const nextSection = () => currentSection < sectionsLength - 1 && navigateTo(currentSection + 1)
  const prevSection = () => currentSection > 0 && navigateTo(currentSection - 1)

  return {
    currentSection,
    setCurrentSection,
    zoomLevel,
    setZoomLevel,
    isTransitioning,
    setIsTransitioning,
    navigateTo,
    nextSection,
    prevSection,
  }
} 