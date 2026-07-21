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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shri Vinayak Engineering Solutions",
    "url": "https://www.shrivinayakengineeringsolutions.com/",
    "logo": "https://www.shrivinayakengineeringsolutions.com/favicon.jpeg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9876543210",
      "contactType": "customer service"
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <SEO 
        title="Shri Vinayak Engineering Solutions | CNC Machining, Wire Cut EDM, VMC & Precision Engineering"
        description="Shri Vinayak Engineering Solutions is a leading precision engineering company in Gurgaon offering CNC Machining, VMC Machining, Wire Cut EDM, EDM Drilling, Laser Welding, Laser Engraving, Argon Welding, Tool Room Services, Die & Mold Manufacturing."
        url="https://www.shrivinayakengineeringsolutions.com/"
        keywords="CNC Machining, Wire Cut EDM, VMC Machining, Precision Engineering, Tool Room, Laser Welding, Laser Engraving, EDM Drill, Argon Welding, Die Manufacturing, Mold Manufacturing"
        schemas={[organizationSchema]}
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
