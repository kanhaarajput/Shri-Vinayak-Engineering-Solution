import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

export default function AdminContact() {
  const { siteContent, updateSiteContent } = useData();
  const [formData, setFormData] = useState(siteContent.contact);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(siteContent.contact);
  }, [siteContent.contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteContent('contact', formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">Contact Info Settings</h2>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.06] p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Office Address</label>
            <textarea
              rows={2}
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-gray-950 text-white w-full border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-950 text-white w-full border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-950 text-white w-full border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
                placeholder="+91 1234567890"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">WhatsApp Number</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="bg-gray-950 text-white w-full border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
                placeholder="911234567890 (no plus)"
              />
              <p className="text-xs text-gray-500 mt-1">Include country code without '+', e.g., 917505487656</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
            <button
              type="submit"
              className="px-6 py-2.5 bg-green-500 rounded-lg text-white dark:text-white font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
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

