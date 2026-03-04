import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { StarIcon, QuoteIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const testimonials = [
  { name: 'Fatima Al-Hassan', location: 'Dubai, UAE', condition: 'Chronic Kidney Disease', text: 'After years of conventional treatment with little improvement, Dr. Sovan Mangal\'s protocol brought my eGFR levels from 38 to 52. The personalized diet plan and herbal supplements truly made a difference. International consultation was seamless.', rating: 5, initials: 'FA' },
  { name: 'Rajesh Sharma', location: 'Mumbai, India', condition: 'Type 2 Diabetes & Obesity', text: 'I lost 18 kg in 3 months and my HbA1c dropped from 9.2 to 6.8. The holistic approach covering diet, yoga, and lifestyle changes was exactly what I needed. The monthly follow-ups kept me accountable and motivated throughout.', rating: 5, initials: 'RS' },
  { name: 'Sarah Mitchell', location: 'London, UK', condition: 'Hypertension & High Cholesterol', text: 'My blood pressure normalized within 2 months of following the protocol. The digital consultation platform made it so easy to share my reports and track my progress from abroad. Highly recommend for anyone seeking natural healing.', rating: 5, initials: 'SM' },
  { name: 'Arun Krishnamurthy', location: 'Chennai, India', condition: 'Liver Detox & Digestive Issues', text: 'Dealing with fatty liver and constant digestive discomfort for years. Within the first month itself, I felt a remarkable difference. The treatment plan was comprehensive yet easy to follow. Grateful for the positive transformation.', rating: 5, initials: 'AK' },
]

export default function Testimonials() {
  const [headingRef, headingVisible] = useScrollAnimation()
  const [activeIndex, setActiveIndex] = useState(0)
  const { isDark } = useTheme()
  const { t } = useLanguage()

  return (
    <section id="testimonials" className={`section-padding relative overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-forest-800'}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-60 h-60 xs:w-72 xs:h-72 md:w-96 md:h-96 rounded-full bg-forest-400 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-52 h-52 xs:w-64 xs:h-64 md:w-80 md:h-80 rounded-full bg-sage-400 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div ref={headingRef} className={`text-center max-w-2xl mx-auto mb-8 xs:mb-10 md:mb-14 lg:mb-16 transition-all duration-1000 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="heading-accent !text-forest-300 mb-2 xs:mb-3">{t('testimonials.accent')}</p>
          <h2 className="heading-secondary !text-white mb-3 xs:mb-4">
            {t('testimonials.heading1')}{' '}
            <span className="text-sage-300">{t('testimonials.heading2')}</span>
          </h2>
          <p className="text-body !text-forest-200/70">{t('testimonials.sub')}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl xs:rounded-3xl p-5 xs:p-6 md:p-8 lg:p-10 border border-white/10 mb-6 xs:mb-8">
            <QuoteIcon className="w-10 h-10 xs:w-12 xs:h-12 text-forest-300 absolute top-4 left-4 xs:top-6 xs:left-6 md:top-8 md:left-8 hidden xs:block" />
            <div className="relative z-10 xs:pt-6 md:pt-4">
              <p className="text-white/90 leading-relaxed mb-5 xs:mb-6 md:mb-8 font-light italic" style={{ fontSize: 'clamp(0.9375rem, 0.875rem + 0.3125vw, 1.25rem)', lineHeight: '1.7' }}>
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4">
                <div className="flex items-center gap-3 xs:gap-4">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-gradient-to-br from-forest-400 to-sage-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-xs xs:text-sm">{testimonials[activeIndex].initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-fluid-base">{testimonials[activeIndex].name}</p>
                    <p className="text-fluid-sm text-forest-300">{testimonials[activeIndex].location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start xs:items-end gap-1.5 pl-[52px] xs:pl-0">
                  <span className="text-fluid-xs font-medium text-forest-300 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-forest-700/50 border border-forest-600/30">{testimonials[activeIndex].condition}</span>
                  <div className="flex gap-0.5 xs:gap-1 mt-0.5 xs:mt-1">
                    {[...Array(testimonials[activeIndex].rating)].map((_, j) => (
                      <StarIcon key={j} className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-amber-400" filled />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 xs:gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} className="relative flex items-center justify-center min-w-[44px] min-h-[44px] transition-all duration-300" aria-label={`View testimonial ${i + 1}`}>
                <span className={`block rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 xs:w-10 h-3 bg-forest-400' : 'w-3 h-3 bg-white/20 hover:bg-white/40'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
