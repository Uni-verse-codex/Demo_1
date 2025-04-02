"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { Upload, Key, UserCircle, LogOut, CheckCircle } from "lucide-react"

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    bio: "",
    avatar_url: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      
      setIsLoading(true)
      try {
        // Get profile data from the profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          
        if (error) {
          throw error
        }
        
        if (data) {
          setProfileData({
            id: data.id || user.id,
            email: user.email || "",
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            bio: data.bio || "",
            avatar_url: data.avatar_url || "",
          })
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        toast({
          title: "Error loading profile",
          description: "Failed to load your profile data.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user, toast])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  const handleProfileUpdate = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          first_name: profileData.first_name,
          last_name: profileData.last_name, 
          bio: profileData.bio,
          updated_at: new Date(),
        })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error updating profile",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError("")
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }
    
    setIsLoading(true)
    try {
      // Update password
      const { data, error } = await supabase.auth.updateUser({ 
        password: passwordData.newPassword 
      })

      if (error) throw error

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error updating password:", error)
      setPasswordError("Failed to update password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${user?.id}-${Math.random()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    setIsLoading(true)
    try {
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Update user profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user?.id)

      if (updateError) throw updateError

      setProfileData({
        ...profileData,
        avatar_url: data.publicUrl,
      })

      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      })
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast({
        title: "Error uploading avatar",
        description: "Failed to upload your profile picture. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">My Profile</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-purple-900/20">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card className="bg-purple-900/20 border-purple-500/20 text-white">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription className="text-white/70">
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar section */}
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-full bg-purple-900/30 flex items-center justify-center">
                  {profileData.avatar_url ? (
                    <img 
                      src={profileData.avatar_url} 
                      alt="Profile Avatar" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-16 w-16 text-white/50" />
                  )}
                  
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Upload className="h-6 w-6 text-white" />
                    <span className="sr-only">Upload Avatar</span>
                  </label>
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    className="sr-only" 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium">
                    {profileData.first_name} {profileData.last_name}
                  </h3>
                  <p className="text-white/70">{profileData.email}</p>
                  <p className="text-white/70 mt-2">{profileData.bio || "No bio provided"}</p>
                </div>
              </div>

              {isEditing ? (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="first_name" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={profileData.first_name}
                      onChange={handleProfileChange}
                      className="col-span-3 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="last_name" className="text-right">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={profileData.last_name}
                      onChange={handleProfileChange}
                      className="col-span-3 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      disabled
                      className="col-span-3 bg-white/5 border-white/20 text-white/60"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bio" className="text-right">
                      Bio
                    </Label>
                    <Input
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      className="col-span-3 bg-white/5 border-white/20 text-white"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-sm text-white/60">First name</p>
                      <p>{profileData.first_name || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/60">Last name</p>
                      <p>{profileData.last_name || "-"}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white/60">Email</p>
                    <p>{profileData.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white/60">Bio</p>
                    <p>{profileData.bio || "No bio provided"}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleProfileUpdate} 
                    disabled={isLoading}
                    className="bg-purple-500/20 hover:bg-purple-500/30 text-white border-0"
                  >
                    {isLoading ? "Saving..." : "Save changes"}
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)} 
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-white border-0"
                >
                  Edit profile
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card className="bg-purple-900/20 border-purple-500/20 text-white">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription className="text-white/70">
                Manage your password and login settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-white/70">
                    Update your password to keep your account secure
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-transparent border-white/20 text-white hover:bg-white/10"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Change password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-purple-500/20 text-white">
                    <DialogHeader>
                      <DialogTitle>Change password</DialogTitle>
                      <DialogDescription className="text-white/70">
                        Make sure your new password is at least 6 characters.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePasswordUpdate}>
                      {passwordError && (
                        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md text-sm text-red-400 mb-4">
                          {passwordError}
                        </div>
                      )}
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="bg-white/5 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm new password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="bg-white/5 border-white/20 text-white"
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="ghost" 
                          type="button"
                          onClick={() => setIsDialogOpen(false)}
                          className="bg-transparent text-white hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={isLoading}
                          className="bg-purple-500/20 hover:bg-purple-500/30 text-white border-0"
                        >
                          {isLoading ? "Updating..." : "Update password"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <h3 className="font-medium">Account</h3>
                  <p className="text-sm text-white/70">
                    Sign out from your account
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-red-400"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 