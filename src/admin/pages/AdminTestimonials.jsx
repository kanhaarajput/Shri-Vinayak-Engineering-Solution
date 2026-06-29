import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: null
  });
  
  const [preview, setPreview] = useState(null);

  const resetForm = () => {
    setFormData({ name: '', role: '', content: '', rating: 5, image: null });
    setPreview(null);
    setIsEditing(false);
    setCurrent(null);
  };

  const handleEdit = (item) => {
    setCurrent(item);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating || 5,
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
    data.append('role', formData.role);
    data.append('content', formData.content);
    data.append('rating', formData.rating);
    if (formData.image) data.append('image', formData.image);

    if (isEditing) await updateTestimonial(current.id, data);
    else await addTestimonial(data);
    
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Testimonials Management</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors shadow-sm"
          >
            <Plus size={20} />
            Add Testimonial
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              {current ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name</label>
                <input
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company / Role</label>
                <input
                  type="text" required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (1-5)</label>
                <input
                  type="number" min="1" max="5" required
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Review Content</label>
              <textarea
                required rows={3}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Client Photo (Logo)</label>
              <div className="flex items-start gap-6">
                {preview && <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg object-cover border border-gray-200" />}
                <input
                  type="file" accept="image/*" required={!current}
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="bg-amber-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20">
                {current ? 'Save Changes' : 'Add Testimonial'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex gap-4 p-4 items-start">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full object-cover shadow-md" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-amber-500 text-xs font-semibold mb-2">{item.role} • {item.rating} Stars</p>
                <p className="text-gray-500 text-sm line-clamp-3">{item.content}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-1.5 text-gray-400 hover:text-amber-500 transition-colors"><Pencil size={18} /></button>
                  <button onClick={() => { if (window.confirm('Delete this testimonial?')) deleteTestimonial(item.id); }} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
              No testimonials found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

