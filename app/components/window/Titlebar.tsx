import { useEffect } from 'react'
import { useWindowContext } from './WindowContext'
import { useTitlebarContext } from './TitlebarContext'
import { TitlebarMenu } from './TitlebarMenu'
import { useConveyor } from '@/app/hooks/use-conveyor'

// removed legacy SVG paths; buttons now rendered as styled dots

export const Titlebar = () => {
  const { title, icon, titleCentered, menuItems } = useWindowContext().titlebar
  const { menusVisible, setMenusVisible, closeActiveMenu } = useTitlebarContext()
  const { window: wcontext } = useWindowContext()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && menuItems?.length && !e.repeat) {
        if (menusVisible) closeActiveMenu()
        setMenusVisible(!menusVisible)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menusVisible, closeActiveMenu, setMenusVisible, menuItems])

  return (
    <div className={`window-titlebar ${wcontext?.platform ? `platform-${wcontext.platform}` : ''}`}>
      {wcontext?.platform === 'win32' && (
        <div className="window-titlebar-icon">
          <img src={icon} alt={title || ''} />
        </div>
      )}

      <div
        className="window-titlebar-title"
        {...(titleCentered && { 'data-centered': true })}
        data-hidden={menusVisible ? 'true' : 'false'}
      >
        {/* {title}  SamCux Electron Starter */}
      </div>
      {menusVisible && <TitlebarMenu />}
      {wcontext?.platform === 'win32' && <TitlebarControls />}
    </div>
  )
}

const TitlebarControls = () => {
  const { window: wcontext } = useWindowContext()

  return (
    <div className="window-titlebar-controls">
      {wcontext?.minimizable && <TitlebarControlButton label="minimize" />}
      {wcontext?.maximizable && <TitlebarControlButton label="maximize" />}
      <TitlebarControlButton label="close" />
    </div>
  )
}

const TitlebarControlButton = ({ label }: { label: string }) => {
  const { windowMinimize, windowMaximizeToggle, windowClose } = useConveyor('window')

  const handleAction = () => {
    const actions = {
      minimize: windowMinimize,
      maximize: windowMaximizeToggle,
      close: windowClose,
    }
    actions[label as keyof typeof actions]?.()
  }

  return (
    <div aria-label={label} className="titlebar-controlButton" onClick={handleAction}>
      <span className={`control-dot control-${label}`} />
    </div>
  )
}

export interface TitlebarProps {
  title: string
  titleCentered?: boolean
  icon?: string
  menuItems?: TitlebarMenu[]
}
