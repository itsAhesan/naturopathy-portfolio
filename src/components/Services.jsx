import React from 'react'
import { useScrollAnimation, useScrollAnimationGroup } from '../hooks/useScrollAnimation'
import { HeartPulseIcon, UsersIcon, ClipboardIcon, SparklesIcon, ShieldCheckIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

// Yoga icon inline
const YogaIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v4M8 14l4-4 4 4M6 18l6-4 6 4" />
  </svg>
)

export default function Services() {
  const [headingRef, headingVisible] = useScrollAnimation()
  const { isDark } = useTheme()
  const { t } = useLanguage()

  const services = [
    { icon: HeartPulseIcon, titleKey: 's1title', descKey: 's1desc', bg: isDark ? 'bg-rose-900/30' : 'bg-rose-50' },
    { icon: UsersIcon, titleKey: 's2title', descKey: 's2desc', bg: isDark ? 'bg-forest-900/30' : 'bg-forest-50' },
    { icon: ClipboardIcon, titleKey: 's3title', descKey: 's3desc', bg: isDark ? 'bg-amber-900/30' : 'bg-amber-50' },
    { icon: SparklesIcon, titleKey: 's4title', descKey: 's4desc', bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50' },
    { icon: YogaIcon, titleKey: 's5title', descKey: 's5desc', bg: isDark ? 'bg-emerald-900/30' : 'bg-emerald-50' },
    { icon: ShieldCheckIcon, titleKey: 's6title', descKey: 's6desc', bg: isDark ? 'bg-violet-900/30' : 'bg-violet-50' },
  ]

  const [setCardRef, visibleCards] = useScrollAnimationGroup(services.length, 100)

  return (
    <section id="services" className={`section-padding ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="section-container">
        <div
          ref={headingRef}
          className={`text-center max-w-2xl mx-auto mb-8 xs:mb-10 md:mb-14 lg:mb-16 transition-all duration-1000 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className={`heading-accent mb-2 xs:mb-3 ${isDark ? '!text-forest-400' : ''}`}>{t('services.accent')}</p>
          <h2 className={`heading-secondary mb-3 xs:mb-4 ${isDark ? '!text-white' : ''}`}>
            {t('services.heading1')}{' '}
            <span className="text-gradient">{t('services.heading2')}</span>
          </h2>
          <p className={`text-body ${isDark ? '!text-gray-400' : ''}`}>{t('services.sub')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 md:gap-6 lg:gap-7">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={i}
                ref={setCardRef(i)}
                className={`group cursor-default transition-all duration-700 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] ${
                  isDark ? 'bg-gray-900 hover:bg-gray-800/80' : 'bg-white'
                } ${visibleCards.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ padding: 'clamp(1.25rem, 1rem + 1.25vw, 2rem)' }}
              >
                <div className="flex xs:block items-start gap-4 xs:gap-0">
                  <div className={`w-11 h-11 xs:w-12 xs:h-12 rounded-xl xs:rounded-2xl ${service.bg} flex items-center justify-center xs:mb-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className={`w-5 h-5 xs:w-6 xs:h-6 ${isDark ? 'text-forest-400' : 'text-forest-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-fluid-lg font-semibold mb-1.5 xs:mb-3 transition-colors ${isDark ? 'text-white group-hover:text-forest-300' : 'text-gray-800 group-hover:text-forest-700'}`}>
                      {t(`services.${service.titleKey}`)}
                    </h3>
                    <p className={`text-fluid-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t(`services.${service.descKey}`)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
