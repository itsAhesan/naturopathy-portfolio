import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { isDark } = useTheme()
  const { t } = useLanguage()

  const quickLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#approach', label: t('nav.approach') },
    { href: '#booking', label: t('nav.book') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const socialLinks = [
    { href: 'https://www.instagram.com/naturopathydoc', label: 'Instagram', icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    )},
    { href: 'https://www.facebook.com/rahul.mangal.90834', label: 'Facebook', icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { href: 'https://www.linkedin.com/in/dr-sovan-mangal-bnys-391292198/', label: 'LinkedIn', icon: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
  ]

  return (
    <footer className={isDark ? 'bg-gray-950 text-white border-t border-gray-800' : 'bg-forest-900 text-white'}>
      <div className="section-container py-10 xs:py-12 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 xs:gap-6 md:gap-10">
          {/* Brand */}
          <div className="xs:col-span-2 md:col-span-1">
            <span
              className="font-display font-bold text-white block mb-3 xs:mb-4"
              style={{ fontSize: 'clamp(1.125rem, 1rem + 0.625vw, 1.375rem)' }}
            >
              Dr. Sovan Mangal
            </span>
            <p className={`text-fluid-sm leading-relaxed max-w-sm mb-5 xs:mb-6 ${isDark ? 'text-gray-400' : 'text-forest-300'}`}>
              {t('footer.desc')}
            </p>
            {/* Real social links */}
            <div className="flex gap-2.5 xs:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 xs:w-11 xs:h-11 rounded-lg flex items-center justify-center transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-forest-400' : 'bg-forest-800 hover:bg-forest-700 text-forest-300'}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-fluid-sm text-white mb-3 xs:mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-0.5 xs:space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={`text-fluid-sm transition-colors inline-flex items-center min-h-[38px] xs:min-h-[40px] py-0.5 xs:py-1 ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-forest-400 hover:text-forest-200'}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-fluid-sm text-white mb-3 xs:mb-4">{t('contact.accent')}</h4>
            <div className="space-y-3">
              <a href="tel:+916295142789" className={`text-fluid-sm block transition-colors ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-forest-400 hover:text-forest-200'}`}>
                +91 62951 42789
              </a>
              <a href="mailto:drsovan885@gmail.com" className={`text-fluid-sm block transition-colors ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-forest-400 hover:text-forest-200'}`}>
                drsovan885@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-8 xs:mt-10 md:mt-12 pt-6 xs:pt-8 border-t flex flex-col xs:flex-row items-center justify-between gap-3 xs:gap-4 ${isDark ? 'border-gray-800' : 'border-forest-800'}`}>
          <p className={`text-fluid-xs text-center xs:text-left ${isDark ? 'text-gray-500' : 'text-forest-500'}`}>
            &copy; {currentYear} Dr. Sovan Mangal. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap justify-center gap-3 xs:gap-4 md:gap-6">
            {[t('footer.privacy'), t('footer.terms'), t('footer.disclaimer')].map((label) => (
              <a key={label} href="#" className={`text-fluid-xs transition-colors inline-flex items-center min-h-[38px] xs:min-h-[40px] py-0.5 xs:py-1 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-forest-500 hover:text-forest-300'}`}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
