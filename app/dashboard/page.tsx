import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, PlusCircle, Calendar, BarChart3, ArrowRight, Circle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-4">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, Admin! 👋</h1>
          <p className="text-sm text-white/70">Here's what's happening with your chats today.</p>
        </div>
        <Button size="sm" className="bg-purple-500/20 hover:bg-purple-500/30 text-white border-0" asChild>
          <Link href="/dashboard/new-chat">
            New Chat <PlusCircle className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-white/70">Total Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">128</div>
            <p className="text-xs text-white/60">+6 from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-white/70">Active Contacts</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45</div>
            <p className="text-xs text-white/60">+12 online now</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-white/70">Unread Messages</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">9</div>
            <p className="text-xs text-white/60">3 urgent messages</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-white/70">Scheduled Calls</CardTitle>
            <Calendar className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-white/60">Next call in 45m</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent chats and calendar section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent chats */}
        <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-white">Recent Chats</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-purple-400 hover:text-purple-300" asChild>
                <Link href="/dashboard/chats">
                  View all <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
            <CardDescription className="text-xs text-white/60">Your latest conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentChats.map((chat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={chat.avatar || "/placeholder.svg"}
                      alt={chat.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    {chat.online && (
                      <Circle className="absolute bottom-0 right-0 h-2 w-2 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white truncate">{chat.name}</p>
                      <span className="text-xs text-white/60">{chat.time}</span>
                    </div>
                    <p className="text-xs text-white/60 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-xs text-white">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar card */}
        <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm text-white">Upcoming Events</CardTitle>
            <CardDescription className="text-xs text-white/60">Your scheduled meetings and calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="text-xs font-medium text-white">{event.time}</div>
                    <div className="h-full w-px bg-white/10"></div>
                  </div>
                  <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">{event.title}</h4>
                      <span className="text-xs text-white/60">{event.duration}</span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">{event.participants} participants</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const recentChats = [
  {
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/32?img=1",
    lastMessage: "The project files have been updated...",
    time: "2m ago",
    online: true,
    unread: 2,
  },
  {
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/32?img=2",
    lastMessage: "Can we schedule a call to discuss...",
    time: "45m ago",
    online: true,
    unread: 0,
  },
  {
    name: "Emily Rodriguez",
    avatar: "https://i.pravatar.cc/32?img=3",
    lastMessage: "Thanks for the update!",
    time: "2h ago",
    online: false,
    unread: 0,
  },
  {
    name: "David Kim",
    avatar: "https://i.pravatar.cc/32?img=4",
    lastMessage: "I'll review the changes and get...",
    time: "5h ago",
    online: false,
    unread: 1,
  },
]

const events = [
  {
    time: "10:00 AM",
    title: "Team Sync Meeting",
    duration: "45m",
    participants: "5",
  },
  {
    time: "2:30 PM",
    title: "Client Presentation",
    duration: "1h",
    participants: "3",
  },
  {
    time: "4:00 PM",
    title: "Project Review",
    duration: "30m",
    participants: "4",
  },
]

