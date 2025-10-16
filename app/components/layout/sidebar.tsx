import React from 'react'
import { cn } from '@/lib/utils'
import { Home, Image, Gauge, Settings, Download, MessageCircle, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

const navigation = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    name: 'Wallpapers',
    href: '/wallpapers',
    icon: Image,
    gradient: 'from-blue-600 to-purple-600',
  },
  {
    name: 'Downloads',
    href: '/downloads',
    icon: Download,
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    name: 'Rainmeter',
    href: '/rainmeter',
    icon: Gauge,
    gradient: 'from-green-600 to-blue-600',
  },
  {
    name: 'Feedback',
    href: '/feedback',
    icon: MessageCircle,
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    gradient: 'from-orange-500 to-red-500',
  },
]

interface SidebarProps {
  currentPath?: string
  onNavigate?: (path: string) => void
  mode?: 'docked' | 'overlay'
  onToggleDock?: () => void
}

export function Sidebar({ currentPath = '/', onNavigate, mode = 'docked', onToggleDock }: SidebarProps) {
  // Function to determine if a navigation item is active
  const isActiveRoute = (href: string) => {
    if (href === '/') {
      // Home page - exact match only
      return currentPath === '/' || currentPath === ''
    }
    // Other pages - match if pathname starts with the href
    return currentPath.startsWith(href)
  }

  // Handle navigation click
  const handleNavClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
    }
  }

  return (
    <div className="w-55 flex flex-col relative">
      {/* Header with toggle button */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-end">
        <button
          type="button"
          onClick={onToggleDock}
          className="no-drag inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-200/60 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm"
          aria-label={mode === 'docked' ? 'Undock sidebar' : 'Dock sidebar'}
        >
          {mode === 'docked' ? (
            <PanelLeftClose className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          ) : (
            <PanelLeftOpen className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>
      {/* Navigation */}
      <nav className="flex-1 pb-4 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = isActiveRoute(item.href)

          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                'flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-200 group relative w-full text-left',
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 text-blue-700 dark:text-blue-300 shadow-sm'
                  : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200',
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} shadow-lg`
                    : 'bg-gray-200/50 dark:bg-gray-700/50 group-hover:bg-gradient-to-r group-hover:' + item.gradient
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-colors duration-200 rounded',
                    isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-white'
                  )}
                />
              </div>
              <span
                className={cn(
                  'font-medium transition-colors duration-200',
                  isActive ? 'text-blue-700 dark:text-blue-300' : ''
                )}
              >
                {item.name}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
