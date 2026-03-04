import React, { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FloatingActions from './components/FloatingActions'

const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Approach = lazy(() => import('./components/Approach'))
const Booking = lazy(() => import('./components/Booking'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-forest-300 border-t-forest-600 rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Services />
        <Approach />
        <Booking />
        <Contact />
        <Footer />
      </Suspense>
      <FloatingActions />
    </div>
  )
}
