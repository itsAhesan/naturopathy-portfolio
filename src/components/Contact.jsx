import React, { useState, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { PhoneIcon, MailIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

function NatureSvgBg({ isDark }) {
  const color = isDark ? 'rgba(64,145,108,0.06)' : 'rgba(45,106,79,0.04)'
  const color2 = isDark ? 'rgba(82,183,136,0.04)' : 'rgba(82,183,136,0.035)'
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 ${isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-white via-cream-50 to-forest-50/30'}`} />
      <div className={`absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-3xl ${isDark ? 'bg-forest-900/15' : 'bg-forest-200/20'}`} />
      <div className={`absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full blur-3xl ${isDark ? 'bg-sage-900/10' : 'bg-sage-200/20'}`} />
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="leaf-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 10 C60 10 45 25 45 45 C45 55 52 60 60 60 C68 60 75 55 75 45 C75 25 60 10 60 10Z" fill={color} />
            <path d="M60 20 L60 50" stroke={color2} strokeWidth="1" />
            <path d="M52 32 C56 36 58 42 60 48" stroke={color2} strokeWidth="0.8" fill="none" />
            <path d="M68 32 C64 36 62 42 60 48" stroke={color2} strokeWidth="0.8" fill="none" />
          </pattern>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill={isDark ? 'rgba(82,183,136,0.08)' : 'rgba(45,106,79,0.05)'} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leaf-grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  )
}

function SendIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function CheckCircleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function SpinnerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function ContactForm({ isDark, t }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const inputBase = `w-full rounded-xl xs:rounded-2xl px-4 xs:px-5 py-3 xs:py-3.5 text-fluid-sm xs:text-fluid-base outline-none transition-all duration-300 border ${
    isDark
      ? 'bg-gray-800/60 border-gray-700/60 text-gray-100 placeholder-gray-500 focus:border-forest-500 focus:bg-gray-800/80 focus:ring-2 focus:ring-forest-500/20'
      : 'bg-white/80 border-forest-200/60 text-gray-800 placeholder-gray-400 focus:border-forest-400 focus:bg-white focus:ring-2 focus:ring-forest-400/20'
  }`

  const labelClass = `block text-fluid-xs xs:text-fluid-sm font-medium mb-1.5 xs:mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`

  function validate(data) {
    const errs = {}
    if (!data.name.trim()) errs.name = true
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = true
    if (!data.message.trim()) errs.message = true
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = formRef.current
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      message: formData.get('message') || '',
    }

    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Request failed')

      const result = await res.json()

      if (result?.success) {
        setStatus('success')
        form.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const errorRing = isDark ? 'border-red-500/70 ring-2 ring-red-500/20' : 'border-red-400/70 ring-2 ring-red-400/20'

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center py-12 xs:py-16 md:py-20 rounded-[2rem] xs:rounded-[2.5rem] ${isDark ? 'bg-gray-900/50' : 'bg-white/60'} backdrop-blur-sm`}>
        <div className={`w-16 h-16 xs:w-20 xs:h-20 rounded-full flex items-center justify-center mb-4 xs:mb-5 ${isDark ? 'bg-forest-900/40' : 'bg-forest-100'}`}>
          <CheckCircleIcon className={`w-8 h-8 xs:w-10 xs:h-10 ${isDark ? 'text-forest-400' : 'text-forest-600'}`} />
        </div>
        <h3 className={`text-fluid-lg xs:text-fluid-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('contact.form.successTitle')}
        </h3>
        <p className={`text-fluid-sm xs:text-fluid-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('contact.form.successMsg')}
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4 xs:space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>{t('contact.form.name')} *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder={t('contact.form.namePh')}
            className={`${inputBase} ${errors.name ? errorRing : ''}`}
            onChange={() => errors.name && setErrors(prev => ({ ...prev, name: false }))}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>{t('contact.form.email')} *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={t('contact.form.emailPh')}
            className={`${inputBase} ${errors.email ? errorRing : ''}`}
            onChange={() => errors.email && setErrors(prev => ({ ...prev, email: false }))}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>{t('contact.form.phone')}</label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder={t('contact.form.phonePh')}
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>{t('contact.form.message')} *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder={t('contact.form.messagePh')}
          className={`${inputBase} resize-none ${errors.message ? errorRing : ''}`}
          onChange={() => errors.message && setErrors(prev => ({ ...prev, message: false }))}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full flex items-center justify-center gap-2.5 px-6 py-3.5 xs:py-4 rounded-xl xs:rounded-2xl text-fluid-base font-semibold transition-all duration-300 min-h-[48px] ${
          status === 'sending'
            ? isDark ? 'bg-forest-800/50 text-forest-300 cursor-wait' : 'bg-forest-200 text-forest-600 cursor-wait'
            : isDark
              ? 'bg-forest-600 hover:bg-forest-500 text-white shadow-lg shadow-forest-900/30 hover:shadow-forest-800/40'
              : 'bg-forest-600 hover:bg-forest-700 text-white shadow-lg shadow-forest-600/25 hover:shadow-forest-600/35'
        }`}
      >
        {status === 'sending' ? (
          <>
            <SpinnerIcon className="w-5 h-5 animate-spin" />
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            <SendIcon className="w-5 h-5" />
            {t('contact.form.submit')}
          </>
        )}
      </button>

      {status === 'error' && (
        <p className={`text-center text-fluid-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          {t('contact.form.errorMsg')}
        </p>
      )}
    </form>
  )
}

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation()
  const { isDark } = useTheme()
  const { t } = useLanguage()

  return (
    <section id="contact" className="section-padding relative">
      <NatureSvgBg isDark={isDark} />

      <div className="section-container relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 md:mb-14">
            <p className={`heading-accent mb-2 xs:mb-3 ${isDark ? '!text-forest-400' : ''}`}>{t('contact.accent')}</p>
            <h2 className={`heading-secondary mb-3 xs:mb-4 ${isDark ? '!text-white' : ''}`}>
              {t('contact.heading1')}{' '}
              <span className="text-gradient">{t('contact.heading2')}</span>?
            </h2>
            <p className={`text-body ${isDark ? '!text-gray-400' : ''}`}>{t('contact.sub')}</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 xs:gap-8 lg:gap-10">
            {/* ── Contact Form ── */}
            <div className="lg:col-span-3">
              <div
                className={`relative rounded-[2rem] xs:rounded-[2.5rem] p-1 ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700'
                    : 'bg-gradient-to-br from-forest-300 via-forest-400 to-sage-400'
                }`}
                style={{
                  boxShadow: isDark
                    ? '0 0 0 1px rgba(255,255,255,0.05), 0 25px 50px -12px rgba(0,0,0,0.5)'
                    : '0 0 0 1px rgba(0,0,0,0.05), 0 25px 50px -12px rgba(45,106,79,0.25)',
                }}
              >
                <div className={`rounded-[1.75rem] xs:rounded-[2.25rem] p-5 xs:p-7 md:p-8 ${isDark ? 'bg-gray-950' : 'bg-cream-50'}`}>
                  <h3 className={`text-fluid-base xs:text-fluid-lg font-bold mb-1 xs:mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('contact.form.title')}
                  </h3>
                  <p className={`text-fluid-xs xs:text-fluid-sm mb-5 xs:mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('contact.form.subtitle')}
                  </p>
                  <ContactForm isDark={isDark} t={t} />
                </div>
              </div>
            </div>

            {/* ── Social & Contact Links ── */}
            <div className="lg:col-span-2 flex flex-col gap-3 xs:gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/naturopathydoc"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-3.5 xs:gap-4 px-4 xs:px-5 py-3.5 xs:py-4 rounded-2xl xs:rounded-[1.25rem] overflow-hidden transition-all duration-500 ${isDark ? 'bg-gray-900/70 hover:bg-gray-800/80' : 'bg-white/70 hover:bg-white/90'} backdrop-blur-sm border ${isDark ? 'border-gray-700/60' : 'border-forest-200/40'}`}
              >
                <div className={`absolute inset-0 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100 ${isDark ? 'bg-gradient-to-r from-pink-900/30 to-transparent' : 'bg-gradient-to-r from-pink-50 to-transparent'}`} />
                <div className={`relative z-10 w-10 h-10 xs:w-11 xs:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-pink-900/30' : 'bg-pink-100'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                <span className={`relative z-10 text-fluid-sm xs:text-fluid-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Instagram</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dr-sovan-mangal-bnys-391292198/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-3.5 xs:gap-4 px-4 xs:px-5 py-3.5 xs:py-4 rounded-2xl xs:rounded-[1.25rem] overflow-hidden transition-all duration-500 ${isDark ? 'bg-gray-900/70 hover:bg-gray-800/80' : 'bg-white/70 hover:bg-white/90'} backdrop-blur-sm border ${isDark ? 'border-gray-700/60' : 'border-forest-200/40'}`}
              >
                <div className={`absolute inset-0 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100 ${isDark ? 'bg-gradient-to-r from-sky-900/30 to-transparent' : 'bg-gradient-to-r from-sky-50 to-transparent'}`} />
                <div className={`relative z-10 w-10 h-10 xs:w-11 xs:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-sky-900/30' : 'bg-sky-100'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-sky-400' : 'text-sky-700'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <span className={`relative z-10 text-fluid-sm xs:text-fluid-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>LinkedIn</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/rahul.mangal.90834"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-3.5 xs:gap-4 px-4 xs:px-5 py-3.5 xs:py-4 rounded-2xl xs:rounded-[1.25rem] overflow-hidden transition-all duration-500 ${isDark ? 'bg-gray-900/70 hover:bg-gray-800/80' : 'bg-white/70 hover:bg-white/90'} backdrop-blur-sm border ${isDark ? 'border-gray-700/60' : 'border-forest-200/40'}`}
              >
                <div className={`absolute inset-0 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100 ${isDark ? 'bg-gradient-to-r from-blue-900/30 to-transparent' : 'bg-gradient-to-r from-blue-50 to-transparent'}`} />
                <div className={`relative z-10 w-10 h-10 xs:w-11 xs:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <span className={`relative z-10 text-fluid-sm xs:text-fluid-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Facebook</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+916295142789"
                className={`group relative flex items-center gap-3.5 xs:gap-4 px-4 xs:px-5 py-3.5 xs:py-4 rounded-2xl xs:rounded-[1.25rem] overflow-hidden transition-all duration-500 ${isDark ? 'bg-gray-900/70 hover:bg-gray-800/80' : 'bg-white/70 hover:bg-white/90'} backdrop-blur-sm border ${isDark ? 'border-gray-700/60' : 'border-forest-200/40'}`}
              >
                <div className={`absolute inset-0 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100 ${isDark ? 'bg-gradient-to-r from-forest-900/30 to-transparent' : 'bg-gradient-to-r from-forest-50 to-transparent'}`} />
                <div className={`relative z-10 w-10 h-10 xs:w-11 xs:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-forest-900/40' : 'bg-forest-100'}`}>
                  <PhoneIcon className={`w-5 h-5 ${isDark ? 'text-forest-400' : 'text-forest-600'}`} />
                </div>
                <div className="relative z-10">
                  <p className={`text-fluid-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t('contact.phone')}</p>
                  <p className={`text-fluid-sm xs:text-fluid-base font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>+91 62951 42789</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:drsovan885@gmail.com"
                className={`group relative flex items-center gap-3.5 xs:gap-4 px-4 xs:px-5 py-3.5 xs:py-4 rounded-2xl xs:rounded-[1.25rem] overflow-hidden transition-all duration-500 ${isDark ? 'bg-gray-900/70 hover:bg-gray-800/80' : 'bg-white/70 hover:bg-white/90'} backdrop-blur-sm border ${isDark ? 'border-gray-700/60' : 'border-forest-200/40'}`}
              >
                <div className={`absolute inset-0 transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100 ${isDark ? 'bg-gradient-to-r from-forest-900/30 to-transparent' : 'bg-gradient-to-r from-forest-50 to-transparent'}`} />
                <div className={`relative z-10 w-10 h-10 xs:w-11 xs:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-forest-900/40' : 'bg-forest-100'}`}>
                  <MailIcon className={`w-5 h-5 ${isDark ? 'text-forest-400' : 'text-forest-600'}`} />
                </div>
                <div className="relative z-10 min-w-0">
                  <p className={`text-fluid-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t('contact.email')}</p>
                  <p className={`text-fluid-sm xs:text-fluid-base font-bold truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>drsovan885@gmail.com</p>
                </div>
              </a>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/916295142789?text=Hi%20Dr.%20Sovan,%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 xs:gap-3 px-5 py-3.5 xs:py-4 bg-[#25D366] text-white font-medium rounded-2xl xs:rounded-[1.25rem] hover:bg-[#20bd5a] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/25 min-h-[48px] text-fluid-sm xs:text-fluid-base mt-auto"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('contact.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
