"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import Image from 'next/image'

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      })
    }
  }

  const validateForm = () => {
    try {
      loginSchema.parse(formData)
      setFormErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        setFormErrors(errors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setError("")

    try {
      const { success, error } = await signIn(formData.email, formData.password)
      
      if (success) {
        // Store the auth state in localStorage if "Remember me" is checked
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        } else {
          localStorage.removeItem('rememberMe')
        }
        
        toast({
          title: "Logged in successfully",
          description: "Welcome back to Chatter!",
        })
        router.push("/dashboard")
      } else {
        console.error("Login error:", error)
        setError("Invalid credentials. Please try again.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>

      <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-black">
            <Image 
              src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1470&auto=format&fit=crop" 
              alt="Authentication background" 
              fill 
              className="h-full w-full object-cover opacity-60"
              priority
              quality={85}
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium gap-2">
            <div className="h-6 w-6 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <Image 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=64&auto=format&fit=crop"
                alt="Chatter Logo"
                width={24}
                height={24}
                className="object-cover"
                priority
              />
            </div>
            <span>Chatter</span>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Chatter has transformed how our team collaborates across our global offices. It's intuitive, secure, and packed with features.&rdquo;
              </p>
              <footer className="text-sm">Alex Johnson, CTO at TechFlow</footer>
            </blockquote>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center p-10 lg:p-16 xl:p-24">
          <Link
            href="/"
            className="absolute top-8 left-8 flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Sign in to your account
              </h2>
              <p className="mt-2 text-white/70">Welcome back! Please enter your details.</p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          formErrors.email ? 'border-red-500' : 'border-white/20'
                        } bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Enter your email"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-400" id="email-error">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white/80">
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          formErrors.password ? 'border-red-500' : 'border-white/20'
                        } bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Enter your password"
                        aria-invalid={!!formErrors.password}
                        aria-describedby={formErrors.password ? "password-error" : undefined}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      {formErrors.password && (
                        <p className="mt-1 text-sm text-red-400" id="password-error">
                          {formErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link href="/password-reset" className="text-purple-400 hover:text-purple-300">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-sm text-white/70">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-purple-400 hover:text-purple-300">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
