import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { staggerContainer, fadeUp, hoverLift } from '@utils/animations'
import { 
  HiStar, HiPencil, HiCog, HiScissors, 
  HiFire, HiBeaker, HiCubeTransparent, HiShieldCheck 
} from 'react-icons/hi'
import { FaWrench } from 'react-icons/fa'
import { useData } from '../../context/DataContext'

// Helper to map string names back to React components
const iconMap = {
  HiStar, HiPencil, HiCog, HiScissors, 
  HiFire, HiBeaker, HiCubeTransparent, HiShieldCheck,
  FaWrench
}

export default function ServicesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { services: SERVICES } = useData();

  return (
    <section ref={ref} className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Complete{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Industrial Solutions
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
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
              <Link to={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="absolute inset-0 z-30" aria-label={`Explore ${service.title}`} />
              {/* Hover Gradient Border */}
              <div
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.color}, transparent 70%)`,
                }}
              />

              {/* Card Body */}
              <div
                className="relative h-full rounded-3xl overflow-hidden flex flex-col transition-all duration-500 bg-white/80 dark:bg-gray-900/85 border border-black/5 dark:border-white/[0.06] backdrop-blur-md"
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-green-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.desc}
                  </p>
                  
                  {/* Learn More link */}
                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold transition-colors duration-300 group-hover:text-green-400 text-gray-500">
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
