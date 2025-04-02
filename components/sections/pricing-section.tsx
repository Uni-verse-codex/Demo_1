import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[900px]">
            <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Simple, transparent pricing
            </h2>
            <p className="text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the perfect plan for your team's communication needs
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl border backdrop-blur-sm ${
                plan.featured
                  ? "border-purple-500 bg-gradient-to-b from-purple-500/20 to-blue-500/20"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.featured && (
                <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-purple-500 to-blue-500 px-12 py-1 text-xs font-medium text-white">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-white/60">/month</span>
                </div>
                <p className="mb-6 text-sm text-white/70">{plan.description}</p>
                <Button
                  className={`w-full ${
                    plan.featured
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                  asChild
                >
                  <Link href="/register">{plan.buttonText}</Link>
                </Button>
              </div>
              <div className="border-t border-white/10 p-6">
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-400" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {plan.name === "Free" && (
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <Image 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=300&auto=format&fit=crop"
                    width={120}
                    height={120}
                    alt="Free plan background"
                    className="rounded-bl-xl"
                  />
                </div>
              )}
              {plan.name === "Pro" && (
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <Image 
                    src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=300&auto=format&fit=crop"
                    width={120}
                    height={120}
                    alt="Pro plan background"
                    className="rounded-bl-xl"
                  />
                </div>
              )}
              {plan.name === "Business" && (
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <Image 
                    src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=300&auto=format&fit=crop"
                    width={120}
                    height={120}
                    alt="Business plan background"
                    className="rounded-bl-xl"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold">Enterprise</h3>
          <p className="mt-2 text-white/70">Need a custom solution for your organization?</p>
          <Button
            className="mt-4 bg-transparent border border-white/20 text-white hover:bg-white/10"
            asChild
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
    </section>
  )
}

const plans = [
  {
    name: "Free",
    price: 0,
    description: "For individuals or small teams just getting started",
    features: [
      "Up to 5 team members",
      "5GB storage",
      "Basic message history (1 month)",
      "Standard support",
      "10 integrations",
    ],
    buttonText: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: 12,
    description: "For growing teams that need more features and controls",
    features: [
      "Up to 50 team members",
      "50GB storage",
      "Unlimited message history",
      "Priority support",
      "Advanced analytics",
      "100+ integrations",
      "Custom branding",
    ],
    buttonText: "Start Free Trial",
    featured: true,
  },
  {
    name: "Business",
    price: 32,
    description: "For organizations requiring advanced security and compliance",
    features: [
      "Unlimited team members",
      "250GB storage",
      "Unlimited message history",
      "24/7 dedicated support",
      "Advanced security features",
      "All integrations",
      "Custom branding",
      "SSO & SAML",
      "Compliance exports",
    ],
    buttonText: "Start Free Trial",
    featured: false,
  },
]
