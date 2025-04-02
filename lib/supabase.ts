import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Throw an error early if environment variables are not set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password })
    return { data, error }
  } catch (err) {
    console.error('Supabase signUp error:', err)
    return { data: null, error: err }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  } catch (err) {
    console.error('Supabase signIn error:', err)
    return { data: null, error: err }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (err) {
    console.error('Supabase signOut error:', err)
    return { error: err }
  }
}

export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined,
    })
    return { data, error }
  } catch (err) {
    console.error('Supabase resetPassword error:', err)
    return { data: null, error: err }
  }
}

export const updatePassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword })
    return { data, error }
  } catch (err) {
    console.error('Supabase updatePassword error:', err)
    return { data: null, error: err }
  }
}

// User profile helpers
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  } catch (err) {
    console.error('Supabase getUserProfile error:', err)
    return { data: null, error: err }
  }
}

export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
    return { data, error }
  } catch (err) {
    console.error('Supabase updateUserProfile error:', err)
    return { data: null, error: err }
  }
}

// Messages helpers
export const sendMessage = async (message: any) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
    return { data, error }
  } catch (err) {
    console.error('Supabase sendMessage error:', err)
    return { data: null, error: err }
  }
}

export const getConversation = async (conversationId: string) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
    return { data, error }
  } catch (err) {
    console.error('Supabase getConversation error:', err)
    return { data: null, error: err }
  }
}

export const getUserConversations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order('updated_at', { ascending: false })
    return { data, error }
  } catch (err) {
    console.error('Supabase getUserConversations error:', err)
    return { data: null, error: err }
  }
}