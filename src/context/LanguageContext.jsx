import React, { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

export const languages = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'hi', label: 'हिन्दी', flag: 'HI' },
  { code: 'kn', label: 'ಕನ್ನಡ', flag: 'KN' },
  { code: 'te', label: 'తెలుగు', flag: 'TE' },
  { code: 'ta', label: 'தமிழ்', flag: 'TA' },
  { code: 'ar', label: 'العربية', flag: 'AR' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'zh', label: '中文', flag: 'ZH' },
]

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'en'
    }
    return 'en'
  })

  const changeLang = (code) => {
    setLang(code)
    localStorage.setItem('lang', code)
    document.documentElement.lang = code
    if (code === 'ar') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let val = translations[lang]
    for (const k of keys) {
      val = val?.[k]
    }
    return val || translations['en']?.[keys[0]]?.[keys[1]] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
