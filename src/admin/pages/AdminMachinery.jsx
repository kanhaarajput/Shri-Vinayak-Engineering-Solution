import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminMachinery() {
  const { machinery, addMachinery, updateMachinery, deleteMachinery } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    specs: '',
    image: null
  });
  
  const [preview, setPreview] = useState(null);

  const resetForm = () => {
    setFormData({ name: '', specs: '', image: null });
    setPreview(null);
    setIsEditing(false);
    setCurrent(null);
  };

  const handleEdit = (item) => {
    setCurrent(item);
    setFormData({
      name: item.name,
      specs: item.specs ? item.specs.join(', ') : '',
      image: null
    });
    setPreview(item.image);
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    // Convert comma-separated string to array
    const specsArray = formData.specs.split(',').map(s => s.trim()).filter(Boolean);
    data.append('specs', JSON.stringify(specsArray));
    
    if (formData.image) data.append('image', formData.image);

    if (isEditing) await updateMachinery(current.id, data);
    else await addMachinery(data);
    
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">Factory Machinery Showcase</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-green-500 text-white dark:text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors shadow-sm"
          >
            <Plus size={20} /> Add Machinery
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.06] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">{current ? 'Edit Machine' : 'Add New Machine'}</h3>
            <button onClick={resetForm} className="text-gray-400 dark:text-gray-400 hover:text-gray-400"><X size={24} /></button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Machine Name</label>
              <input
                type="text" required value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Specifications (Comma Separated)</label>
              <textarea
                required rows={3} value={formData.specs} placeholder="E.g. Max Load: 500kg, Accuracy: 0.01mm, Bed Size: 1000x500mm"
                onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                className="w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Machine Photo</label>
              <div className="flex items-start gap-6">
                {preview && <img src={preview} alt="Preview" className="w-48 h-32 rounded-lg object-cover border border-white/[0.08]" />}
                <input
                  type="file" accept="image/*" required={!current}
                  onChange={handleImageChange}
                  className="w-full border border-white/10 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-500/10 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="bg-green-500 text-white dark:text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 shadow-lg shadow-green-500/20">
                {current ? 'Save Changes' : 'Add Machinery'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-900/60 text-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-white/10">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {machinery.map((item) => (
            <div key={item.id} className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.06] overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 bg-white/90 text-gray-100 rounded-full hover:bg-green-500 hover:text-white dark:text-white backdrop-blur-sm"><Pencil size={18} /></button>
                  <button onClick={() => { if (window.confirm('Delete this machine?')) deleteMachinery(item.id); }} className="p-2 bg-white/90 text-gray-100 rounded-full hover:bg-red-500 hover:text-white dark:text-white backdrop-blur-sm"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white text-lg mb-2">{item.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.specs && item.specs.map((spec, idx) => (
                    <span key={idx} className="bg-gray-900/60 text-gray-400 text-xs px-2 py-1 rounded-md font-medium">{spec}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {machinery.length === 0 && (
            <div className="col-span-full bg-gray-900 rounded-xl border p-12 text-center text-gray-500">
              No machinery found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

