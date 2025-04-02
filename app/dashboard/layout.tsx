"use client"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutGrid,
  MessageSquare,
  Users,
  PlusCircle,
  Bell,
  Settings,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCircle
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    avatar_url: ""
  })

  useEffect(() => {
    // Check if user is authenticated, if not redirect to login
    if (!user) {
      router.push("/login")
      return
    }

    // Fetch user profile data
    async function loadUserProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single()
          
        if (error) throw error
        
        if (data) {
          setProfileData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            avatar_url: data.avatar_url || ""
          })
        }
      } catch (error) {
        console.error("Error loading user profile:", error)
      }
    }

    loadUserProfile()
  }, [user, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  const navItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
    { icon: MessageSquare, label: "Recent Chats", href: "/dashboard/chats" },
    { icon: Users, label: "Contacts", href: "/dashboard/contacts" },
    { icon: PlusCircle, label: "New Chat", href: "/dashboard/new-chat" },
    { icon: UserCircle, label: "Profile", href: "/dashboard/profile" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0 pointer-events-none"></div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-black/50 backdrop-blur-md transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex h-16 items-center justify-between px-4">
              <div className={`flex items-center gap-2 ${isCollapsed ? "hidden" : ""}`}>
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">C</div>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  Chatter
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>

            <div className="mt-4 px-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-full rounded-full border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                    isCollapsed ? "hidden" : ""
                  }`}
                />
                {isCollapsed && (
                  <Button variant="ghost" size="icon" className="h-9 w-9 mx-auto flex items-center justify-center">
                    <Search className="h-5 w-5 text-white/70" />
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-4 px-3">
              <div className={`text-xs font-semibold uppercase text-white/40 ${isCollapsed ? "hidden" : ""}`}>
                Menu
              </div>

              <nav className={`mt-2 flex flex-col ${isCollapsed ? "gap-3" : "gap-1"}`}>
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <span
                        className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} rounded-md ${isCollapsed ? "px-0" : "px-3"} py-2 transition-colors ${
                          isActive
                            ? "bg-purple-500/20 text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className={isCollapsed ? "hidden" : ""}>{item.label}</span>
                      </span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="mb-4 px-3">
            <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} rounded-md border border-white/10 bg-white/5 p-3`}>
              <div className={`flex items-center gap-3 ${isCollapsed ? "hidden" : ""}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileData.avatar_url} />
                  <AvatarFallback className="bg-purple-900/50">
                    {profileData.first_name && profileData.last_name 
                      ? `${profileData.first_name[0]}${profileData.last_name[0]}`
                      : user?.email?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {profileData.first_name && profileData.last_name 
                      ? `${profileData.first_name} ${profileData.last_name}`
                      : user?.email?.split('@')[0] || "User"}
                  </span>
                  <span className="text-xs text-white/50">
                    {user?.email}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="h-8 w-8 text-white/70 hover:text-white"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`min-h-screen transition-all duration-300 ${isCollapsed ? "pl-16" : "pl-64"}`}
      >
        <div className="container-fluid p-0">{children}</div>
      </main>
    </div>
  )
}

