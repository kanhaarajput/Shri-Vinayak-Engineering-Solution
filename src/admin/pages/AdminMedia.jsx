import { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Trash2, Upload, Plus, X, Play } from 'lucide-react';

export default function AdminMedia() {
  const { beforeAfter, videos, addBeforeAfter, deleteBeforeAfter, addVideo, deleteVideo } = useData();

  // Tab State
  const [activeTab, setActiveTab] = useState('beforeAfter');

  // Before/After State
  const [isBAModalOpen, setIsBAModalOpen] = useState(false);
  const [baFormData, setBaFormData] = useState({ title: '', beforeImage: null, afterImage: null });
  const [baPreviews, setBaPreviews] = useState({ before: '', after: '' });
  const [isBAUploading, setIsBAUploading] = useState(false);
  const beforeFileRef = useRef(null);
  const afterFileRef = useRef(null);

  // Video State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoFormData, setVideoFormData] = useState({ title: '', youtubeUrl: '', thumbnailUrl: null });
  const [videoPreview, setVideoPreview] = useState('');
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const videoFileRef = useRef(null);

  // --- Before/After Handlers ---
  const handleBAFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setBaFormData({ ...baFormData, [type]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaPreviews(prev => ({ ...prev, [type === 'beforeImage' ? 'before' : 'after']: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBASubmit = async (e) => {
    e.preventDefault();
    if (!baFormData.beforeImage || !baFormData.afterImage) {
      alert("Please select both before and after images.");
      return;
    }
    
    setIsBAUploading(true);
    const formData = new FormData();
    formData.append('title', baFormData.title);
    formData.append('beforeImage', baFormData.beforeImage);
    formData.append('afterImage', baFormData.afterImage);
    
    await addBeforeAfter(formData);
    setIsBAUploading(false);
    setIsBAModalOpen(false);
    setBaFormData({ title: '', beforeImage: null, afterImage: null });
    setBaPreviews({ before: '', after: '' });
  };

  // --- Video Handlers ---
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFormData({ ...videoFormData, thumbnailUrl: file });
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setIsVideoUploading(true);
    
    const formData = new FormData();
    formData.append('title', videoFormData.title);
    formData.append('youtubeUrl', videoFormData.youtubeUrl);
    if (videoFormData.thumbnailUrl) {
      formData.append('thumbnailUrl', videoFormData.thumbnailUrl);
    }
    
    await addVideo(formData);
    setIsVideoUploading(false);
    setIsVideoModalOpen(false);
    setVideoFormData({ title: '', youtubeUrl: '', thumbnailUrl: null });
    setVideoPreview('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Media & Sliders</h2>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'beforeAfter' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('beforeAfter')}
        >
          Before/After Sliders
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'videos' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('videos')}
        >
          Video Gallery
        </button>
      </div>

      {activeTab === 'beforeAfter' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsBAModalOpen(true)}
              className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/20"
            >
              <Plus size={20} /> Add Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beforeAfter.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="relative h-48 bg-gray-900 flex divide-x divide-gray-700">
                  <div className="w-1/2 h-full relative">
                    <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover opacity-80" />
                    <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold text-white bg-black/50 px-2 py-1 rounded">Before</span>
                  </div>
                  <div className="w-1/2 h-full relative">
                    <img src={item.afterImage} alt="After" className="w-full h-full object-cover opacity-80" />
                    <span className="absolute bottom-2 right-2 text-[10px] uppercase font-bold text-white bg-black/50 px-2 py-1 rounded">After</span>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <button onClick={() => deleteBeforeAfter(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/20"
            >
              <Plus size={20} /> Add Video
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="relative h-48 bg-gray-900">
                  <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="text-white ml-1" size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-500 hover:underline break-all">
                      {item.youtubeUrl}
                    </a>
                  </div>
                  <button onClick={() => deleteVideo(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg flex-shrink-0">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Before/After Modal */}
      {isBAModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add Before/After Slider</h3>
              <button onClick={() => setIsBAModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleBASubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text" required
                  value={baFormData.title} onChange={e => setBaFormData({...baFormData, title: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g. Broken Die Repair"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Before Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Before Image</label>
                  <input type="file" accept="image/*" className="hidden" ref={beforeFileRef} onChange={(e) => handleBAFileChange(e, 'beforeImage')} />
                  <div onClick={() => beforeFileRef.current.click()} className="h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-colors overflow-hidden relative">
                    {baPreviews.before ? (
                      <img src={baPreviews.before} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4"><Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" /><span className="text-xs text-gray-500">Upload Before</span></div>
                    )}
                  </div>
                </div>

                {/* After Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">After Image</label>
                  <input type="file" accept="image/*" className="hidden" ref={afterFileRef} onChange={(e) => handleBAFileChange(e, 'afterImage')} />
                  <div onClick={() => afterFileRef.current.click()} className="h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-colors overflow-hidden relative">
                    {baPreviews.after ? (
                      <img src={baPreviews.after} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4"><Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" /><span className="text-xs text-gray-500">Upload After</span></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button type="button" onClick={() => setIsBAModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" disabled={isBAUploading} className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:opacity-50">
                  {isBAUploading ? 'Uploading...' : 'Save Comparison'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add Video</h3>
              <button onClick={() => setIsVideoModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleVideoSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text" required
                  value={videoFormData.title} onChange={e => setVideoFormData({...videoFormData, title: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g. VMC Machining Process"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">YouTube / Video URL</label>
                <input
                  type="url" required
                  value={videoFormData.youtubeUrl} onChange={e => setVideoFormData({...videoFormData, youtubeUrl: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Video Thumbnail</label>
                <input type="file" accept="image/*" className="hidden" ref={videoFileRef} onChange={handleVideoFileChange} />
                <div onClick={() => videoFileRef.current.click()} className="h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-colors overflow-hidden relative">
                  {videoPreview ? (
                    <img src={videoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4"><Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" /><span className="text-sm font-medium text-gray-700">Click to upload thumbnail</span></div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button type="button" onClick={() => setIsVideoModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" disabled={isVideoUploading} className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 disabled:opacity-50">
                  {isVideoUploading ? 'Uploading...' : 'Save Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
