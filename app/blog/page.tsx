import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function BlogPage() {
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
                  Blog
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 animate-fade-in">
                  Latest Insights & Updates
                </h1>
                <p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
                  Discover the latest trends, tips, and news about team communication and collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger-animation">
              {blogPosts.map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.slug}`}
                  className="group relative"
                >
                  <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/30 to-purple-900/20 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative h-full rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm transition-all overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="rounded-full bg-purple-500/20 px-2.5 py-1 text-xs text-purple-300">{post.category}</div>
                        <div className="text-xs text-white/60">{post.date}</div>
                      </div>
                      <h3 className="mb-2 text-xl font-bold group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="mb-4 text-white/70">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:translate-x-1 transition-transform">
                        Read more <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Popular Categories
                </h2>
                <p className="max-w-[600px] text-white/70 md:text-xl/relaxed animate-fade-in">
                  Explore our content by topic
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 stagger-animation">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/blog/category/${category.slug}`}
                  className="group relative"
                >
                  <div className="absolute inset-0.5 bg-gradient-to-b from-purple-600/20 to-purple-900/10 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative flex items-center justify-center rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm hover:border-purple-500/30 transition-all">
                    <span className="text-lg font-medium group-hover:text-purple-300 transition-colors">{category.name}</span>
                  </div>
                </Link>
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
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Never Miss an Update</h3>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto md:text-lg">
                  Get the latest articles, updates, and tips delivered directly to your inbox.
                </p>
                <div className="w-full max-w-md space-y-2">
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input
                      className="flex h-12 w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button className="bg-white text-black hover:bg-white/90 h-12 px-6">
                      Subscribe
                    </Button>
                  </form>
                  <p className="text-xs text-white/60 text-center">We respect your privacy. Unsubscribe at any time.</p>
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

const blogPosts = [
  {
    title: "10 Ways to Improve Team Communication",
    slug: "improve-team-communication",
    excerpt: "Discover practical strategies to enhance communication within your team and boost productivity.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
    category: "Productivity",
    date: "March 10, 2025",
  },
  {
    title: "The Future of Remote Work Collaboration",
    slug: "future-remote-work-collaboration",
    excerpt: "Explore emerging trends and technologies shaping how remote teams collaborate effectively.",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1470&auto=format&fit=crop",
    category: "Remote Work",
    date: "March 5, 2025",
  },
  {
    title: "How AI is Transforming Team Chat Platforms",
    slug: "ai-transforming-chat-platforms",
    excerpt: "Learn how artificial intelligence is revolutionizing the way teams communicate and collaborate.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1470&auto=format&fit=crop",
    category: "Technology",
    date: "February 28, 2025",
  },
  {
    title: "Building a Culture of Effective Communication",
    slug: "culture-effective-communication",
    excerpt: "Strategies for fostering a workplace culture that prioritizes clear and efficient communication.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop",
    category: "Company Culture",
    date: "February 20, 2025",
  },
  {
    title: "Security Best Practices for Team Chat Applications",
    slug: "security-best-practices-chat",
    excerpt: "Essential security measures to protect your team's conversations and sensitive information.",
    image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=1470&auto=format&fit=crop",
    category: "Security",
    date: "February 15, 2025",
  },
  {
    title: "Integrating Chat with Your Existing Workflow",
    slug: "integrating-chat-workflow",
    excerpt: "How to seamlessly incorporate chat platforms into your team's established processes and tools.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
    category: "Productivity",
    date: "February 8, 2025",
  },
]

const categories = [
  { name: "Productivity", slug: "productivity" },
  { name: "Remote Work", slug: "remote-work" },
  { name: "Technology", slug: "technology" },
  { name: "Security", slug: "security" },
  { name: "Company Culture", slug: "company-culture" },
  { name: "Case Studies", slug: "case-studies" },
  { name: "Tutorials", slug: "tutorials" },
  { name: "News", slug: "news" },
]
