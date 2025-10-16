import './styles/app.css'
import { ThemeProvider } from '@/app/components/theme-provider'
import { RouterProvider } from  './components/router-context'
import { AppLayout } from './components/layout/app-layout'

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider>
        <AppLayout />
      </RouterProvider>
    </ThemeProvider>
  )
}
