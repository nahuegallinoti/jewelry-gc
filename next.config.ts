import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Ignorar errores solo cuando sea absolutamente necesario
  eslint: {
    // Se recomienda mantener esto en false para detectar errores importantes
    ignoreDuringBuilds: false,
  },

  typescript: {
    // Se recomienda mantener esto en false para evitar despliegues con errores de tipo
    ignoreBuildErrors: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Solo usa `unoptimized: true` si realmente no deseas procesamiento de imágenes
    unoptimized: false,
  },

  experimental: {
    // Estas opciones pueden variar, asegúrate de que estén soportadas en Next 15
    // `optimizeCss` fue renombrado o eliminado en versiones recientes
    // Quitar si causa advertencias
    // optimizeCss: true, 

    // `optimizePackageImports` aún es experimental y puede cambiar
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Activar logs útiles para debugging en desarrollo
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;