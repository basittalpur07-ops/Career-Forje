
import React from 'react';
import { TemplateId } from '../types';

interface TemplateSwitcherProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

const TemplateSwitcher: React.FC<TemplateSwitcherProps> = ({ selected, onSelect }) => {
  const templates = [
    { id: TemplateId.MODERN, name: 'Modern', desc: 'Sleek & Stylish' },
    { id: TemplateId.MINIMAL, name: 'Minimal', desc: 'Clean & Simple' },
    { id: TemplateId.CORPORATE, name: 'Corporate', desc: 'Classic & Reliable' },
    { id: TemplateId.CUSTOM, name: 'Architect', desc: 'User Defined' },
  ];

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm mb-6 border border-slate-100 no-print overflow-x-auto">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`flex-1 min-w-[140px] p-4 rounded-xl border-2 transition-all ${
            selected === t.id
              ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
              : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
          }`}
        >
          <div className="font-bold flex items-center justify-center gap-2">
            {t.id === TemplateId.CUSTOM && <span>🏗️</span>}
            {t.name}
          </div>
          <div className="text-[10px] uppercase font-black opacity-40 tracking-widest mt-1">{t.desc}</div>
        </button>
      ))}
    </div>
  );
};

export default TemplateSwitcher;
