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

/* ─── Animation ──────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: '25+',  label: 'Years Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '50+',  label: 'Expert Engineers' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SEO 
        title="Industrial Laser Welding & VMC Services | Shri Vinayak"
        description="Premium laser welding, VMC wirecut job work, die & mould manufacturing and repair services by Shri Vinayak Engineering Solutions."
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Stats Bar ───────────────────────────────────────────────────── */}
      <section className="relative z-20 py-6">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40"
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-gray-900/80 backdrop-blur-xl px-6 py-8 text-center hover:bg-gray-800/80 transition-colors duration-300">
                <p className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">{value}</p>
                <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

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
