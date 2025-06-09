"use client"
import { motion } from "framer-motion"
import { sections } from "../data/sections"

interface NavbarProps {
  currentSection: number
  setCurrentSection: (index: number) => void
}

export default function Navbar({ currentSection, setCurrentSection }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-16">
          <div className="flex-shrink-0">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white text-lg md:text-2xl font-light tracking-wider"
            >
              JEWELRY GC
            </motion.h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {sections.map((section, index) => (
                <motion.button
                  key={section.title}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setCurrentSection(index)}
                  className={`text-sm md:text-base font-light tracking-wider transition-colors duration-300 ${
                    currentSection === index
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {section.title}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setCurrentSection((currentSection + 1) % sections.length)}
              className="text-white/50 hover:text-white text-sm font-light tracking-wider"
            >
              {sections[(currentSection + 1) % sections.length].title}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 