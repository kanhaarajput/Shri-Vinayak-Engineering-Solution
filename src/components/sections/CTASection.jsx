import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiPhone } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { fadeUp } from '@utils/animations'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative rounded-[2.5rem] overflow-hidden px-8 py-20 lg:py-24 text-center border border-amber-500/20 shadow-2xl shadow-orange-900/40"
          style={{ background: 'linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(3,7,18,0.95) 100%)' }}
        >
          {/* Animated Glow Backgrounds */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              Need Precision<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Engineering Solutions?
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Partner with Shri Vinayak Engineering Solutions for unparalleled quality, rapid turnaround times, and cost-effective industrial manufacturing.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              {/* Get Quote Button */}
              <Link
                to="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-gray-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
              >
                Get a Quote <HiArrowRight size={20} />
              </Link>
              
              {/* Call Now Button */}
              <a
                href="tel:+917505487656"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                <HiPhone size={20} className="text-sky-400" />
                Call Now
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/917505487656"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                <FaWhatsapp size={20} className="text-emerald-400" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
