import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import {
  Image as ImageIcon, Briefcase, Users, MessageSquare,
  Star, Cog, GitBranch, MessageCircle, Home, Info, Phone,
  ArrowUpRight, TrendingUp, Layers
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    projects, services, team, messages, testimonials,
    features, workflow, machinery
  } = useData();

  const stats = [
    { name: 'Gallery Items',   value: projects.length,     icon: ImageIcon,    color: 'from-blue-500 to-cyan-500',     glow: 'shadow-blue-500/20' },
    { name: 'Services',        value: services.length,     icon: Briefcase,    color: 'from-green-500 to-emerald-500', glow: 'shadow-green-500/20' },
    { name: 'Team Members',    value: team.length,         icon: Users,        color: 'from-emerald-500 to-teal-500',  glow: 'shadow-emerald-500/20' },
    { name: 'Testimonials',    value: testimonials.length, icon: MessageCircle,color: 'from-purple-500 to-violet-500', glow: 'shadow-purple-500/20' },
    { name: 'Features',        value: features.length,     icon: Star,         color: 'from-pink-500 to-rose-500',     glow: 'shadow-pink-500/20' },
    { name: 'Workflow Steps',  value: workflow.length,     icon: GitBranch,    color: 'from-sky-500 to-blue-500',      glow: 'shadow-sky-500/20' },
    { name: 'Machinery',       value: machinery.length,    icon: Cog,          color: 'from-indigo-500 to-purple-500', glow: 'shadow-indigo-500/20' },
    { name: 'Messages',        value: messages.length,     icon: MessageSquare,color: 'from-red-500 to-rose-500',      glow: 'shadow-red-500/20' },
  ];

  const siteMap = [
    {
      page: 'Home Page',
      path: '/admin/home',
      livePath: '/',
      icon: Home,
      color: 'from-green-500 to-emerald-500',
      sections: [
        { name: 'Hero Banner & Stats' },
        { name: 'Features (Why Choose Us)', count: `${features.length} items` },
        { name: 'Testimonials', count: `${testimonials.length} items` },
        { name: 'Contact Info' },
      ],
    },
    {
      page: 'About Page',
      path: '/admin/about',
      livePath: '/about',
      icon: Info,
      color: 'from-blue-500 to-cyan-500',
      sections: [
        { name: 'About Content' },
        { name: 'Team Members', count: `${team.length} members` },
        { name: 'Future Plans' },
      ],
    },
    {
      page: 'Services Page',
      path: '/admin/services',
      livePath: '/services',
      icon: Briefcase,
      color: 'from-purple-500 to-violet-500',
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
      color: 'from-sky-500 to-blue-500',
      sections: [
        { name: 'Gallery Images', count: `${projects.length} images` },
      ],
    },
    {
      page: 'Contact Page',
      path: '/admin/contact',
      livePath: '/contact',
      icon: Phone,
      color: 'from-orange-500 to-rose-500',
      sections: [
        { name: 'Contact Information' },
        { name: 'Inbox Messages', count: `${messages.length} messages` },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent border border-green-500/20 px-8 py-7">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,197,94,0.12),_transparent_60%)] pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Welcome back, Admin 👋</h2>
            <p className="text-sm text-gray-400">Here's an overview of your website content</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Layers className="text-green-400" size={18} />
            <span className="text-sm font-semibold text-green-400">{stats.reduce((a, s) => a + s.value, 0)} total items</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] group hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg ${stat.glow}`}>
                  <Icon size={18} />
                </div>
                <TrendingUp size={14} className="text-gray-600" />
              </div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs font-medium text-gray-500 mt-0.5">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Site Map */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">📍 Manage Your Pages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteMap.map((page) => {
            const Icon = page.icon;
            return (
              <div
                key={page.page}
                className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{page.page}</h4>
                      <span className="text-[10px] font-mono text-gray-500">{page.livePath}</span>
                    </div>
                  </div>
                  <Link
                    to={page.path}
                    className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                {/* Sections List */}
                <div className="px-5 py-3">
                  {page.sections.map((section, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                      <span className="text-sm text-gray-400">{section.name}</span>
                      {section.count && (
                        <span className="text-xs font-semibold text-gray-500 bg-white/[0.04] px-2 py-0.5 rounded-full">{section.count}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <Link
                  to={page.path}
                  className="block px-5 py-3 bg-white/[0.02] hover:bg-green-500/10 border-t border-white/[0.06] text-center text-xs font-bold text-green-400 hover:text-green-300 transition-colors"
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
