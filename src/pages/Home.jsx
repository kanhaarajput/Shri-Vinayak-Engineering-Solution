import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import Hero from '@components/sections/Hero'
import AboutSection from '@components/sections/AboutSection'
import ServicesSection from '@components/sections/ServicesSection'
import WhyChooseUsSection from '@components/sections/WhyChooseUsSection'
import GallerySection from '@components/sections/GallerySection'
import TestimonialsSection from '@components/sections/TestimonialsSection'
import ContactSection from '@components/sections/ContactSection'
import SEO from '@components/seo/SEO'
import { useData } from '../context/DataContext'

/* ─── Animation ──────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

/* ─── Stats ──────────────────────────────────────────────────────────────── */

export default function Home() {
  const { siteContent } = useData();
  const STATS = siteContent.home.stats;
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SEO 
        title="Industrial Laser Welding & VMC Services | Shri Vinayak"
        description="Premium laser welding, VMC wirecut job work, die & mould manufacturing and repair services by Shri Vinayak Engineering Solutions."
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Hero />



      {/* ── About ───────────────────────────────────────────────────────── */}
      <AboutSection />

      {/* ── Services ────────────────────────────────────────────────────── */}
      <ServicesSection />

      {/* ── Why Choose Us ───────────────────────────────────────────────── */}
      <WhyChooseUsSection />

      {/* ── Gallery Slider ──────────────────────────────────────────────── */}
      <GallerySection />

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <ContactSection />

    </div>
  )
}
