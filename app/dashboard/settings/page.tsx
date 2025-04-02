import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Lock, User, Moon } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-white/70">Manage your account preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-400" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription className="text-white/60">Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Display Name
              </Label>
              <Input id="name" defaultValue="Admin" className="bg-white/5 border-white/20 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="admin@chatter.com"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-400" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription className="text-white/60">Manage your security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-white">
                Current Password
              </Label>
              <Input id="current-password" type="password" className="bg-white/5 border-white/20 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white">
                New Password
              </Label>
              <Input id="new-password" type="password" className="bg-white/5 border-white/20 text-white" />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-400" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription className="text-white/60">Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">{setting.label}</Label>
                  <p className="text-sm text-white/60">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.defaultChecked} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-purple-400" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription className="text-white/60">Customize your interface</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {appearanceSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">{setting.label}</Label>
                  <p className="text-sm text-white/60">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.defaultChecked} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const notificationSettings = [
  {
    label: "Push Notifications",
    description: "Receive notifications when you get new messages",
    defaultChecked: true,
  },
  {
    label: "Email Notifications",
    description: "Get email updates for important activities",
    defaultChecked: false,
  },
  {
    label: "Sound",
    description: "Play sound when receiving messages",
    defaultChecked: true,
  },
]

const appearanceSettings = [
  {
    label: "Dark Mode",
    description: "Use dark theme across the application",
    defaultChecked: true,
  },
  {
    label: "Compact View",
    description: "Show more content in less space",
    defaultChecked: false,
  },
  {
    label: "Animations",
    description: "Enable interface animations",
    defaultChecked: true,
  },
]

