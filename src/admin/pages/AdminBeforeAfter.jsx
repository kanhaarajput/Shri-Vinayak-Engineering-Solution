import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Upload, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export default function AdminBeforeAfter() {
  const { beforeAfterList, addBeforeAfter, updateBeforeAfter, deleteBeforeAfter } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    beforeImage: '',
    afterImage: ''
  });

  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title,
        description: item.description || '',
        beforeImage: item.beforeImage,
        afterImage: item.afterImage
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        beforeImage: '',
        afterImage: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'before') setUploadingBefore(true);
    else setUploadingAfter(true);

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: uploadData });
      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      if (type === 'before') setFormData({ ...formData, beforeImage: data.url });
      else setFormData({ ...formData, afterImage: data.url });

    } catch (err) {
      alert(`Failed to upload ${type} image.`);
    } finally {
      if (type === 'before') setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.beforeImage || !formData.afterImage) {
      alert("Both before and after images are required!");
      return;
    }

    if (editingId) {
      updateBeforeAfter(editingId, formData);
    } else {
      addBeforeAfter(formData);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">Manage Before/After Comparisons</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Comparison
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {beforeAfterList?.map((item) => (
          <div key={item.id} className="bg-gray-900 rounded-xl p-4 border border-white/[0.06] flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex gap-2 shrink-0">
                <img src={item.beforeImage} className="w-20 h-16 object-cover rounded-lg border border-white/10" alt="Before" />
                <img src={item.afterImage} className="w-20 h-16 object-cover rounded-lg border border-white/10" alt="After" />
              </div>
              <div className="min-w-0">
                <h4 className="text-white font-bold text-lg truncate">{item.title}</h4>
                <p className="text-gray-400 text-sm truncate">{item.description}</p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => openModal(item)}
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this comparison?')) {
                    deleteBeforeAfter(item.id);
                  }
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {(!beforeAfterList || beforeAfterList.length === 0) && (
          <div className="text-center py-12 text-gray-500 bg-gray-900/50 rounded-xl border border-white/[0.06] border-dashed">
            No before/after comparisons added yet.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-white/[0.06] shrink-0">
              <h3 className="text-xl font-bold text-white">
                {editingId ? 'Edit Before/After Case' : 'Add New Before/After Case'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors" disabled={uploadingBefore || uploadingAfter}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title / Machine Part</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-950 text-white"
                    placeholder="e.g. Pump Shaft Repair"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-950 text-white"
                    placeholder="Briefly describe the repair..."
                  />
                </div>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before Image */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Before Image</label>
                  <div className="relative group">
                    {formData.beforeImage ? (
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
                        <img src={formData.beforeImage} alt="Before" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
                            {uploadingBefore ? <Loader size={16} className="animate-spin" /> : <Upload size={16} />}
                            {uploadingBefore ? 'Uploading...' : 'Change Image'}
                            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'before')} className="hidden" />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full aspect-[4/3] border-2 border-dashed border-white/20 rounded-lg hover:border-green-500/50 hover:bg-green-500/5 transition-all cursor-pointer">
                        {uploadingBefore ? (
                          <div className="flex flex-col items-center text-green-500">
                            <Loader size={24} className="animate-spin mb-2" />
                            <span className="text-sm font-medium">Uploading...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-gray-400">
                            <Upload size={24} className="mb-2" />
                            <span className="text-sm font-medium text-gray-300">Upload Before Image</span>
                          </div>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'before')} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* After Image */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">After Image</label>
                  <div className="relative group">
                    {formData.afterImage ? (
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
                        <img src={formData.afterImage} alt="After" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
                            {uploadingAfter ? <Loader size={16} className="animate-spin" /> : <Upload size={16} />}
                            {uploadingAfter ? 'Uploading...' : 'Change Image'}
                            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'after')} className="hidden" />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full aspect-[4/3] border-2 border-dashed border-white/20 rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">
                        {uploadingAfter ? (
                          <div className="flex flex-col items-center text-blue-500">
                            <Loader size={24} className="animate-spin mb-2" />
                            <span className="text-sm font-medium">Uploading...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-gray-400">
                            <Upload size={24} className="mb-2" />
                            <span className="text-sm font-medium text-gray-300">Upload After Image</span>
                          </div>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'after')} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={uploadingBefore || uploadingAfter}
                  className="px-4 py-2 border border-white/10 rounded-lg text-gray-300 font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingBefore || uploadingAfter || !formData.beforeImage || !formData.afterImage}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-medium hover:from-green-400 hover:to-emerald-500 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-green-500/20"
                >
                  {editingId ? 'Save Changes' : 'Publish Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
