import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote, Star } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>
      <Header />
      <main className="relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm mb-4 animate-fade-in">
                  Testimonials
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 animate-fade-in">
                  Trusted by Teams Worldwide
                </h1>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
                  See what our customers have to say about their experience with Chatter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger-animation">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative flex flex-col p-8 h-full rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
                    <div className="flex items-center mb-6">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-white/60 text-sm">{testimonial.title}, {testimonial.company}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-current text-purple-400" />
                        ))}
                      </div>
                    </div>
                    
                    <blockquote className="text-white/80 italic mb-6 flex-1">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="pt-4 mt-auto border-t border-white/10">
                      <p className="text-white/60 text-sm">Using Chatter since 2022</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl rounded-3xl overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-sm animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 relative p-8 md:p-12">
                  <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>
                  <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-purple-500/30">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop&q=80"
                      alt="Jennifer Martinez"
                      width={256}
                      height={256}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-4">
                  <div className="text-purple-400">
                    <Quote className="h-10 w-10 opacity-50" />
                  </div>
                  <p className="text-xl text-white/90 italic leading-relaxed">
                    "Chatter has revolutionized how our global team communicates. The real-time translation feature
                    alone has saved us countless hours and eliminated misunderstandings. It's been a game-changer for
                    our productivity."
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-lg gradient-text">Jennifer Martinez</p>
                    <p className="text-white/60">Director of Operations, GlobalTech Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Logos */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
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
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-3xl overflow-hidden animate-fade-in-up">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
              
              <div className="relative p-12 md:p-16 flex flex-col items-center text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Growing Community</h3>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto md:text-lg">
                  Experience the difference that Chatter can make for your team's communication and collaboration.
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
      </main>
      <Footer />

      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
    </div>
  )
}

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Product Manager",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "Chatter has completely transformed how our team communicates. The real-time translation feature is a game-changer for our global team.",
  },
  {
    name: "Michael Chen",
    title: "CTO",
    company: "StartupX",
    avatar: "https://plus.unsplash.com/premium_photo-1664908244271-c2271763217a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote:
      "The security features and integrations with our existing tools made Chatter an easy choice. Our team adopted it instantly.",
  },
  {
    name: "Emily Rodriguez",
    title: "Team Lead",
    company: "DesignHub",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "Our design team collaboration has never been smoother. The intuitive interface makes onboarding new team members a breeze.",
  },
  {
    name: "David Kim",
    title: "Engineering Manager",
    company: "InnovateTech",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "We've tried several chat platforms, but Chatter stands out with its reliability and feature set. The smart automation saves us hours every week.",
  },
  {
    name: "Sophia Patel",
    title: "Marketing Director",
    company: "GrowthLabs",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "The ability to organize conversations by project has been invaluable for our marketing campaigns. Chatter keeps everything in one place.",
  },
  {
    name: "James Wilson",
    title: "Customer Support Lead",
    company: "ServiceFirst",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote:
      "Our support team's response time improved by 40% after implementing Chatter. The integration with our CRM is seamless.",
  },
]
