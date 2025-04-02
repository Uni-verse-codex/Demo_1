// Smart replies utility that generates contextual reply suggestions

type SmartReplyCategory = {
  keywords: string[];
  responses: string[];
};

// Categories of smart replies with associated keywords and responses
const smartReplyCategories: SmartReplyCategory[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings", "morning", "afternoon", "evening"],
    responses: [
      "Hi there! How are you?",
      "Hello! Great to hear from you.",
      "Hey! How's your day going?",
      "Hello! What can I help you with today?"
    ]
  },
  {
    keywords: ["how are you", "how's it going", "how do you do", "what's up"],
    responses: [
      "I'm doing well, thanks for asking!",
      "All good here, how about you?",
      "Pretty good, thanks! How about yourself?",
      "Doing great! What's new with you?"
    ]
  },
  {
    keywords: ["thanks", "thank you", "appreciate", "grateful", "cheers"],
    responses: [
      "You're welcome!",
      "No problem at all!",
      "Happy to help!",
      "Anytime!"
    ]
  },
  {
    keywords: ["help", "assist", "support", "guidance"],
    responses: [
      "I'd be happy to help! What do you need?",
      "Sure, what do you need help with?",
      "I'm here to assist. Could you provide more details?",
      "Of course! Tell me more about what you need."
    ]
  },
  {
    keywords: ["sorry", "apologize", "apologies", "my bad", "my fault"],
    responses: [
      "No worries at all!",
      "It's completely fine.",
      "Don't worry about it!",
      "No need to apologize!"
    ]
  },
  {
    keywords: ["yes", "yeah", "sure", "ok", "okay", "alright", "definitely"],
    responses: [
      "Great! Let's proceed.",
      "Excellent! What's next?",
      "Perfect! I'll note that down.",
      "Awesome, thanks for confirming."
    ]
  },
  {
    keywords: ["no", "nope", "not really", "negative", "I don't think so"],
    responses: [
      "I understand. Would you prefer something else?",
      "No problem. What would work better for you?",
      "Got it. Is there an alternative you'd prefer?",
      "That's fine. What would you suggest instead?"
    ]
  },
  {
    keywords: ["meeting", "schedule", "calendar", "availability", "free time", "when can"],
    responses: [
      "I'm available tomorrow afternoon.",
      "How about meeting on Friday?",
      "I could do a call next Monday.",
      "Let me check my calendar and get back to you."
    ]
  },
  {
    keywords: ["project", "status", "update", "progress"],
    responses: [
      "The project is on track for completion.",
      "We've made good progress this week.",
      "I'll send you the latest status report.",
      "Everything is proceeding as planned."
    ]
  },
  {
    keywords: ["bye", "goodbye", "see you", "talk later", "got to go", "gotta go", "catch you later"],
    responses: [
      "Talk to you later!",
      "Goodbye, have a great day!",
      "See you soon!",
      "Take care!"
    ]
  }
];

// General responses when no specific context is detected
const generalResponses = [
  "I understand. Tell me more.",
  "Interesting! Could you elaborate?",
  "Got it. What else?",
  "Thanks for sharing that.",
  "I see what you mean.",
  "That makes sense."
];

/**
 * Generates smart reply suggestions based on the message content
 * @param messageText The incoming message text to analyze
 * @param count The number of suggestions to return (default: 3)
 * @returns An array of suggested replies
 */
export function generateSmartReplies(messageText: string, count = 3): string[] {
  const normalizedMessage = messageText.toLowerCase();
  
  // Collect all matching responses based on keywords
  const matchingResponses: string[] = [];
  
  smartReplyCategories.forEach(category => {
    const hasKeyword = category.keywords.some(keyword => 
      normalizedMessage.includes(keyword)
    );
    
    if (hasKeyword) {
      matchingResponses.push(...category.responses);
    }
  });
  
  // If we have matching responses, shuffle and take the requested count
  if (matchingResponses.length > 0) {
    // Simple Fisher-Yates shuffle
    for (let i = matchingResponses.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [matchingResponses[i], matchingResponses[j]] = [matchingResponses[j], matchingResponses[i]];
    }
    
    return matchingResponses.slice(0, count);
  }
  
  // If no specific matches, return general responses
  return generalResponses.slice(0, count);
}

// Function to check if the message is a question
export function isQuestion(messageText: string): boolean {
  const normalizedMessage = messageText.toLowerCase().trim();
  
  // Check for question marks
  if (normalizedMessage.endsWith("?")) {
    return true;
  }
  
  // Check for common question starters
  const questionStarters = [
    "who", "what", "when", "where", "why", "how", "is", "are", "was", "were",
    "will", "would", "can", "could", "should", "may", "might", "do", "does", "did"
  ];
  
  return questionStarters.some(starter => 
    normalizedMessage.startsWith(starter + " ")
  );
}

// Function to generate responses specifically for questions
export function generateQuestionResponses(messageText: string, count = 3): string[] {
  const normalizedMessage = messageText.toLowerCase();
  
  // Question type patterns
  if (normalizedMessage.includes("how are you")) {
    return [
      "I'm doing well, thanks for asking!",
      "Great! How about yourself?",
      "Pretty good, thanks!"
    ].slice(0, count);
  }
  
  if (normalizedMessage.match(/where (is|are)/i)) {
    return [
      "Let me check the location for you.",
      "I believe it's in the usual place.",
      "I'll send you the address."
    ].slice(0, count);
  }
  
  if (normalizedMessage.match(/when (is|will|can|should)/i)) {
    return [
      "How about tomorrow?",
      "I'm free next week.",
      "Let me check my calendar and get back to you."
    ].slice(0, count);
  }
  
  // Default question responses
  return [
    "That's a good question. Let me think about it.",
    "I'm not entirely sure, but I'll find out for you.",
    "Interesting question! What do you think?",
    "Let me get back to you on that."
  ].slice(0, count);
} 