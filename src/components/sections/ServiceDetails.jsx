import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight } from '@utils/animations'
import { HiCheckCircle } from 'react-icons/hi'

import gallery1 from '@assets/gallery_1.png'
import engImg from '@assets/svc_engraving.png'
import vmcImg from '@assets/svc_vmc.png'
import wirecutImg from '@assets/svc_wirecut.png'
import tigImg from '@assets/svc_tig.png'
import argonImg from '@assets/svc_argon.png'
import gallery3 from '@assets/gallery_3.png'
import aboutImg from '@assets/about_workshop.png'
import gallery2 from '@assets/gallery_2.png'

const DETAILED_SERVICES = [
  {
    id: 'laser-welding',
    title: 'Laser Welding',
    desc: 'High precision laser welding for dies, moulds, industrial parts, and repairing work.',
    benefits: ['High accuracy', 'Minimal heat distortion', 'Strong weld quality', 'Fast repair'],
    applications: ['Die repair', 'Mold repair', 'Tool maintenance'],
    image: gallery1,
  },
  {
    id: 'laser-engraving',
    title: 'Laser Engraving',
    desc: 'Permanent industrial engraving for logos, serial numbers, branding, and part marking.',
    benefits: ['High precision', 'Durable marking', 'Clean finishing'],
    image: engImg,
  },
  {
    id: 'vmc-machining',
    title: 'VMC Machining',
    desc: 'Precision Vertical Machining Center services for complex industrial parts.',
    features: ['Milling', 'Drilling', 'Slot cutting', 'Surface finishing'],
    benefits: ['Complex shape machining', 'Smooth finish', 'Accurate dimensions'],
    image: vmcImg,
  },
  {
    id: 'wirecut',
    title: 'Wirecut Machining',
    desc: 'Precision wirecut cutting for hard metals and intricate industrial designs.',
    features: ['Profile cutting', 'Cavity cutting', 'Tool making', 'Precision components'],
    benefits: ['Fine accuracy', 'Clean cuts', 'Complex design support'],
    image: wirecutImg,
  },
  {
    id: 'tig-welding',
    title: 'TIG Welding',
    desc: 'Clean and precise TIG welding for stainless steel, aluminum, and precision fabrication.',
    benefits: ['Strong joints', 'Clean finish', 'Less spatter'],
    applications: ['Stainless steel fabrication', 'Metal parts welding'],
    image: tigImg,
  },
  {
    id: 'argon-welding',
    title: 'Argon Welding',
    desc: 'High-quality argon gas welding for durable industrial joints.',
    benefits: ['Better penetration', 'Oxidation protection', 'Strong durability'],
    applications: ['Sheet metal', 'Industrial repairs'],
    image: argonImg,
  },
  {
    id: 'die-mould',
    title: 'Die & Mould Repair',
    desc: 'Repairing damaged industrial dies and moulds with precision restoration.',
    benefits: ['Extend tool life', 'Cost-effective repair', 'Precision restoration'],
    image: gallery3,
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing Services',
    desc: 'Custom industrial manufacturing and fabrication solutions tailored to your exact specifications.',
    benefits: ['Custom fabrication', 'High volume capacity', 'Strict quality control'],
    image: aboutImg,
  },
  {
    id: 'industrial-repairing',
    title: 'Industrial Repairing',
    desc: 'Complete repair solutions for industrial components and heavy machinery to reduce downtime.',
    benefits: ['Rapid response', 'Component restoration', 'Performance testing'],
    image: gallery2,
  },
]

function ServiceSection({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="py-16 lg:py-24 border-b border-white/[0.05] last:border-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-12 lg:gap-16 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
          
          {/* Image */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={isEven ? fadeRight : fadeLeft}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 group">
              <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-[350px] sm:h-[450px] object-cover transition-transform duration-[10000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={isEven ? fadeLeft : fadeRight}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-500" />
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                Service {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-6">
              {service.title}
            </h3>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {service.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Features (if any) */}
              {service.features && (
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Includes</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <HiCheckCircle className="text-amber-500 mt-0.5 flex-shrink-0" size={18} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && (
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Benefits</h4>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <HiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={18} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications (if any) */}
              {service.applications && (
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Applications</h4>
                  <ul className="space-y-3">
                    {service.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <HiCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function ServiceDetails() {
  return (
    <section className="bg-[#050914]">
      {DETAILED_SERVICES.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
    </section>
  )
}
