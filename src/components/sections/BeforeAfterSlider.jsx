import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@utils/animations'
import { HiSwitchHorizontal } from 'react-icons/hi'

import { useData } from '../../context/DataContext'

export default function BeforeAfterSlider() {
  const { beforeAfter } = useData()
  
  // Create state for each slider independently
  const [sliderPositions, setSliderPositions] = useState({})
  const [draggingId, setDraggingId] = useState(null)
  const containerRefs = useRef({})
  
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Use default images if database is empty
  const items = beforeAfter.length > 0 ? beforeAfter : [
    { _id: 'default', title: 'Damaged Die Repair', beforeImage: '/assets/die_before.png', afterImage: '/assets/die_after.png' }
  ];

  const handleMove = (id, clientX) => {
    const container = containerRefs.current[id]
    if (!container) return
    const { left, width } = container.getBoundingClientRect()
    const x = clientX - left
    const percent = Math.max(0, Math.min(100, (x / width) * 100))
    setSliderPositions(prev => ({ ...prev, [id]: percent }))
  }

  const handleMouseMove = (e) => {
    if (!draggingId) return
    handleMove(draggingId, e.clientX)
  }

  const handleTouchMove = (e) => {
    if (!draggingId) return
    handleMove(draggingId, e.touches[0].clientX)
  }

  useEffect(() => {
    if (draggingId) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', () => setDraggingId(null))
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', () => setDraggingId(null))
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', () => setDraggingId(null))
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', () => setDraggingId(null))
    }
  }, [draggingId])





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

        {/* Dynamic Sliders */}
        <div className="flex flex-col gap-12">
          {items.map((item, idx) => {
            const pos = sliderPositions[item._id] ?? 50;
            return (
              <motion.div
                key={item._id || idx}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + (idx * 0.1) }}
                className="relative max-w-4xl w-full mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none group touch-none"
                ref={el => containerRefs.current[item._id] = el}
                onMouseDown={(e) => {
                  setDraggingId(item._id)
                  handleMove(item._id, e.clientX)
                }}
                onTouchStart={(e) => {
                  setDraggingId(item._id)
                  handleMove(item._id, e.touches[0].clientX)
                }}
              >
                {/* Title overlay */}
                {item.title && (
                  <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent z-40 text-center pointer-events-none">
                    <h3 className="text-white font-bold tracking-wide">{item.title}</h3>
                  </div>
                )}
                
                {/* Aspect Ratio Wrapper */}
                <div className="relative w-full pb-[60%] sm:pb-[50%] bg-gray-900">
                  
                  {/* Background Image (Before) */}
                  <img 
                    src={item.beforeImage} 
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable="false"
                  />
                  
                  {/* Before Label */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 pointer-events-none">
                    <span className="px-4 py-2 bg-gray-950/80 backdrop-blur-md text-white text-sm font-bold tracking-widest uppercase rounded-full border border-white/10">
                      Before
                    </span>
                  </div>

                  {/* Foreground Image Wrapper (After) */}
                  <div 
                    className="absolute inset-0 z-20 overflow-hidden border-r border-white/50"
                    style={{ width: `${pos}%` }}
                  >
                    {/* Foreground Image */}
                    <img 
                      src={item.afterImage} 
                      alt="After"
                      className="absolute inset-0 h-full object-cover"
                      style={{ width: `${(100 / pos) * 100}%`, maxWidth: 'none' }}
                      draggable="false"
                    />
                    
                    {/* After Label */}
                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 pointer-events-none" style={{ right: `calc(${100 - pos}% + 1rem)` }}>
                      {pos > 20 && (
                        <span className="px-4 py-2 bg-amber-500/90 backdrop-blur-md text-gray-950 text-sm font-black tracking-widest uppercase rounded-full border border-amber-400 whitespace-nowrap">
                          After
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Custom Slider Handle */}
                  <div 
                    className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] cursor-ew-resize flex items-center justify-center -translate-x-1/2"
                    style={{ left: `${pos}%` }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-2xl text-gray-900 border-4 border-amber-400 group-hover:scale-110 transition-transform">
                      <HiSwitchHorizontal size={20} />
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  )
}
