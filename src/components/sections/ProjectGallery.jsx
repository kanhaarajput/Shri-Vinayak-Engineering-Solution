import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiArrowsExpand } from 'react-icons/hi'
import { useData } from '../../context/DataContext'

export default function ProjectGallery() {
  const { categories: CATEGORIES, projects: PROJECTS } = useData();
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS)
  const [selectedImage, setSelectedImage] = useState(null) // Holds the full project object for the lightbox

  // Handle Filtering
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(PROJECTS)
    } else {
      setFilteredProjects(PROJECTS.filter(p => p.category === activeCategory))
    }
  }, [activeCategory, PROJECTS])

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['All', ...CATEGORIES].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-green-500 text-gray-950 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105'
                  : 'bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:bg-white/10 hover:text-gray-900 dark:text-white border border-black/10 dark:border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square bg-gray-50 dark:bg-gray-900 border border-black/5 dark:border-white/5"
                onClick={() => setSelectedImage(project)}
              >
                {/* Image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <HiArrowsExpand size={16} /> View Image
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl p-4 sm:p-8"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white rounded-full transition-colors backdrop-blur-md"
              >
                <HiX size={24} />
              </button>

              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking the image card itself
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-2 h-[40vh] sm:h-[60vh] lg:h-[70vh]">
                    <img 
                      src={selectedImage.image} 
                      alt={selectedImage.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-950">
                    <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                      {selectedImage.category}
                    </span>
                    <h2 className="text-3xl font-black text-white mb-4">
                      {selectedImage.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                      {selectedImage.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
