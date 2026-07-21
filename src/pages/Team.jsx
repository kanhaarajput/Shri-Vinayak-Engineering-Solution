import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '@components/seo/SEO'
import { staggerContainer, fadeUp, hoverLift } from '@utils/animations'
import { useData } from '../context/DataContext'
import { HiPlus, HiMinus } from 'react-icons/hi'

export default function Team() {
  const { team } = useData();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (index) => {
    if (expandedId === index) {
      setExpandedId(null);
    } else {
      setExpandedId(index);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white pt-28 pb-20 overflow-hidden relative">
      <SEO 
        title="Meet Our Engineering Team | Shri Vinayak Engineering Solutions"
        description="Meet the skilled engineers, operators and technical experts behind Shri Vinayak Engineering Solutions."
        url="https://www.shrivinayakengineeringsolutions.com/team"
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-green-400">
              Our Leadership & Experts
            </span>
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
            Meet Our<br />
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Engineering Team
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the skilled engineers, operators and technical experts behind Shri Vinayak Engineering Solutions.
          </p>
        </motion.div>

        {/* ── Team Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
        >
          {team && team.length > 0 ? team.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={hoverLift}
              className="group relative h-full"
            >
              <div 
                className={`relative w-full rounded-2xl overflow-hidden shadow-sm flex flex-col bg-gray-50/50 dark:bg-gray-900/50 border border-black/5 dark:border-white/5 transition-all duration-300 ${expandedId === index ? 'shadow-md dark:shadow-green-900/20 z-10' : 'hover:shadow-md'}`}
              >
                {/* Image Section */}
                <div className="w-full h-56 relative overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded-md text-[9px] font-bold tracking-wider text-white uppercase z-20 border border-white/10">
                    Expert
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-start mb-2">
                    <div className="min-w-0 pr-2">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-green-500 uppercase tracking-wider mt-0.5 truncate">
                        {member.role}
                      </p>
                    </div>
                    {/* Expand Toggle */}
                    <button 
                      onClick={() => toggleExpand(index)}
                      className="shrink-0 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                      aria-label="Toggle Details"
                    >
                      {expandedId === index ? <HiMinus size={14} /> : <HiPlus size={14} />}
                    </button>
                  </div>

                  {/* Expandable Bio */}
                  <AnimatePresence initial={false}>
                    {expandedId === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 mt-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify hyphens-auto">
                            {member.bio}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No team members found.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
