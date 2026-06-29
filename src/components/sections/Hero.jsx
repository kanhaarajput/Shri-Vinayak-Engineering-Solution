import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiChevronDown } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { MACHINE_DATA } from '../../data/machineData';
import workshopBg from '@assets/about_workshop.png';

/* ─── Animation Variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ─── Particles & Glow ───────────────────────────────────────────────────── */
function BackgroundEffects() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Background */}
      <img
        src={workshopBg}
        alt="Industrial Workshop"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900/90 to-black" />
      
      {/* Subtle Orange Glows */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Animated Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-500/40 rounded-full blur-[1px]"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: Math.random() * 2,
          }}
          animate={{
            y: [null, -Math.random() * 200 - 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Light Smoke Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
    </div>
  );
}

/* ─── Hero Component ─────────────────────────────────────────────────────── */
export default function Hero() {
  const STATS = [
    { value: '500+', label: 'Projects' },
    { value: '100+', label: 'Clients' },
    { value: '10+', label: 'Years Experience' },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-gray-950 pt-24 pb-32 lg:pt-0 lg:pb-0">
      
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-100px)]">
        
        {/* ─── Left Side: Content ──────────────────────────────────────── */}
        <div className="flex flex-col justify-center order-2 lg:order-1 pt-10 lg:pt-0">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-max mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-300">
              Premium Industrial Solutions
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-black tracking-tight text-white leading-[1.1] mb-6"
          >
            Precision Engineering<br />
            Solutions for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              Modern Industries
            </span>
          </motion.h1>

          <motion.h2
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-amber-400/90 font-semibold text-lg sm:text-xl mb-4 max-w-2xl"
          >
            Experts in Laser Welding, VMC Machining, Wirecut, TIG Welding, Argon Welding &amp; Industrial Repairing.
          </motion.h2>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
          >
            Delivering high-precision engineering, advanced machining, and industrial repair solutions with uncompromising quality and reliability for every client.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm tracking-wide overflow-hidden shadow-lg shadow-orange-600/20 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10">Get Quote</span>
              <HiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm tracking-wide backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* ─── Right Side: Machine Carousel ────────────────────────────── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[100vw] lg:max-w-none relative order-1 lg:order-2 px-4 lg:px-0"
        >
          {/* Subtle glow behind slider */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />
          
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 1.8 },
              1280: { slidesPerView: 2 },
            }}
            loop={true}
            coverflowEffect={{
              rotate: 25,
              stretch: -20,
              depth: 250,
              modifier: 1,
              slideShadows: false, // We'll use CSS for better shadows
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="w-full pb-14 pt-10 hero-swiper"
          >
            {MACHINE_DATA.map((machine) => (
              <SwiperSlide key={machine.id} className="w-[320px] sm:w-[400px] xl:w-[450px] aspect-[4/5] sm:aspect-[4/5] rounded-3xl overflow-hidden relative group">
                
                {/* Active Slide Glow Border (handled via CSS in global or inline but Swiper adds swiper-slide-active class) */}
                <div className="absolute inset-0 border-2 border-transparent transition-colors duration-500 z-20 rounded-3xl group-[.swiper-slide-active]:border-amber-500/50 group-[.swiper-slide-active]:shadow-[0_0_30px_rgba(245,158,11,0.2)]" />
                
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-125"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gray-900/40 group-[.swiper-slide-active]:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent z-10 pointer-events-none" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 transform translate-y-4 group-[.swiper-slide-active]:translate-y-0 transition-transform duration-500">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{machine.name}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {machine.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>

      {/* ─── Bottom Stats Bar ──────────────────────────────────────────── */}
      <div className="relative z-20 w-full border-t border-white/5 bg-gray-950/80 backdrop-blur-lg mt-auto">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-16">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                custom={i + 5}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4"
              >
                <span className="text-3xl sm:text-4xl font-black text-amber-500">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-400 uppercase w-20">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* ─── Scroll Indicator ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-24 lg:bottom-12 right-12 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500" style={{ writingMode: 'vertical-rl' }}>
          Scroll Down
        </span>
        <div className="w-px h-12 bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-amber-500"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

    </section>
  );
}
