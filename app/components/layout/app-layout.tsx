import React, { useCallback, useRef, useState } from 'react'
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
  const [sidebarDockMode, setSidebarDockMode] = useState<'docked' | 'overlay'>('docked')
  const [overlayOpen, setOverlayOpen] = useState(false)
  const hideTimerRef = useRef<number | null>(null)

  const handleNavigate = (path: string) => {
    navigate(path as any)
    if (sidebarDockMode === 'overlay') setOverlayOpen(false)
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

  const handleToggleDock = useCallback(() => {
    if (sidebarDockMode === 'docked') {
      setSidebarDockMode('overlay')
      setOverlayOpen(true)
    } else {
      setSidebarDockMode('docked')
      setOverlayOpen(false)
    }
  }, [sidebarDockMode])

  const openOverlay = useCallback(() => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
    if (sidebarDockMode === 'overlay') setOverlayOpen(true)
  }, [sidebarDockMode])

  const closeOverlay = useCallback(() => {
    if (sidebarDockMode === 'overlay') setOverlayOpen(false)
  }, [sidebarDockMode])

  return (
    <div className="relative z-10 overflow-hidden h-screen p-2">
      <div className="flex h-full">
        {/* Sidebar (docked) */}
        {sidebarDockMode === 'docked' && (
          <div className="transition-transform duration-300 ease-in-out">
            <Sidebar
              currentPath={currentRoute}
              onNavigate={handleNavigate}
              mode={sidebarDockMode}
              onToggleDock={handleToggleDock}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 main-content rounded-2xl overflow-hidden flex flex-col relative">
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
          {/* Hover edge to reveal sidebar when overlay mode */}
          {sidebarDockMode === 'overlay' && (
            <div className="absolute inset-y-0 left-0 w-2 cursor-ew-resize" onMouseEnter={openOverlay} />
          )}
        </div>
      </div>

      {/* Overlay Sidebar (panel-only blur) */}
      {sidebarDockMode === 'overlay' && (
        <>
          {/* Sidebar panel */}
          <div
            className={
              'fixed left-2 top-2 bottom-2 z-20 transition-transform duration-300 ease-in-out rounded-2xl shadow-3xl acrylic-panel ' +
              (overlayOpen ? 'translate-x-0' : '-translate-x-[110%]')
            }
            onMouseLeave={() => {
              // small delay to avoid accidental hide when moving between items
              if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
              hideTimerRef.current = window.setTimeout(() => {
                closeOverlay()
              }, 200)
            }}
            onMouseEnter={openOverlay}
          >
            <Sidebar
              currentPath={currentRoute}
              onNavigate={handleNavigate}
              mode={sidebarDockMode}
              onToggleDock={handleToggleDock}
            />
          </div>
        </>
      )}
    </div>
  )
}
