import { motion } from 'framer-motion'
import SEO from '@components/seo/SEO'
import { staggerContainer, fadeUp, hoverLift } from '@utils/animations'
import { useData } from '../context/DataContext'
import FutureVisionSection from '../components/sections/FutureVisionSection'

export default function About() {
  const { team } = useData();

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-28 pb-20 overflow-hidden relative">
      <SEO 
        title="About Us | ShriVinayak Engineering Solution"
        description="Meet the dedicated team behind the success of ShriVinayak Engineering Solution."
      />

      {/* ── Background Elements ────────────────────────────────────── */}
      <div
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Page Header ────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-amber-400">
              Our Leadership
            </span>
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            The People Behind<br />
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Success of ShriVinayak Engineering Solution
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Our expert engineers and operational leaders bring decades of combined experience to deliver cutting-edge industrial solutions.
          </p>
        </motion.div>

        {/* ── Team Grid ──────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {team && team.length > 0 ? team.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={hoverLift}
              className="group relative h-full"
            >
              {/* Gradient border — appears on hover */}
              <div
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.4), transparent 60%)',
                }}
              />

              {/* Card body */}
              <div
                className="relative h-full rounded-3xl overflow-hidden flex flex-col transition-all duration-500"
                style={{
                  background: 'rgba(17,24,39,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {/* Image */}
                <div className="w-full h-80 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-[8000ms] group-hover:scale-110"
                    style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                  />
                  {/* Bottom fade for smooth blend into card body */}
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="p-8 pt-2 flex flex-col flex-grow relative z-20">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-5">
                    {member.designation}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {member.about}
                  </p>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              No team members found. Add some from the Admin Panel.
            </div>
          )}
        </motion.div>
        
      </div>

      {/* ── Dynamic CMS Future Vision Section ── */}
      <FutureVisionSection />
      
    </div>
  )
}
