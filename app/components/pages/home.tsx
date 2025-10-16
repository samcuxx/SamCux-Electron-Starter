import React from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Image, Gauge, ArrowRight, Sparkles, ChevronRight } from 'lucide-react'

interface HomePageProps {
  onNavigate?: (path: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const navigateToWallpapers = () => onNavigate?.('/wallpapers')
  const navigateToRainmeter = () => onNavigate?.('/rainmeter')

  return (
    <div className="flex flex-col items-center justify-center space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <div className="space-y-4 animate-fade-in-delay">
          <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight tracking-tight">
            WinCux
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your desktop with beautiful wallpapers and powerful Rainmeter skins. Simple, elegant,
            professional.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-delay">
          <Button
            size="lg"
            onClick={navigateToWallpapers}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center">
              <Image className="w-5 h-5 mr-3" />
              Browse Wallpapers
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button
            size="lg"
            onClick={navigateToRainmeter}
            variant="outline"
            className="group border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-400 px-8 py-6 text-lg font-semibold transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-50 dark:bg-purple-900/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center">
              <Gauge className="w-5 h-5 mr-3" />
              Explore Skins
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto px-4">
        <Card
          onClick={navigateToWallpapers}
          className="group cursor-pointer border-0 bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-950/80 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:shadow-xl"
        >
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Image className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Wallpaper Gallery</h3>
                <p className="text-muted-foreground">1M+ curated wallpapers</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Discover stunning 4K wallpapers across multiple categories. From nature to abstract, find the perfect
              backdrop for your workspace.
            </p>
            <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              Explore Gallery
              <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>

        <Card
          onClick={navigateToRainmeter}
          className="group cursor-pointer border-0 bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-950/80 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:shadow-xl"
        >
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Gauge className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rainmeter Skins</h3>
                <p className="text-muted-foreground">2,400+ monitoring widgets</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Enhance your desktop with beautiful system monitoring widgets. Track performance, weather, and more with
              style.
            </p>
            <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
              View Skins
              <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
