import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { CheckCircleIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const [ref, isVisible] = useScrollAnimation()
  const { isDark } = useTheme()
  const { t } = useLanguage()

  const highlights = [t('about.h1'), t('about.h2'), t('about.h3'), t('about.h4'), t('about.h5'), t('about.h6')]

  return (
    <section id="about" className={`section-padding ${isDark ? 'bg-gray-900' : 'bg-nature-pattern'}`}>
      <div className="section-container">
        <div
          ref={ref}
          className={`
            grid grid-cols-1 md:grid-cols-2
            gap-10 xs:gap-12 md:gap-14 lg:gap-20
            items-center
            transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {/* Doctor Image */}
          <div className="relative order-2 md:order-1 px-4 xs:px-6 md:px-0">
            <div className="relative max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
              {/* Decorative layers */}
              <div className={`absolute -top-3 -left-3 xs:-top-4 xs:-left-4 w-full h-full rounded-2xl xs:rounded-3xl transform rotate-3 ${isDark ? 'bg-forest-800/30' : 'bg-gradient-to-br from-forest-200/40 to-sage-200/30'}`} />
              <div className={`absolute -bottom-3 -right-3 xs:-bottom-4 xs:-right-4 w-full h-full rounded-2xl xs:rounded-3xl transform -rotate-2 ${isDark ? 'bg-forest-900/20' : 'bg-gradient-to-tl from-forest-300/20 to-sage-100/20'}`} />

              {/* Image */}
              <div className="relative aspect-[4/5] rounded-2xl xs:rounded-3xl overflow-hidden shadow-2xl shadow-forest-900/20">
                <img
                  src="/doctor.png"
                  alt="Dr. Sovan Mangal"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-5 sm:p-6 text-white">
                  <p className="font-display font-semibold text-lg xs:text-xl sm:text-2xl">Dr. Sovan Mangal</p>
                  <p className="text-white/80 text-fluid-sm">BNYS, Holistic Consultant</p>
                </div>
              </div>

              {/* Floating card */}
              <div className={`absolute -bottom-5 xs:-bottom-6 right-0 xs:-right-3 sm:-right-6 md:-right-8 shadow-lg animate-float rounded-xl xs:rounded-2xl p-2.5 xs:p-3 sm:p-4 border ${isDark ? 'bg-gray-800/90 backdrop-blur-md border-gray-700' : 'bg-white/80 backdrop-blur-md border-white/40'}`}>
                <div className="flex items-center gap-2 xs:gap-3">
                  <div className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-forest-900/50' : 'bg-forest-100'}`}>
                    <span className="text-sm xs:text-base sm:text-lg">🌿</span>
                  </div>
                  <div>
                    <p className={`font-semibold text-[0.6875rem] xs:text-xs sm:text-fluid-sm ${isDark ? 'text-white' : 'text-forest-800'}`}>{t('about.floatTitle')}</p>
                    <p className={`text-[0.5625rem] xs:text-[0.625rem] sm:text-fluid-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('about.floatSub')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 px-1 xs:px-0">
            <p className={`heading-accent mb-2 xs:mb-3 ${isDark ? '!text-forest-400' : ''}`}>{t('about.accent')}</p>
            <h2 className={`heading-secondary mb-4 xs:mb-5 md:mb-6 ${isDark ? '!text-white' : ''}`}>
              {t('about.heading1')}{' '}
              <span className="text-gradient">{t('about.heading2')}</span> {t('about.heading3')}
            </h2>
            <p className={`text-body mb-3 xs:mb-4 ${isDark ? '!text-gray-400' : ''}`}>{t('about.p1')}</p>
            <p className={`text-body mb-6 xs:mb-8 ${isDark ? '!text-gray-400' : ''}`}>{t('about.p2')}</p>

            <div className="space-y-2.5 xs:space-y-3 md:space-y-3.5">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 xs:gap-3">
                  <CheckCircleIcon className={`w-[18px] h-[18px] xs:w-5 xs:h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-forest-400' : 'text-forest-500'}`} />
                  <span className={`text-fluid-sm xs:text-fluid-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
