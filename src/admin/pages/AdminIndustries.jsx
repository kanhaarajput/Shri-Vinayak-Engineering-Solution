import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import * as FaIcons from 'react-icons/fa';

export default function AdminIndustries() {
  const { industries, addIndustry, updateIndustry, deleteIndustry } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    iconName: 'FaIndustry',
    color: '#38bdf8'
  });

  const openModal = (industry = null) => {
    if (industry) {
      setEditingId(industry.id);
      setFormData({
        title: industry.title,
        desc: industry.desc,
        iconName: industry.iconName || 'FaIndustry',
        color: industry.color || '#38bdf8'
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        desc: '',
        iconName: 'FaIndustry',
        color: '#38bdf8'
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
      updateIndustry(editingId, formData);
    } else {
      addIndustry(formData);
    }
    closeModal();
  };

  // Safe icon renderer
  const renderIcon = (iconName, color) => {
    const IconComponent = FaIcons[iconName];
    if (IconComponent) {
      return <IconComponent size={24} color={color} />;
    }
    const FallbackIcon = FaIcons['FaIndustry'];
    return <FallbackIcon size={24} color={color} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">Manage Industrial Applications</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Application
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.06] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-950 border-b border-white/[0.06] text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-medium">Icon</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {industries.map((industry) => (
              <tr key={industry.id} className="hover:bg-gray-950 transition-colors">
                <td className="p-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 border border-white/10">
                    {renderIcon(industry.iconName, industry.color)}
                  </div>
                </td>
                <td className="p-4 font-medium text-white">{industry.title}</td>
                <td className="p-4 text-gray-400 text-sm max-w-[200px] truncate">{industry.desc}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => openModal(industry)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this industrial application?')) {
                        deleteIndustry(industry.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {industries.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No industrial applications found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/[0.06]">
              <h3 className="text-xl font-bold text-white">
                {editingId ? 'Edit Application' : 'Add New Application'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-400">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">FontAwesome Icon Name</label>
                  <input
                    type="text"
                    required
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="FaIndustry"
                  />
                  <p className="text-xs text-gray-500 mt-1">e.g., FaIndustry, FaCar, FaTools (From react-icons/fa)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Icon Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      required
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-10 h-10 border border-white/10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      required
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-white/10 rounded-lg text-gray-300 font-medium hover:bg-gray-950 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  {editingId ? 'Save Changes' : 'Add Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
