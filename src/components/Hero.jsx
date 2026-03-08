import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ArrowRightIcon, ChevronDownIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

/* Rich botanical SVG background for a naturopathy portfolio */
function NaturopathyBg({ isDark }) {
  const leaf = isDark ? 'rgba(64,145,108,0.07)' : 'rgba(45,106,79,0.045)'
  const leafStroke = isDark ? 'rgba(82,183,136,0.06)' : 'rgba(82,183,136,0.04)'
  const herb = isDark ? 'rgba(64,145,108,0.05)' : 'rgba(45,106,79,0.03)'
  const dot = isDark ? 'rgba(82,183,136,0.06)' : 'rgba(45,106,79,0.035)'
  const wave = isDark ? 'rgba(64,145,108,0.04)' : 'rgba(45,106,79,0.025)'

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* 1. Base gradient */}
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-forest-900/20'
          : 'bg-gradient-to-br from-cream-50 via-[#f0f7f2] to-sage-100/30'
      }`} />

      {/* 2. Soft ambient glows */}
      <div className={`absolute top-[5%] right-[5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px] animate-float ${
        isDark ? 'bg-forest-800/15' : 'bg-forest-200/25'
      }`} />
      <div className={`absolute bottom-[5%] left-[0%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full blur-[100px] animate-float ${
        isDark ? 'bg-sage-900/12' : 'bg-sage-200/20'
      }`} style={{ animationDelay: '-3s' }} />
      <div className={`absolute top-[40%] left-[50%] w-[30vw] h-[30vw] max-w-[350px] max-h-[350px] rounded-full blur-[80px] animate-pulse-soft ${
        isDark ? 'bg-forest-700/8' : 'bg-forest-300/10'
      }`} />

      {/* 3. Botanical SVG pattern — leaves, herbs, branches */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Large leaf */}
          <pattern id="hero-leaves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(-15)">
            {/* Main leaf shape */}
            <path d="M100 20 C100 20 75 50 75 90 C75 110 85 120 100 120 C115 120 125 110 125 90 C125 50 100 20 100 20Z" fill={leaf} />
            {/* Central vein */}
            <line x1="100" y1="30" x2="100" y2="110" stroke={leafStroke} strokeWidth="0.8" />
            {/* Side veins */}
            <path d="M88 55 Q94 60 100 68" stroke={leafStroke} strokeWidth="0.5" fill="none" />
            <path d="M112 55 Q106 60 100 68" stroke={leafStroke} strokeWidth="0.5" fill="none" />
            <path d="M85 75 Q92 78 100 85" stroke={leafStroke} strokeWidth="0.5" fill="none" />
            <path d="M115 75 Q108 78 100 85" stroke={leafStroke} strokeWidth="0.5" fill="none" />
            {/* Small herb sprig */}
            <line x1="40" y1="170" x2="40" y2="140" stroke={herb} strokeWidth="0.8" />
            <circle cx="40" cy="138" r="2.5" fill={herb} />
            <circle cx="34" cy="148" r="2" fill={herb} />
            <circle cx="46" cy="148" r="2" fill={herb} />
            <circle cx="32" cy="158" r="1.5" fill={herb} />
            <circle cx="48" cy="158" r="1.5" fill={herb} />
            {/* Small mortar circle hint */}
            <circle cx="160" cy="160" r="12" fill="none" stroke={herb} strokeWidth="0.6" />
            <path d="M155 160 Q160 152 165 160" stroke={herb} strokeWidth="0.6" fill="none" />
          </pattern>

          {/* Flowing organic waves */}
          <pattern id="hero-waves" x="0" y="0" width="300" height="150" patternUnits="userSpaceOnUse">
            <path d="M0 80 Q75 40 150 80 Q225 120 300 80" stroke={wave} strokeWidth="1" fill="none" />
            <path d="M0 100 Q75 60 150 100 Q225 140 300 100" stroke={wave} strokeWidth="0.6" fill="none" />
          </pattern>

          {/* Dot grid for texture */}
          <pattern id="hero-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="0.8" fill={dot} />
          </pattern>
        </defs>

        {/* Layer order: waves → leaves → dots */}
        <rect width="100%" height="100%" fill="url(#hero-waves)" />
        <rect width="100%" height="100%" fill="url(#hero-leaves)" />
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* 4. Decorative corner botanicals — larger standalone leaves */}
      <svg className="absolute top-12 left-6 w-24 h-24 xs:w-32 xs:h-32 md:w-40 md:h-40 opacity-[0.06] dark:opacity-[0.04]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 C50 5 20 25 20 55 C20 75 32 85 50 85 C68 85 80 75 80 55 C80 25 50 5 50 5Z" fill={isDark ? '#52b788' : '#2d6a4f'} />
        <path d="M50 15 V75" stroke={isDark ? '#82c9a5' : '#40916c'} strokeWidth="1.2" />
        <path d="M35 35 Q42 40 50 52" stroke={isDark ? '#82c9a5' : '#40916c'} strokeWidth="0.8" fill="none" />
        <path d="M65 35 Q58 40 50 52" stroke={isDark ? '#82c9a5' : '#40916c'} strokeWidth="0.8" fill="none" />
        <path d="M32 50 Q40 53 50 62" stroke={isDark ? '#82c9a5' : '#40916c'} strokeWidth="0.8" fill="none" />
        <path d="M68 50 Q60 53 50 62" stroke={isDark ? '#82c9a5' : '#40916c'} strokeWidth="0.8" fill="none" />
      </svg>

      <svg className="absolute bottom-20 right-6 w-20 h-20 xs:w-28 xs:h-28 md:w-36 md:h-36 opacity-[0.05] dark:opacity-[0.03] rotate-[30deg]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C50 10 25 30 25 60 C25 78 35 88 50 88 C65 88 75 78 75 60 C75 30 50 10 50 10Z" fill={isDark ? '#52b788' : '#2d6a4f'} />
        <path d="M50 20 V78" stroke={isDark ? '#82c9a5' : '#40916c'} strokeWidth="1" />
      </svg>

      {/* Small branch — top right */}
      <svg className="absolute top-[20%] right-[8%] w-16 h-16 xs:w-20 xs:h-20 md:w-28 md:h-28 opacity-[0.05] dark:opacity-[0.03]" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 75 Q42 50 55 30 Q60 20 58 10" stroke={isDark ? '#52b788' : '#2d6a4f'} strokeWidth="1.5" fill="none" />
        <circle cx="58" cy="10" r="4" fill={isDark ? 'rgba(82,183,136,0.15)' : 'rgba(45,106,79,0.08)'} />
        <path d="M48 45 Q38 35 30 38" stroke={isDark ? '#52b788' : '#2d6a4f'} strokeWidth="1" fill="none" />
        <circle cx="28" cy="38" r="3" fill={isDark ? 'rgba(82,183,136,0.12)' : 'rgba(45,106,79,0.06)'} />
        <path d="M52 35 Q60 28 65 30" stroke={isDark ? '#52b788' : '#2d6a4f'} strokeWidth="1" fill="none" />
        <circle cx="67" cy="30" r="3" fill={isDark ? 'rgba(82,183,136,0.12)' : 'rgba(45,106,79,0.06)'} />
      </svg>

      {/* Herb sprig — bottom left */}
      <svg className="absolute bottom-[15%] left-[5%] w-14 h-14 xs:w-20 xs:h-20 md:w-24 md:h-24 opacity-[0.06] dark:opacity-[0.04] -rotate-12" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 75 L30 20" stroke={isDark ? '#52b788' : '#2d6a4f'} strokeWidth="1.5" />
        <ellipse cx="22" cy="25" rx="8" ry="12" transform="rotate(-20 22 25)" fill={isDark ? 'rgba(82,183,136,0.1)' : 'rgba(45,106,79,0.05)'} />
        <ellipse cx="38" cy="30" rx="8" ry="12" transform="rotate(20 38 30)" fill={isDark ? 'rgba(82,183,136,0.1)' : 'rgba(45,106,79,0.05)'} />
        <ellipse cx="22" cy="45" rx="7" ry="10" transform="rotate(-15 22 45)" fill={isDark ? 'rgba(82,183,136,0.08)' : 'rgba(45,106,79,0.04)'} />
        <ellipse cx="38" cy="48" rx="7" ry="10" transform="rotate(15 38 48)" fill={isDark ? 'rgba(82,183,136,0.08)' : 'rgba(45,106,79,0.04)'} />
        <ellipse cx="30" cy="15" rx="6" ry="10" fill={isDark ? 'rgba(82,183,136,0.12)' : 'rgba(45,106,79,0.06)'} />
      </svg>

      {/* 5. Bottom fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-40 ${
        isDark ? 'bg-gradient-to-t from-gray-950 to-transparent' : 'bg-gradient-to-t from-cream-50 to-transparent'
      }`} />
    </div>
  )
}

export default function Hero() {
  const [ref, isVisible] = useScrollAnimation(0.1)
  const { isDark } = useTheme()
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center overflow-hidden ${isDark ? 'bg-gray-950' : ''}`}
    >
      <NaturopathyBg isDark={isDark} />

      <div className="section-container w-full relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center pt-20 xs:pt-24 md:pt-28 pb-12 xs:pb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`inline-flex items-center gap-2 px-3 xs:px-4 py-2 xs:py-2.5 rounded-full backdrop-blur-sm border mb-5 xs:mb-6 md:mb-8 ${isDark ? 'bg-forest-900/40 border-forest-700/30' : 'bg-forest-100/60 border-forest-200/40'}`}>
            <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse flex-shrink-0" />
            <span className={`font-medium text-xs xs:text-[0.8125rem] md:text-sm ${isDark ? 'text-forest-300' : 'text-forest-700'}`}>
              {t('hero.badge')}
            </span>
          </div>

          <h1
            className={`font-display font-semibold mb-4 xs:mb-5 md:mb-6 px-2 xs:px-0 ${isDark ? 'text-white' : 'text-forest-800'}`}
            style={{ fontSize: 'clamp(1.875rem, 1.25rem + 3.125vw, 4.5rem)', lineHeight: '1.08' }}
          >
            {t('hero.heading1')}{' '}
            <div className="text-gradient">{t('hero.heading2')}</div>
          </h1>

          <p
            className={`font-light max-w-2xl mx-auto mb-7 xs:mb-8 md:mb-10 px-1 xs:px-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            style={{ fontSize: 'clamp(0.9375rem, 0.875rem + 0.3125vw, 1.25rem)', lineHeight: '1.7' }}
          >
            {t('hero.sub')}
          </p>

          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4 px-4 xs:px-0">
            <a href="#booking" className="btn-primary group w-full xs:w-auto">
              {t('hero.cta1')}
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className={`btn-secondary w-full xs:w-auto ${isDark ? '!border-forest-500 !text-forest-300 hover:!bg-forest-600 hover:!text-white' : ''}`}>
              {t('hero.cta2')}
            </a>
          </div>

          <div className={`mt-10 xs:mt-12 md:mt-16 flex flex-col xs:flex-row flex-wrap items-center justify-center gap-4 xs:gap-6 md:gap-10 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-lg md:text-xl ${isDark ? 'text-forest-400' : 'text-forest-700'}`}>{t('hero.stat1num')}</span>
              <span className="text-fluid-sm">{t('hero.stat1')}</span>
            </div>
            <div className={`w-px h-5 hidden xs:block ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-lg md:text-xl ${isDark ? 'text-forest-400' : 'text-forest-700'}`}>{t('hero.stat2num')}</span>
              <span className="text-fluid-sm">{t('hero.stat2')}</span>
            </div>
            <div className={`w-px h-5 hidden xs:block ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-lg md:text-xl ${isDark ? 'text-forest-400' : 'text-forest-700'}`}>{t('hero.stat3num')}</span>
              <span className="text-fluid-sm">{t('hero.stat3')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 xs:bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down" className={`w-11 h-11 flex items-center justify-center transition-colors ${isDark ? 'text-forest-500 hover:text-forest-300' : 'text-forest-400 hover:text-forest-600'}`}>
          <ChevronDownIcon className="w-6 h-6" />
        </a>
      </div>
    </section>
  )
}
