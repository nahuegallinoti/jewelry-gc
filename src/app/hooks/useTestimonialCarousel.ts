import { useState } from "react"

export function useTestimonialCarousel(testimonialsLength: number) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const nextTestimonial = () => setCurrentTestimonialIndex(i => i < testimonialsLength - 1 ? i + 1 : 0)
  const prevTestimonial = () => setCurrentTestimonialIndex(i => i > 0 ? i - 1 : testimonialsLength - 1)
  return {
    currentTestimonialIndex,
    setCurrentTestimonialIndex,
    nextTestimonial,
    prevTestimonial,
  }
} 