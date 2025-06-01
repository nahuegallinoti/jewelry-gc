import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GABICA | Custom Jewelry",
  description:
    "Exquisite custom link jewelry crafted with precision and artistry. Discover our collection of handmade pieces.",
  metadataBase: new URL("https://gabica-jewelry.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabica-jewelry.com",
    title: "GABICA | Custom Jewelry",
    description: "Exquisite custom link jewelry crafted with precision and artistry.",
    siteName: "CHAINGABICALINK Jewelry",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GABICA Jewelry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GABICA | Custom Jewelry",
    description: "Exquisite custom link jewelry crafted with precision and artistry.",
    images: ["/og-image.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body suppressHydrationWarning className={inter.className}>
          {children}
      </body>
    </html>
  )
}
