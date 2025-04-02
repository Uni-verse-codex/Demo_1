"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function PasswordResetPage() {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { success, error } = await resetPassword(email)
      
      if (success) {
        setSubmitted(true)
        toast({
          title: "Reset link sent",
          description: "Please check your email for a link to reset your password.",
        })
      } else {
        console.error("Password reset error:", error)
        setError("Failed to send reset link. Please check your email and try again.")
      }
    } catch (err) {
      console.error("Password reset error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <Link
          href="/login"
          className="absolute top-8 left-8 flex items-center text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Link>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">C</div>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Reset your password
            </h2>
            <p className="mt-2 text-white/70">
              {submitted
                ? "Check your email for a reset link"
                : "Enter your email and we'll send you a link to reset your password"}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {!submitted ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                      {error}
                    </div>
                  )}

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending link..." : "Send reset link"}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
                <div className="p-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <svg
                      className="h-6 w-6 text-purple-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Check your inbox</h3>
                  <p className="mt-2 text-white/70">
                    We've sent a password reset link to {email}. Please check your email and follow
                    the instructions to reset your password.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => router.push("/login")}
                      className="bg-white/10 hover:bg-white/20 text-white"
                    >
                      Return to login
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center">
              <div className="text-sm text-white/70">
                Remember your password?{" "}
                <Link href="/login" className="text-purple-400 hover:text-purple-300">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 