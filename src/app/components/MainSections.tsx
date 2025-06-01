"use client"
import { useRef, useEffect, RefObject } from "react"
import HomeSection from "./HomeSection"
import DetailSection from "./DetailSection"
import CollectionSection from "./CollectionSection"
import AboutSection from "./AboutSection"
import TestimonialsSection from "./TestimonialsSection"
import SectionIndicators from "./SectionIndicators"
import { sections } from "../data/sections"
import { featuredProducts } from "../data/featuredProducts"
import { testimonials } from "../data/testimonials"
import { useProductCarousel } from "../hooks/useProductCarousel"
import { useTestimonialCarousel } from "../hooks/useTestimonialCarousel"
import { useDetailZoom } from "../hooks/useDetailZoom"

interface MainSectionsProps {
  currentSection: number
  navigateTo: (index: number) => void
  nextSection: () => void
  prevSection: () => void
  zoomLevel: number
  isTransitioning: boolean
}

export default function MainSections({ currentSection, navigateTo, nextSection, prevSection, zoomLevel, isTransitioning }: MainSectionsProps) {
  // Productos
  const {
    currentProductIndex,
    setCurrentProductIndex,
    selectedProduct,
    setSelectedProduct,
    currentProductImageIndex,
    setCurrentProductImageIndex,
    nextProduct,
    prevProduct,
    viewProductDetail,
    backToCollection,
    nextProductImage,
    prevProductImage,
  } = useProductCarousel(featuredProducts.length, featuredProducts[0].images.length)

  // Testimonios
  const {
    currentTestimonialIndex,
    setCurrentTestimonialIndex,
    nextTestimonial,
    prevTestimonial,
  } = useTestimonialCarousel(testimonials.length)

  // Zoom detalle
  const {
    zoomPoint,
    handleMouseMove
  } = useDetailZoom()

  // Ref para swipe testimonios
  const testimonialCarouselRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  useEffect(() => {
    const ref = testimonialCarouselRef.current
    if (!ref) return
    let startX = 0
    let endX = 0
    const handleTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX
      if (endX - startX > 40) prevTestimonial()
      else if (startX - endX > 40) nextTestimonial()
    }
    ref.addEventListener('touchstart', handleTouchStart)
    ref.addEventListener('touchend', handleTouchEnd)
    return () => {
      ref.removeEventListener('touchstart', handleTouchStart)
      ref.removeEventListener('touchend', handleTouchEnd)
    }
  }, [nextTestimonial, prevTestimonial])

  // Navegación teclado y scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentSection ==1 && selectedProduct !== null && e.key === "Escape") { setSelectedProduct(null); return }
      if (currentSection ==1 && selectedProduct === null) {
        if (e.key === "ArrowRight") { nextProduct(); return }
        else if (e.key === "ArrowLeft") { prevProduct(); return }
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextSection()
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevSection()
    }
    const handleWheel = (e: WheelEvent) => {
      if (currentSection ==1 && selectedProduct !== null) return
      if (currentSection ==1 && selectedProduct === null) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault()
          if (e.deltaX > 0) nextProduct()
          else if (e.deltaX < 0) prevProduct()
          return
        }
      }
      e.preventDefault()
      if (isTransitioning) return
      if (e.deltaY > 0) nextSection()
      else if (e.deltaY < 0) prevSection()
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [currentSection, isTransitioning, selectedProduct, currentProductIndex, nextProduct, prevProduct, nextSection, prevSection, setSelectedProduct])

  return (
    <div className="flex-1 w-full relative overflow-hidden pt-16 sm:pt-20">
      {/* Flechas e indicadores */}
      {currentSection !=1 && (
        <>
          <button
            onClick={prevSection}
            className={`hidden sm:flex absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 z-40 transition-opacity ${currentSection === 0 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100"}`}
            disabled={currentSection === 0}
          >
            <span className="sr-only">Anterior</span>
            <svg className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            onClick={nextSection}
            className={`hidden sm:flex absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-40 transition-opacity ${currentSection === sections.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100"}`}
            disabled={currentSection === sections.length - 1}
          >
            <span className="sr-only">Siguiente</span>
            <svg className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </>
      )}
      {currentSection !=1 && (
        <SectionIndicators currentSection={currentSection} navigateTo={navigateTo} />
      )}
      {/* Secciones */}
      {currentSection === 0 && (
        <HomeSection zoomLevel={zoomLevel} navigateTo={navigateTo} />
      )}
      {currentSection == 2 && (
        <DetailSection
          zoomLevel={zoomLevel}
          zoomPoint={zoomPoint}
          handleMouseMove={handleMouseMove}
        />
      )}
      {currentSection ==1 && (
        <CollectionSection
          zoomLevel={zoomLevel}
          currentProductIndex={currentProductIndex}
          setCurrentProductIndex={setCurrentProductIndex}
          selectedProduct={selectedProduct}
          currentProductImageIndex={currentProductImageIndex}
          setCurrentProductImageIndex={setCurrentProductImageIndex}
          nextProduct={nextProduct}
          prevProduct={prevProduct}
          viewProductDetail={viewProductDetail}
          backToCollection={backToCollection}
          nextProductImage={nextProductImage}
          prevProductImage={prevProductImage}
        />
      )}
      {currentSection === 3 && (
        <AboutSection zoomLevel={zoomLevel} />
      )}
      {currentSection === 4 && (
        <TestimonialsSection
          currentTestimonialIndex={currentTestimonialIndex}
          setCurrentTestimonialIndex={setCurrentTestimonialIndex}
          nextTestimonial={nextTestimonial}
          prevTestimonial={prevTestimonial}
          testimonialCarouselRef={testimonialCarouselRef}
          zoomLevel={zoomLevel}
        />
      )}
    </div>
  )
} 