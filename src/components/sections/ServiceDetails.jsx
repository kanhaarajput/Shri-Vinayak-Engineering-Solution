import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight } from '@utils/animations'
import { HiCheckCircle } from 'react-icons/hi'

import { useData } from '../../context/DataContext'

function ServiceSection({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="py-16 lg:py-24 border-b border-black/5 dark:border-white/[0.05] last:border-0">
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
              <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-[350px] sm:h-[450px] object-cover transition-transform duration-[10000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded-3xl z-20 pointer-events-none" />
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
              <div className="w-8 h-px bg-green-500" />
              <span className="text-green-400 font-bold uppercase tracking-widest text-xs">
                Service {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-6">
              {service.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {service.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Features (if any) */}
              {service.features && (
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-black/10 dark:border-white/10 pb-2">Includes</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                        <HiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && (
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-black/10 dark:border-white/10 pb-2">Benefits</h4>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
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
                  <h4 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-black/10 dark:border-white/10 pb-2">Applications</h4>
                  <ul className="space-y-3">
                    {service.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
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
  const { services } = useData();

  // Only render services that have an image for the details section
  const detailedServices = services.filter(s => s.image);

  if (detailedServices.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 dark:bg-[#050914]">
      {detailedServices.map((service, index) => (
        <ServiceSection key={service.id || index} service={service} index={index} />
      ))}
    </section>
  )
}
