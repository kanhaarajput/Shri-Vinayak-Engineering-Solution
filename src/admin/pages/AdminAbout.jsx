import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

export default function AdminAbout() {
  const { siteContent, updateSiteContent } = useData();
  const [formData, setFormData] = useState(siteContent.about);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(siteContent.about);
  }, [siteContent.about]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteContent('about', formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">About Section Settings</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Section Small Heading</label>
            <input
              type="text"
              required
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
              placeholder="Who We Are"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Main Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description Paragraph 1</label>
            <textarea
              rows={4}
              required
              value={formData.description1}
              onChange={(e) => setFormData({ ...formData, description1: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">About Section Image</label>
            {formData.image && (
              <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 w-48 h-48 bg-gray-100 flex items-center justify-center">
                <img src={formData.image} alt="About" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const uploadData = new FormData();
                uploadData.append('image', file);
                
                try {
                  const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';
                  const res = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    body: uploadData
                  });
                  if (res.ok) {
                    const data = await res.json();
                    setFormData({ ...formData, image: data.url });
                  } else {
                    alert('Failed to upload image');
                  }
                } catch (err) {
                  console.error(err);
                  alert('Error uploading image');
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none transition-shadow text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description Paragraph 2</label>
            <textarea
              rows={4}
              required
              value={formData.description2}
              onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 rounded-lg text-white font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
            >
              Save Changes
            </button>
            {isSaved && <span className="text-emerald-500 font-medium text-sm">✓ Changes saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
