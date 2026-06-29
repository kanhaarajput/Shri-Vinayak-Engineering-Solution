import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { 
  HiStar, HiPencil, HiCog, HiScissors, 
  HiFire, HiBeaker, HiCubeTransparent, HiShieldCheck 
} from 'react-icons/hi';
import { FaWrench } from 'react-icons/fa';

const iconMap = {
  HiStar, HiPencil, HiCog, HiScissors, 
  HiFire, HiBeaker, HiCubeTransparent, HiShieldCheck,
  FaWrench
};

export default function AdminServices() {
  const { services, addService, updateService, deleteService } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    iconName: 'HiStar',
    image: '',
    color: '#fbbf24'
  });

  const openModal = (service = null) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title,
        desc: service.desc,
        iconName: service.iconName || 'HiStar',
        image: service.image || '',
        color: service.color || '#fbbf24'
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        desc: '',
        iconName: 'HiStar',
        image: '',
        color: '#fbbf24'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateService(editingId, formData);
    } else {
      addService(formData);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Services</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-medium">Icon</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.map((service) => {
              const Icon = iconMap[service.iconName] || HiStar;
              return (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.color}20`, color: service.color }}>
                      <Icon size={20} />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{service.title}</td>
                  <td className="p-4 text-sm text-gray-500 max-w-xs truncate">{service.desc}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => openModal(service)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this service?')) {
                          deleteService(service.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    {Object.keys(iconMap).map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color (Hex)</label>
                  <input
                    type="color"
                    required
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg px-2 py-1 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (For Services Grid)</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="/assets/svc_vmc.png or https://..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 rounded-lg text-white font-medium hover:bg-amber-600 transition-colors"
                >
                  {editingId ? 'Save Changes' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
