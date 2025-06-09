"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { sections } from "../data/sections"

interface AboutSectionProps {
  zoomLevel: number
}

export default function AboutSection({ zoomLevel }: AboutSectionProps) {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex items-center justify-center bg-gray-50 min-h-screen overflow-y-auto"
      style={{
        transform: `scale(${zoomLevel})`,
        transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-24 md:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative h-[60vh] overflow-hidden rounded-lg"
        >
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
            alt="Artisan crafting jewelry"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover scale-105 md:scale-100 transition-transform duration-1000 ease-in-out rounded-lg shadow-xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-xl"
        >
          <h2 className="text-3xl md:text-5xl font-light mb-8 tracking-wider">{sections[3].title}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Born from a passion for craftsmanship and design, each link we create is the result of years of
            experience, dedication, and a deep respect for traditional jewelry techniques.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Our workshop combines artisanal methods with cutting-edge technology to create unique pieces that
            stand the test of time, conveying elegance and exclusivity.
          </p>
          <p className="text-gray-700 mb-10 leading-relaxed">
            We work with the highest quality materials, carefully selected to ensure that each piece of jewelry
            is as exceptional as the person wearing it.
          </p>
          <button
            className="text-sm uppercase tracking-wider border-black hover:bg-black hover:text-white transition-colors"
          >
            Learn more about our story
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
} 