import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiChevronDown } from 'react-icons/hi'
import { HiStar } from 'react-icons/hi2'
import heroBg from '@assets/laser_welding_hero.png'

/* ─── Shared easing ──────────────────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94]

/* ─── Variants ───────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.18, ease: EASE },
  }),
}

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, delay: i * 0.18, ease: EASE },
  }),
}

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.16, ease: EASE },
  }),
}

/* ─── Floating glow orb ──────────────────────────────────────────────────── */
function GlowOrb({ color, size, position, delay, duration }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        filter: 'blur(100px)',
        ...position,
      }}
      animate={{
        scale:   [1, 1.2, 1],
        opacity: [0.3, 0.55, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/* ─── Animated scroll caret ─────────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20
                 flex flex-col items-center gap-2 cursor-default select-none"
    >
      <span className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/35">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-8 h-8 rounded-full border border-white/20
                   flex items-center justify-center"
      >
        <HiChevronDown className="text-white/45" size={15} />
      </motion.div>
    </motion.div>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[680px]
                 flex items-center overflow-hidden"
    >
      {/* ── BG image ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Precision Industrial Laser Welding Process"
          fetchpriority="high"
          className="w-full h-full object-cover object-[center_30%]"
          style={{ transform: 'scale(1.04)', filter: 'brightness(0.5) saturate(1.15)' }}
        />
      </div>

      {/* ── Dark overlays ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(170deg,rgba(2,6,23,.80) 0%,rgba(2,6,23,.38) 45%,rgba(2,6,23,.90) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 75% 100% at 5% 50%,rgba(2,6,23,.70) 0%,transparent 65%)',
        }}
      />

      {/* ── Floating glow orbs ───────────────────────────────────── */}
      <GlowOrb
        color="rgba(245,158,11,0.22)"
        size="520px"
        position={{ top: '-60px', right: '-60px' }}
        delay={0}
        duration={7}
      />
      <GlowOrb
        color="rgba(234,88,12,0.18)"
        size="380px"
        position={{ bottom: '-40px', left: '-40px' }}
        delay={2}
        duration={9}
      />
      <GlowOrb
        color="rgba(59,130,246,0.12)"
        size="280px"
        position={{ top: '35%', right: '18%' }}
        delay={1}
        duration={6}
      />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">

          {/* Badge */}
          <motion.div
            custom={0}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                       border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm
                       text-amber-400 text-[11px] font-bold tracking-widest uppercase"
          >
            <HiStar size={13} />
            ISO 9001:2015 Certified  &bull;  Since 1998
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-black tracking-tight leading-[1.06] mb-6
                       text-4xl sm:text-5xl lg:text-[4.5rem]"
          >
            <span className="block text-white">Precision Laser</span>
            <span
              className="block mt-1"
              style={{
                backgroundImage: 'linear-gradient(90deg,#fbbf24,#f97316,#fb923c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Welding &amp; Engraving
            </span>
            <span className="block text-white mt-1">Solutions</span>
          </motion.h1>

          {/* Amber divider */}
          <motion.div
            custom={2}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-7"
          >
            <div
              className="h-[2px] w-16 rounded-full"
              style={{ background: 'linear-gradient(90deg,#fbbf24,#f97316)' }}
            />
            <div className="h-[2px] w-4 rounded-full bg-white/10" />
          </motion.div>

          {/* Subheading */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gray-300/90 text-base sm:text-lg leading-relaxed mb-10
                       max-w-2xl font-light"
          >
            Experts in{' '}
            <span className="text-amber-400 font-medium">VMC Wirecut Job Work</span>,{' '}
            <span className="text-amber-400 font-medium">Die &amp; Mould Welding</span>
            , Manufacturing &amp; Repairing — delivering unmatched precision for
            every industrial challenge.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            {/* Primary */}
            <Link
              to="/contact"
              id="hero-get-quote"
              className="group inline-flex items-center gap-2.5
                         px-8 py-4 rounded-xl font-bold text-sm tracking-wide
                         text-gray-950 transition-all duration-300
                         shadow-xl shadow-orange-600/35
                         hover:shadow-orange-500/55 hover:scale-[1.04] active:scale-[0.97]"
              style={{
                backgroundImage:
                  'linear-gradient(135deg,#fbbf24 0%,#f97316 55%,#ea580c 100%)',
              }}
            >
              <HiStar
                size={16}
                className="group-hover:rotate-12 transition-transform duration-200"
              />
              Get Quote
              <HiArrowRight
                size={16}
                className="-translate-x-1 group-hover:translate-x-0 transition-transform duration-200"
              />
            </Link>

            {/* Secondary */}
            <Link
              to="/contact"
              id="hero-contact-us"
              className="inline-flex items-center gap-2.5
                         px-8 py-4 rounded-xl font-semibold text-sm tracking-wide
                         text-white border border-white/20 bg-white/5 backdrop-blur-sm
                         hover:bg-white/10 hover:border-white/35
                         hover:scale-[1.03] active:scale-[0.97]
                         transition-all duration-300"
            >
              Contact Us
              <HiArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            custom={5}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-8 mt-12"
          >
            {[
              { value: '25+',  label: 'Years Experience' },
              { value: '500+', label: 'Projects Delivered' },
              { value: '98%',  label: 'Client Satisfaction' },
            ].map(({ value, label }, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400 leading-none">
                  {value}
                </span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────── */}
      <ScrollIndicator />

      {/* ── Bottom fade ────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top,rgb(3 7 18),transparent)' }}
      />
    </section>
  )
}
