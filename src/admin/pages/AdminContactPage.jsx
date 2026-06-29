import AdminSection from '../components/AdminSection';
import AdminContact from './AdminContact';
import AdminMessages from './AdminMessages';
import { Phone, MessageSquare } from 'lucide-react';

export default function AdminContactPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Contact Page</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your contact information and customer messages</p>
        </div>
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
        >
          View Live Page →
        </a>
      </div>

      {/* Section 1: Contact Info */}
      <AdminSection
        title="Contact Information"
        icon={Phone}
        rendersOn={["Contact (/contact)", "Footer (all pages)"]}
        siteLink="/contact"
        defaultOpen={true}
      >
        <AdminContact />
      </AdminSection>

      {/* Section 2: Inbox Messages */}
      <AdminSection
        title="Customer Inbox — Messages from Contact Form"
        icon={MessageSquare}
        rendersOn={["Contact Form (/contact)"]}
        defaultOpen={true}
      >
        <AdminMessages />
      </AdminSection>
    </div>
  );
}

