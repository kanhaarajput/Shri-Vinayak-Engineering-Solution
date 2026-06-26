import SEO from '@components/seo/SEO'
import ContactSection from '@components/sections/ContactSection'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20">
      <SEO 
        title="Contact Us | Shri Vinayak Engineering Solutions"
        description="Get in touch with us for precision engineering, laser welding, and VMC wirecut solutions."
      />
      <ContactSection />
    </div>
  )
}
