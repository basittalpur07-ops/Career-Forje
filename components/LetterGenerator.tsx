
import React, { useState } from 'react';
import { ResumeData } from '../types';
import { generateLetter } from '../services/geminiService';

const LetterGenerator: React.FC<{ data: ResumeData }> = ({ data }) => {
  const [jobDesc, setJobDesc] = useState('');
  const [type, setType] = useState<'cover' | 'referral' | 'thank-you'>('cover');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const text = await generateLetter(data, jobDesc, type);
    setResult(text);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <h3 className="text-xl font-black mb-4">Letter Architect</h3>
        <div className="space-y-4">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            {['cover', 'referral', 'thank-you'].map((t: any) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  type === t ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.toUpperCase().replace('-', ' ')}
              </button>
            ))}
          </div>
          <textarea 
            placeholder="Describe the job or opportunity..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl min-h-[120px] focus:ring-2 focus:ring-indigo-500 outline-none"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Architecting...' : 'Generate Professional Letter'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white border border-indigo-100 p-8 rounded-3xl shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Tailored Content</span>
            <button 
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs font-bold text-slate-400 hover:text-indigo-600"
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-serif text-sm">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterGenerator;
