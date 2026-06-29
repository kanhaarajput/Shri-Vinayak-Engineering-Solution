import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard, Home, Info, Briefcase, Image as ImageIcon, Phone,
  LogOut, ExternalLink, ChevronRight
} from 'lucide-react';

const PAGE_GROUPS = [
  {
    label: 'DASHBOARD',
    items: [
      { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    label: 'HOME PAGE',
    desc: '/',
    items: [
      { name: 'Home Sections', path: '/admin/home', icon: Home },
    ],
  },
  {
    label: 'ABOUT PAGE',
    desc: '/about',
    items: [
      { name: 'About Sections', path: '/admin/about', icon: Info },
    ],
  },
  {
    label: 'SERVICES PAGE',
    desc: '/services',
    items: [
      { name: 'Services Sections', path: '/admin/services', icon: Briefcase },
    ],
  },
  {
    label: 'GALLERY PAGE',
    desc: '/gallery',
    items: [
      { name: 'Gallery Sections', path: '/admin/gallery', icon: ImageIcon },
    ],
  },
  {
    label: 'CONTACT PAGE',
    desc: '/contact',
    items: [
      { name: 'Contact Sections', path: '/admin/contact', icon: Phone },
    ],
  },
];

export default function AdminLayout() {
  const { isAuthenticated, logout, messages } = useData();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Find which group + item is active
  const currentItem = PAGE_GROUPS.flatMap(g => g.items).find(i => i.path === location.pathname);
  const pageTitle = currentItem?.name || 'Admin Panel';

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 font-sans">
      {/* ─── Sidebar ─────────────────────────────────────── */}
      <aside className="w-72 bg-gray-950 text-white flex flex-col shadow-xl overflow-y-auto">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Shri Admin
          </h2>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="View Live Site"
            className="p-2 rounded-lg text-gray-500 hover:text-amber-400 hover:bg-white/5 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-6">
          {PAGE_GROUPS.map((group) => (
            <div key={group.label}>
              {/* Group Label */}
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-gray-500">
                  {group.label}
                </span>
                {group.desc && (
                  <span className="text-[10px] font-mono text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">
                    {group.desc}
                  </span>
                )}
              </div>

              {/* Group Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-400 shadow-sm shadow-amber-500/5'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isActive ? 'bg-amber-500/20' : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <span className="text-sm font-semibold">{item.name}</span>
                      </div>
                      {/* Unread messages badge for contact */}
                      {item.path === '/admin/contact' && messages.length > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                          {messages.length}
                        </span>
                      )}
                      <ChevronRight size={14} className={`transition-colors ${isActive ? 'text-amber-500' : 'text-gray-700'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
              <LogOut size={16} />
            </div>
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content Area ────────────────────────────── */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">{pageTitle}</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              A
            </div>
            <span className="font-medium text-sm text-gray-600">Admin</span>
          </div>
        </header>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
