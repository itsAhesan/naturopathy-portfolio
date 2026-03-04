import React, { useState, useEffect } from 'react'
import { MenuIcon, XIcon, SunIcon, MoonIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { t } = useLanguage()

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#approach', label: t('nav.approach') },
    { href: '#contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleLinkClick = () => setIsOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'bg-gray-900/90 backdrop-blur-lg shadow-[0_1px_20px_rgba(0,0,0,0.3)]'
            : 'bg-white/90 backdrop-blur-lg shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-14 md:h-16 lg:h-[72px]' : 'h-16 md:h-20 lg:h-24'
        }`}>
          {/* Name — no logo icon, just the name prominently */}
          <a href="#" className="group min-h-[44px] flex items-center" aria-label="Home">
            <span
              className={`font-display font-bold leading-tight tracking-tight transition-all duration-500 ease-out group-hover:opacity-80 ${isDark ? 'text-white' : 'text-forest-800'}`}
              style={{ 
                fontSize: scrolled 
                  ? 'clamp(1.125rem, 0.95rem + 0.875vw, 1.5rem)' 
                  : 'clamp(1.5rem, 1.1rem + 2vw, 2.5rem)',
                transform: scrolled ? 'scale(1)' : 'scale(1)',
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
              onClick={() => setIsOpen(!isOpen)}
              className={`w-11 h-11 flex items-center justify-center rounded-xl transition-colors -mr-1.5 ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-forest-50'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XIcon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-forest-700'}`} />
              ) : (
                <MenuIcon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-forest-700'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 backdrop-blur-xl transition-all duration-300 ${
          isDark ? 'bg-gray-950/95' : 'bg-white/95'
        } ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        style={{ top: scrolled ? '56px' : '64px' }}
      >
        <div className="h-full flex flex-col items-center justify-center pb-20 px-6 md:px-12">
          <div className="w-full max-w-md flex flex-col items-center gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`w-full text-center font-medium rounded-xl py-3.5 min-h-[48px] flex items-center justify-center transition-all duration-300 text-[1.0625rem] ${
                  isDark ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-forest-600 hover:bg-forest-50'
                }`}
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={handleLinkClick}
              className="btn-primary mt-5 w-full max-w-xs text-center"
              style={{
                transitionDelay: isOpen ? '250ms' : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              {t('nav.book')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
