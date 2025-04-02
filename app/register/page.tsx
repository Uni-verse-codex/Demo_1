"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import Image from 'next/image'

// Form validation schema
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  terms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions")
})

// Generate a CSRF token
const generateCsrfToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export default function RegisterPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [csrfToken, setCsrfToken] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  })
  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    terms?: string;
  }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    checks: {
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false
    }
  })

  useEffect(() => {
    // Generate CSRF token on component mount
    setCsrfToken(generateCsrfToken())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value
    
    setFormData({
      ...formData,
      [name]: newValue,
    })
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      })
    }

    // Check password strength as user types
    if (name === 'password') {
      const checks = {
        minLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecialChar: /[^A-Za-z0-9]/.test(value)
      }
      
      // Calculate score (1 point for each check passed)
      const score = Object.values(checks).filter(Boolean).length
      
      setPasswordStrength({ score, checks })
    }
  }

  const validateForm = () => {
    try {
      registerSchema.parse(formData)
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
      // Verify CSRF token here (would typically be done server-side)
      // For client-side SPA, we're doing a simple check
      if (!csrfToken) {
        throw new Error("Invalid form submission")
      }
      
      const { success, error } = await signUp(formData.email, formData.password)
      
      if (success) {
        // Could also send firstName and lastName to a user profile API here
        
        toast({
          title: "Account created successfully",
          description: "Please check your email to confirm your account.",
        })
        
        // Generate a new CSRF token after successful form submission
        setCsrfToken(generateCsrfToken())
        
        router.push("/login")
      } else {
        console.error("Registration error:", error)
        setError(error.message || "Failed to create account. Please try again.")
      }
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>

      <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-black">
            <Image 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop" 
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
                &ldquo;Joining Chatter was the best decision for our startup. The collaboration tools have helped us scale our remote teams efficiently.&rdquo;
              </p>
              <footer className="text-sm">Sarah Williams, Marketing Director</footer>
            </blockquote>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          <Link
            href="/"
            className="absolute top-8 left-8 flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="mx-auto relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">C</div>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Create your account
              </h2>
              <p className="mt-2 text-white/70">Start your 14-day free trial. No credit card required.</p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Hidden CSRF token */}
                  <input type="hidden" name="csrfToken" value={csrfToken} />
                  
                  {error && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-white/80">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`block w-full rounded-md border ${
                            formErrors.firstName ? 'border-red-500' : 'border-white/20'
                          } bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          placeholder="First name"
                          aria-invalid={!!formErrors.firstName}
                          aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                        />
                        {formErrors.firstName && (
                          <p className="mt-1 text-sm text-red-400" id="firstName-error">
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-white/80">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`block w-full rounded-md border ${
                            formErrors.lastName ? 'border-red-500' : 'border-white/20'
                          } bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                          placeholder="Last name"
                          aria-invalid={!!formErrors.lastName}
                          aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
                        />
                        {formErrors.lastName && (
                          <p className="mt-1 text-sm text-red-400" id="lastName-error">
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          formErrors.password ? 'border-red-500' : 'border-white/20'
                        } bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Create a password"
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

                    {/* Password strength indicator */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/60">Password strength</span>
                        <span className="text-xs text-white/60">
                          {passwordStrength.score === 0 && "Very weak"}
                          {passwordStrength.score === 1 && "Weak"}
                          {passwordStrength.score === 2 && "Fair"}
                          {passwordStrength.score === 3 && "Good"}
                          {passwordStrength.score === 4 && "Strong"}
                          {passwordStrength.score === 5 && "Very strong"}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            passwordStrength.score === 0 ? 'w-0 bg-red-500' :
                            passwordStrength.score === 1 ? 'w-1/5 bg-red-500' :
                            passwordStrength.score === 2 ? 'w-2/5 bg-yellow-500' :
                            passwordStrength.score === 3 ? 'w-3/5 bg-yellow-500' :
                            passwordStrength.score === 4 ? 'w-4/5 bg-green-500' :
                            'w-full bg-green-500'
                          }`}
                        ></div>
                      </div>
                      <ul className="mt-2 space-y-1 text-xs text-white/60">
                        <li className={`flex items-center ${passwordStrength.checks.minLength ? 'text-green-400' : ''}`}>
                          <Check className={`h-3 w-3 mr-1 ${passwordStrength.checks.minLength ? 'opacity-100' : 'opacity-40'}`} />
                          At least 8 characters
                        </li>
                        <li className={`flex items-center ${passwordStrength.checks.hasUppercase ? 'text-green-400' : ''}`}>
                          <Check className={`h-3 w-3 mr-1 ${passwordStrength.checks.hasUppercase ? 'opacity-100' : 'opacity-40'}`} />
                          At least one uppercase letter
                        </li>
                        <li className={`flex items-center ${passwordStrength.checks.hasLowercase ? 'text-green-400' : ''}`}>
                          <Check className={`h-3 w-3 mr-1 ${passwordStrength.checks.hasLowercase ? 'opacity-100' : 'opacity-40'}`} />
                          At least one lowercase letter
                        </li>
                        <li className={`flex items-center ${passwordStrength.checks.hasNumber ? 'text-green-400' : ''}`}>
                          <Check className={`h-3 w-3 mr-1 ${passwordStrength.checks.hasNumber ? 'opacity-100' : 'opacity-40'}`} />
                          At least one number
                        </li>
                        <li className={`flex items-center ${passwordStrength.checks.hasSpecialChar ? 'text-green-400' : ''}`}>
                          <Check className={`h-3 w-3 mr-1 ${passwordStrength.checks.hasSpecialChar ? 'opacity-100' : 'opacity-40'}`} />
                          At least one special character
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      checked={formData.terms}
                      onChange={handleChange}
                      className={`h-4 w-4 rounded border ${
                        formErrors.terms ? 'border-red-500' : 'border-white/20'
                      } bg-white/5 text-purple-500 focus:ring-purple-500`}
                      aria-invalid={!!formErrors.terms}
                      aria-describedby={formErrors.terms ? "terms-error" : undefined}
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-white/70">
                      I agree to the{" "}
                      <Link href="#" className="text-purple-400 hover:text-purple-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-purple-400 hover:text-purple-300">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {formErrors.terms && (
                    <p className="text-sm text-red-400" id="terms-error">
                      {formErrors.terms}
                    </p>
                  )}

                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-sm text-white/70">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300">
                    Sign in
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
