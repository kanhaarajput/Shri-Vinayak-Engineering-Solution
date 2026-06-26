import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, hoverLift } from '@utils/animations'
import { 
  HiStar, HiPencil, HiCog, HiScissors, 
  HiFire, HiBeaker, HiCubeTransparent, HiShieldCheck 
} from 'react-icons/hi'
import { FaWrench } from 'react-icons/fa'

import gallery1 from '@assets/gallery_1.png'
import gallery2 from '@assets/gallery_2.png'
import gallery3 from '@assets/gallery_3.png'
import aboutImg from '@assets/about_workshop.png'
import engImg from '@assets/svc_engraving.png'
import vmcImg from '@assets/svc_vmc.png'
import wirecutImg from '@assets/svc_wirecut.png'
import tigImg from '@assets/svc_tig.png'
import argonImg from '@assets/svc_argon.png'

const SERVICES = [
  { 
    id: 'laser-welding', 
    title: 'Laser Welding', 
    desc: 'High precision laser welding for dies, moulds, and intricate repairing work.', 
    icon: HiStar, 
    image: gallery1,
    color: '#fbbf24' // amber-400
  },
  { 
    id: 'laser-engraving', 
    title: 'Laser Engraving', 
    desc: 'Permanent industrial engraving for logos, serial numbers, and part marking.', 
    icon: HiPencil, 
    image: engImg,
    color: '#38bdf8' // sky-400
  },
  { 
    id: 'vmc-machining', 
    title: 'VMC Machining', 
    desc: 'Precision Vertical Machining Center services for complex industrial parts.', 
    icon: HiCog, 
    image: vmcImg,
    color: '#a78bfa' // violet-400
  },
  { 
    id: 'wirecut', 
    title: 'Wirecut Machining', 
    desc: 'Precision wirecut cutting for hard metals and intricate industrial designs.', 
    icon: HiScissors, 
    image: wirecutImg,
    color: '#34d399' // emerald-400
  },
  { 
    id: 'tig-welding', 
    title: 'TIG Welding', 
    desc: 'Clean and precise TIG welding for stainless steel, aluminum, and fabrication.', 
    icon: HiFire, 
    image: tigImg,
    color: '#fb923c' // orange-400
  },
  { 
    id: 'argon-welding', 
    title: 'Argon Welding', 
    desc: 'High-quality argon gas welding for durable and oxidation-protected industrial joints.', 
    icon: HiBeaker, 
    image: argonImg,
    color: '#f43f5e' // rose-400
  },
  { 
    id: 'die-mould', 
    title: 'Die & Mould Repair', 
    desc: 'Repairing damaged industrial dies and moulds with precision restoration.', 
    icon: FaWrench, 
    image: gallery3,
    color: '#fbbf24'
  },
  { 
    id: 'manufacturing', 
    title: 'Manufacturing', 
    desc: 'Custom industrial manufacturing and structural fabrication solutions.', 
    icon: HiCubeTransparent, 
    image: aboutImg,
    color: '#38bdf8'
  },
  { 
    id: 'industrial-repairing', 
    title: 'Industrial Repairing', 
    desc: 'Complete repair solutions for heavy industrial components and machinery.', 
    icon: HiShieldCheck, 
    image: gallery2,
    color: '#a78bfa'
  },
]

export default function ServicesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Complete{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Industrial Solutions
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            From precision micron-level laser welding to heavy industrial manufacturing, we offer a complete suite of engineering services.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              whileHover={hoverLift}
              className="group relative h-full flex flex-col cursor-pointer"
            >
              {/* Hover Gradient Border */}
              <div
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.color}, transparent 70%)`,
                }}
              />

              {/* Card Body */}
              <div
                className="relative h-full rounded-3xl overflow-hidden flex flex-col transition-all duration-500"
                style={{
                  background: 'rgba(17,24,39,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {/* Image Section */}
                <div className="w-full h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-[8000ms] group-hover:scale-110"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow relative z-20">
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300" style={{ '--hover-color': service.color }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  
                  {/* Learn More link */}
                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold transition-colors duration-300 group-hover:text-amber-400 text-gray-500">
                    Explore Service <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
