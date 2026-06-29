import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

import { HiPlay } from 'react-icons/hi'
import { VIDEOS } from '@data/galleryData'

export default function VideoGallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden border-t border-white/5">
      
      {/* Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-amber-400">
              Media
            </span>
            <div className="h-px w-8 bg-amber-500/50 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Process Video Gallery
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Watch our high-precision machinery and master welders in action. Experience the meticulous process behind our engineering solutions.
          </p>
        </motion.div>
      </div>

      {/* Video Swiper Gallery */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full relative z-10"
      >
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-white/40 !w-2 !h-2', bulletActiveClass: '!bg-amber-500 !w-6 !rounded-full' }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          loop={true}
          className="w-full py-10"
        >
          {VIDEOS.map((video) => (
            <SwiperSlide key={video.id} className="w-[320px] sm:w-[500px] lg:w-[700px] h-[220px] sm:h-[300px] lg:h-[400px] relative rounded-3xl overflow-hidden group border border-white/10">
              
              {/* Thumbnail */}
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gray-950/40 group-hover:bg-gray-950/20 transition-colors duration-300 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent pointer-events-none" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-500/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)] group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300">
                  <HiPlay className="text-white text-3xl sm:text-4xl ml-2" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl drop-shadow-lg">
                  {video.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}
