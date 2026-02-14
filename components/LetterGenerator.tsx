
import React, { useState } from 'react';
import { ResumeData } from '../types';
import { generateLetter } from '../services/geminiService';

interface LetterGeneratorProps {
  data: ResumeData;
  letter: string;
  onLetterUpdate: (val: string) => void;
}

const LetterGenerator: React.FC<LetterGeneratorProps> = ({ data, letter, onLetterUpdate }) => {
  const [jobDesc, setJobDesc] = useState('');
  const [type, setType] = useState<'cover' | 'referral' | 'thank-you'>('cover');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!jobDesc.trim()) return alert("Please provide details about the job.");
    setIsLoading(true);
    try {
      const text = await generateLetter(data, jobDesc, type);
      onLetterUpdate(text);
    } catch (e) {
      alert("AI Letter Generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-xl relative transition-all ${isLoading ? 'ai-thinking-active' : ''}`}>
        {isLoading && <div className="ai-scan-line"></div>}
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Letter Architect</h3>
        <div className="space-y-6">
          <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
            {['cover', 'referral', 'thank-you'].map((t: any) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  type === t ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-black tracking-widest ml-1">Opportunity Intelligence</label>
            <textarea 
              placeholder="Paste the job description or specific context for the letter here..."
              className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] min-h-[180px] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-black font-medium text-sm leading-relaxed"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Architecting...</span>
              </>
            ) : (
              <>
                <span>Generate Professional Letter</span>
                <span className="opacity-40">→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {letter && (
        <div className="bg-indigo-600/5 border border-indigo-500/10 p-6 rounded-[2rem] flex items-center justify-between group">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Document Ready</h4>
            <p className="text-[11px] text-slate-500 font-medium">Draft generated. Review your document in the preview pane.</p>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(letter);
              alert("Copied to clipboard!");
            }}
            className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm border border-slate-100 hover:bg-indigo-600 hover:text-white transition-all"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default LetterGenerator;
