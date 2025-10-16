import React from 'react'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Sidebar } from './sidebar'
import { Titlebar } from '../window/Titlebar'
import { TitlebarContextProvider } from '../window/TitlebarContext'
import { useRouter } from '../router-context'
import { HomePage } from '../pages/home'
import { WallpapersPage } from '../pages/wallpapers'
import { RainmeterPage } from '../pages/rainmeter'
import { DownloadsPage } from '../pages/downloads'
import { SettingsPage } from '../pages/settings'
import { FeedbackPage } from '../pages/feedback'

export function AppLayout() {
  const { currentRoute, navigate } = useRouter()

  const handleNavigate = (path: string) => {
    navigate(path as any)
  }

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />
      case '/wallpapers':
        return <WallpapersPage />
      case '/rainmeter':
        return <RainmeterPage />
      case '/downloads':
        return <DownloadsPage />
      case '/settings':
        return <SettingsPage />
      case '/feedback':
        return <FeedbackPage />
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="flex z-10 overflow-hidden h-screen p-2">
      {/* Sidebar */}
      <Sidebar currentPath={currentRoute} onNavigate={handleNavigate} />

      {/* Main Content */}
      <div className="flex-1 main-content rounded-2xl overflow-hidden flex flex-col">
        {/* Title Bar */}
        <div className="flex-shrink-0">
          <TitlebarContextProvider>
            <Titlebar />
          </TitlebarContextProvider>
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1 custom-scrollbar bg-background overflow-hidden">
          <div className="p-6">{renderPage()}</div>
        </ScrollArea>
      </div>
    </div>
  )
}
