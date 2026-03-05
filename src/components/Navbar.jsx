import React, { useState, useEffect, useRef } from 'react'
import { MenuIcon, XIcon, SunIcon, MoonIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollYRef = useRef(0)
  const closeTimerRef = useRef(null)
  const { isDark, toggleTheme } = useTheme()
  const { t } = useLanguage()

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#approach', label: t('nav.approach') },
    { href: '#contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) return
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)')
    const handleMediaChange = (event) => setIsMobile(event.matches)
    setIsMobile(media.matches)
    media.addEventListener('change', handleMediaChange)
    return () => media.removeEventListener('change', handleMediaChange)
  }, [])

  const lockBody = () => {
    const body = document.body
    const html = document.documentElement
    scrollYRef.current = window.scrollY || 0
    setScrolled(scrollYRef.current > 20)
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
  }

  const unlockBody = () => {
    const body = document.body
    const html = document.documentElement
    html.style.overflow = ''
    body.style.overflow = ''
    window.scrollTo(0, scrollYRef.current || 0)
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      unlockBody()
    }
  }, [])

  const openMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setIsOpen(true)
    setMenuVisible(true)
    requestAnimationFrame(() => lockBody())
  }

  const closeMenu = () => {
    setMenuVisible(false)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false)
      unlockBody()
    }, 250)
  }

  const handleMenuToggle = () => {
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const handleLinkClick = () => {
    closeMenu()
  }

  const scrolledDesktop = scrolled && !isMobile

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isOpen
          ? isDark
            ? 'bg-gray-950 shadow-[0_1px_20px_rgba(0,0,0,0.35)]'
            : 'bg-white shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : scrolled
            ? isDark
              ? 'bg-gray-900/95 backdrop-blur-lg shadow-[0_1px_20px_rgba(0,0,0,0.3)]'
              : 'bg-white/95 backdrop-blur-lg shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolledDesktop ? 'h-14 md:h-16 lg:h-[72px]' : 'h-16 md:h-20 lg:h-24'
        }`}>
          {/* Name — no logo icon, just the name prominently */}
          <a href="#" className="group min-h-[44px] flex items-center" aria-label="Home">
            <span
              className={`font-display font-bold leading-tight tracking-tight transition-all duration-500 ease-out group-hover:opacity-80 ${isDark ? 'text-white' : 'text-forest-800'}`}
              style={{ 
                fontSize: scrolledDesktop 
                  ? 'clamp(1.125rem, 0.95rem + 0.875vw, 1.5rem)' 
                  : 'clamp(1.5rem, 1.1rem + 2vw, 2.5rem)',
                transform: scrolledDesktop ? 'scale(1)' : 'scale(1)',
              }}
            >
              Dr. Sovan Mangal
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 xl:px-4 py-2.5 text-[0.9375rem] font-medium rounded-lg transition-all duration-200 min-h-[44px] flex items-center ${
                  isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-forest-700 hover:bg-forest-50'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ml-1 ${
                isDark ? 'bg-white/10 text-amber-300 hover:bg-white/20' : 'bg-forest-50 text-forest-700 hover:bg-forest-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon className="w-[18px] h-[18px]" /> : <MoonIcon className="w-[18px] h-[18px]" />}
            </button>

            <a href="#booking" className="btn-primary ml-2 !text-[0.875rem] !px-5 !py-2.5 !min-h-[42px]">
              {t('nav.book')}
            </a>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                isDark ? 'text-amber-300 hover:bg-white/10' : 'text-forest-700 hover:bg-forest-50'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon className="w-[18px] h-[18px]" /> : <MoonIcon className="w-[18px] h-[18px]" />}
            </button>

            <button
              onClick={handleMenuToggle}
              className={`w-11 h-11 flex items-center justify-center rounded-xl transition-colors -mr-1.5 ${
                isOpen
                  ? isDark
                    ? 'bg-white/10 text-white'
                    : 'bg-forest-50 text-forest-800'
                  : isDark
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-forest-50 text-forest-700'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 ${
          menuVisible ? 'visible' : 'invisible pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isDark ? 'bg-black/40' : 'bg-black/20'
          } ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div
          className={`absolute top-0 left-0 right-0 z-50 origin-top transition-transform duration-300 ${
            isDark ? 'bg-gray-950' : 'bg-white'
          } ${menuVisible ? 'translate-y-0' : '-translate-y-full'}`}
          style={{ transform: menuVisible ? 'translateY(0)' : 'translateY(-100%)' }}
        >
          <div
            className={`border-b ${
              isDark ? 'border-white/10' : 'border-black/5'
            }`}
          >
            <div className="section-container">
              <div className="flex items-center justify-between h-16">
                <span
                  className={`font-display font-bold leading-tight tracking-tight ${
                    isDark ? 'text-white' : 'text-forest-800'
                  }`}
                  style={{ fontSize: '1.25rem' }}
                >
                  Dr. Sovan Mangal
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleTheme}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                      isDark ? 'text-amber-300 hover:bg-white/10' : 'text-forest-700 hover:bg-forest-50'
                    }`}
                    aria-label="Toggle theme"
                  >
                    {isDark ? <SunIcon className="w-[18px] h-[18px]" /> : <MoonIcon className="w-[18px] h-[18px]" />}
                  </button>

                  <button
                    onClick={handleMenuToggle}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl transition-colors -mr-1.5 ${
                      isDark ? 'bg-white/10 text-white' : 'bg-forest-50 text-forest-800'
                    }`}
                    aria-label="Close menu"
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="section-container">
            <div className="py-4 flex flex-col items-center gap-1">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`w-full text-center font-medium rounded-xl py-3 min-h-[48px] flex items-center justify-center transition-all duration-300 text-[1.0625rem] ${
                    isDark ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-forest-600 hover:bg-forest-50'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${i * 50}ms` : '0ms',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={handleLinkClick}
                className="btn-primary mt-3 w-full max-w-xs text-center"
                style={{
                  transitionDelay: isOpen ? '250ms' : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                }}
              >
                {t('nav.book')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
