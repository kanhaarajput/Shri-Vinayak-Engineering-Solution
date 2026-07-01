import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Loader2, Icon as LucideIcon, Rocket, Factory, Zap, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
      const res = await axios.get(`${API_URL}/goals`);
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
        await axios.put(`$API_URL/goals/${editingId}`, formData);
        toast.success('Goal updated');
      } else {
        await axios.post(`${API_URL}/goals`, formData);
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
      await axios.delete(`$API_URL/goals/${id}`);
      toast.success('Goal deleted');
      fetchGoals();
    } catch (error) {
      toast.error('Failed to delete goal');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading goals...</div>;

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.08]">
      <div className="p-6 border-b border-white/[0.06] flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Expansion Timeline</h3>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-950 dark:bg-gray-900 text-white dark:text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <Plus size={16} /> Add Timeline Goal
        </button>
      </div>

      <div className="p-6">
        {goals.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-950 rounded-xl border border-dashed border-white/[0.08]">
            No goals found. Click 'Add Timeline Goal' to create the future roadmap.
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const GoalIcon = AVAILABLE_ICONS[goal.icon] || Rocket;
              return (
                <div key={goal._id} className="flex items-center gap-4 p-4 border border-white/[0.06] rounded-xl hover:shadow-md transition-shadow bg-gray-950/50 group">
                  <div className="w-12 h-12 rounded-lg bg-green-100 text-green-400 flex items-center justify-center shrink-0">
                    <GoalIcon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-300 text-xs font-bold rounded">{goal.year}</span>
                      <h4 className="font-bold text-white">{goal.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1">{goal.description}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(goal)} className="p-2 text-gray-400 dark:text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(goal._id)} className="p-2 text-gray-400 dark:text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg">
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
          <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/[0.06] flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Goal' : 'Add Goal'}</h3>
              <button onClick={resetForm} className="text-gray-400 dark:text-gray-400 hover:text-gray-400 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Target Year *</label>
                  <input type="text" required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-2 bg-gray-950 border border-white/[0.08] rounded-lg focus:ring-2 focus:ring-green-500" placeholder="e.g. 2027" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Icon</label>
                  <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full px-4 py-2 bg-gray-950 border border-white/[0.08] rounded-lg focus:ring-2 focus:ring-green-500">
                    {Object.keys(AVAILABLE_ICONS).map(iconKey => (
                      <option key={iconKey} value={iconKey}>{iconKey}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-gray-950 border border-white/[0.08] rounded-lg focus:ring-2 focus:ring-green-500" placeholder="e.g. New Factory Setup" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Short Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-gray-950 border border-white/[0.08] rounded-lg focus:ring-2 focus:ring-green-500 resize-none" placeholder="Expanding our production capacity by..."></textarea>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/[0.06] gap-3">
                <button type="button" onClick={resetForm} className="px-5 py-2.5 text-gray-400 hover:bg-gray-900/60 rounded-lg font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-950 dark:bg-gray-900 text-white dark:text-white rounded-lg hover:bg-white/10 disabled:opacity-70 font-medium">
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
