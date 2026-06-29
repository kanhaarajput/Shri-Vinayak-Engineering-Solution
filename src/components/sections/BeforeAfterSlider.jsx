import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@utils/animations'
import { HiSwitchHorizontal } from 'react-icons/hi'

import imgBefore from '@assets/die_before.png'
import imgAfter from '@assets/die_after.png'

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    const x = clientX - left
    const percent = Math.max(0, Math.min(100, (x / width) * 100))
    setSliderPosition(percent)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', () => setIsDragging(false))
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', () => setIsDragging(false))
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', () => setIsDragging(false))
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', () => setIsDragging(false))
    }
  }, [isDragging])

  return (
    <section ref={ref} className="py-24 bg-[#030610] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Transformation Through <span className="text-amber-400">Precision</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Drag the slider to see how our advanced laser welding technology perfectly restores heavily damaged industrial dies to their original condition.
          </p>
        </motion.div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none group touch-none"
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true)
            handleMove(e.clientX)
          }}
          onTouchStart={(e) => {
            setIsDragging(true)
            handleMove(e.touches[0].clientX)
          }}
        >
          {/* Aspect Ratio Wrapper */}
          <div className="relative w-full pb-[60%] sm:pb-[50%]">
            
            {/* Background Image (Before) */}
            <img 
              src={imgBefore} 
              alt="Damaged Die Before Repair"
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
            
            {/* Before Label */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
              <span className="px-4 py-2 bg-gray-950/80 backdrop-blur-md text-white text-sm font-bold tracking-widest uppercase rounded-full border border-white/10">
                Before
              </span>
            </div>

            {/* Foreground Image Wrapper (After) */}
            <div 
              className="absolute inset-0 z-20 overflow-hidden border-r border-white/50"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Foreground Image */}
              <img 
                src={imgAfter} 
                alt="Repaired Die After Welding"
                className="absolute inset-0 h-full object-cover"
                style={{ width: `${(100 / sliderPosition) * 100}%`, maxWidth: 'none' }}
                draggable="false"
              />
              
              {/* After Label */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30" style={{ right: `calc(${100 - sliderPosition}% + 1rem)` }}>
                {sliderPosition > 20 && (
                  <span className="px-4 py-2 bg-amber-500/90 backdrop-blur-md text-gray-950 text-sm font-black tracking-widest uppercase rounded-full border border-amber-400 whitespace-nowrap">
                    After
                  </span>
                )}
              </div>
            </div>

            {/* Custom Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] cursor-ew-resize flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-2xl text-gray-900 border-4 border-amber-400 group-hover:scale-110 transition-transform">
                <HiSwitchHorizontal size={20} />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
