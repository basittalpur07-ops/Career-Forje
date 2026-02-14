
import React from 'react';
import { TemplateId } from '../types';

interface TemplateSwitcherProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

const TemplateSwitcher: React.FC<TemplateSwitcherProps> = ({ selected, onSelect }) => {
  const templates = [
    { id: TemplateId.MODERN, name: 'Modern', icon: 'layers' },
    { id: TemplateId.MINIMAL, name: 'Minimal', icon: 'minus' },
    { id: TemplateId.CORPORATE, name: 'Corporate', icon: 'briefcase' },
    { id: TemplateId.NOIR, name: 'Noir', icon: 'moon' },
    { id: TemplateId.NEON, name: 'Neon', icon: 'zap' },
    { id: TemplateId.ROYAL, name: 'Royal', icon: 'crown' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 ${
            selected === t.id
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400 dark:hover:border-slate-500'
          }`}
        >
          <i data-lucide={t.icon} className="w-3.5 h-3.5"></i>
          <span>{t.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSwitcher;
