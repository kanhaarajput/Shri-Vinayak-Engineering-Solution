import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminFeatures() {
  const { features, addFeature, updateFeature, deleteFeature } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    iconName: 'star'
  });

  const resetForm = () => {
    setFormData({ title: '', desc: '', iconName: 'star' });
    setIsEditing(false);
    setCurrent(null);
  };

  const handleEdit = (item) => {
    setCurrent(item);
    setFormData({ title: item.title, desc: item.desc, iconName: item.iconName || 'star' });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) await updateFeature(current.id, formData);
    else await addFeature(formData);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Features ("Why Choose Us")</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors shadow-sm"
          >
            <Plus size={20} /> Add Feature
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">{current ? 'Edit Feature' : 'Add New Feature'}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text" required value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon Name</label>
                <select
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="star">Star (General / Precision)</option>
                  <option value="bolt">Lightning Bolt (Speed / Fast Delivery)</option>
                  <option value="cog">Gear / Cog (Machinery / Tech)</option>
                  <option value="shield">Shield (Quality / Protection)</option>
                  <option value="check">Checkmark (Reliability)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                required rows={3} value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="bg-amber-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-600 shadow-lg shadow-amber-500/20">
                {current ? 'Save Changes' : 'Add Feature'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 group relative">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500 uppercase">{item.iconName}</span>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-1.5 text-gray-400 hover:text-amber-500"><Pencil size={18} /></button>
                  <button onClick={() => { if (window.confirm('Delete this feature?')) deleteFeature(item.id); }} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
          {features.length === 0 && (
            <div className="col-span-full bg-white rounded-xl border p-12 text-center text-gray-500">
              No features found. Add some!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
