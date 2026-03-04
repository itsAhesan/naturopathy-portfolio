import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function FloatingActions() {
  const [calHover, setCalHover] = useState(false)
  const [waHover, setWaHover] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { isDark } = useTheme()

  // Detect mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/drsovan885',
      })
    }
  }

  // For mobile: toggle on tap
  const handleCalTap = () => {
    if (isMobile) {
      if (calHover) {
        openCalendly()
        setCalHover(false)
      } else {
        setCalHover(true)
        setWaHover(false)
      }
    } else {
      openCalendly()
    }
  }

  const handleWaTap = (e) => {
    if (isMobile && !waHover) {
      e.preventDefault()
      setWaHover(true)
      setCalHover(false)
    }
  }

  // Close expanded state when clicking outside
  useEffect(() => {
    if (!isMobile) return
    const handleClickOutside = (e) => {
      if (!e.target.closest('.floating-action-btn')) {
        setCalHover(false)
        setWaHover(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobile])

  return (
    <>
      {/* Glow animation styles */}
      <style>{`
        @keyframes appointment-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(45, 106, 79, 0.4),
                        0 0 15px rgba(45, 106, 79, 0.3),
                        0 0 30px rgba(45, 106, 79, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(45, 106, 79, 0.6),
                        0 0 25px rgba(45, 106, 79, 0.5),
                        0 0 50px rgba(45, 106, 79, 0.3);
          }
        }
        @keyframes whatsapp-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(37, 211, 102, 0.4),
                        0 0 15px rgba(37, 211, 102, 0.3),
                        0 0 30px rgba(37, 211, 102, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(37, 211, 102, 0.6),
                        0 0 25px rgba(37, 211, 102, 0.5),
                        0 0 50px rgba(37, 211, 102, 0.3);
          }
        }
        .glow-appointment {
          animation: appointment-glow 2s ease-in-out infinite;
        }
        .glow-whatsapp {
          animation: whatsapp-glow 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
      
      <div className="fixed bottom-4 right-4 xs:bottom-5 xs:right-5 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-2.5 xs:gap-3">
        {/* Calendly — Book Appointment */}
        <button
          onClick={handleCalTap}
          onMouseEnter={() => !isMobile && setCalHover(true)}
          onMouseLeave={() => !isMobile && setCalHover(false)}
          className={`
            floating-action-btn group flex items-center gap-0 rounded-full shadow-lg glow-appointment
            transition-all duration-300 ease-out cursor-pointer
            ${isDark
              ? 'bg-forest-600 hover:bg-forest-500'
              : 'bg-forest-600 hover:bg-forest-700'
            }
          `}
          style={{
            height: isMobile ? '48px' : '52px',
            paddingLeft: isMobile ? '12px' : '14px',
            paddingRight: calHover ? (isMobile ? '16px' : '20px') : (isMobile ? '12px' : '14px'),
            width: calHover ? 'auto' : (isMobile ? '48px' : '52px'),
            minWidth: isMobile ? '48px' : '52px',
          }}
          aria-label="Book Appointment"
        >
          {/* Doctor/person with medical cross — book consultation */}
          <svg
            className="w-[20px] h-[20px] xs:w-[22px] xs:h-[22px] md:w-[23px] md:h-[23px] text-white flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Head */}
            <circle cx="10" cy="5.5" r="3.5" />
            {/* Body */}
            <path d="M2 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
            {/* Medical cross */}
            <line x1="20" y1="5" x2="20" y2="11" />
            <line x1="17" y1="8" x2="23" y2="8" />
          </svg>

          {/* Expanding text */}
          <span
            className="text-white font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out text-[0.8125rem] xs:text-[0.875rem]"
            style={{
              maxWidth: calHover ? '160px' : '0px',
              opacity: calHover ? 1 : 0,
              marginLeft: calHover ? (isMobile ? '8px' : '10px') : '0px',
            }}
          >
            {isMobile && calHover ? 'Tap to Book' : 'Book Appointment'}
          </span>
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/916295142789?text=Hi%20Dr.%20Sovan,%20I%20would%20like%20to%20book%20a%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWaTap}
          onMouseEnter={() => !isMobile && setWaHover(true)}
          onMouseLeave={() => !isMobile && setWaHover(false)}
          className={`
            floating-action-btn group flex items-center gap-0 rounded-full shadow-lg glow-whatsapp
            transition-all duration-300 ease-out
            bg-[#25D366] hover:bg-[#20bd5a]
          `}
          style={{
            height: isMobile ? '48px' : '52px',
            paddingLeft: isMobile ? '12px' : '14px',
            paddingRight: waHover ? (isMobile ? '16px' : '20px') : (isMobile ? '12px' : '14px'),
            width: waHover ? 'auto' : (isMobile ? '48px' : '52px'),
            minWidth: isMobile ? '48px' : '52px',
          }}
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp icon */}
          <svg
            className="w-[20px] h-[20px] xs:w-[21px] xs:h-[21px] md:w-[22px] md:h-[22px] text-white flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>

          {/* Expanding text */}
          <span
            className="text-white font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out text-[0.8125rem] xs:text-[0.875rem]"
            style={{
              maxWidth: waHover ? '120px' : '0px',
              opacity: waHover ? 1 : 0,
              marginLeft: waHover ? (isMobile ? '8px' : '10px') : '0px',
            }}
          >
            WhatsApp
          </span>
        </a>
      </div>
    </>
  )
}
