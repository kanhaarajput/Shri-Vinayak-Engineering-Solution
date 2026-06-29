import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function AdminSection({ title, rendersOn, siteLink, defaultOpen = false, icon: Icon, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-300 hover:border-white/[0.14]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-green-400" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white leading-tight">{title}</h3>
            {rendersOn && rendersOn.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {rendersOn.map((page) => (
                  <span
                    key={page}
                    className="inline-flex items-center text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    {page}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          {siteLink && (
            <a
              href={siteLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-semibold text-green-400 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              Preview <ExternalLink size={12} />
            </a>
          )}
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Body */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-6 pb-6 pt-2 border-t border-white/[0.06]">
          {children}
        </div>
      </div>
    </div>
  );
}
