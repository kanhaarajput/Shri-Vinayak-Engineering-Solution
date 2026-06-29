import AdminSection from '../components/AdminSection';
import AdminServices from './AdminServices';
import AdminWorkflow from './AdminWorkflow';
import AdminMachinery from './AdminMachinery';
import { Briefcase, GitBranch, Cog } from 'lucide-react';

export default function AdminServicesPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Services Page</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your service listings, process workflow, and machinery</p>
        </div>
        <a
          href="/services"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-white dark:text-white bg-gray-950 dark:bg-gray-900 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
        >
          View Live Page →
        </a>
      </div>

      {/* Section 1: Services List */}
      <AdminSection
        title="Services List"
        icon={Briefcase}
        rendersOn={["Services (/services)", "Home (/)"]}
        siteLink="/services"
        defaultOpen={true}
      >
        <AdminServices />
      </AdminSection>

      {/* Section 2: Workflow Steps */}
      <AdminSection
        title="Process Workflow Timeline"
        icon={GitBranch}
        rendersOn={["Services (/services)"]}
        siteLink="/services#workflow"
      >
        <AdminWorkflow />
      </AdminSection>

      {/* Section 3: Machinery Showcase */}
      <AdminSection
        title="Machinery Showcase"
        icon={Cog}
        rendersOn={["Services (/services)", "Gallery (/gallery)"]}
        siteLink="/services#machinery"
      >
        <AdminMachinery />
      </AdminSection>
    </div>
  );
}

