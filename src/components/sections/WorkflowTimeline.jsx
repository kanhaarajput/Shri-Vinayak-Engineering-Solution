import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp } from '@utils/animations'
import { 
  HiClipboardList, HiSearchCircle, HiCog, 
  HiShieldCheck, HiTruck 
} from 'react-icons/hi'
import { useData } from '../../context/DataContext'
import * as Icons from 'react-icons/hi'

const DEFAULT_STEPS = [
  { iconName: 'HiClipboardList', color: 'text-amber-400', bg: 'bg-amber-400' },
  { iconName: 'HiSearchCircle', color: 'text-sky-400', bg: 'bg-sky-400' },
  { iconName: 'HiCog', color: 'text-violet-400', bg: 'bg-violet-400' },
  { iconName: 'HiShieldCheck', color: 'text-emerald-400', bg: 'bg-emerald-400' },
  { iconName: 'HiTruck', color: 'text-orange-400', bg: 'bg-orange-400' },
]

export default function WorkflowTimeline() {
  const { siteContent } = useData();
  const workflow = siteContent?.workflow || { title: 'Our Process', subtitle: 'How we work', steps: [] };
  
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      
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
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-amber-400">
              {workflow.title}
            </span>
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            {workflow.subtitle.split(',')[0]}<br />
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {workflow.subtitle.split(',').slice(1).join(',')}
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-0 right-0 h-0.5 bg-white/10 z-0">
            <motion.div 
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              className="h-full bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10"
          >
            {workflow.steps.map((step, index) => {
              const defaultStyle = DEFAULT_STEPS[index % DEFAULT_STEPS.length];
              const IconComponent = Icons[defaultStyle.iconName] || Icons.HiCog;
              return (
                <motion.div key={index} variants={fadeUp} className="flex flex-col items-center text-center group">
                  
                  {/* Node Icon */}
                  <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 relative transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105`}
                       style={{
                         background: 'rgba(17,24,39,0.9)',
                         border: '1px solid rgba(255,255,255,0.08)',
                         backdropFilter: 'blur(10px)'
                       }}>
                    <div className={`absolute inset-0 ${defaultStyle.bg} opacity-10 rounded-2xl blur-md group-hover:opacity-20 transition-opacity`} />
                    <IconComponent className={`${defaultStyle.color} text-4xl relative z-10`} />
                    
                    {/* Step Number Badge */}
                    <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${defaultStyle.bg} text-gray-950 font-bold flex items-center justify-center text-sm shadow-lg`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed px-2">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
