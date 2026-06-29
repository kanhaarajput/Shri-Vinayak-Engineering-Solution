import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Loader2, Icon as LucideIcon, Rocket, Factory, Zap, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Available icons mapping
const AVAILABLE_ICONS = {
  Rocket, Factory, Zap, ShieldCheck, MapPin, Globe
};

export default function GoalsTab() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    icon: 'Rocket',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/goals');
      setGoals(res.data);
    } catch (error) {
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', year: '', icon: 'Rocket' });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (goal) => {
    setFormData({
      title: goal.title,
      description: goal.description || '',
      year: goal.year || '',
      icon: goal.icon || 'Rocket',
    });
    setEditingId(goal._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.year) return toast.error('Title and Year are required');

    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/goals/${editingId}`, formData);
        toast.success('Goal updated');
      } else {
        await axios.post('http://localhost:3000/api/goals', formData);
        toast.success('Goal added');
      }
      fetchGoals();
      resetForm();
    } catch (error) {
      toast.error('Failed to save goal');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/goals/${id}`);
      toast.success('Goal deleted');
      fetchGoals();
    } catch (error) {
      toast.error('Failed to delete goal');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading goals...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Expansion Timeline</h3>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <Plus size={16} /> Add Timeline Goal
        </button>
      </div>

      <div className="p-6">
        {goals.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            No goals found. Click 'Add Timeline Goal' to create the future roadmap.
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const GoalIcon = AVAILABLE_ICONS[goal.icon] || Rocket;
              return (
                <div key={goal._id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/50 group">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <GoalIcon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-bold rounded">{goal.year}</span>
                      <h4 className="font-bold text-gray-900">{goal.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1">{goal.description}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(goal)} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(goal._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Goal' : 'Add Goal'}</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Year *</label>
                  <input type="text" required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500" placeholder="e.g. 2027" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500">
                    {Object.keys(AVAILABLE_ICONS).map(iconKey => (
                      <option key={iconKey} value={iconKey}>{iconKey}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500" placeholder="e.g. New Factory Setup" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none" placeholder="Expanding our production capacity by..."></textarea>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
                <button type="button" onClick={resetForm} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-70 font-medium">
                  {saving ? 'Saving...' : 'Save Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
