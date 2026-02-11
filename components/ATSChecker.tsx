
import React, { useState } from 'react';
import { ResumeData } from '../types';
import { analyzeATS } from '../services/geminiService';

interface ATSCheckerProps {
  data: ResumeData;
}

const ATSChecker: React.FC<ATSCheckerProps> = ({ data }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    setIsLoading(true);
    const analysis = await analyzeATS(data, jobDescription);
    setResult(analysis);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
          <span className="text-indigo-300">🔍</span> ATS Analysis Engine
        </h3>
        <p className="text-indigo-100 text-sm opacity-80">
          Paste the job description you are applying for to get a custom optimization report.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-4 bg-white border border-slate-200 rounded-xl min-h-[150px] focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner"
        />
        <button
          onClick={handleCheck}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing with AI...' : 'Run ATS Scan'}
        </button>
      </div>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Score Gauge */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="relative inline-flex items-center justify-center mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle 
                  cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={364.4} 
                  strokeDashoffset={364.4 - (364.4 * result.score) / 100}
                  className={`${result.score > 80 ? 'text-emerald-500' : result.score > 50 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000`}
                />
              </svg>
              <span className="absolute text-3xl font-black text-slate-800">{result.score}%</span>
            </div>
            <h4 className="font-bold text-slate-900 text-lg">{result.score > 80 ? 'Excellent Match!' : 'Needs Improvement'}</h4>
            <p className="text-slate-500 text-sm mt-2">{result.matchAnalysis}</p>
          </div>

          {/* Missing Keywords */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-amber-500">⚠️</span> Missing Keywords
            </h5>
            <div className="flex flex-wrap gap-2">
              {result.missingKeywords.map((word: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100">
                  + {word}
                </span>
              ))}
              {result.missingKeywords.length === 0 && <span className="text-slate-400 text-sm italic">No major missing keywords found.</span>}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-indigo-500">💡</span> Optimization Roadmap
            </h5>
            <ul className="space-y-3">
              {result.improvementSuggestions.map((s: string, i: number) => (
                <li key={i} className="text-sm text-slate-600 flex gap-3">
                  <span className="text-indigo-400 font-bold">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
