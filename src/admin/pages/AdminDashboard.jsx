import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import {
  Image as ImageIcon, Briefcase, Users, MessageSquare,
  Star, Cog, GitBranch, MessageCircle, Home, Info, Phone,
  ArrowUpRight, TrendingUp
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    projects, services, team, messages, testimonials,
    features, workflow, machinery, categories
  } = useData();

  const stats = [
    { name: 'Gallery Items', value: projects.length, icon: ImageIcon, color: 'from-blue-500 to-cyan-500' },
    { name: 'Services', value: services.length, icon: Briefcase, color: 'from-amber-500 to-orange-500' },
    { name: 'Team Members', value: team.length, icon: Users, color: 'from-emerald-500 to-teal-500' },
    { name: 'Testimonials', value: testimonials.length, icon: MessageCircle, color: 'from-purple-500 to-violet-500' },
    { name: 'Features', value: features.length, icon: Star, color: 'from-pink-500 to-rose-500' },
    { name: 'Workflow Steps', value: workflow.length, icon: GitBranch, color: 'from-sky-500 to-blue-500' },
    { name: 'Machinery', value: machinery.length, icon: Cog, color: 'from-indigo-500 to-purple-500' },
    { name: 'Messages', value: messages.length, icon: MessageSquare, color: 'from-red-500 to-orange-500' },
  ];

  const siteMap = [
    {
      page: 'Home Page',
      path: '/admin/home',
      livePath: '/',
      icon: Home,
      sections: [
        { name: 'Hero & Stats', count: '4 stats' },
        { name: 'Features (Why Choose Us)', count: `${features.length} items` },
        { name: 'Testimonials', count: `${testimonials.length} items` },
        { name: 'Contact Info', count: 'Phone, Email, Address' },
      ],
    },
    {
      page: 'About Page',
      path: '/admin/about',
      livePath: '/about',
      icon: Info,
      sections: [
        { name: 'About Content', count: 'Mission, Vision' },
        { name: 'Team Members', count: `${team.length} members` },
        { name: 'Future Plans', count: 'Vision & Goals' },
      ],
    },
    {
      page: 'Services Page',
      path: '/admin/services',
      livePath: '/services',
      icon: Briefcase,
      sections: [
        { name: 'Services List', count: `${services.length} services` },
        { name: 'Workflow Steps', count: `${workflow.length} steps` },
        { name: 'Machinery', count: `${machinery.length} machines` },
      ],
    },
    {
      page: 'Gallery Page',
      path: '/admin/gallery',
      livePath: '/gallery',
      icon: ImageIcon,
      sections: [
        { name: 'Gallery Images', count: `${projects.length} images` },
      ],
    },
    {
      page: 'Contact Page',
      path: '/admin/contact',
      livePath: '/contact',
      icon: Phone,
      sections: [
        { name: 'Contact Information', count: 'Phone, Email, Address' },
        { name: 'Inbox Messages', count: `${messages.length} messages` },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-black text-gray-900">Welcome back, Admin 👋</h2>
        <p className="text-sm text-gray-500 mt-1">Here's a snapshot of your website content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon size={18} />
                </div>
                <TrendingUp size={14} className="text-gray-300" />
              </div>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Site Map */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Site Map — Your Pages & Sections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteMap.map((page) => {
            const Icon = page.icon;
            return (
              <div key={page.page} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {/* Page Header */}
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{page.page}</h4>
                      <span className="text-[10px] font-mono text-gray-400">{page.livePath}</span>
                    </div>
                  </div>
                  <Link
                    to={page.path}
                    className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                {/* Sections List */}
                <div className="px-5 py-3">
                  {page.sections.map((section, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-600">{section.name}</span>
                      <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{section.count}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Link */}
                <Link
                  to={page.path}
                  className="block px-5 py-3 bg-gray-50 text-center text-xs font-bold text-amber-600 hover:bg-amber-50 transition-colors"
                >
                  Manage {page.page} →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

