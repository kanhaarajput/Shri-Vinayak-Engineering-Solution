import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

export default function AdminHome() {
  const { siteContent, updateSiteContent } = useData();
  const [formData, setFormData] = useState(siteContent.home);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(siteContent.home);
  }, [siteContent.home]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteContent('home', formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };
  
  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Key Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-100 border-b pb-2">Key Statistics (Show in Hero & Underneath)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.stats.map((stat, index) => (
                <div key={index} className="flex gap-4 p-4 border border-white/[0.06] bg-gray-950 rounded-lg">
                  <div className="w-1/3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Value (e.g. 25+)</label>
                    <input
                      type="text"
                      required
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full border border-white/10 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
                    />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Label (e.g. Years)</label>
                    <input
                      type="text"
                      required
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full border border-white/10 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>
              ))}
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
  );
}

