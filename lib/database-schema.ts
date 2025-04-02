// This file contains TypeScript types for our Supabase database schema
// We can also set up our database schema with SQL if we have access to the Supabase dashboard

export type Profile = {
  id: string
  email: string
  first_name?: string
  last_name?: string
  bio?: string
  avatar_url?: string
  created_at: string
  updated_at?: string
}

export type Conversation = {
  id: string
  created_at: string
  updated_at: string
  title: string
  user1_id: string
  user2_id: string
  last_message_text?: string
  last_message_time?: string
}

export type Message = {
  id: string
  created_at: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  content: string
  read: boolean
}

/*
-- SQL to create these tables in Supabase:

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create RLS policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create trigger to create profile on signup
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE create_profile_on_signup();

-- Create conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT,
  user1_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  last_message_text TEXT,
  last_message_time TIMESTAMP WITH TIME ZONE
);

-- Create RLS policies for conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations" 
ON conversations FOR SELECT 
USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can insert their own conversations" 
ON conversations FOR INSERT 
WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can update their own conversations" 
ON conversations FOR UPDATE 
USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Create messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE
);

-- Create RLS policies for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their conversations" 
ON messages FOR SELECT 
USING (
  auth.uid() IN (
    SELECT user1_id FROM conversations WHERE id = conversation_id
    UNION
    SELECT user2_id FROM conversations WHERE id = conversation_id
  )
);

CREATE POLICY "Users can insert messages in their conversations" 
ON messages FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id AND
  auth.uid() IN (
    SELECT user1_id FROM conversations WHERE id = conversation_id
    UNION
    SELECT user2_id FROM conversations WHERE id = conversation_id
  )
);

-- Create function to update conversation when message is inserted
CREATE OR REPLACE FUNCTION update_conversation_on_message_insert()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET 
    last_message_text = NEW.content,
    last_message_time = NEW.created_at,
    updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_message_inserted
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE PROCEDURE update_conversation_on_message_insert();
*/ 