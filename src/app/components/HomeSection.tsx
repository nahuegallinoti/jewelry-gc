"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { sections } from "../data/sections"

interface HomeSectionProps {
  zoomLevel: number
  navigateTo: (index: number) => void
}

export default function HomeSection({ zoomLevel, navigateTo }: HomeSectionProps) {
  return (
    <>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 flex items-center justify-center min-h-screen overflow-y-auto"
        style={{
          transform: `scale(${zoomLevel})`,
          transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="absolute inset-0">
          <Image
            src="/ring2.jpg"
            alt="Luxury jewelry"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover scale-105 md:scale-100 transition-transform duration-1000 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6"
          >
            {sections[0].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl mb-10 font-light"
          >
            {sections[0].subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button
              onClick={() => navigateTo(1)}
              className="bg-transparent border border-white hover:bg-white hover:text-black transition-colors duration-300 text-sm uppercase tracking-wider px-8 py-6 shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              {sections[0].cta}
            </button>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center"
      >
        <p className="text-white text-sm mb-2">Scroll or arrow keys to explore</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce"
        >
          <path
            d="M12 5L12 19M12 19L19 12M12 19L5 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </>
  )
} 