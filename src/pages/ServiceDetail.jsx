import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiArrowLeft } from 'react-icons/hi'
import SEO from '@components/seo/SEO'
import { useData } from '../context/DataContext'
import { fadeUp, staggerContainer } from '@utils/animations'

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { services, loading } = useData()
  const [service, setService] = useState(null)

  // Map slugs to explicit SEO data provided by user
  const seoDataMap = {
    'vmc': {
      title: 'VMC Machining Services | Precision CNC Milling',
      description: 'High precision VMC machining services for industrial components, molds, dies and precision engineering.'
    },
    'wire-cut-edm': {
      title: 'Wire Cut EDM Services | Precision Wire Cutting',
      description: 'Accurate Wire Cut EDM machining for high precision dies, molds and complex industrial components.'
    },
    'edm-drill': {
      title: 'EDM Drilling Services | Fast Hole EDM',
      description: 'Professional EDM drilling services for precision holes, tool room applications and industrial manufacturing.'
    },
    'laser-welding': {
      title: 'Laser Welding Services | Industrial Laser Welding',
      description: 'Precision laser welding solutions for mold repair, die repair and industrial metal components.'
    },
    'laser-engraving': {
      title: 'Laser Engraving Services | Industrial Marking',
      description: 'Industrial laser engraving and laser marking solutions for metal parts, tools and engineering products.'
    },
    'argon-welding': {
      title: 'Argon Welding Services | TIG Welding Experts',
      description: 'Professional TIG and Argon welding services for stainless steel, aluminum and industrial fabrication.'
    }
  }

  const seoData = seoDataMap[slug] || {
    title: 'Precision Engineering Services | Shri Vinayak Engineering Solutions',
    description: 'Explore our complete engineering services including CNC Machining, Wire Cut EDM, EDM Drill, Laser Welding, Laser Engraving, Argon Welding.'
  }

  // Attempt to find the matching service from the database using a slugified version of the title
  useEffect(() => {
    if (!loading && services && services.length > 0) {
      const matchedService = services.find(s => {
        const generatedSlug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        return generatedSlug === slug || s.slug === slug
      })
      setService(matchedService || {
        title: seoData.title.split(' |')[0],
        desc: seoData.description,
        image: 'https://images.unsplash.com/photo-1565439390234-fc5652579b29?auto=format&fit=crop&q=80', // Placeholder
        features: ['High precision manufacturing', 'Quality assurance', 'Timely delivery'],
        benefits: ['Cost-effective solutions', 'Improved durability', 'Customization'],
        applications: ['Automotive components', 'Aerospace parts', 'Industrial machinery']
      })
    }
  }, [slug, services, loading, seoData])

  if (loading || !service) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Shri Vinayak Engineering Solutions"
    },
    "description": seoData.description
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.shrivinayakengineeringsolutions.com/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://www.shrivinayakengineeringsolutions.com/services"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": service.title,
      "item": `https://www.shrivinayakengineeringsolutions.com/services/${slug}`
    }]
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white pt-24 pb-16">
      <SEO 
        title={seoData.title}
        description={seoData.description}
        url={`https://www.shrivinayakengineeringsolutions.com/services/${slug}`}
        schemas={[serviceSchema, breadcrumbSchema]}
      />
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors mb-8 font-semibold"
        >
          <HiArrowLeft /> Back to Services
        </button>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-green-500 rounded-full" />
              <span className="text-green-500 font-bold uppercase tracking-widest text-sm">
                Service Overview
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
              {service.title}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {service.desc || seoData.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {service.features && service.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <HiCheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Benefits</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <HiCheckCircle className="text-emerald-500 mt-1 shrink-0" size={18} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.applications && service.applications.length > 0 && (
                <div className="sm:col-span-2 mt-4">
                  <h3 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Industrial Applications</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <HiCheckCircle className="text-blue-500 mt-1 shrink-0" size={18} />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
