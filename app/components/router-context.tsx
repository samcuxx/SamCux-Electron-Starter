import React, { createContext, useContext, useState, ReactNode } from 'react'

type Route = '/' | '/wallpapers' | '/downloads' | '/rainmeter' | '/feedback' | '/settings'

interface RouterContextType {
  currentRoute: Route
  navigate: (route: Route) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

interface RouterProviderProps {
  children: ReactNode
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>('/')

  const navigate = (route: Route) => {
    setCurrentRoute(route)
  }

  return <RouterContext.Provider value={{ currentRoute, navigate }}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}
