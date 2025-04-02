"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Search, MessageSquare, Loader2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
}

export default function NewChatPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isStartingChat, setIsStartingChat] = useState(false)

  useEffect(() => {
    if (!user) return

    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, first_name, last_name, avatar_url')
          .neq('id', user.id) // Exclude current user
          .order('first_name', { ascending: true })

        if (error) throw error

        setUsers(data || [])
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [user, toast])

  const startConversation = async (userId: string) => {
    if (!user) return

    setIsStartingChat(true)
    try {
      // Check if a conversation already exists
      const { data: existingConversation, error: checkError } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(user1_id.eq.${user.id},user2_id.eq.${userId}),and(user1_id.eq.${userId},user2_id.eq.${user.id})`)
        .maybeSingle()

      if (checkError) throw checkError

      let conversationId: string

      if (existingConversation) {
        // Use existing conversation
        conversationId = existingConversation.id
      } else {
        // Create new conversation
        const { data: newConversation, error: createError } = await supabase
          .from('conversations')
          .insert({
            user1_id: user.id,
            user2_id: userId,
            title: "Direct Message"
          })
          .select('id')
          .single()

        if (createError) throw createError
        conversationId = newConversation.id
      }

      // Navigate to the conversation
      router.push(`/dashboard/chats/${conversationId}`)
    } catch (error) {
      console.error("Error starting conversation:", error)
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsStartingChat(false)
    }
  }

  const getDisplayName = (user: User) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`
    }
    return user.email.split('@')[0]
  }

  const getInitials = (user: User) => {
    if (user.first_name) {
      return user.first_name.charAt(0).toUpperCase()
    }
    return user.email.charAt(0).toUpperCase()
  }

  const filteredUsers = searchTerm
    ? users.filter(user => {
        const name = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase()
        const email = user.email.toLowerCase()
        const search = searchTerm.toLowerCase()
        return name.includes(search) || email.includes(search)
      })
    : users

  return (
    <div className="h-[calc(100vh-2rem)] overflow-hidden">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 text-white/70 hover:text-white hover:bg-white/10"
          asChild
        >
          <Link href="/dashboard/chats">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to chats</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">New Chat</h1>
          <p className="text-white/70">Start a conversation with a user</p>
        </div>
      </div>

      <Card className="bg-purple-900/20 border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle>Select a user to chat with</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              placeholder="Search users by name or email..."
              className="bg-white/5 border-white/20 pl-10 text-white placeholder:text-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-white/70" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-white/70">
              {searchTerm ? "No users found matching your search" : "No users available"}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar_url || undefined} />
                      <AvatarFallback className="bg-purple-900/50">
                        {getInitials(user)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">
                        {getDisplayName(user)}
                      </h3>
                      <p className="text-sm text-white/60 truncate">{user.email}</p>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30 text-white border-0"
                      onClick={() => startConversation(user.id)}
                      disabled={isStartingChat}
                    >
                      {isStartingChat ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

