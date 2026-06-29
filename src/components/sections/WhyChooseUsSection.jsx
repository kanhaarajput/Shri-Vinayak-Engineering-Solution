import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiShieldCheck,
} from 'react-icons/hi'
import {
  HiStar,
  HiBoltSlash,
  HiCog8Tooth,
  HiUserGroup,
  HiCurrencyRupee,
} from 'react-icons/hi2'

/* ─── Shared ─────────────────────────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: EASE },
  }),
}

/* ─── Animated counter hook ──────────────────────────────────────────────── */
function useCounter(end, duration = 2000, start = 0, enabled = false) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!enabled) return

    let raf
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(start + (end - start) * eased))

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, start, enabled])

  return count
}

/* ─── Feature data ───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: HiStar,
    title: 'High Precision',
    desc: 'Micron-level accuracy across all laser welding, engraving, and VMC wirecut operations.',
    accent: '#fbbf24',     // amber-400
    glowColor: 'rgba(251,191,36,0.12)',
    borderColor: 'rgba(251,191,36,0.20)',
  },
  {
    icon: HiBoltSlash,
    title: 'Fast Delivery',
    desc: 'Streamlined workflows and dedicated capacity ensure on-time delivery — every single project.',
    accent: '#38bdf8',     // sky-400
    glowColor: 'rgba(56,189,248,0.12)',
    borderColor: 'rgba(56,189,248,0.20)',
  },
  {
    icon: HiCog8Tooth,
    title: 'Advanced Machinery',
    desc: 'State-of-the-art CNC, VMC, Wire EDM, and laser systems from world-leading manufacturers.',
    accent: '#a78bfa',     // violet-400
    glowColor: 'rgba(167,139,250,0.12)',
    borderColor: 'rgba(167,139,250,0.20)',
  },
  {
    icon: HiUserGroup,
    title: 'Skilled Experts',
    desc: 'A seasoned team of 50+ engineers with deep domain expertise in precision engineering.',
    accent: '#34d399',     // emerald-400
    glowColor: 'rgba(52,211,153,0.12)',
    borderColor: 'rgba(52,211,153,0.20)',
  },
  {
    icon: HiCurrencyRupee,
    title: 'Affordable Pricing',
    desc: 'Competitive rates without compromising quality — maximising ROI for every client.',
    accent: '#fb923c',     // orange-400
    glowColor: 'rgba(251,146,60,0.12)',
    borderColor: 'rgba(251,146,60,0.20)',
  },
]

/* ─── Counter stats ──────────────────────────────────────────────────────── */
const COUNTERS = [
  { end: 25,  suffix: '+', label: 'Years of\nExperience',      accent: '#fbbf24' },
  { end: 500, suffix: '+', label: 'Projects\nDelivered',       accent: '#38bdf8' },
  { end: 98,  suffix: '%', label: 'Client\nSatisfaction',      accent: '#a78bfa' },
  { end: 50,  suffix: '+', label: 'Skilled\nEngineers',        accent: '#34d399' },
]

/* ─── Single counter card ────────────────────────────────────────────────── */
function CounterCard({ end, suffix, label, accent, enabled }) {
  const count = useCounter(end, 2200, 0, enabled)

  return (
    <div className="text-center py-8 px-4">
      <p className="text-4xl sm:text-5xl font-black tabular-nums leading-none" style={{ color: accent }}>
        {count}
        <span className="text-2xl sm:text-3xl">{suffix}</span>
      </p>
      <p className="text-xs text-gray-400 font-medium tracking-wider uppercase mt-2 leading-snug whitespace-pre-line">
        {label}
      </p>
    </div>
  )
}

/* ─── Feature card ───────────────────────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, desc, accent, glowColor, borderColor, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="group relative"
    >
      {/* Gradient border — appears on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${borderColor}, transparent 60%)`,
        }}
      />

      {/* Card body */}
      <div
        className="relative h-full rounded-2xl p-6 transition-all duration-500
                   group-hover:-translate-y-1"
        style={{
          background: 'rgba(17,24,39,0.8)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Corner glow on hover */}
        <div
          className="absolute top-0 left-0 w-32 h-32 rounded-full
                     opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: glowColor, filter: 'blur(50px)' }}
        />

        <div className="relative z-10 flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center
                       transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${glowColor}, rgba(255,255,255,0.03))`,
              border: `1px solid ${borderColor}`,
            }}
          >
            <Icon
              size={22}
              className="transition-transform duration-500 group-hover:rotate-6"
              style={{ color: accent }}
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-bold text-white mb-1 transition-colors duration-300"
              style={{ '--hover-color': accent }}
            >
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── WhyChooseUs Section ────────────────────────────────────────────────── */
export default function WhyChooseUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const counterRef = useRef(null)
  const counterInView = useInView(counterRef, { once: true, margin: '-60px' })

  return (
    <section
      id="why-choose-us"
      ref={ref}
      className="relative py-24 lg:py-32 bg-gray-950 overflow-hidden"
    >
      {/* ── Background texture ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(251,191,36,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-amber-400">
              Why Choose Us
            </span>
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Built on{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Trust &amp; Precision
            </span>
          </h2>

          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            Decades of engineering excellence, state-of-the-art machinery, and
            an unwavering commitment to quality make us the preferred partner
            for industries across India.
          </p>
        </motion.div>

        {/* ── Animated counter bar ──────────────────────────────────── */}
        <motion.div
          ref={counterRef}
          initial={{ opacity: 0, y: 30 }}
          animate={counterInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(17,24,39,0.7)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {COUNTERS.map((c) => (
              <CounterCard key={c.label} {...c} enabled={counterInView} />
            ))}
          </div>
        </motion.div>

        {/* ── Feature cards — 2 + 3 layout ─────────────────────────── */}
        <div className="space-y-5">
          {/* Top row — 2 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.slice(0, 2).map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>

          {/* Bottom row — 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.slice(2).map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i + 2} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
