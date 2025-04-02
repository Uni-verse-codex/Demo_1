import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageSquare, Shield, Zap, Globe, Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function FeaturesPage() {
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
                  Features
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 animate-fade-in">
                  Everything You Need to Connect
                </h1>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
                  Our platform offers powerful tools to make communication seamless and efficient.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center mb-24 stagger-animation`}
              >
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                    {feature.icon}
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">{feature.title}</h2>
                  <p className="text-white/70 text-lg">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="min-w-5 mt-0.5">
                          <Check className="h-5 w-5 text-purple-400" />
                        </div>
                        <span className="text-white/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="group relative rounded-xl overflow-hidden">
                    <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative rounded-xl border border-purple-500/20 bg-black/40 p-2 backdrop-blur-sm overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={600}
                        height={400}
                        className="rounded-lg w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-lg pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-3xl overflow-hidden animate-fade-in-up">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
              
              <div className="relative p-12 md:p-16 flex flex-col items-center text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Team Communication?</h3>
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
      </main>
      <Footer />

      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
    </div>
  )
}

const features = [
  {
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    title: "Real-time Chat",
    description:
      "Instant messaging with read receipts and typing indicators for seamless communication. Keep your team connected no matter where they are.",
    benefits: [
      "Instant message delivery with read receipts",
      "Real-time typing indicators",
      "Rich text formatting and emoji support",
      "Thread-based conversations for organized discussions",
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
  },
  {
    icon: <Globe className="h-6 w-6 text-white" />,
    title: "Translation",
    description:
      "Automatic translation in over 100 languages to break down communication barriers. Connect with team members and clients worldwide.",
    benefits: [
      "Automatic message translation in 100+ languages",
      "Inline translation toggle for original text",
      "Language preference settings for each user",
      "Dialect and regional language support",
    ],
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1470&auto=format&fit=crop",
  },
  {
    icon: <Zap className="h-6 w-6 text-white" />,
    title: "Smart Automation",
    description:
      "Automate repetitive tasks and workflows with AI-powered chatbots. Save time and increase productivity across your organization.",
    benefits: [
      "Custom workflow automation with no-code builder",
      "AI-powered chatbots for common tasks",
      "Scheduled messages and reminders",
      "Integration with popular productivity tools",
    ],
    image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1470&auto=format&fit=crop",
  },
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Enterprise Security",
    description:
      "End-to-end encryption and advanced security features to protect your conversations. Keep your sensitive data safe and secure.",
    benefits: [
      "End-to-end encryption for all messages",
      "Role-based access controls",
      "Single Sign-On (SSO) integration",
      "Compliance with GDPR, HIPAA, and other regulations",
    ],
    image: "https://plus.unsplash.com/premium_photo-1674582744373-c0805c281744?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]
