import React from 'react'
import type { Preferences } from '../../../shared/types'

interface HeaderProps {
  onSettings: () => void
  onClear: () => void
  theme: Preferences['theme']
  onToggleTheme: () => void
}

export default function Header({ onSettings, onClear, theme, onToggleTheme }: HeaderProps) {
  return (
    <div className="header">
      <div className="header-left">
        <div className="header-logo">P</div>
        <span className="header-title">Page Agent</span>
      </div>
      <div className="header-right">
        <button className="header-btn" onClick={onClear} title="Clear">
          <svg className="icon-md" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M3 4h10l-.8 9.5H3.8zM5.5 6.5v5M8 6.5v5M10.5 6.5v5M2 4h12M6 4V2.5h4V4" />
          </svg>
        </button>
        <button className="header-btn" onClick={onToggleTheme} title="Toggle Theme">
          {theme === 'dark' ? (
            <svg className="icon-md" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
            </svg>
          ) : (
            <svg className="icon-md" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M13.2 9.5A5.5 5.5 0 1 1 6.5 2.8a4.2 4.2 0 0 0 6.7 6.7Z" />
            </svg>
          )}
        </button>
        <button className="header-btn" onClick={onSettings} title="Settings">
          <svg className="icon-md" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="8" cy="8" r="2" />
            <path d="M6.8 1.5l-.3 1.4a4.5 4.5 0 0 0-1.4.8L3.8 3.2l-1.2 2 1 1.1a4.5 4.5 0 0 0 0 1.6l-1 1.1 1.2 2 1.3-.5a4.5 4.5 0 0 0 1.4.8l.3 1.4h2.4l.3-1.4a4.5 4.5 0 0 0 1.4-.8l1.3.5 1.2-2-1-1.1a4.5 4.5 0 0 0 0-1.6l1-1.1-1.2-2-1.3.5a4.5 4.5 0 0 0-1.4-.8L9.2 1.5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
