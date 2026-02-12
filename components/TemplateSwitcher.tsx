
import React from 'react';
import { TemplateId } from '../types';

interface TemplateSwitcherProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

const TemplateSwitcher: React.FC<TemplateSwitcherProps> = ({ selected, onSelect }) => {
  const templates = [
    { id: TemplateId.MODERN, name: 'Modern', desc: 'Sleek & Fluid', icon: '✨' },
    { id: TemplateId.MINIMAL, name: 'Minimal', desc: 'Silent & Sharp', icon: '🌑' },
    { id: TemplateId.CORPORATE, name: 'Corporate', desc: 'Bold & Traditional', icon: '💼' },
    { id: TemplateId.NOIR, name: 'Noir', desc: 'Executive Dark', icon: '🎩' },
    { id: TemplateId.NEON, name: 'Neon', desc: 'Cyber Tech', icon: '⚡' },
    { id: TemplateId.ROYAL, name: 'Royal', desc: 'Elegant Serif', icon: '👑' },
    { id: TemplateId.CUSTOM, name: 'Architect', desc: 'Fully Custom', icon: '🏗️' },
  ];

  return (
    <div className="w-full flex gap-3 p-2 bg-slate-50/50 backdrop-blur-md rounded-[2rem] border border-slate-200/50 no-print overflow-x-auto no-scrollbar scroll-smooth">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`flex-shrink-0 flex flex-col items-center justify-center w-32 h-28 rounded-2xl border-2 transition-all duration-300 ${
            selected === t.id
              ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100/50 scale-105 z-10'
              : 'border-transparent bg-transparent text-slate-400 hover:bg-white hover:text-slate-600'
          }`}
        >
          <span className="text-2xl mb-1">{t.icon}</span>
          <span className="text-[11px] font-black uppercase tracking-widest">{t.name}</span>
          <span className="text-[8px] opacity-40 font-bold uppercase tracking-tight mt-1">{t.desc}</span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSwitcher;
