import { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';

export default function AdminGallery() {
  const { projects, categories, addProject, updateProject, deleteProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0] || 'All',
    desc: '',
    imageFile: null
  });

  const openModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        category: project.category,
        desc: project.desc,
        imageFile: null
      });
      setPreviewImage(project.image);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        category: categories[0] || 'All',
        desc: '',
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
      // Create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('category', formData.category);
      submitData.append('description', formData.desc);
      if (formData.imageFile) {
        submitData.append('image', formData.imageFile);
      } else if (previewImage) {
        // Fallback if editing but no new file is uploaded
        submitData.append('image', previewImage);
      }

      if (editingId) {
        // Assume updateProject supports FormData in DataContext
        await updateProject(editingId, submitData);
      } else {
        await addProject(submitData);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Gallery</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-medium">Image</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <img src={project.image} alt={project.title} className="w-16 h-16 rounded object-cover border border-gray-200" />
                </td>
                <td className="p-4 font-medium text-gray-900">{project.title}</td>
                <td className="p-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                    {project.category}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => openModal(project)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this project?')) {
                        deleteProject(project.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600" disabled={isUploading}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="h-32 rounded object-cover mb-2" />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  )}
                  <span className="text-sm text-gray-500 font-medium">
                    {previewImage ? 'Click to change image' : 'Click to upload image'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isUploading}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 bg-amber-500 rounded-lg text-white font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    editingId ? 'Save Changes' : 'Add Project'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
