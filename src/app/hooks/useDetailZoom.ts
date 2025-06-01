import { useState } from "react"

export function useDetailZoom() {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [zoomPoint, setZoomPoint] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget as HTMLDivElement
    const rect = container.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPoint({ x, y })
  }
  const handleDetailZoomIn = () => setZoomLevel(z => Math.min(z + 0.5, 2.5))
  const handleDetailZoomOut = () => setZoomLevel(z => Math.max(z - 0.5, 1))

  return {
    zoomLevel,
    setZoomLevel,
    zoomPoint,
    setZoomPoint,
    handleMouseMove,
    handleDetailZoomIn,
    handleDetailZoomOut,
  }
} 