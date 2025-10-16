import React from 'react'
import { cn } from '@/lib/utils'
import { Home, Image, Gauge, Settings, Download, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip'

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
}

export function Sidebar({ currentPath = '/', onNavigate }: SidebarProps) {
  const [compact, setCompact] = React.useState(false)
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
    <div className={cn(compact ? 'w-16' : 'w-55', 'flex flex-col transition-[width] duration-200')}>
      <div className={cn('px-3 py-3 flex items-center', compact ? 'justify-center' : 'justify-end')}>
        <button
          aria-label={compact ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCompact((v) => !v)}
          className={cn(
            'h-8 w-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-colors duration-200'
          )}
        >
          {compact ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      {/* Navigation */}
      <nav className={cn('flex-1 pb-4 space-y-2', compact ? 'px-2' : 'px-4')}>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = isActiveRoute(item.href)

          const button = (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                'flex items-center rounded-full transition-all duration-200 group relative w-full text-left will-change-transform',
                compact ? 'justify-center px-0 py-1' : 'px-2 py-1',
                !compact && isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 text-blue-700 dark:text-blue-300 shadow-sm'
                  : !compact
                    ? 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                    : 'text-gray-700 dark:text-gray-300'
              )}
              title={item.name}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 flex-none transform-gpu',
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} shadow-lg`
                    : 'bg-gray-200/50 dark:bg-gray-700/50 group-hover:bg-gradient-to-r group-hover:' + item.gradient,
                  compact && isActive ? 'ring-2 ring-blue-400/60 ring-offset-2 ring-offset-transparent' : ''
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-colors duration-200 rounded transform-gpu group-hover:scale-105',
                    isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-white'
                  )}
                />
              </div>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200 transform-gpu',
                  compact ? 'w-0 opacity-0 ml-0 -translate-x-1' : 'w-auto opacity-100 ml-3 translate-x-0'
                )}
              >
                <span
                  className={cn('font-medium whitespace-nowrap', isActive ? 'text-blue-700 dark:text-blue-300' : '')}
                >
                  {item.name}
                </span>
              </div>
            </button>
          )
          return compact ? (
            <TooltipProvider key={item.name}>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right" className="backdrop-blur-light dropdown-shadow">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            button
          )
        })}
      </nav>
    </div>
  )
}
