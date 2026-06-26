import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { HiStar } from 'react-icons/hi2'
import { cn } from '@lib/utils'

/* ─── Nav links ─────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services',to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About',   to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/* ─── Framer-Motion variants ─────────────────────────────────────────────── */
const drawerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.22, ease: 'easeIn' },
  },
}

const linkItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.28, ease: 'easeOut' },
  }),
}

/* ─── Logo SVG ───────────────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link
      to="/"
      id="navbar-logo"
      className="flex items-center gap-3 group select-none"
    >
      {/* Icon mark */}
      <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow duration-300">
        {/* Gear / engineering icon drawn with CSS */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6 text-white"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-[15px] font-extrabold tracking-wide text-white leading-none">
          Shri Vinayak
        </span>
        <span className="text-[10px] font-medium tracking-[0.18em] text-amber-400 uppercase leading-none mt-0.5">
          Engineering Solutions
        </span>
      </div>
    </Link>
  )
}

/* ─── Desktop NavLink ────────────────────────────────────────────────────── */
function DesktopLink({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        cn(
          'relative px-1 py-1.5 text-sm font-medium transition-colors duration-200 group',
          isActive ? 'text-amber-400' : 'text-white/80 hover:text-white'
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {/* Animated underline */}
          <span
            className={cn(
              'absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300',
              isActive ? 'w-full' : 'w-0 group-hover:w-full'
            )}
          />
        </>
      )}
    </NavLink>
  )
}

/* ─── Mobile NavLink ─────────────────────────────────────────────────────── */
function MobileLink({ to, label, index, onClick }) {
  return (
    <motion.div custom={index} variants={linkItemVariants} initial="hidden" animate="visible">
      <NavLink
        to={to}
        end={to === '/'}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200',
            isActive
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          )
        }
      >
        {label}
      </NavLink>
    </motion.div>
  )
}

/* ─── Main Navbar ─────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-gray-950/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ───────────────────────────────────────────── */}
            <Logo />

            {/* ── Desktop links ──────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(({ label, to }) => (
                <DesktopLink key={to} to={to} label={label} />
              ))}
            </nav>

            {/* ── CTA + Hamburger ────────────────────────────────── */}
            <div className="flex items-center gap-4">
              {/* CTA — hidden on small screens */}
              <Link
                to="/contact"
                id="get-quote-btn"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                           bg-gradient-to-r from-amber-400 to-orange-600
                           text-gray-950 text-sm font-bold tracking-wide
                           shadow-lg shadow-orange-600/30
                           hover:shadow-orange-500/50 hover:scale-[1.04]
                           active:scale-[0.97]
                           transition-all duration-200"
              >
                <HiStar className="text-base" />
                Get Quote
              </Link>

              {/* Hamburger */}
              <button
                id="mobile-menu-toggle"
                aria-label="Toggle navigation"
                onClick={() => setMobileOpen((o) => !o)}
                className={cn(
                  'lg:hidden relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200',
                  mobileOpen
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <HiX size={22} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <HiMenuAlt3 size={22} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ─────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden overflow-hidden"
            >
              <div className="bg-gray-950/98 backdrop-blur-xl border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, to }, i) => (
                    <MobileLink
                      key={to}
                      to={to}
                      label={label}
                      index={i}
                      onClick={() => setMobileOpen(false)}
                    />
                  ))}

                  {/* Mobile CTA */}
                  <div className="pt-3 pb-2">
                    <Link
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl
                                 bg-gradient-to-r from-amber-400 to-orange-600
                                 text-gray-950 text-sm font-bold tracking-wide
                                 shadow-lg shadow-orange-600/25
                                 hover:shadow-orange-500/40 transition-all duration-200"
                    >
                      <HiStar />
                      Get a Free Quote
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
