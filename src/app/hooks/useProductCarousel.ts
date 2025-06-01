import { useState } from "react"

export function useProductCarousel(productsLength: number, imagesPerProduct: number) {
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [currentProductImageIndex, setCurrentProductImageIndex] = useState(0)

  const nextProduct = () => setCurrentProductIndex(i => i < productsLength - 1 ? i + 1 : 0)
  const prevProduct = () => setCurrentProductIndex(i => i > 0 ? i - 1 : productsLength - 1)
  const viewProductDetail = (id: number) => { setSelectedProduct(id); setCurrentProductImageIndex(0) }
  const backToCollection = () => setSelectedProduct(null)
  const nextProductImage = () => setCurrentProductImageIndex(i => selectedProduct == null ? 0 : (i < imagesPerProduct - 1 ? i + 1 : 0))
  const prevProductImage = () => setCurrentProductImageIndex(i => selectedProduct == null ? 0 : (i > 0 ? i - 1 : imagesPerProduct - 1))

  return {
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
  }
} 