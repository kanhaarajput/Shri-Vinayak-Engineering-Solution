import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp } from '@utils/animations'
import { FaCarSide, FaTools, FaIndustry, FaCubes, FaWrench } from 'react-icons/fa'

const CLIENT_CATEGORIES = [
  {
    icon: FaCarSide,
    title: 'Automotive Components',
    desc: 'Precision milling and welding for heavy-duty automotive engine parts and chassis components.',
    color: '#38bdf8', // sky-400
  },
  {
    icon: FaTools,
    title: 'Tool Manufacturing',
    desc: 'Creating custom, highly durable industrial cutting tools and punches via Wirecut EDM.',
    color: '#a78bfa', // violet-400
  },
  {
    icon: FaWrench,
    title: 'Mold & Die Repair',
    desc: 'Expert restoration of cracked and worn injection molds using ultra-fine laser welding.',
    color: '#fbbf24', // amber-400
  },
  {
    icon: FaIndustry,
    title: 'Fabrication Work',
    desc: 'Large-scale TIG and Argon welding for robust structural steel and aluminum frameworks.',
    color: '#34d399', // emerald-400
  },
  {
    icon: FaCubes,
    title: 'Custom Machine Parts',
    desc: 'Bespoke CNC and VMC machining for specialized, low-volume machinery replacement parts.',
    color: '#f97316', // orange-500
  },
]

export default function ProjectCategories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 bg-gray-950 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-amber-400">
              Industries Served
            </span>
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Applications</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            We provide specialized engineering and manufacturing solutions tailored to the strict requirements of diverse industrial sectors.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {CLIENT_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="group relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 border border-white/5"
              style={{
                background: 'rgba(17,24,39,0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${cat.color}20, transparent 70%)` }}
              />

              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${cat.color}20, transparent)`,
                  border: `1px solid ${cat.color}40`
                }}
              >
                <cat.icon size={24} style={{ color: cat.color }} />
              </div>

              {/* Content */}
              <h3 className="text-white font-bold text-lg mb-3">
                {cat.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
