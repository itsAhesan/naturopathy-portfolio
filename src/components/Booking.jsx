import React, { useEffect, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { CalendarIcon, CheckCircleIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function Booking() {
  const [ref, isVisible] = useScrollAnimation()
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const calRef = useRef(null)

  const benefits = [t('booking.b2'), t('booking.b3'), t('booking.b4')]

  // Load the Calendly inline widget natively using data-url
  useEffect(() => {
    if (calRef.current && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/drsovan885',
        parentElement: calRef.current,
      })
    }
  }, [])

  return (
    <section id="booking" className={`section-padding ${isDark ? 'bg-gray-900' : 'bg-gradient-to-b from-cream-50 via-forest-50/30 to-cream-50'}`}>
      <div className="section-container">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 md:mb-14">
            <p className={`heading-accent mb-2 xs:mb-3 ${isDark ? '!text-forest-400' : ''}`}>{t('booking.accent')}</p>
            <h2 className={`heading-secondary mb-3 xs:mb-4 ${isDark ? '!text-white' : ''}`}>
              {t('booking.heading1')}{' '}
              <span className="text-gradient">{t('booking.heading2')}</span>{' '}
              {t('booking.heading3')}
            </h2>
            <p className={`text-body ${isDark ? '!text-gray-400' : ''}`}>{t('booking.sub')}</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 xs:gap-8 lg:gap-10 items-start">
            <div className="md:col-span-4 lg:col-span-4 order-2 md:order-1 self-start md:pt-10">
              <div className="card !bg-forest-700 !text-white md:sticky md:top-24">
                <div className="flex items-center gap-3 mb-5 xs:mb-6">
                  <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 xs:w-6 xs:h-6 text-forest-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-fluid-lg">{t('booking.scheduleTitle')}</h3>
                    <p className="text-forest-300 text-fluid-sm">{t('booking.scheduleSub')}</p>
                  </div>
                </div>

                <div className="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 xs:gap-3">
                      <CheckCircleIcon className="w-[18px] h-[18px] xs:w-5 xs:h-5 text-sage-300 mt-0.5 flex-shrink-0" />
                      <span className="text-fluid-sm text-forest-100">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-5 xs:pt-6">
                  <h4 className="font-medium text-forest-200 mb-2.5 xs:mb-3 text-fluid-sm">{t('booking.typesTitle')}</h4>
                  <div className="space-y-2.5 xs:space-y-3">
                    {[
                      
                      { name: t('booking.t2name'), info: t('booking.t2info') },
                      { name: t('booking.t3name'), info: t('booking.t3info') },
                    ].map((type) => (
                      <div key={type.name} className="bg-white/10 rounded-xl p-3 xs:p-3.5">
                        <p className="font-medium text-fluid-sm">{type.name}</p>
                        <p className="text-fluid-xs text-forest-300">{type.info}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Native Calendly inline widget embed */}
            <div className="md:col-span-8 lg:col-span-8 order-1 md:order-2 self-start">
              <div className={`w-full rounded-2xl overflow-hidden relative ${isDark ? 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.04)]'}`}>
                {/* Fallback content shown behind the iframe while it loads or if it fails */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 ${isDark ? 'bg-gray-800' : 'bg-forest-50'}`}>
                  <CalendarIcon className={`w-12 h-12 mb-4 ${isDark ? 'text-forest-500' : 'text-forest-300'}`} />
                  <p className={`text-fluid-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-forest-800'}`}>Loading scheduler...</p>
                  <p className={`text-fluid-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    If the calendar doesn't load, you can book directly:
                  </p>
                  <a
                    href="https://calendly.com/drsovan885"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !text-fluid-sm"
                  >
                    Open Calendly
                  </a>
                </div>
                <div
                  ref={calRef}
                  className="calendly-inline-widget relative z-10"
                  data-url="https://calendly.com/drsovan885"
                  style={{ minWidth: '320px', height: '700px' }}
                />
              </div>
              <p className={`text-center text-fluid-xs mt-3 xs:mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('booking.powered')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
