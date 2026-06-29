import { useState } from 'react';
import { Target, Factory, Rocket, Lightbulb } from 'lucide-react';
import FutureVisionTab from './tabs/FutureVisionTab';
import MachinesTab from './tabs/MachinesTab';
import GoalsTab from './tabs/GoalsTab';
import InnovationTab from './tabs/InnovationTab';

export default function AdminFuturePlans() {
  const [activeTab, setActiveTab] = useState('vision');

  const tabs = [
    { id: 'vision', label: 'Future Vision', icon: Target },
    { id: 'machines', label: 'Upcoming Machines', icon: Factory },
    { id: 'goals', label: 'Expansion Goals', icon: Rocket },
    { id: 'innovation', label: 'Innovation Section', icon: Lightbulb },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header & Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Future Plans Management</h2>
          <p className="text-gray-500 mt-1">Manage the company's future vision, upcoming machinery, goals, and R&D.</p>
        </div>
        
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'border-amber-500 text-amber-600 bg-amber-50/50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="bg-transparent">
        {activeTab === 'vision' && <FutureVisionTab />}
        {activeTab === 'machines' && <MachinesTab />}
        {activeTab === 'goals' && <GoalsTab />}
        {activeTab === 'innovation' && <InnovationTab />}
      </div>

    </div>
  );
}

