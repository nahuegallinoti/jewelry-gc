"use client"
import { useRef, useEffect, RefObject } from "react"
import HomeSection from "./HomeSection"
import DetailSection from "./DetailSection"
import CollectionSection from "./CollectionSection"
import AboutSection from "./AboutSection"
import TestimonialsSection from "./TestimonialsSection"
import { sections } from "../data/sections"
import { featuredProducts } from "../data/featuredProducts"
import { testimonials } from "../data/testimonials"
import { useProductCarousel } from "../hooks/useProductCarousel"
import { useTestimonialCarousel } from "../hooks/useTestimonialCarousel"
import { useDetailZoom } from "../hooks/useDetailZoom"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MainSectionsProps {
  currentSection: number
  navigateTo: (index: number) => void
  nextSection: () => void
  prevSection: () => void
  zoomLevel: number
  isTransitioning: boolean
}

export default function MainSections({
  currentSection,
  navigateTo,
  nextSection,
  prevSection,
  zoomLevel,
  isTransitioning,
}: MainSectionsProps) {
  // Productos
  const {
    currentProductIndex,
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
      if (currentSection === 1 && selectedProduct !== null && e.key === "Escape") {
        setSelectedProduct(null)
        return
      }
      if (currentSection === 1 && selectedProduct === null) {
        if (e.key === "ArrowRight") {
          nextProduct()
          return
        }
        else if (e.key === "ArrowLeft") {
          prevProduct()
          return
        }
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextSection()
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevSection()
    }

    const handleWheel = (e: WheelEvent) => {
      if (currentSection === 1 && selectedProduct !== null) return
      if (currentSection === 1 && selectedProduct === null) {
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
    <div className="relative w-full h-full">
      {currentSection === 0 && (
        <HomeSection zoomLevel={zoomLevel} navigateTo={navigateTo} />
      )}
      {currentSection === 1 && (
        <CollectionSection
          zoomLevel={zoomLevel}
          currentProductIndex={currentProductIndex}
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
      {currentSection === 2 && (
        <DetailSection
          zoomLevel={zoomLevel}
          zoomPoint={zoomPoint}
          handleMouseMove={handleMouseMove}
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

      {/* Indicadores de navegación móvil */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center md:hidden">
        <div className="flex space-x-2 mb-2">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSection === index ? "bg-[#D4AF37] w-4" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Ir a sección ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={prevSection}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Sección anterior"
          >
            <ChevronLeft className="h-5 w-5 text-black" />
          </button>
          <button
            onClick={nextSection}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label="Siguiente sección"
          >
            <ChevronRight className="h-5 w-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  )
} 