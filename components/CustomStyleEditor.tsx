
import React from 'react';
import { ResumeData, CustomStyle } from '../types';

interface CustomStyleEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const CustomStyleEditor: React.FC<CustomStyleEditorProps> = ({ data, onChange }) => {
  const currentStyle: CustomStyle = data.customStyle || {
    primaryColor: '#1e293b',
    accentColor: '#4f46e5',
    fontFamily: 'sans',
    fontSize: '14px',
    spacing: '1.5',
    borderRadius: '4px'
  };

  const updateStyle = (field: keyof CustomStyle, value: string) => {
    onChange({
      ...data,
      customStyle: { ...currentStyle, [field]: value }
    });
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(currentStyle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-custom-template.forge';
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        onChange({ ...data, customStyle: imported });
      } catch (err) {
        alert("Invalid template file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl space-y-8 animate-in slide-in-from-left-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black">Style Architect</h3>
        <div className="flex gap-2">
           <label className="cursor-pointer bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">
             Upload .forge
             <input type="file" className="hidden" accept=".forge,.json" onChange={handleImport} />
           </label>
           <button onClick={handleExport} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors">
             Export Style
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Primary Color</label>
          <input 
            type="color" 
            value={currentStyle.primaryColor} 
            onChange={e => updateStyle('primaryColor', e.target.value)}
            className="w-full h-12 bg-transparent cursor-pointer rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Accent Color</label>
          <input 
            type="color" 
            value={currentStyle.accentColor} 
            onChange={e => updateStyle('accentColor', e.target.value)}
            className="w-full h-12 bg-transparent cursor-pointer rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Font Family</label>
          <select 
            value={currentStyle.fontFamily}
            onChange={e => updateStyle('fontFamily', e.target.value as any)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          >
            <option value="sans">Sans Serif (Modern)</option>
            <option value="serif">Serif (Traditional)</option>
            <option value="mono">Monospace (Tech)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Base Font Size</label>
          <input 
            type="text" 
            value={currentStyle.fontSize} 
            onChange={e => updateStyle('fontSize', e.target.value)}
            placeholder="14px"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Line Spacing</label>
          <input 
            type="text" 
            value={currentStyle.spacing} 
            onChange={e => updateStyle('spacing', e.target.value)}
            placeholder="1.5"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Element Radius</label>
          <input 
            type="text" 
            value={currentStyle.borderRadius} 
            onChange={e => updateStyle('borderRadius', e.target.value)}
            placeholder="4px"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomStyleEditor;
