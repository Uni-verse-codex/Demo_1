"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">C</div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Chatter
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/testimonials" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Testimonials
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10 bg-transparent" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-md">
          <div className="container py-4 px-4 md:px-6 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/features"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/testimonials"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </nav>
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-center text-white hover:text-white/80 hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button
                className="w-full justify-center bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                asChild
              >
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

