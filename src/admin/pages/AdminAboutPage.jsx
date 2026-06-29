import AdminSection from '../components/AdminSection';
import AdminAbout from './AdminAbout';
import AdminTeam from './AdminTeam';
import { FileText, Users } from 'lucide-react';

export default function AdminAboutPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">About Page</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your company info and team members</p>
        </div>
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-white dark:text-white bg-gray-950 dark:bg-gray-900 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
        >
          View Live Page →
        </a>
      </div>

      {/* Section 1: About Content */}
      <AdminSection
        title="Company About Content"
        icon={FileText}
        rendersOn={["About (/about)", "Home (/)"]}
        siteLink="/about"
        defaultOpen={true}
      >
        <AdminAbout />
      </AdminSection>

      {/* Section 2: Team Members */}
      <AdminSection
        title="Team Members"
        icon={Users}
        rendersOn={["About (/about)"]}
        siteLink="/about#team"
      >
        <AdminTeam />
      </AdminSection>
    </div>
  );
}

