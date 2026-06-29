import { useData } from '../../context/DataContext';
import { Image as ImageIcon, Briefcase, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { projects, categories } = useData();

  const stats = [
    { name: 'Total Gallery Items', value: projects.length, icon: ImageIcon, color: 'bg-blue-500' },
    { name: 'Categories', value: categories.length, icon: Briefcase, color: 'bg-amber-500' },
    { name: 'Total Services', value: 8, icon: TrendingUp, color: 'bg-green-500' }, // Hardcoded for now
    { name: 'Active Visitors', value: '12', icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Overview Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`${stat.color} p-4 rounded-lg text-white`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/admin/gallery" className="block w-full p-4 rounded-lg border border-gray-100 hover:border-amber-500 hover:bg-amber-50 transition-colors">
              <div className="flex items-center gap-3">
                <ImageIcon className="text-amber-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Add Gallery Image</h4>
                  <p className="text-sm text-gray-500">Upload a new project photo to the gallery</p>
                </div>
              </div>
            </Link>
            <Link to="/admin/services" className="block w-full p-4 rounded-lg border border-gray-100 hover:border-amber-500 hover:bg-amber-50 transition-colors">
              <div className="flex items-center gap-3">
                <Briefcase className="text-amber-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Manage Services</h4>
                  <p className="text-sm text-gray-500">Update service descriptions and icons</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Gallery Additions</h3>
          <div className="space-y-4">
            {projects.slice().reverse().slice(0, 4).map((project) => (
              <div key={project.id} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0">
                <img src={project.image} alt={project.title} className="w-12 h-12 rounded object-cover" />
                <div>
                  <h4 className="font-medium text-gray-900">{project.title}</h4>
                  <p className="text-xs text-gray-500">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
