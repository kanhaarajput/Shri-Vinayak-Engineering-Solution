import { useData } from '../../context/DataContext';
import { Mail, Phone, Calendar, Trash2, MessageSquare } from 'lucide-react';

export default function AdminMessages() {
  const { messages, deleteMessage } = useData();

  if (!messages) return <div className="p-8">Loading messages...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">Inbox</h2>
        <div className="bg-gray-900 px-4 py-2 rounded-lg shadow-sm border border-white/[0.06] font-medium text-gray-400">
          Total Messages: {messages.length}
        </div>
      </div>

      <div className="grid gap-6">
        {messages.length === 0 ? (
          <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.06] p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">No messages yet</h3>
            <p className="text-gray-500">When someone fills out the contact form, their message will appear here.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.06] p-6 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {msg.name}
                    <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {msg.service || 'General Inquiry'}
                    </span>
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                      <Mail size={16} />
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                        <Phone size={16} />
                        {msg.phone}
                      </a>
                    )}
                    <span className="flex items-center gap-1.5 text-gray-400 dark:text-gray-400">
                      <Calendar size={16} />
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this message?')) {
                      deleteMessage(msg.id);
                    }
                  }}
                  className="p-2 text-gray-400 dark:text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                  title="Delete message"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="bg-gray-950 rounded-lg p-4 border border-white/[0.06] text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

