import SEO from '@components/seo/SEO'
import ContactSection from '@components/sections/ContactSection'

export default function Contact() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Shri Vinayak Engineering Solutions",
    "image": "https://www.shrivinayakengineeringsolutions.com/favicon.jpeg",
    "@id": "https://www.shrivinayakengineeringsolutions.com",
    "url": "https://www.shrivinayakengineeringsolutions.com",
    "telephone": "+91-9876543210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 123",
      "addressLocality": "Gurgaon",
      "addressRegion": "Haryana",
      "postalCode": "122001",
      "addressCountry": "IN"
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white pt-20">
      <SEO 
        title="Contact Shri Vinayak Engineering Solutions"
        description="Contact Shri Vinayak Engineering Solutions for CNC Machining, Wire Cut EDM, Tool Room and Precision Engineering services."
        url="https://www.shrivinayakengineeringsolutions.com/contact"
        schemas={[localBusinessSchema]}
      />
      <ContactSection />
    </div>
  )
}
