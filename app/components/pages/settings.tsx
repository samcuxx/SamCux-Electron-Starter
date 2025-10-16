import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Switch } from '@/app/components/ui/switch'
import { Badge } from '@/app/components/ui/badge'
import { Settings, Download, Bell, Shield, Palette, Monitor } from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your WinCux experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto-start with Windows</h3>
                <p className="text-sm text-muted-foreground">Launch WinCux when Windows starts</p>
              </div>
              <Switch aria-label="Auto-start with Windows" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Minimize to tray</h3>
                <p className="text-sm text-muted-foreground">Keep WinCux running in the background</p>
              </div>
              <Switch defaultChecked aria-label="Minimize to tray" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Check for updates</h3>
                <p className="text-sm text-muted-foreground">Automatically check for app updates</p>
              </div>
              <Switch defaultChecked aria-label="Check for updates" />
            </div>
          </CardContent>
        </Card>

        {/* Download Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Downloads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Download Location</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="C:\Users\SamCux\Downloads\WinCux"
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                  readOnly
                  aria-label="Download location path"
                />
                <Button variant="outline" size="sm">
                  Browse
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto-download quality</h3>
                <p className="text-sm text-muted-foreground">Automatically download highest quality available</p>
              </div>
              <Switch defaultChecked aria-label="Auto-download quality" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Download limit</h3>
                <p className="text-sm text-muted-foreground">Maximum concurrent downloads</p>
              </div>
              <Badge variant="outline">3</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Theme</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Light
                </Button>
                <Button variant="outline" size="sm">
                  Dark
                </Button>
                <Button size="sm">System</Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Compact mode</h3>
                <p className="text-sm text-muted-foreground">Use smaller interface elements</p>
              </div>
              <Switch aria-label="Compact mode" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Animations</h3>
                <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
              </div>
              <Switch defaultChecked aria-label="Animations" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Download notifications</h3>
                <p className="text-sm text-muted-foreground">Notify when downloads complete</p>
              </div>
              <Switch defaultChecked aria-label="Download notifications" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Update notifications</h3>
                <p className="text-sm text-muted-foreground">Notify about app updates</p>
              </div>
              <Switch defaultChecked aria-label="Update notifications" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sound notifications</h3>
                <p className="text-sm text-muted-foreground">Play sound for notifications</p>
              </div>
              <Switch aria-label="Sound notifications" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Advanced
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Cache Management</h3>
              <p className="text-sm text-muted-foreground mb-3">Manage cached wallpapers and thumbnails</p>
              <Button variant="outline" size="sm">
                Clear Cache
              </Button>
            </div>

            <div>
              <h3 className="font-medium mb-2">Reset Settings</h3>
              <p className="text-sm text-muted-foreground mb-3">Reset all settings to default values</p>
              <Button variant="destructive" size="sm">
                Reset All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
