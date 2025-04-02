"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { Search } from "lucide-react"

interface ConversationWithUser {
  id: string
  created_at: string
  updated_at: string
  title: string
  user1_id: string
  user2_id: string
  last_message_text?: string
  last_message_time?: string
  other_user: {
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
    email: string
  }
  unread_count: number
}

export function ConversationList() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<ConversationWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!user) return

    async function loadConversations() {
      try {
        // First get all conversations where the current user is a participant
        const { data: conversationsData, error } = await supabase
          .from("conversations")
          .select("*")
          .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
          .order("updated_at", { ascending: false })

        if (error) throw error

        if (!conversationsData) {
          setConversations([])
          setLoading(false)
          return
        }

        // Process each conversation to get the other user's details
        const conversationsWithUsers = await Promise.all(
          conversationsData.map(async (conversation) => {
            // Determine if current user is user1_id or user2_id
            const otherUserId = conversation.user1_id === user.id 
              ? conversation.user2_id 
              : conversation.user1_id

            // Get the other user's profile
            const { data: userData } = await supabase
              .from("profiles")
              .select("first_name, last_name, avatar_url, email")
              .eq("id", otherUserId)
              .single()

            // Count unread messages
            const { count } = await supabase
              .from("messages")
              .select("*", { count: "exact" })
              .eq("conversation_id", conversation.id)
              .eq("sender_id", otherUserId)
              .eq("read", false)

            return {
              ...conversation,
              other_user: userData || {
                first_name: null,
                last_name: null,
                avatar_url: null,
                email: "unknown@example.com"
              },
              unread_count: count || 0
            }
          })
        )

        setConversations(conversationsWithUsers)
        setLoading(false)
      } catch (error) {
        console.error("Error loading conversations:", error)
        setLoading(false)
      }
    }

    loadConversations()

    // Set up subscription for real-time updates
    const subscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, () => {
        // Reload conversations when new message is received
        loadConversations()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conversation => {
    const fullName = `${conversation.other_user.first_name || ''} ${conversation.other_user.last_name || ''}`.toLowerCase()
    return fullName.includes(searchTerm.toLowerCase())
  })

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="text-center py-8 text-white/60">
          {searchTerm ? "No conversations match your search" : "No conversations yet"}
        </div>
      ) : (
        <div className="space-y-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/dashboard/chats/${conversation.id}`}
              className="block"
            >
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.other_user.avatar_url || undefined} />
                  <AvatarFallback className="bg-purple-900/50">
                    {conversation.other_user.first_name?.[0] || ""}
                    {conversation.other_user.last_name?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">
                      {conversation.other_user.first_name || ""} {conversation.other_user.last_name || "Unknown"}
                    </h3>
                    <span className="text-xs text-white/50">
                      {conversation.last_message_time 
                        ? formatDistanceToNow(new Date(conversation.last_message_time), { addSuffix: true }) 
                        : "New"}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 truncate">{conversation.last_message_text || "No messages yet"}</p>
                </div>
                
                {conversation.unread_count > 0 && (
                  <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white">
                    {conversation.unread_count}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 