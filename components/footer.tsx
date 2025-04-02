import Link from "next/link"
import { Twitter, Github, Linkedin, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">C</div>
          </div>
          <p className="text-sm text-white/60">© {new Date().getFullYear()} Chatter. All rights reserved.</p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Cookies
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-white/60 hover:text-white transition-colors">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

