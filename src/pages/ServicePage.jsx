import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiStar, HiCog, HiCheckCircle, HiArrowLeft } from 'react-icons/hi'
import SEO from '@components/seo/SEO'
import { fadeUp, fadeIn } from '@utils/animations'
import { useData } from '../context/DataContext'
import CTASection from '@components/sections/CTASection'

export default function ServicePage() {
  const { id } = useParams()
  const { services, loading } = useData()

  // Find the service by ID
  const service = services.find(s => s.id === id)

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h2>
        <Link to="/services" className="text-green-500 hover:underline flex items-center gap-2">
          <HiArrowLeft /> Back to Services
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white pb-20 overflow-x-hidden">
      <SEO 
        title={`${service.title} | Shri Vinayak Engineering Solutions`}
        description={service.desc}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            fetchpriority="high"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.4) saturate(1.1)' }}
          />
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-950 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Link to="/services" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors">
              <HiArrowLeft /> Back to Services
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
              {service.title}
            </h1>
            <div 
              className="h-1.5 w-24 rounded-full" 
              style={{ backgroundColor: service.color || '#10b981' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-12">
            
            {/* Overview */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {service.desc}
              </p>
            </motion.div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-3">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                      <HiCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Benefits and Applications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <HiStar className="text-yellow-500" size={24} /> Benefits
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Applications */}
              {service.applications && service.applications.length > 0 && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <HiCog className="text-blue-500" size={24} /> Applications
                  </h3>
                  <ul className="space-y-4">
                    {service.applications.map((app, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
