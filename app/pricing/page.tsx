import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, HelpCircle, ChevronRight, X } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>
      <Header />
      <main className="relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm mb-4 animate-fade-in">
                  Pricing
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 animate-fade-in">
                  Simple, Transparent Pricing
                </h1>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
                  Choose the plan that's right for your team with our scalable pricing options.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-10">
              <span className="text-white/70">Billed Monthly</span>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-purple-600 transition-colors duration-200 ease-in-out">
                <span className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                  <span className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-200 ease-in-out"></span>
                </span>
              </button>
              <span className="text-white font-medium">Billed Annually</span>
              <span className="rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium px-2 py-1">
                Save 20%
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-animation">
              {plans.map((plan, index) => (
                <div key={index} className="group relative">
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-max rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className={`relative flex h-full flex-col rounded-2xl p-8 ${plan.popular ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm border ${plan.popular ? 'border-purple-500/30' : 'border-white/10'}`}>
                    <div className="mb-5">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-white/60 mt-2">{plan.description}</p>
                    </div>
                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-white/60">/month per user</span>
                      </div>
                      {plan.billing && <p className="text-white/60 text-sm mt-1">{plan.billing}</p>}
                    </div>
                    <ul className="mb-8 space-y-4 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={
                        plan.popular
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 w-full"
                          : "bg-white/10 hover:bg-white/20 text-white w-full"
                      } 
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Compare Plans
                </h2>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed">
                  Find the perfect plan for your team's needs.
                </p>
              </div>
            </div>

            <div className="relative overflow-x-auto rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm animate-fade-in">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-left font-medium">Features</th>
                    {plans.map((plan, index) => (
                      <th key={index} className="p-4 text-center font-medium">
                        {plan.name}
                        {plan.popular && (
                          <span className="ml-2 inline-flex rounded-full bg-purple-600/10 px-2 py-0.5 text-xs text-purple-400">
                            Popular
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span>{feature.name}</span>
                          {feature.tooltip && (
                            <span className="cursor-help text-white/40 hover:text-white/70" title={feature.tooltip}>
                              <HelpCircle className="h-4 w-4" />
                            </span>
                          )}
                        </div>
                      </td>
                      {plans.map((plan, planIndex) => (
                        <td key={planIndex} className="p-4 text-center">
                          {feature.availability[planIndex] ? (
                            <CheckCircle2 className="h-5 w-5 text-purple-400 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-white/30 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed">
                  Got questions? We have answers.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-4xl grid gap-4 md:gap-6 stagger-animation-slow">
              {faqs.map((faq, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/20 to-purple-900/10 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden">
                    <details className="group/item">
                      <summary className="flex cursor-pointer select-none items-center justify-between gap-2 p-6 transition">
                        <h3 className="font-medium">{faq.question}</h3>
                        <div className="transition-transform duration-200 group-open/item:rotate-180">
                          <ChevronRight className="h-5 w-5 text-white/70 rotate-90" />
                        </div>
                      </summary>
                      <div className="border-t border-white/10 p-6">
                        <p className="text-white/70">{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-3xl overflow-hidden animate-fade-in-up">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
              
              <div className="relative p-12 md:p-16 flex flex-col items-center text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need a Custom Solution?</h3>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto md:text-lg">
                  Contact our sales team to discuss custom pricing for large teams and enterprise solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-black hover:bg-white/90" size="lg">
                    Contact Sales
                  </Button>
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white" size="lg">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
    </div>
  )
}

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: "12",
    billing: "Billed annually or $15 monthly",
    buttonText: "Start Free Trial",
    popular: false,
    features: [
      "Up to 10 users",
      "Basic chat functionality",
      "5 GB file storage",
      "24/7 support",
      "Basic integrations",
    ],
  },
  {
    name: "Professional",
    description: "Ideal for growing teams and organizations",
    price: "25",
    billing: "Billed annually or $30 monthly",
    buttonText: "Start Free Trial",
    popular: true,
    features: [
      "Up to 50 users",
      "Advanced chat features",
      "25 GB file storage",
      "Priority support",
      "Advanced integrations",
      "AI-powered chatbots",
      "Translation in 30 languages",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: "45",
    billing: "Billed annually or $55 monthly",
    buttonText: "Contact Sales",
    popular: false,
    features: [
      "Unlimited users",
      "All Professional features",
      "100 GB file storage",
      "Dedicated support manager",
      "Custom integrations",
      "Advanced security features",
      "Translation in 100+ languages",
      "Custom branding options",
    ],
  },
]

const comparisonFeatures = [
  {
    name: "Number of Users",
    tooltip: "Maximum number of users allowed on your plan",
    availability: ["Up to 10", "Up to 50", "Unlimited"],
  },
  {
    name: "File Storage",
    tooltip: "Total available storage for files and attachments",
    availability: ["5 GB", "25 GB", "100 GB"],
  },
  {
    name: "Real-time Chat",
    availability: [true, true, true],
  },
  {
    name: "Thread Conversations",
    availability: [true, true, true],
  },
  {
    name: "Language Translation",
    availability: [false, "30 Languages", "100+ Languages"],
  },
  {
    name: "Custom Chatbots",
    tooltip: "Create automated chatbots for routine tasks",
    availability: [false, true, true],
  },
  {
    name: "Advanced Security",
    tooltip: "End-to-end encryption and advanced security features",
    availability: [false, false, true],
  },
  {
    name: "Custom Branding",
    availability: [false, false, true],
  },
  {
    name: "API Access",
    availability: [false, true, true],
  },
  {
    name: "Priority Support",
    availability: [false, true, true],
  },
]

const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "Our free trial gives you full access to all features of the Professional plan for 14 days. No credit card is required to sign up, and you can cancel anytime during the trial period without being charged.",
  },
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be immediately available and you'll be charged the prorated difference. When downgrading, the changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer:
      "Yes, we offer a 20% discount for annual billing compared to monthly billing. This discount is automatically applied when you select the annual billing option.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express, and Discover), as well as PayPal and bank transfers for annual Enterprise plans.",
  },
  {
    question: "Can I add more users to my plan later?",
    answer:
      "Yes, you can add more users to your plan at any time up to your plan's limit. If you need more users than your current plan allows, you'll need to upgrade to a higher tier plan.",
  },
  {
    question: "Do you offer discounts for nonprofit organizations?",
    answer:
      "Yes, we offer special pricing for registered nonprofit organizations. Please contact our sales team with proof of your nonprofit status to learn more about our nonprofit program.",
  },
]
