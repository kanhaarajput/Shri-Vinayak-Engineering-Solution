import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp } from '@utils/animations'
import { 
  HiClipboardList, HiSearchCircle, HiCog, 
  HiShieldCheck, HiTruck 
} from 'react-icons/hi'

const ICONS_AND_COLORS = [
  { icon: HiClipboardList, color: 'text-green-400', bg: 'bg-green-400' },
  { icon: HiSearchCircle, color: 'text-sky-400', bg: 'bg-sky-400' },
  { icon: HiCog, color: 'text-violet-400', bg: 'bg-violet-400' },
  { icon: HiShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400' },
  { icon: HiTruck, color: 'text-emerald-400', bg: 'bg-emerald-400' },
]

import { useData } from '../../context/DataContext'

export default function WorkflowTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { workflow } = useData();

  if (!workflow || workflow.length === 0) return null;

  return (
    <section ref={ref} className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden">
      
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-green-400">
              Our Process
            </span>
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Flawless Execution,<br />
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Every Single Time
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-0 right-0 h-0.5 bg-black/10 dark:bg-white/10 z-0">
            <motion.div 
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              className="h-full bg-gradient-to-r from-green-500 via-sky-500 to-emerald-500"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10"
          >
            {workflow.map((step, index) => {
              const style = ICONS_AND_COLORS[index % ICONS_AND_COLORS.length];
              const Icon = style.icon;
              return (
              <motion.div key={step.id || index} variants={fadeUp} className="flex flex-col items-center text-center group">
                
                {/* Node Icon */}
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 relative transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105 bg-gray-900/90 border border-white/[0.08] backdrop-blur-md">
                  <div className={`absolute inset-0 ${style.bg} opacity-10 rounded-2xl blur-md group-hover:opacity-20 transition-opacity`} />
                  <Icon className={`${style.color} text-4xl relative z-10`} />
                  
                  {/* Step Number Badge */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${style.bg} text-gray-950 font-bold flex items-center justify-center text-sm shadow-lg`}>
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-2">
                  {step.desc}
                </p>
              </motion.div>
            )})}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
