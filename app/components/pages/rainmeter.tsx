import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Gauge, Download, Settings, Monitor } from 'lucide-react'

export function RainmeterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rainmeter Skins</h1>
          <p className="text-muted-foreground">Enhance your desktop with beautiful system monitoring widgets</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-2">
        <Badge variant="default">All</Badge>
        <Badge variant="outline">System</Badge>
        <Badge variant="outline">Weather</Badge>
        <Badge variant="outline">Music</Badge>
        <Badge variant="outline">Gaming</Badge>
      </div>

      {/* Skins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" className="bg-white/90 text-black hover:bg-white">
                  <Download className="w-4 h-4 mr-2" />
                  Install
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Gauge className="w-4 h-4 text-green-600" />
                <h3 className="font-semibold text-sm">System Monitor {i + 1}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Beautiful system monitoring widget with CPU, RAM, and network stats
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">System</Badge>
                  <Badge variant="outline">4.8★</Badge>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rainmeter Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Monitor className="w-5 h-5 mr-2" />
            Rainmeter Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rainmeter is not installed or not running</p>
              <p className="text-xs text-muted-foreground mt-1">Install Rainmeter to use these skins</p>
            </div>
            <Button>Download Rainmeter</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
