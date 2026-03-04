import React from 'react'
import { useScrollAnimation, useScrollAnimationGroup } from '../hooks/useScrollAnimation'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function Approach() {
  const [headingRef, headingVisible] = useScrollAnimation()
  const { isDark } = useTheme()
  const { t } = useLanguage()

  const steps = [
    { 
      titleKey: 's1title', 
      descKey: 's1desc', 
      color: 'forest',
      icon: (
        <svg className="w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
          <circle cx="8" cy="10" r="1" fill="currentColor" />
          <circle cx="16" cy="10" r="1" fill="currentColor" />
        </svg>
      )
    },
    { 
      titleKey: 's2title', 
      descKey: 's2desc', 
      color: 'sage',
      icon: (
        <svg className="w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    },
    { 
      titleKey: 's3title', 
      descKey: 's3desc', 
      color: 'forest',
      icon: (
        <svg className="w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
          <circle cx="7.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    { 
      titleKey: 's4title', 
      descKey: 's4desc', 
      color: 'sage',
      icon: (
        <svg className="w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      )
    },
  ]

  const [setStepRef, visibleSteps] = useScrollAnimationGroup(steps.length, 200)

  return (
    <section id="approach" className={`section-padding ${isDark ? 'bg-gray-900' : 'bg-gradient-to-b from-white via-forest-50/20 to-cream-50'}`}>
      <div className="section-container">
        <div
          ref={headingRef}
          className={`text-center max-w-2xl mx-auto mb-8 xs:mb-10 md:mb-16 lg:mb-20 transition-all duration-1000 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className={`heading-accent mb-2 xs:mb-3 ${isDark ? '!text-forest-400' : ''}`}>{t('approach.accent')}</p>
          <h2 className={`heading-secondary mb-3 xs:mb-4 ${isDark ? '!text-white' : ''}`}>
            {t('approach.heading1')}{' '}
            <span className="text-gradient">{t('approach.heading2')}</span>
          </h2>
          <p className={`text-body ${isDark ? '!text-gray-400' : ''}`}>{t('approach.sub')}</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="space-y-5 xs:space-y-6 md:space-y-8 lg:space-y-10">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={setStepRef(i)}
                className={`relative transition-all duration-700 ${visibleSteps.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {i < steps.length - 1 && (
                  <div
                    className={`absolute left-5 xs:left-[22px] md:left-[26px] lg:left-[28px] top-[44px] xs:top-[48px] md:top-[56px] lg:top-[60px] bottom-[-1.25rem] xs:bottom-[-1.5rem] md:bottom-[-2rem] lg:bottom-[-2.5rem] w-1 rounded-full ${
                      isDark
                        ? 'bg-gradient-to-b from-forest-700 via-forest-600 to-sage-700'
                        : 'bg-gradient-to-b from-forest-300 via-forest-400 to-sage-300'
                    }`}
                  />
                )}
                <div className="flex gap-3 xs:gap-4 md:gap-6 lg:gap-10 items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <div className={`w-10 h-10 xs:w-11 xs:h-11 md:w-[52px] md:h-[52px] lg:w-14 lg:h-14 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-lg text-white ${
                      step.color === 'forest'
                        ? 'bg-gradient-to-br from-forest-500 to-forest-700 shadow-forest-500/25'
                        : 'bg-gradient-to-br from-sage-400 to-sage-600 shadow-sage-500/25'
                    }`}>
                      {step.icon}
                    </div>
                  </div>

                  <div className={`flex-1 rounded-2xl hover:-translate-y-1 transition-all duration-500 ${
                    isDark ? 'bg-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]' : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
                  }`} style={{ padding: 'clamp(1.25rem, 1rem + 1.25vw, 2rem)' }}>
                    <h3 className={`text-fluid-lg md:text-fluid-xl font-semibold mb-1.5 xs:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {t(`approach.${step.titleKey}`)}
                    </h3>
                    <p className={`text-fluid-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t(`approach.${step.descKey}`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`text-center mt-8 xs:mt-10 md:mt-14 lg:mt-16 transition-all duration-1000 delay-500 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#booking" className="btn-primary w-full xs:w-auto">
            {t('hero.cta1')}
          </a>
        </div>
      </div>
    </section>
  )
}
