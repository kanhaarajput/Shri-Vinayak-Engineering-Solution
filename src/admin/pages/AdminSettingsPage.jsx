import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Upload, Save, Building2, Image as ImageIcon, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import companyLogoFallback from '../../assets/logo - Copy.jpeg';

const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export default function AdminSettingsPage() {
  const { siteContent, updateSiteContent } = useData();

  const global = siteContent?.global || {};

  const [companyName,     setCompanyName]     = useState(global.companyName     || 'Shri Vinayak');
  const [companySubtitle, setCompanySubtitle] = useState(global.companySubtitle || 'Engineering Solutions');
  const [logoUrl,         setLogoUrl]         = useState(global.logoUrl         || '');
  const [uploading,       setUploading]       = useState(false);
  const [saving,          setSaving]          = useState(false);
  const [toast,           setToast]           = useState(null); // { type: 'success'|'error', msg }

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  // Upload logo to Cloudinary via /api/upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setLogoUrl(data.url);
      showToast('success', 'Logo uploaded successfully!');
    } catch (err) {
      showToast('error', 'Failed to upload logo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Save global settings to DB
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteContent('global', { companyName, companySubtitle, logoUrl });
      showToast('success', 'Settings saved! Changes are now live on the website.');
    } catch (err) {
      showToast('error', 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const displayLogo = logoUrl || companyLogoFallback;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Site Settings</h2>
        <p className="text-sm text-gray-400">Changes here update the logo and company name across the entire website.</p>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${
          toast.type === 'success'
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {toast.type === 'success'
            ? <CheckCircle size={16} />
            : <AlertCircle size={16} />
          }
          {toast.msg}
        </div>
      )}

      {/* Logo Upload Card */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <ImageIcon size={18} className="text-green-400" />
          </div>
          <h3 className="font-bold text-white">Company Logo</h3>
        </div>
        <div className="px-6 py-6 space-y-5">
          {/* Preview */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-xl">
              <img
                src={displayLogo}
                alt="Company Logo Preview"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = companyLogoFallback; }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Current Logo</p>
              <p className="text-xs text-gray-500 mb-3">
                {logoUrl ? 'Uploaded via admin panel' : 'Using default logo from assets'}
              </p>
              {logoUrl && (
                <span className="inline-flex items-center gap-1 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-lg">
                  <CheckCircle size={11} /> Live on website
                </span>
              )}
            </div>
          </div>

          {/* Upload button */}
          <label className="flex items-center justify-center gap-2 cursor-pointer px-5 py-3 rounded-xl border border-dashed border-white/20 hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-200 text-sm font-semibold text-gray-400 hover:text-green-400">
            {uploading ? (
              <>
                <Loader size={16} className="animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload New Logo (JPG / PNG / SVG)
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Company Info Card */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Building2 size={18} className="text-blue-400" />
          </div>
          <h3 className="font-bold text-white">Company Details</h3>
        </div>
        <div className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="block w-full px-4 py-3 border border-white/[0.08] rounded-xl bg-white/[0.04] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-colors"
              placeholder="e.g. Shri Vinayak"
            />
            <p className="text-xs text-gray-600 mt-1">Appears in the Navbar logo and Hero section.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Company Subtitle</label>
            <input
              type="text"
              value={companySubtitle}
              onChange={(e) => setCompanySubtitle(e.target.value)}
              className="block w-full px-4 py-3 border border-white/[0.08] rounded-xl bg-white/[0.04] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-colors"
              placeholder="e.g. Engineering Solutions"
            />
            <p className="text-xs text-gray-600 mt-1">Appears below the company name in green text.</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-gray-950 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  );
}
