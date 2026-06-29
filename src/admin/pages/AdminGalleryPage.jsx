import AdminSection from '../components/AdminSection';
import AdminGallery from './AdminGallery';
import { Image } from 'lucide-react';

export default function AdminGalleryPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Gallery Page</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your project gallery images and categories</p>
        </div>
        <a
          href="/gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
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
    </div>
  );
}

