import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function InnovationTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchInnovation();
  }, []);

  const fetchInnovation = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/innovation');
      if (res.data && res.data._id) {
        setFormData({
          title: res.data.title || '',
          description: res.data.description || '',
        });
        if (res.data.image) setImagePreview(res.data.image);
      }
    } catch (error) {
      toast.error('Failed to load Innovation data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      return toast.error('Title and Description are required');
    }

    setSaving(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      if (imageFile) {
        data.append('image', imageFile);
      }

      await axios.post('http://localhost:3000/api/innovation', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      toast.success('Innovation section updated successfully!');
      fetchInnovation(); // refresh data
    } catch (error) {
      toast.error('Failed to update Innovation');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading innovation data...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Edit Innovation Section</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        
        {/* Cover Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Innovation Image</label>
          <div className="flex items-center gap-6">
            <div className="w-48 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden relative group">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-gray-400" size={32} />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium">Click to upload</span>
              </div>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>Recommended size: 800x800px</p>
              <p>Format: JPG, PNG, WEBP</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              placeholder="e.g. Research & Development"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              rows={5}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
              placeholder="Details about R&D initiatives..."
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-70 transition-colors font-medium"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
