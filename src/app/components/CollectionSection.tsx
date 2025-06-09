"use client"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { sections } from "../data/sections"
import { featuredProducts } from "../data/featuredProducts"
import { useState, useRef, useEffect } from "react"

interface CollectionSectionProps {
  zoomLevel: number
  currentProductIndex: number
  selectedProduct: number | null
  currentProductImageIndex: number
  setCurrentProductImageIndex: (idx: number) => void
  nextProduct: () => void
  prevProduct: () => void
  viewProductDetail: (id: number) => void
  backToCollection: () => void
  nextProductImage: () => void
  prevProductImage: () => void
}

export default function CollectionSection({
  zoomLevel,
  currentProductIndex,
  selectedProduct,
  currentProductImageIndex,
  setCurrentProductImageIndex,
  nextProduct,
  prevProduct,
  viewProductDetail,
  backToCollection,
  nextProductImage,
  prevProductImage,
}: CollectionSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1000&auto=format&fit=crop",
      title: "Anillo de Diamantes",
      price: "$1,200",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      title: "Collar de Perlas",
      price: "$800",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop",
      title: "Pendientes de Oro",
      price: "$600",
    },
  ]

  // Duplicar los productos para el carrusel infinito
  const duplicatedProducts = [...products, ...products, ...products]

  const totalPages = Math.ceil(duplicatedProducts.length / 3)

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = currentPage * (carouselRef.current.offsetWidth / 3)
    }
  }, [currentPage])

  return (
    <motion.div
      key="collection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/90 min-h-screen overflow-y-auto"
      style={{
        transform: `scale(${zoomLevel})`,
        transition: "transform 0.8s ease-out",
      }}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">
        {/* Vista Carrusel */}
        {selectedProduct === null && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto mb-4 sm:mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wider mb-2 sm:mb-4 text-white"
              >
                {sections[1].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base sm:text-lg font-light text-white"
              >
                {sections[1].subtitle}
              </motion.p>
            </div>

            {/* Navegación carrusel */}
            <div className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 z-40">
              <button
                onClick={prevProduct}
                className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Producto anterior"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white sm:text-black" />
              </button>
            </div>
            <div className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-40">
              <button
                onClick={nextProduct}
                className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Siguiente producto"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white sm:text-black" />
              </button>
            </div>

            {/* Contenedor carrusel */}
            <div className="w-full max-w-xs sm:max-w-2xl md:max-w-6xl px-2 sm:px-6 flex items-center justify-center overflow-hidden">
              <motion.div
                className="flex items-center"
                initial={false}
                animate={{ x: `calc(-${currentProductIndex * 100}%)` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: `${featuredProducts.length * 100}%` }}
              >
                <div
                  ref={carouselRef}
                  className="flex overflow-x-hidden scroll-smooth"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {duplicatedProducts.map((product, index) => (
                    <motion.div
                      key={`${product.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                      className="flex-none w-1/3 px-2"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="text-lg font-light">{product.title}</h3>
                            <p className="text-sm text-white/80">{product.price}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentPage === index ? "bg-white" : "bg-white/30"
                  }`}
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Vista Detalle de Producto */}
        {selectedProduct !== null && (() => {
          const product = featuredProducts.find((p) => p.id === selectedProduct)
          if (!product) return null
          return (
            <motion.div
              key="product-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              {/* Botón volver */}
              <button
                onClick={backToCollection}
                className="absolute top-24 pt-5 pr-5 font-bold left-6 z-40 flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-md uppercase tracking-wider">Volver a la colección</span>
              </button>

              <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Imágenes del producto */}
                <div className="relative">
                  <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg shadow-lg">
                    <div className="relative w-full h-full">
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={currentProductImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={product.images[currentProductImageIndex] || "/placeholder.svg"}
                            alt={`${product.name} - Imagen ${currentProductImageIndex + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Navegación de imágenes */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProductImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentProductImageIndex === index ? "bg-[#D4AF37] w-4" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Ver imagen ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Flechas de imagen */}
                  <button
                    onClick={prevProductImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-5 w-5 text-black" />
                  </button>
                  <button
                    onClick={nextProductImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="h-5 w-5 text-black" />
                  </button>
                </div>

                {/* Detalles del producto */}
                <div className="flex flex-col">
                  <h2 className="text-3xl text-white font-light mb-2">{product.name}</h2>
                  <p className="text-2xl text-[#D4AF37] font-medium mb-6">{product.price}</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">{product.longDescription}</p>
                  <div className="mb-8">
                    <h3 className="text-lg text-white font-medium mb-3">Detalles</h3>
                    <ul className="space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#D4AF37] mr-2">•</span>
                          <span className="text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto flex space-x-4">
                    <button className="flex-1 bg-black hover:bg-gray-800 text-white text-sm uppercase tracking-wider py-6">
                      Añadir al carrito
                    </button>
                    <button className="flex-1 border-black hover:bg-black text-white text-sm uppercase tracking-wider py-6">
                      Personalizar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </motion.div>
  )
} 