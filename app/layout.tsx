import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chatter - Modern Team Communication Platform",
  description: "The most intuitive chat platform for modern teams. Collaborate, share, and communicate effortlessly.",
  keywords: "team chat, collaboration, communication platform, messaging app, team collaboration",
  authors: [{ name: "Chatter Team" }],
  category: "Communication",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://chatter-app.com"),
  openGraph: {
    title: "Chatter - Modern Team Communication Platform",
    description: "The most intuitive chat platform for modern teams. Collaborate, share, and communicate effortlessly.",
    url: "https://chatter-app.com",
    siteName: "Chatter",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chatter - Modern Team Communication Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatter - Modern Team Communication Platform",
    description: "The most intuitive chat platform for modern teams. Collaborate, share, and communicate effortlessly.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
