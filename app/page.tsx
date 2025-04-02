import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare, 
  Heart, 
  Zap, 
  CreditCard, 
  Settings, 
  BarChart3, 
  UserCircle, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  PanelRight, 
  User, 
  LayoutDashboard, 
  BellRing, 
  ShieldCheck, 
  Rocket, 
  MousePointerClick, 
  Search, 
  Gauge, 
  Puzzle,
  CheckCircle,
  Dot,
  Star,
  Menu,
  Check,
  Shield,
  Globe,
  Lock,
  ArrowLeft,
  ChevronRight,
  ArrowRight,
  Github,
  Linkedin,
  Facebook,
  Twitter
} from "lucide-react"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-5 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
              Team chat for the modern workplace
            </h1>
            <p className="max-w-[600px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
              Connect your team with a platform that makes collaboration seamless, productive, and enjoyable.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Button
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white btn-hover-effect text-lg py-6 px-8 rounded-xl"
                asChild
              >
                <Link href="/register">Get Started for Free</Link>
              </Button>
              <Button
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white btn-hover-effect text-lg py-6 px-8 rounded-xl"
                variant="outline"
                asChild
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-white/60 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <Check className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
              <span className="h-4 w-4" />
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
              <span className="h-4 w-4" />
              <Check className="h-4 w-4 text-green-500" />
              <span>14-day free trial</span>
            </div>
          </div>
          <div className="relative mx-auto aspect-video overflow-hidden rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem] animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]"></div>
            <Image
              alt="Team collaboration"
              className="object-cover w-full h-full rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem] animate-float"
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
              width={1456}
              height={816}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-purple-950/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
          <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm mb-4">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter gradient-text">
            Everything you need to streamline your team communication
          </h2>
          <p className="max-w-[700px] mx-auto text-white/70 md:text-xl/relaxed">
            Designed for modern teams that need speed, security, and simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 stagger-animation">
          {/* Feature 1 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="p-3 rounded-xl bg-purple-900/30 w-fit mb-5">
                <MessageSquare className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Messaging</h3>
              <p className="text-white/70 mb-4 flex-1">
                Instant message delivery with read receipts and typing indicators. Never miss important updates.
              </p>
              <ul className="space-y-2">
                {["Instant delivery", "Typing indicators", "Read receipts", "Thread replies"].map(item => (
                  <li key={item} className="flex items-center">
                    <Check className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="p-3 rounded-xl bg-purple-900/30 w-fit mb-5">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">End-to-end Encryption</h3>
              <p className="text-white/70 mb-4 flex-1">
                Your conversations are secure with our advanced encryption technology, ensuring privacy at all times.
              </p>
              <ul className="space-y-2">
                {["AES-256 encryption", "Zero-knowledge architecture", "GDPR compliant", "SOC 2 certified"].map(item => (
                  <li key={item} className="flex items-center">
                    <Check className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="p-3 rounded-xl bg-purple-900/30 w-fit mb-5">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/70 mb-4 flex-1">
                Optimized for performance, even on slower connections. Message delivery in milliseconds.
              </p>
              <ul className="space-y-2">
                {["Sub-100ms delivery", "Offline support", "Low bandwidth mode", "Background sync"].map(item => (
                  <li key={item} className="flex items-center">
                    <Check className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="p-3 rounded-xl bg-purple-900/30 w-fit mb-5">
                <Globe className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Reach</h3>
              <p className="text-white/70 mb-4 flex-1">
                Connect with team members anywhere in the world with multi-language support and localization.
              </p>
              <ul className="space-y-2">
                {["20+ languages", "Regional data centers", "Time zone management", "Translation features"].map(item => (
                  <li key={item} className="flex items-center">
                    <Check className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="p-3 rounded-xl bg-purple-900/30 w-fit mb-5">
                <Puzzle className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Rich Integrations</h3>
              <p className="text-white/70 mb-4 flex-1">
                Connect with all your favorite tools and bring your workflows directly into your conversations.
              </p>
              <ul className="space-y-2">
                {["100+ app integrations", "Custom webhooks", "API access", "Automation tools"].map(item => (
                  <li key={item} className="flex items-center">
                    <Check className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="p-3 rounded-xl bg-purple-900/30 w-fit mb-5">
                <Lock className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Permissions</h3>
              <p className="text-white/70 mb-4 flex-1">
                Fine-grained access controls to ensure the right people see the right information.
              </p>
              <ul className="space-y-2">
                {["Role-based access", "Group permissions", "Private channels", "Custom policies"].map(item => (
                  <li key={item} className="flex items-center">
                    <Check className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Feature Highlight */}
        <div className="mt-24 relative rounded-3xl overflow-hidden animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
          
          <div className="relative px-6 py-16 md:px-12 md:py-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Smart Organization</h3>
              <p className="text-white/70 mb-6 md:text-lg">
                Chatter's AI-powered organization helps you find messages, files, and information instantly, even in busy channels.
              </p>
              <ul className="space-y-4">
                {[
                  "Smart search across all conversations",
                  "AI-powered message categorization",
                  "Automatic thread suggestions",
                  "Custom organization rules"
                ].map(item => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-white text-black hover:bg-white/90" size="lg">
                <Link href="/features">Learn More</Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden border border-white/20 shadow-lg bg-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  width={640}
                  height={480}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-purple-950/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm mb-4">
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter gradient-text mb-4">
            Choose the plan that's right for you
          </h2>
          <p className="max-w-[700px] mx-auto text-white/70 md:text-xl/relaxed">
            All plans include a 14-day free trial. No credit card required. Change or cancel your plan anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
          {/* Starter Plan */}
          <div className="relative group">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative h-full flex flex-col p-8 rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <h3 className="text-xl font-semibold text-white mb-3">Starter</h3>
              <div className="mb-5">
                <span className="text-4xl font-bold text-white">$12</span>
                <span className="text-white/60 ml-1">/ month</span>
              </div>
              <p className="text-white/70 mb-6">Perfect for small teams just getting started with team collaboration.</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Up to 10 team members",
                  "5 GB storage",
                  "Basic messaging",
                  "File sharing",
                  "5 integrations",
                  "24/7 email support"
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                Start Free Trial
              </Button>
            </div>
          </div>
          
          {/* Professional Plan - Highlighted */}
          <div className="relative group translate-y-[-1rem]">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-500/40 to-purple-800/30 rounded-3xl blur opacity-100 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative h-full flex flex-col p-8 rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/30 overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Most Popular
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">Professional</h3>
              <div className="mb-5">
                <span className="text-4xl font-bold text-white">$24</span>
                <span className="text-white/60 ml-1">/ month</span>
              </div>
              <p className="text-white/70 mb-6">Everything a growing team needs to collaborate effectively.</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Up to 50 team members",
                  "25 GB storage",
                  "Advanced messaging features",
                  "Video conferencing",
                  "20 integrations",
                  "24/7 priority support",
                  "Analytics dashboard",
                  "Advanced security"
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Start Free Trial
              </Button>
            </div>
          </div>
          
          {/* Enterprise Plan */}
          <div className="relative group">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative h-full flex flex-col p-8 rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <h3 className="text-xl font-semibold text-white mb-3">Enterprise</h3>
              <div className="mb-5">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-white/60 ml-1">/ month</span>
              </div>
              <p className="text-white/70 mb-6">Advanced features and support for larger organizations.</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Unlimited team members",
                  "Unlimited storage",
                  "All messaging features",
                  "Advanced video conferencing",
                  "Unlimited integrations",
                  "24/7 dedicated support",
                  "Advanced analytics",
                  "Enterprise security",
                  "Custom branding",
                  "SLA guarantees"
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-20 mb-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Trusted by innovative companies worldwide</h3>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {[
              { name: "Acme Inc.", logo: "https://images.unsplash.com/photo-1563986768609-5077b6dc7624?q=80&w=48&auto=format&fit=crop" },
              { name: "TechCorp", logo: "https://images.unsplash.com/photo-1563986768609-5077b6dc7624?q=80&w=48&auto=format&fit=crop" },
              { name: "Globex", logo: "https://images.unsplash.com/photo-1563986768609-5077b6dc7624?q=80&w=48&auto=format&fit=crop" },
              { name: "Initech", logo: "https://images.unsplash.com/photo-1563986768609-5077b6dc7624?q=80&w=48&auto=format&fit=crop" },
              { name: "Hooli", logo: "https://images.unsplash.com/photo-1563986768609-5077b6dc7624?q=80&w=48&auto=format&fit=crop" },
              { name: "Massive Dynamic", logo: "https://images.unsplash.com/photo-1563986768609-5077b6dc7624?q=80&w=48&auto=format&fit=crop" },
            ].map((company) => (
              <div key={company.name} className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-white/80 font-medium text-lg tracking-tight">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-6">
            {[
              {
                question: "How does the 14-day free trial work?",
                answer: "You can use all features of your selected plan for 14 days without any charge. No credit card is required to start. At the end of the trial, you can choose to subscribe or your account will automatically downgrade to the free plan."
              },
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the change takes effect immediately. If you downgrade, the change will take effect at the end of your current billing cycle."
              },
              {
                question: "Is there a discount for annual billing?",
                answer: "Yes, we offer a 20% discount for annual billing on all plans. You can select annual billing when you subscribe after your free trial."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
              },
              {
                question: "Do you offer a refund if I'm not satisfied?",
                answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with our service, you can request a full refund within 30 days of your purchase."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
                <h4 className="text-white font-semibold text-lg mb-2">{faq.question}</h4>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-white/60 text-sm">
            * All prices are in USD and charged per user per month.
          </p>
          <p className="text-white/60 text-sm mt-2">
            Need a custom plan? <Link href="/contact" className="text-purple-400 hover:text-purple-300">Contact our sales team</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-purple-950/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm mb-4">
            What Our Customers Say
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter gradient-text mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-white/70 md:text-xl/relaxed">
            See why thousands of teams choose Chatter for their communication needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 stagger-animation">
          {/* Testimonial 1 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="flex items-center mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://plus.unsplash.com/premium_photo-1664908244271-c2271763217a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Alex Johnson"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Alex Johnson</h4>
                  <p className="text-white/60 text-sm">CTO, TechCorp Solutions</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current text-purple-400" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-white/80 italic mb-6 flex-1">
                "Chatter has completely transformed how our engineering teams collaborate. The seamless integration with our development tools has boosted productivity by 35%."
              </blockquote>
              
              <div className="pt-4 mt-auto border-t border-white/10">
                <p className="text-white/60 text-sm">Using Chatter since 2022</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="flex items-center mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Sarah Williams"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Sarah Williams</h4>
                  <p className="text-white/60 text-sm">Head of Marketing, Global Media</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current text-purple-400" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-white/80 italic mb-6 flex-1">
                "The real-time collaboration features allowed our remote marketing team to stay connected and execute campaigns more efficiently than ever before."
              </blockquote>
              
              <div className="pt-4 mt-auto border-t border-white/10">
                <p className="text-white/60 text-sm">Using Chatter since 2021</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
              <div className="flex items-center mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Michael Chen"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Michael Chen</h4>
                  <p className="text-white/60 text-sm">Product Director, InnovateLabs</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current text-purple-400" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-white/80 italic mb-6 flex-1">
                "Our product development cycles shortened by 40% after implementing Chatter across our organization. The file sharing and feedback tools are exceptional."
              </blockquote>
              
              <div className="pt-4 mt-auto border-t border-white/10">
                <p className="text-white/60 text-sm">Using Chatter since 2022</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Logos */}
        <div className="mt-12 mb-20">
          <p className="text-center text-white/60 mb-8 text-lg font-medium">Trusted by companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
            {[
              "Acme Inc",
              "TechCorp",
              "Globex",
              "Initech",
              "Hooli",
              "Massive Dynamic"
            ].map((company) => (
              <div key={company} className="flex items-center justify-center">
                <div className="flex items-center justify-center h-12 px-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                  <span className="text-white/80 font-semibold">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="relative rounded-3xl overflow-hidden animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
          
          <div className="relative p-12 md:p-16 flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your team's communication?</h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto md:text-lg">
              Join thousands of teams that are already using Chatter to streamline their communication and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-black hover:bg-white/90" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
          <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm">
            Get Started Today
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter gradient-text">
            Transform your team communication
          </h2>
          
          <p className="max-w-[800px] text-white/70 md:text-xl/relaxed">
            Join thousands of teams who have already made the switch to better, faster, and more secure communication.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white btn-hover-effect" asChild>
              <Link href="/register">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white btn-hover-effect" asChild>
              <Link href="/demo">Request Demo</Link>
            </Button>
          </div>
          
          <div className="mt-8 flex flex-col items-center space-y-4">
            <p className="text-white/60 text-sm">
              No credit card required. 14-day free trial.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-white/70 text-sm">Easy setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-white/70 text-sm">Free migration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-white/70 text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
    </section>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
            <Image 
              src="https://images.unsplash.com/photo-1563986768609-5077b6dc7624?q=80&w=64&auto=format&fit=crop"
              alt="Chatter Logo"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="font-bold text-white">Chatter</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/testimonials" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            Testimonials
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            Blog
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-sm font-medium text-white/80 hover:text-white transition-colors">
            Sign In
          </Link>
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>
          
          <Button variant="outline" size="icon" className="md:hidden border-white/10 bg-white/5">
            <Menu className="h-5 w-5 text-white" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>
      <div className="container px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Logo + Company Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                <Image 
                  src="https://images.unsplash.com/photo-1563986768609-5077b6dc7624?q=80&w=64&auto=format&fit=crop"
                  alt="Chatter Logo"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-white">Chatter</span>
            </Link>
            <p className="text-white/60 mb-6 max-w-md">
              The modern platform for team communication. Connect, collaborate, and get work done in a single place.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com" className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com" className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                { name: "Features", href: "/features" },
                { name: "Pricing", href: "/pricing" },
                { name: "Integrations", href: "/integrations" },
                { name: "Solutions", href: "/solutions" },
                { name: "Enterprise", href: "/enterprise" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Blog", href: "/blog" },
                { name: "Help Center", href: "/help" },
                { name: "Documentation", href: "/docs" },
                { name: "API", href: "/api" },
                { name: "Status", href: "/status" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/60 text-sm">
            {new Date().getFullYear()} Chatter. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="text-white/60 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-white/60 text-sm hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/gdpr" className="text-white/60 text-sm hover:text-white transition-colors">
              GDPR
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
