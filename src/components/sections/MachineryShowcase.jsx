import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

import vmcImg from '@assets/svc_vmc.png'
import wirecutImg from '@assets/svc_wirecut.png'
import engImg from '@assets/svc_engraving.png'
import tigImg from '@assets/svc_tig.png'
import argonImg from '@assets/svc_argon.png'
import laserImg from '@assets/gallery_1.png'

const MACHINES = [
  { name: 'VMC Machine', image: vmcImg },
  { name: 'Wirecut Machine', image: wirecutImg },
  { name: 'Laser Engraving Machine', image: engImg },
  { name: 'Laser Welding Setup', image: laserImg },
  { name: 'TIG Welding Setup', image: tigImg },
  { name: 'Argon Welding Setup', image: argonImg },
]

export default function MachineryShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-[#050914] overflow-hidden">
      
      {/* Header */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
        >
          Machinery Showcase
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-base max-w-2xl mx-auto"
        >
          State-of-the-art equipment enabling us to maintain strict tolerances and high-quality outputs.
        </motion.p>
      </div>

      {/* Swiper Gallery */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full"
      >
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-white/40 !w-2 !h-2', bulletActiveClass: '!bg-amber-500 !w-6 !rounded-full' }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          loop={true}
          className="w-full py-10"
        >
          {MACHINES.map((machine, idx) => (
            <SwiperSlide key={idx} className="w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] relative rounded-3xl overflow-hidden group">
              <img 
                src={machine.image} 
                alt={machine.name} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[8000ms] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-center transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="text-white font-bold text-xl drop-shadow-md">{machine.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}
