"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface SmartReplySuggestionsProps {
  suggestions: string[]
  onSelect: (reply: string) => void
  className?: string
}

export function SmartReplySuggestions({
  suggestions,
  onSelect,
  className = ""
}: SmartReplySuggestionsProps) {
  if (!suggestions.length) return null

  return (
    <div className={`flex flex-wrap gap-2 mt-2 ${className}`}>
      <div className="flex items-center text-xs text-white/40 mr-1">
        <Zap className="h-3 w-3 mr-1" />
        <span>Quick replies:</span>
      </div>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          size="sm"
          variant="outline"
          className="bg-white/5 border-white/10 hover:bg-white/10 rounded-full text-xs py-1 h-auto"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
} 