import Image from "next/image"
import Link from "next/link"

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[900px]">
            <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-sm">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Loved by teams worldwide
            </h2>
            <p className="text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See why thousands of teams choose Chatter for their communication needs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                    priority={index < 3}
                    quality={90}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-white/80">{testimonial.quote}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-white/20"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-purple-300 transition-colors"
          >
            View all testimonials
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/3 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
    </section>
  )
}

const testimonials = [
  {
    name: "Alex Johnson",
    title: "CTO at TechFlow",
    quote: "Chatter has completely transformed how our engineering team collaborates. The real-time updates and easy file sharing have made our daily standups more productive.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    title: "Marketing Director",
    quote: "As someone who manages remote teams across different time zones, Chatter has been a game-changer for our communication workflow.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Michael Chen",
    title: "Product Manager",
    quote: "The integration capabilities with our existing tools made adoption a breeze. Our team's productivity increased by 37% in just two months.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1471&auto=format&fit=crop",
    rating: 4,
  },
  {
    name: "Priya Patel",
    title: "HR Manager",
    quote: "Chatter has made our internal communications so much more efficient. The search functionality alone saves us hours each week.",
    avatar: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=1470&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "David Wilson",
    title: "Startup Founder",
    quote: "As a startup, we needed something cost-effective yet powerful. Chatter delivered on all fronts with its scalable pricing model.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    title: "Project Coordinator",
    quote: "The custom channels and thread organization made managing multiple projects simultaneously much easier than our previous solution.",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1470&auto=format&fit=crop",
    rating: 4,
  },
]
