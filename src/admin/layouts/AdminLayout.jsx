import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard, Home, Info, Briefcase, Image as ImageIcon, Phone,
  LogOut, ChevronRight, Settings
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Overview',          path: '/admin',          icon: LayoutDashboard },
  { name: 'Home Sections',     path: '/admin/home',     icon: Home },
  { name: 'About Sections',    path: '/admin/about',    icon: Info },
  { name: 'Services Sections', path: '/admin/services', icon: Briefcase },
  { name: 'Gallery Sections',  path: '/admin/gallery',  icon: ImageIcon },
  { name: 'Contact Sections',  path: '/admin/contact',  icon: Phone },
  { name: 'Site Settings',     path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { isAuthenticated, logout, messages } = useData();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const currentItem = NAV_ITEMS.find(i => i.path === location.pathname);
  const pageTitle = currentItem?.name || 'Admin Panel';

  return (
    <div className="flex h-screen bg-gray-950 text-white font-sans">
      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-64 bg-gray-900/80 backdrop-blur-xl border-r border-white/[0.06] flex flex-col shadow-2xl overflow-y-auto flex-shrink-0">
        {/* Branding */}
        <div className="px-6 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-gray-950 font-black text-sm">S</span>
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight text-white">Shri Admin</h2>
              <p className="text-[10px] text-gray-500 tracking-wide">Management Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-sm shadow-green-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-green-500/20' : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
                    }`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                  {/* Unread messages badge */}
                  {item.path === '/admin/contact' && messages.length > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {messages.length}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight size={14} className="text-green-500" />
                  )}
                </Link>
              );
            })}
          </div>
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

      {/* ─── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 overflow-auto bg-gray-950">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-md border-b border-white/[0.06] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white">{pageTitle}</h1>
            <p className="text-xs text-gray-500 mt-0.5">Shri Vinayak Engineering Solutions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-gray-950 font-black text-sm shadow-md shadow-green-500/30">
              A
            </div>
            <span className="font-medium text-sm text-gray-400">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
