"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Video, MoreVertical, Search, Paperclip, Smile, Send, ImageIcon, Mic, Circle } from "lucide-react"
import { generateSmartReplies, isQuestion, generateQuestionResponses } from "@/lib/smart-replies"
import { SmartReplySuggestions } from "@/components/chat/smart-reply-suggestions"

// Define the message interface to fix the linter errors
interface Message {
  id: number
  sender: string
  text: string
  time: string
  name?: string
  avatar?: string
  image?: string
}

export default function ChatsPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [smartReplies, setSmartReplies] = useState<string[]>([])

  // Generate smart replies when receiving new messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      // Only generate replies for messages from others, not our own
      if (lastMessage.sender === "other") {
        const suggestions = isQuestion(lastMessage.text)
          ? generateQuestionResponses(lastMessage.text)
          : generateSmartReplies(lastMessage.text)
        setSmartReplies(suggestions)
      } else {
        setSmartReplies([]) // Clear suggestions when we send a message
      }
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInputMessage("")
    setSmartReplies([]) // Clear smart replies when sending a message

    // Simulate a response after 1 second
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: "other",
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/32?img=1",
        text: getRandomResponse(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  const handleSmartReplySelect = (reply: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setSmartReplies([]) // Clear smart replies after selecting one

    // Simulate a response after 1 second
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: "other",
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/32?img=1",
        text: getRandomResponse(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <div className="flex h-screen">
      {/* Chat list */}
      <div className="w-80 border-r border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              type="search"
              placeholder="Search chats..."
              className="h-10 w-full rounded-full border border-white/20 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="space-y-1 p-2 overflow-y-auto h-[calc(100vh-5rem)]">
          {chats.map((chat, index) => (
            <button
              key={index}
              className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                chat.active ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20" : "hover:bg-white/5"
              }`}
            >
              <div className="relative">
                <Image
                  src={chat.avatar || "/placeholder.svg"}
                  alt={chat.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                {chat.online && <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white truncate">{chat.name}</p>
                  <span className="text-xs text-white/60">{chat.time}</span>
                </div>
                <p className="text-sm text-white/60 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs text-white">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10">
        {/* Chat header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Image
              src="https://i.pravatar.cc/40?img=1"
              alt="Sarah Johnson"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h2 className="font-medium text-white">Sarah Johnson</h2>
              <p className="text-sm text-white/60">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(100vh-10rem)]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-4 ${message.sender === "me" ? "flex-row-reverse" : ""}`}
            >
              {message.sender !== "me" && (
                <Image
                  src={message.avatar || "/placeholder.svg"}
                  alt={message.name || ""}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div
                className={`group relative max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === "me" ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-white/10"
                }`}
              >
                {message.image && (
                  <Image
                    src={message.image || "/placeholder.svg"}
                    alt="Shared image"
                    width={300}
                    height={200}
                    className="mb-2 rounded-lg"
                  />
                )}
                <p className="text-white">{message.text}</p>
                <span className="absolute bottom-0 right-0 -mb-5 text-xs text-white/60">{message.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Smart reply suggestions */}
        <div className="px-4">
          <SmartReplySuggestions 
            suggestions={smartReplies}
            onSelect={handleSmartReplySelect}
          />
        </div>

        {/* Message input */}
        <form onSubmit={handleSendMessage} className="border-t border-white/10 p-4 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="h-10 w-full rounded-full border border-white/20 bg-white/5 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-full"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const chats = [
  {
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/48?img=1",
    lastMessage: "The project files have been updated...",
    time: "2m ago",
    online: true,
    unread: 2,
    active: true,
  },
  {
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/48?img=2",
    lastMessage: "Can we schedule a call to discuss...",
    time: "45m ago",
    online: true,
    unread: 0,
    active: false,
  },
  {
    name: "Emily Rodriguez",
    avatar: "https://i.pravatar.cc/48?img=3",
    lastMessage: "Thanks for the update!",
    time: "2h ago",
    online: false,
    unread: 0,
    active: false,
  },
  {
    name: "David Kim",
    avatar: "https://i.pravatar.cc/48?img=4",
    lastMessage: "I'll review the changes and get...",
    time: "5h ago",
    online: false,
    unread: 1,
    active: false,
  },
]

const initialMessages = [
  {
    id: 1,
    sender: "other",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/32?img=1",
    text: "Hi! How are you doing?",
    time: "10:27 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Hey Sarah! I'm doing great, thanks for asking. Just finished reviewing the latest designs.",
    time: "10:28 AM",
  },
  {
    id: 3,
    sender: "other",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/32?img=1",
    text: "That's great! What do you think about them?",
    time: "10:30 AM",
  },
]

function getRandomResponse() {
  const responses = [
    "That's interesting! Tell me more.",
    "I see what you mean. Let's discuss this further.",
    "Thanks for sharing! I'll look into that.",
    "Great point! I hadn't thought of it that way.",
    "I understand. Let me get back to you on that.",
    "Sounds good! When would you like to meet?",
    "Perfect! I'll make the necessary adjustments.",
    "Could you elaborate on that?",
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

