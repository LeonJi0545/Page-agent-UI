import React, { useEffect, useState } from 'react'
import { getPreferences, setPreferences } from '../../shared/storage'
import { setLocale, useT, type Locale } from '../../shared/i18n'
import type { Preferences } from '../../shared/types'

export default function Popup() {
  const [language, setLanguage] = useState<Locale>('zh-CN')
  const [theme, setTheme] = useState<Preferences['theme']>('dark')
  const t = useT(language)

  // Apply the theme attribute to <html> so CSS [data-theme] selectors work
  const applyTheme = (t: Preferences['theme']) => {
    document.documentElement.setAttribute('data-theme', t)
  }

  useEffect(() => {
    getPreferences().then((prefs) => {
      setLanguage(prefs.language)
      setLocale(prefs.language)
      const savedTheme = prefs.theme ?? 'dark'
      setTheme(savedTheme)
      applyTheme(savedTheme)
    })
  }, [])

  const openPanel = () => {
    chrome.runtime.sendMessage({ type: 'OPEN_SIDE_PANEL' })
    window.close()
  }

  const openSettings = () => {
    chrome.runtime.openOptionsPage()
    window.close()
  }

  const changeTheme = async () => {
    // Toggle between dark and light
    const next: Preferences['theme'] = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    // Persist the new preference
    const prefs = await getPreferences()
    await setPreferences({ ...prefs, theme: next })
  }

  return (
    <div className="popup">
      <div className="popup-header">
        <div className="popup-logo">P</div>
        <span className="popup-title">Page Agent</span>
      </div>
      <div className="popup-body">
        <button className="popup-btn primary" onClick={openPanel}>
          <svg className="popup-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <rect x="1" y="2" width="14" height="12" rx="2" />
            <line x1="10" y1="2" x2="10" y2="14" />
          </svg>
          {t('openPanel')}
        </button>
        <button className="popup-btn" onClick={openSettings}>
          <svg className="popup-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.36.07-.73.07-1.08s-.03-.73-.07-1.08l2.32-1.82c.21-.16.27-.45.13-.68l-2.2-3.81c-.13-.23-.42-.31-.65-.23l-2.73 1.1c-.57-.44-1.18-.8-1.84-1.08L14.16 2.1C14.1 1.84 13.86 1.6 13.6 1.6h-4.4c-.26 0-.5.24-.56.5L8.28 4.72C7.62 5 7 5.36 6.44 5.8L3.71 4.7c-.23-.08-.52 0-.65.23L.86 8.74c-.14.23-.08.52.13.68l2.32 1.82C3.27 11.6 3.24 11.97 3.24 12.33s.03.73.07 1.08L1 15.23c-.21.16-.27.45-.13.68l2.2 3.81c.13.23.42.31.65.23l2.73-1.1c.57.44 1.18.8 1.84 1.08l.36 2.62c.06.26.3.5.56.5h4.4c.26 0 .5-.24.56-.5l.36-2.62c.66-.28 1.27-.64 1.84-1.08l2.73 1.1c.23.08.52 0 .65-.23l2.2-3.81c.14-.23.08-.52-.13-.68l-2.32-1.82Z" />
          </svg>
          {t('settings')}
        </button>
        <button className="popup-btn" onClick={changeTheme}>
          {theme === 'dark' ? (
            // Sun icon — switch to light
            <svg className="popup-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1ZM4.22 4.22a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42Zm13.44 13.44a1 1 0 0 1 1.41 0l.71.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42ZM3 12a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1Zm16 0a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 19.78a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 1.41l-.71.71a1 1 0 0 1-1.41 0Zm13.44-13.44a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 1.42l-.71.7a1 1 0 0 1-1.41 0Z" />
            </svg>
          ) : (
            // Moon icon — switch to dark
            <svg className="popup-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
          )}
          {t('theme')}
        </button>
      </div>
    </div>
  )
}
