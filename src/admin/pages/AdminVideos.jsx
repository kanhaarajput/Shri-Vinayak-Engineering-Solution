import { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';

export default function AdminVideos() {
  const { videos, addVideo, updateVideo, deleteVideo } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    imageFile: null
  });

  const openModal = (video = null) => {
    if (video) {
      setEditingId(video.id);
      setFormData({
        title: video.title,
        videoUrl: video.videoUrl || '',
        imageFile: null
      });
      setPreviewImage(video.thumbnail);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        videoUrl: '',
        imageFile: null
      });
      setPreviewImage('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      if (formData.videoUrl) submitData.append('videoUrl', formData.videoUrl);
      
      if (formData.imageFile) {
        submitData.append('thumbnail', formData.imageFile);
      } else if (previewImage) {
        submitData.append('thumbnail', previewImage);
      }

      if (editingId) {
        await updateVideo(editingId, submitData);
      } else {
        await addVideo(submitData);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error uploading video thumbnail");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">Manage Videos</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Video
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.06] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-950 border-b border-white/[0.06] text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-medium">Thumbnail</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {videos.map((video) => (
              <tr key={video.id} className="hover:bg-gray-950 transition-colors">
                <td className="p-4">
                  <img src={video.thumbnail} alt={video.title} className="w-24 h-16 rounded object-cover border border-white/[0.08]" />
                </td>
                <td className="p-4 font-medium text-white">{video.title}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => openModal(video)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this video?')) {
                        deleteVideo(video.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {videos.length === 0 && (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500">
                  No videos found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto p-4 flex justify-center items-start pt-10 pb-10">
          <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-lg flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-white/[0.06] shrink-0">
              <h3 className="text-xl font-bold text-white">
                {editingId ? 'Edit Video' : 'Add New Video'}
              </h3>
              <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-400" disabled={isUploading}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-950 text-white w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Video URL (Optional)</label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="bg-gray-950 text-white w-full border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full mt-1 border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-950 transition-colors"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="h-32 rounded object-cover mb-2" />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  )}
                  <span className="text-sm text-gray-500 font-medium">
                    {previewImage ? 'Click to change thumbnail' : 'Click to upload thumbnail'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isUploading}
                  className="px-4 py-2 border border-white/10 rounded-lg text-gray-300 font-medium hover:bg-gray-950 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 bg-green-500 rounded-lg text-white font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  {isUploading ? 'Saving...' : (editingId ? 'Save Changes' : 'Add Video')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
