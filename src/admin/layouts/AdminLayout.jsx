import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LayoutDashboard, Image as ImageIcon, Briefcase, Home, Info, Phone, LogOut, MessageSquare, Users, Star, Target, Cog, MessageCircle } from 'lucide-react';

export default function AdminLayout() {
  const { isAuthenticated, logout } = useData();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Inbox', path: '/admin/messages', icon: MessageSquare },
    { name: 'Home Content', path: '/admin/home', icon: Home },
    { name: 'About Content', path: '/admin/about', icon: Info },
    { name: 'Features', path: '/admin/features', icon: Star },
    { name: 'Workflow', path: '/admin/workflow', icon: Target },
    { name: 'Machinery', path: '/admin/machinery', icon: Cog },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageCircle },
    { name: 'Team', path: '/admin/team', icon: Users },
    { name: 'Future Plans', path: '/admin/future-plans', icon: Info },
    { name: 'Contact Info', path: '/admin/contact', icon: Phone },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Shri Admin
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            {navItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-medium text-sm text-gray-600">Admin User</span>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
