import AdminSection from '../components/AdminSection';
import AdminHome from './AdminHome';
import AdminFeatures from './AdminFeatures';
import AdminTestimonials from './AdminTestimonials';
import AdminContact from './AdminContact';
import { LayoutTemplate, Star, MessageCircle, Phone, BarChart3 } from 'lucide-react';

export default function AdminHomePage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Home Page</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all sections that appear on your homepage</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-white dark:text-white bg-gray-950 dark:bg-gray-900 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
        >
          View Live Page →
        </a>
      </div>

      {/* Section 1: Hero & Stats */}
      <AdminSection
        title="Hero Banner & Statistics"
        icon={LayoutTemplate}
        rendersOn={["Home (/)"]}
        siteLink="/#hero"
        defaultOpen={true}
      >
        <AdminHome />
      </AdminSection>

      {/* Section 2: Why Choose Us (Features) */}
      <AdminSection
        title="Why Choose Us — Feature Cards"
        icon={Star}
        rendersOn={["Home (/)", "Services (/services)", "Gallery (/gallery)"]}
        siteLink="/#why-choose-us"
      >
        <AdminFeatures />
      </AdminSection>

      {/* Section 3: Testimonials */}
      <AdminSection
        title="Client Testimonials"
        icon={MessageCircle}
        rendersOn={["Home (/)"]}
        siteLink="/#testimonials"
      >
        <AdminTestimonials />
      </AdminSection>

      {/* Section 4: Contact Info */}
      <AdminSection
        title="Contact Information (Footer & Contact Page)"
        icon={Phone}
        rendersOn={["Home (/)", "Contact (/contact)", "Footer (all pages)"]}
        siteLink="/#contact"
      >
        <AdminContact />
      </AdminSection>
    </div>
  );
}

