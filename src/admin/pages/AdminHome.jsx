import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

export default function AdminHome() {
  const { siteContent, updateSiteContent } = useData();
  const [formData, setFormData] = useState(siteContent);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (siteContent) {
      setFormData(siteContent);
    }
  }, [siteContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use an API call for updateSiteContent directly or through context
    updateSiteContent('home', formData.home);
    if(formData.cta) updateSiteContent('cta', formData.cta);
    if(formData.workflow) updateSiteContent('workflow', formData.workflow);
    if(formData.whyChooseUs) updateSiteContent('whyChooseUs', formData.whyChooseUs);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };
  
  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.home.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, home: { ...formData.home, stats: newStats } });
  };

  const handleWorkflowStepChange = (index, field, value) => {
    const newSteps = [...formData.workflow.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFormData({ ...formData, workflow: { ...formData.workflow, steps: newSteps } });
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.whyChooseUs.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, whyChooseUs: { ...formData.whyChooseUs, features: newFeatures } });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Home Page Settings</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Hero Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Hero Section</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title (Line 1)</label>
                <input
                  type="text"
                  required
                  value={formData?.home?.hero?.titleLine1 || ''}
                  onChange={(e) => setFormData({ ...formData, home: { ...formData.home, hero: { ...formData.home.hero, titleLine1: e.target.value } } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title Highlight (Amber)</label>
                <input
                  type="text"
                  required
                  value={formData?.home?.hero?.titleHighlight || ''}
                  onChange={(e) => setFormData({ ...formData, home: { ...formData.home, hero: { ...formData.home.hero, titleHighlight: e.target.value } } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title (Line 2)</label>
                <input
                  type="text"
                  required
                  value={formData?.home?.hero?.titleLine2 || ''}
                  onChange={(e) => setFormData({ ...formData, home: { ...formData.home, hero: { ...formData.home.hero, titleLine2: e.target.value } } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle / Description</label>
              <textarea
                rows={3}
                required
                value={formData?.home?.hero?.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, home: { ...formData.home, hero: { ...formData.home.hero, subtitle: e.target.value } } })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          {/* Key Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Key Statistics (Show in Hero & Underneath)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData?.home?.stats?.map((stat, index) => (
                <div key={index} className="flex gap-4 p-4 border border-gray-100 bg-gray-50 rounded-lg">
                  <div className="w-1/3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Value</label>
                    <input
                      type="text"
                      required
                      value={stat.value || ''}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Label</label>
                    <input
                      type="text"
                      required
                      value={stat.label || ''}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Our Process (Workflow)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData?.workflow?.title || ''}
                  onChange={(e) => setFormData({ ...formData, workflow: { ...formData.workflow, title: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  required
                  value={formData?.workflow?.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, workflow: { ...formData.workflow, subtitle: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>
            <div className="space-y-4">
              {formData?.workflow?.steps?.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 border border-gray-100 bg-gray-50 rounded-lg">
                  <div className="w-1/3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Step {index + 1} Title</label>
                    <input
                      type="text"
                      required
                      value={step.title || ''}
                      onChange={(e) => handleWorkflowStepChange(index, 'title', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                    <input
                      type="text"
                      required
                      value={step.description || ''}
                      onChange={(e) => handleWorkflowStepChange(index, 'description', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Call to Action (CTA)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData?.cta?.title || ''}
                  onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, title: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  required
                  value={formData?.cta?.buttonText || ''}
                  onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, buttonText: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle / Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData?.cta?.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, subtitle: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Why Choose Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData?.whyChooseUs?.title || ''}
                  onChange={(e) => setFormData({ ...formData, whyChooseUs: { ...formData.whyChooseUs, title: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  required
                  value={formData?.whyChooseUs?.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, whyChooseUs: { ...formData.whyChooseUs, subtitle: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>
            <div className="space-y-4">
              {formData?.whyChooseUs?.features?.map((feature, index) => (
                <div key={index} className="flex gap-4 p-4 border border-gray-100 bg-gray-50 rounded-lg">
                  <div className="w-1/3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Feature {index + 1} Title</label>
                    <input
                      type="text"
                      required
                      value={feature.title || ''}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                    <input
                      type="text"
                      required
                      value={feature.description || ''}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
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
