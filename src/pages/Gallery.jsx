import SEO from '@components/seo/SEO'
import GalleryHero from '@components/sections/GalleryHero'
import ProjectGallery from '@components/sections/ProjectGallery'
import BeforeAfterSlider from '@components/sections/BeforeAfterSlider'
import MachineryShowcase from '@components/sections/MachineryShowcase'
import VideoGallery from '@components/sections/VideoGallery'
import ProjectCategories from '@components/sections/ProjectCategories'
import WhyChooseUsSection from '@components/sections/WhyChooseUsSection'
import CTASection from '@components/sections/CTASection'

export default function Gallery() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <SEO 
        title="Our Work Gallery | Shri Vinayak Engineering Solutions"
        description="Explore our portfolio of precision engineering, laser welding, CNC machining, and industrial fabrication projects."
      />

      {/* 1. Hero Section */}
      <GalleryHero />

      {/* 2 & 3. Gallery Filter & Masonry Grid (with Lightbox) */}
      <ProjectGallery />

      {/* 4. Before & After Transformation */}
      <BeforeAfterSlider />

      {/* 5. Machinery Showcase (Reused from Services) */}
      <MachineryShowcase />

      {/* 6. Video Gallery */}
      <VideoGallery />

      {/* 7. Client Project Categories */}
      <ProjectCategories />

      {/* 8. Statistics Section (Reused Counters) */}
      <WhyChooseUsSection />

      {/* 9. CTA Section (Reused Glowing Banner) */}
      <CTASection />

    </div>
  )
}
