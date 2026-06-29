import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminTeam() {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    about: '',
    image: null
  });
  
  const [preview, setPreview] = useState(null);

  const resetForm = () => {
    setFormData({ name: '', designation: '', about: '', image: null });
    setPreview(null);
    setIsEditing(false);
    setCurrentMember(null);
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      designation: member.designation,
      about: member.about,
      image: null
    });
    setPreview(member.image);
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('designation', formData.designation);
    data.append('about', formData.about);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    if (isEditing) {
      await updateTeamMember(currentMember.id, data);
    } else {
      await addTeamMember(data);
    }
    
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Team Management</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors shadow-sm"
          >
            <Plus size={20} />
            Add Team Member
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              {currentMember ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">About / Bio</label>
              <textarea
                required
                rows={3}
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image</label>
              <div className="flex items-start gap-6">
                {preview && (
                  <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg object-cover border border-gray-200" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  required={!currentMember}
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                className="bg-amber-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
              >
                {currentMember ? 'Save Changes' : 'Add Member'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 bg-white text-gray-800 rounded-full hover:bg-amber-500 hover:text-white transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this team member?')) {
                        deleteTeamMember(member.id);
                      }
                    }}
                    className="p-2 bg-white text-gray-800 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-amber-500 text-sm font-semibold mb-3">{member.designation}</p>
                <p className="text-gray-500 text-sm line-clamp-3">{member.about}</p>
              </div>
            </div>
          ))}
          {team.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
              No team members found. Click "Add Team Member" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

