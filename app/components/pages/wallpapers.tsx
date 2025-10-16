import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Image, Search, Filter, Download } from 'lucide-react'

export function WallpapersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wallpapers</h1>
          <p className="text-muted-foreground">Discover and download beautiful wallpapers</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search wallpapers..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">4K</Badge>
              <Badge variant="outline">Nature</Badge>
              <Badge variant="outline">Abstract</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallpaper Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" className="bg-white/90 text-black hover:bg-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-2">Wallpaper {i + 1}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>4K • 1920x1080</span>
                <Badge variant="secondary">Nature</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">Load More Wallpapers</Button>
      </div>
    </div>
  )
}
