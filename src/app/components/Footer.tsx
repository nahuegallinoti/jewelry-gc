import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <div className="w-full bg-white border-t border-gray-100 py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} GABICA. All rights reserved.
        </div>
        <div className="flex space-x-4 sm:space-x-6">
          <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </div>
  )
} 