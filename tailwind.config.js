/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',   // large phones (iPhone Plus, Pixel)
      'sm': '640px',   // small tablets, landscape phones
      'md': '768px',   // iPad Mini, iPad Air portrait
      'lg': '1024px',  // iPad Pro, small laptops
      'xl': '1280px',  // desktops
      '2xl': '1536px', // large desktops
    },
    extend: {
      colors: {
        sage: {
          50:  '#f6faf6',
          100: '#e8f5e8',
          200: '#c8e6c9',
          300: '#a5d6a7',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#388e3c',
          700: '#2e7d32',
          800: '#1b5e20',
          900: '#0d3b13',
        },
        forest: {
          50:  '#f0f7f4',
          100: '#d8efe3',
          200: '#b3dfc8',
          300: '#82c9a5',
          400: '#52b788',
          500: '#40916c',
          600: '#2d6a4f',
          700: '#1a472a',
          800: '#0f2e1a',
          900: '#081a0f',
        },
        cream: {
          50:  '#fdfdf9',
          100: '#fafaf0',
          200: '#f5f5dc',
          300: '#eeeeca',
        },
        warm: {
          50:  '#fefcf8',
          100: '#fdf8ef',
          200: '#faf0db',
          300: '#f5e6c4',
        },
      },
      fontSize: {
        'fluid-xs':   ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',   { lineHeight: '1.5' }],
        'fluid-sm':   ['clamp(0.8125rem, 0.75rem + 0.3125vw, 0.9375rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(0.9375rem, 0.875rem + 0.3125vw, 1.0625rem)', { lineHeight: '1.65' }],
        'fluid-lg':   ['clamp(1.0625rem, 0.975rem + 0.4375vw, 1.25rem)',   { lineHeight: '1.55' }],
        'fluid-xl':   ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',     { lineHeight: '1.4' }],
        'fluid-2xl':  ['clamp(1.5rem, 1.25rem + 1.25vw, 2rem)',       { lineHeight: '1.3' }],
        'fluid-3xl':  ['clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)',   { lineHeight: '1.2' }],
        'fluid-4xl':  ['clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem)',     { lineHeight: '1.1' }],
        'fluid-5xl':  ['clamp(2.75rem, 2rem + 3.75vw, 4.5rem)',       { lineHeight: '1.05' }],
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
