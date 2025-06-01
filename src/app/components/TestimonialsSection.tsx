"use client"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { sections } from "../data/sections"
import { testimonials } from "../data/testimonials"
import Footer from "./Footer"
import { RefObject } from "react"

interface TestimonialsSectionProps {
  currentTestimonialIndex: number
  setCurrentTestimonialIndex: (idx: number) => void
  nextTestimonial: () => void
  prevTestimonial: () => void
  testimonialCarouselRef: RefObject<HTMLDivElement>
  zoomLevel: number
}

export default function TestimonialsSection({
  currentTestimonialIndex,
  setCurrentTestimonialIndex,
  nextTestimonial,
  prevTestimonial,
  testimonialCarouselRef,
  zoomLevel,
}: TestimonialsSectionProps) {
  return (
    <motion.div
      key="testimonials"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 min-h-screen overflow-y-auto"
      style={{
        transform: `scale(${zoomLevel})`,
        transition: "transform 0.8s ease-out",
      }}
    >
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto mb-6 sm:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hidden md:block text-2xl sm:text-3xl md:text-5xl font-light tracking-wider mb-2 sm:mb-4"
        >
          {sections[4].title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden md:block text-base sm:text-lg font-light text-gray-600"
        >
          {sections[4].subtitle}
        </motion.p>
      </div>
      {/* Carrusel de testimonios SOLO en mobile */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center md:hidden">
        <div className="flex items-center justify-center w-full h-full">
          <button
            onClick={prevTestimonial}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors sm:left-6"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-5 w-5 text-black" />
          </button>
          <div
            ref={testimonialCarouselRef}
            className="w-full max-w-xs sm:max-w-md flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                {(() => {
                  const testimonial = testimonials[currentTestimonialIndex]
                  return (
                    <div className="bg-gray-50 p-6 sm:p-8 rounded-lg flex flex-col items-center min-h-[320px] max-h-[70vh] justify-center">
                      <div className="flex items-center mb-4">
                      <div className="rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>

                        <h3 className="font-medium text-base sm:text-lg">{testimonial.name}</h3>
                      </div>
                      <p className="text-gray-700 italic leading-relaxed text-sm sm:text-base text-center">{testimonial.quote}</p>
                    </div>
                  )
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors sm:right-6"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-5 w-5 text-black" />
          </button>
        </div>
        {/* Indicadores del carrusel */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTestimonialIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentTestimonialIndex === idx ? "bg-black w-4" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir al testimonio ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Grid de testimonios en md+ */}
      <div className="hidden md:grid w-full max-w-6xl px-6 grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
            className="bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center min-h-[320px]"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">{testimonial.name}</h3>
            </div>
            <p className="text-gray-700 italic leading-relaxed text-center">{testimonial.quote}</p>
          </motion.div>
        ))}
      </div>
      <div className="w-full absolute left-0 bottom-0"><Footer /></div>
    </motion.div>
  )
}