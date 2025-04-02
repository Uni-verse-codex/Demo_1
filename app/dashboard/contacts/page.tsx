import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, UserPlus, MessageSquare, Phone, Video, Star, Circle, Users } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contacts</h1>
          <p className="text-sm text-white/70">Manage your contacts and start conversations</p>
        </div>
        <Button size="sm" className="bg-purple-500/20 hover:bg-purple-500/30 text-white border-0">
          <UserPlus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <input
            type="search"
            placeholder="Search contacts..."
            className="h-9 w-full rounded-full border border-white/20 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/20 text-white"
        >
          <Users className="mr-2 h-4 w-4" /> All Contacts
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/20 text-white"
        >
          <Star className="mr-2 h-4 w-4" /> Favorites
        </Button>
      </div>

      {/* Contacts grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => (
          <Card key={index} className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {contact.online && (
                      <Circle className="absolute bottom-0 right-0 h-2.5 w-2.5 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{contact.name}</p>
                    <p className="text-xs text-white/60">{contact.title}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Star className={`h-4 w-4 ${contact.favorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                </Button>
              </div>
              <div className="mt-3 text-xs text-white/60">
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
              <div className="mt-3 flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const contacts = [
  {
    name: "Sarah Johnson",
    title: "Product Designer",
    avatar: "https://i.pravatar.cc/80?img=1",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    online: true,
    favorite: true,
  },
  {
    name: "Michael Chen",
    title: "Software Engineer",
    avatar: "https://i.pravatar.cc/80?img=2",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    online: true,
    favorite: false,
  },
  {
    name: "Emily Rodriguez",
    title: "Marketing Manager",
    avatar: "https://i.pravatar.cc/80?img=3",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 345-6789",
    online: false,
    favorite: true,
  },
  {
    name: "David Kim",
    title: "UX Researcher",
    avatar: "https://i.pravatar.cc/80?img=4",
    email: "david.kim@example.com",
    phone: "+1 (555) 456-7890",
    online: false,
    favorite: false,
  },
  {
    name: "Lisa Wang",
    title: "Project Manager",
    avatar: "https://i.pravatar.cc/80?img=5",
    email: "lisa.wang@example.com",
    phone: "+1 (555) 567-8901",
    online: true,
    favorite: false,
  },
  {
    name: "James Wilson",
    title: "Frontend Developer",
    avatar: "https://i.pravatar.cc/80?img=6",
    email: "james.wilson@example.com",
    phone: "+1 (555) 678-9012",
    online: true,
    favorite: true,
  },
]

