"use client"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { sections } from "../data/sections"
import { featuredProducts } from "../data/featuredProducts"

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
                {featuredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="w-full flex justify-center px-1 sm:px-4 my-8"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="group relative cursor-pointer w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] transition-all duration-300 hover:scale-105"
                      onClick={() => viewProductDetail(product.id)}
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg shadow-lg">
                        <div className="relative w-full h-full">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="mt-4 text-center space-y-2">
                        <h3 className="text-white text-lg sm:text-xl font-light tracking-wide">{product.name}</h3>
                        <p className="text-[#D4AF37] font-medium text-base sm:text-lg">{product.price}</p>
                        <p className="text-gray-400 text-sm sm:text-base line-clamp-2">{product.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
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