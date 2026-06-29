import AdminSection from '../components/AdminSection';
import AdminGallery from './AdminGallery';
import AdminVideos from './AdminVideos';
import AdminIndustries from './AdminIndustries';
import AdminBeforeAfter from './AdminBeforeAfter';
import { Image, Video, Factory, SlidersHorizontal } from 'lucide-react';

export default function AdminGalleryPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Gallery Page</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your project gallery images and categories</p>
        </div>
        <a
          href="/gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-white dark:text-white bg-gray-950 dark:bg-gray-900 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
        >
          View Live Page →
        </a>
      </div>

      {/* Section 1: Gallery Images */}
      <AdminSection
        title="Project Gallery & Categories"
        icon={Image}
        rendersOn={["Gallery (/gallery)", "Home (/)"]}
        siteLink="/gallery"
        defaultOpen={true}
      >
        <AdminGallery />
      </AdminSection>

      {/* Section 2: Video Gallery */}
      <AdminSection
        title="Video Gallery"
        icon={Video}
        rendersOn={["Gallery (/gallery)"]}
        siteLink="/gallery"
        defaultOpen={false}
      >
        <AdminVideos />
      </AdminSection>

      {/* Section 3: Industrial Applications */}
      <AdminSection
        title="Industrial Applications"
        icon={Factory}
        rendersOn={["Gallery (/gallery)"]}
        siteLink="/gallery"
        defaultOpen={false}
      >
        <AdminIndustries />
      </AdminSection>

      {/* Section 4: Before & After Slider */}
      <AdminSection
        title="Comparison Slider Images"
        icon={SlidersHorizontal}
        rendersOn={["Gallery (/gallery)"]}
        siteLink="/gallery"
        defaultOpen={false}
      >
        <AdminBeforeAfter />
      </AdminSection>
    </div>
  );
}

