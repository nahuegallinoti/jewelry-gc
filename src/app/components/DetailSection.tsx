"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { sections } from "../data/sections"

interface DetailSectionProps {
  zoomLevel: number
  zoomPoint: { x: number; y: number }
  handleMouseMove: (e: React.MouseEvent) => void
}

export default function DetailSection({
  zoomLevel,
  zoomPoint,
  handleMouseMove,
}: DetailSectionProps) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-black min-h-screen overflow-y-auto"
      onMouseMove={handleMouseMove}
    >
      <div className="h-[60vh]"> </div>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: `${zoomPoint.x}% ${zoomPoint.y}%`,
            transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1920&auto=format&fit=crop"
            alt="Jewelry detail"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover scale-110 md:scale-100 transition-transform duration-1000 ease-in-out"
            priority
          />
      </div>
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mb-16 mt-32 md:mt-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wider mb-4"
        >
          {sections[2].title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-lg font-light"
        >
          {sections[2].subtitle}
        </motion.p>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-8 text-white/70 text-sm font-light"
      >
        Mueve el cursor para explorar detalles
      </motion.p>
    </motion.div>
  )
} 