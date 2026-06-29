import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Upload, Save, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export default function AdminBeforeAfter() {
  const { siteContent, updateSiteContent } = useData();
  const galleryData = siteContent?.gallery?.beforeAfter || {};

  const [beforeImage, setBeforeImage] = useState(galleryData.beforeImage || '');
  const [afterImage, setAfterImage] = useState(galleryData.afterImage || '');
  
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'before') setUploadingBefore(true);
    else setUploadingAfter(true);

    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      
      const data = await res.json();
      if (type === 'before') setBeforeImage(data.url);
      else setAfterImage(data.url);
      
      showToast('success', `${type} image uploaded successfully!`);
    } catch (err) {
      showToast('error', `Failed to upload ${type} image.`);
    } finally {
      if (type === 'before') setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteContent('gallery', {
        beforeAfter: { beforeImage, afterImage }
      });
      showToast('success', 'Before & After images saved!');
    } catch (err) {
      showToast('error', 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 bg-gray-900 rounded-xl shadow-sm border border-white/[0.06] p-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`absolute top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 z-50 ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="flex justify-between items-center border-b border-white/[0.06] pb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Interactive Comparison Slider</h3>
          <p className="text-sm text-gray-400 mt-1">Upload the images shown in the Before/After die repair comparison</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        
        {/* Before Image */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">Before Image (Damaged)</label>
          <div className="relative group rounded-xl overflow-hidden border-2 border-dashed border-white/10 aspect-video bg-gray-950 flex flex-col items-center justify-center">
            {beforeImage ? (
              <>
                <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                  <label className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Change Image
                    <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'before')} className="hidden" />
                  </label>
                </div>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-green-400 transition-colors w-full h-full">
                {uploadingBefore ? (
                  <Loader className="w-8 h-8 animate-spin mb-2 text-green-500" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Upload "Before" Image</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'before')} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* After Image */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">After Image (Repaired)</label>
          <div className="relative group rounded-xl overflow-hidden border-2 border-dashed border-white/10 aspect-video bg-gray-950 flex flex-col items-center justify-center">
            {afterImage ? (
              <>
                <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                  <label className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Change Image
                    <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'after')} className="hidden" />
                  </label>
                </div>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-green-400 transition-colors w-full h-full">
                {uploadingAfter ? (
                  <Loader className="w-8 h-8 animate-spin mb-2 text-green-500" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Upload "After" Image</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'after')} className="hidden" />
              </label>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
