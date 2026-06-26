import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { HiStar } from 'react-icons/hi'
import 'swiper/css'
import 'swiper/css/pagination'

/* ─── Shared Animation ───────────────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
}

/* ─── Testimonials Data ──────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    company: 'TechFab Industries',
    feedback: 'Shri Vinayak Engineering Solutions delivered flawless laser welding on our complex aerospace components. Their precision and attention to detail are unmatched in the industry.',
    rating: 5,
    initials: 'RS',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Amit Patel',
    company: 'Precision Tools Pvt Ltd',
    feedback: 'We rely on them for all our VMC wirecut job work. They consistently meet extremely tight tolerances and their delivery times are always reliable.',
    rating: 5,
    initials: 'AP',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Suresh Kumar',
    company: 'AutoMould India',
    feedback: 'Their die and mould repair services saved us countless hours of downtime and significant replacement costs. The welded surfaces were perfect after machining.',
    rating: 5,
    initials: 'SK',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Vikram Singh',
    company: 'HeavyForge Engineering',
    feedback: 'Exceptional manufacturing capabilities. The custom fixtures they produced for our assembly line were spot on and extremely durable.',
    rating: 5,
    initials: 'VS',
    color: 'from-purple-500 to-violet-500',
  },
  {
    name: 'Anil Desai',
    company: 'Desai Industrial Automation',
    feedback: 'Professional, highly skilled, and technologically advanced. Shri Vinayak is our go-to partner for all high-precision laser engraving needs.',
    rating: 5,
    initials: 'AD',
    color: 'from-rose-500 to-pink-500',
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 lg:py-32 bg-gray-950 overflow-hidden"
    >
      {/* ── Background Elements ────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,158,11,0.05) 0%, transparent 70%)',
        }}
      />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        
        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-amber-400">
              Client Feedback
            </span>
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Trusted by{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Industry Leaders
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here is what our clients have to say about our commitment to quality, precision, and delivery.
          </p>
        </motion.div>

        {/* ── Swiper Slider ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative px-2 sm:px-4"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/30 !w-2 !h-2 !transition-all !duration-300 hover:!bg-amber-400',
              bulletActiveClass: '!bg-amber-500 !w-6 !rounded-full',
            }}
            loop={true}
            className="pb-16"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div 
                  className="h-full flex flex-col p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className="text-amber-400" size={20} />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                    "{testimonial.feedback}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/5">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg bg-gradient-to-br ${testimonial.color}`}
                    >
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm group-hover:text-amber-300 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Pagination Container overrides */}
            <style>{`
              .swiper-pagination {
                bottom: 0px !important;
              }
            `}</style>
          </Swiper>
        </motion.div>

      </div>
    </section>
  )
}
