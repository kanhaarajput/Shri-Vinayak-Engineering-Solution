import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { cn } from '@lib/utils'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import companyLogoFallback from '@assets/logo - Copy.jpeg'

/* ─── Nav links ─────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
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

/* ─── Dark Mode Toggle ───────────────────────────────────────────────────── */
function DarkModeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button
      id="dark-mode-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={cn(
        'relative w-14 h-7 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 border',
        isDark
          ? 'bg-gray-800 border-gray-600'
          : 'bg-green-100 border-green-300'
      )}
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <HiMoon size={13} className={cn('transition-opacity duration-300', isDark ? 'opacity-80 text-green-400' : 'opacity-0')} />
        <HiSun  size={13} className={cn('transition-opacity duration-300', isDark ? 'opacity-0' : 'opacity-80 text-green-600')} />
      </span>
      {/* Thumb */}
      <motion.span
        layout
        animate={{ x: isDark ? 28 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'absolute top-0.5 w-6 h-6 rounded-full shadow-md flex items-center justify-center',
          isDark ? 'bg-white dark:bg-gray-950' : 'bg-white'
        )}
      >
        {isDark
          ? <HiMoon size={12} className="text-green-400" />
          : <HiSun  size={12} className="text-green-500" />}
      </motion.span>
    </button>
  )
}

/* ─── Logo ───────────────────────────────────────────────────────────────── */
function Logo({ scrolled }) {
  const { siteContent } = useData()
  const global = siteContent?.global || {}
  const logoSrc        = global.logoUrl         || companyLogoFallback
  const companyName    = global.companyName     || 'Shri Vinayak'
  const companySubtitle = global.companySubtitle || 'Engineering Solutions'

  return (
    <Link to="/" id="navbar-logo" className="flex items-center gap-3 group select-none">
      <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow duration-300 flex-shrink-0">
        <img
          src={logoSrc}
          alt={`${companyName} Logo`}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = companyLogoFallback }}
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={cn("text-[15px] font-extrabold tracking-wide leading-none transition-colors",
          scrolled ? "text-gray-900 dark:text-white" : "text-white"
        )}>{companyName}</span>
        <span className="text-[10px] font-medium tracking-[0.18em] text-green-400 uppercase leading-none mt-0.5">{companySubtitle}</span>
      </div>
    </Link>
  )
}

/* ─── Desktop NavLink ────────────────────────────────────────────────────── */
function DesktopLink({ to, label, scrolled }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        cn('relative px-1 py-1.5 text-sm font-medium transition-colors duration-200 group',
          isActive 
            ? 'text-green-500' 
            : scrolled 
              ? 'text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-white' 
              : 'text-white/80 hover:text-white'
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span className={cn('absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300',
            isActive ? 'w-full' : 'w-0 group-hover:w-full')} />
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
          cn('flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200',
            isActive ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5')
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
  const location = useLocation()
  
  // The navbar should have a solid background if we are scrolled down OR if we are not on the homepage
  const isScrolledStyle = scrolled || location.pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          isScrolledStyle
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ───────────────────────────────────────────── */}
            <Logo scrolled={isScrolledStyle} />

            {/* ── Desktop links ──────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(({ label, to }) => (
                <DesktopLink key={to} to={to} label={label} scrolled={isScrolledStyle} />
              ))}
            </nav>

            {/* ── Dark Mode Toggle + Hamburger ─────────────────── */}
            <div className="flex items-center gap-4">
              <DarkModeToggle />

              {/* Hamburger */}
              <button
                id="mobile-menu-toggle"
                aria-label="Toggle navigation"
                onClick={() => setMobileOpen((o) => !o)}
                className={cn(
                  'lg:hidden relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200',
                  mobileOpen 
                    ? 'bg-green-500/10 text-green-500' 
                    : isScrolledStyle 
                      ? 'text-gray-700 hover:text-gray-900 dark:text-white/80 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      : 'text-white/80 hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <HiX size={22} />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
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
            <motion.div key="drawer" variants={drawerVariants} initial="hidden" animate="visible" exit="exit" className="lg:hidden overflow-hidden">
              <div className="bg-white/98 dark:bg-gray-950/98 backdrop-blur-xl border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, to }, i) => (
                    <MobileLink key={to} to={to} label={label} index={i} onClick={() => setMobileOpen(false)} />
                  ))}
                  {/* Mobile Dark Mode Toggle */}
                  <div className="pt-3 pb-2 flex items-center justify-between px-4 py-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                    <span className="text-sm font-medium text-gray-700 dark:text-white/70">Dark Mode</span>
                    <DarkModeToggle />
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
