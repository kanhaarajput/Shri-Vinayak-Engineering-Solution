import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminWorkflow() {
  const { workflow, addWorkflow, updateWorkflow, deleteWorkflow } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(null);

  const [formData, setFormData] = useState({
    step: '',
    title: '',
    desc: ''
  });

  const resetForm = () => {
    setFormData({ step: '', title: '', desc: '' });
    setIsEditing(false);
    setCurrent(null);
  };

  const handleEdit = (item) => {
    setCurrent(item);
    setFormData({ step: item.step, title: item.title, desc: item.desc });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) await updateWorkflow(current.id, formData);
    else await addWorkflow(formData);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Workflow Timeline Management</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors shadow-sm"
          >
            <Plus size={20} /> Add Step
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">{current ? 'Edit Step' : 'Add New Step'}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Step Number (e.g. 01, 02)</label>
                <input
                  type="text" required value={formData.step}
                  onChange={(e) => setFormData({ ...formData, step: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text" required value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                required rows={2} value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="bg-amber-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-600 shadow-lg shadow-amber-500/20">
                {current ? 'Save Changes' : 'Add Step'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="flex flex-col gap-4">
          {workflow.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-amber-500/30">{item.step}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-amber-500"><Pencil size={20} /></button>
                <button onClick={() => { if (window.confirm('Delete this step?')) deleteWorkflow(item.id); }} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
          {workflow.length === 0 && (
            <div className="bg-white rounded-xl border p-12 text-center text-gray-500">
              No workflow steps found. Add some!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
