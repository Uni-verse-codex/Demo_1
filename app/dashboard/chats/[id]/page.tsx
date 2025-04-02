"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MessageList } from "@/components/chat/message-list"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const { id } = useParams()
  const conversationId = id as string
  const { user } = useAuth()
  const [receiverId, setReceiverId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !conversationId) return

    const getConversationDetails = async () => {
      setIsLoading(true)
      try {
        // Get conversation details
        const { data, error } = await supabase
          .from('conversations')
          .select('*')
          .eq('id', conversationId)
          .single()

        if (error) throw error

        if (!data) {
          setError("Conversation not found")
          return
        }

        // Determine the other user in the conversation
        const otherUserId = data.user1_id === user.id ? data.user2_id : data.user1_id
        setReceiverId(otherUserId)
      } catch (err) {
        console.error("Error fetching conversation:", err)
        setError("Failed to load conversation")
      } finally {
        setIsLoading(false)
      }
    }

    getConversationDetails()
  }, [conversationId, user])

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-2rem)] flex items-center justify-center">
        <div className="text-white/70">Loading conversation...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-2rem)] flex flex-col items-center justify-center">
        <div className="text-red-400 mb-4">{error}</div>
        <Button asChild>
          <Link href="/dashboard/chats">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chats
          </Link>
        </Button>
      </div>
    )
  }

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
          <h1 className="text-2xl font-bold text-white">Chat</h1>
          <p className="text-white/70">Direct message</p>
        </div>
      </div>

      <div className="h-[calc(100vh-10rem)] rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        {receiverId && <MessageList conversationId={conversationId} receiverId={receiverId} />}
      </div>
    </div>
  )
} 