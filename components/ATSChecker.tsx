
import React, { useState, useRef } from 'react';
import { ResumeData } from '../types';
import { analyzeATS, applyATSFixes } from '../services/geminiService';

interface ATSCheckerProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onNavigateToEditor: () => void;
}

const ATSChecker: React.FC<ATSCheckerProps> = ({ data, onChange, onNavigateToEditor }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<any>(null);
  const [proposedFixes, setProposedFixes] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [useUploaded, setUseUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string, data: string, mimeType: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Direct check for supported MIME type (PDF is most reliable for Gemini vision/document parsing)
    if (file.type !== 'application/pdf') {
      alert("Only PDF files are supported for AI analysis at this time. Please convert your document or paste the text directly.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setUploadedFile({
        name: file.name,
        data: base64,
        mimeType: file.type
      });
      setUseUploaded(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCheck = async () => {
    if (!jobDescription.trim()) return alert("Please provide a job description for analysis.");
    setIsLoading(true);
    setResult(null);
    setProposedFixes(null);
    setShowReview(false);
    try {
      const analysis = await analyzeATS(
        useUploaded ? null : data, 
        jobDescription, 
        useUploaded ? uploadedFile || undefined : undefined
      );
      if (!analysis) throw new Error("Analysis failed");
      setResult(analysis);
    } catch (e: any) {
      console.error(e);
      alert(`AI analysis failed: ${e.message || "Please verify your PDF is not password protected and try again."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAutoFix = async () => {
    if (!jobDescription || useUploaded) return;
    setIsFixing(true);
    try {
      const optimizedData = await applyATSFixes(data, jobDescription);
      setProposedFixes(optimizedData);
      setShowReview(true);
      setTimeout(() => {
        document.getElementById('ai-review-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (e) {
      alert("AI could not generate proposed fixes. Please try again.");
    } finally {
      setIsFixing(false);
    }
  };

  const handleApproveChanges = () => {
    if (proposedFixes) {
      // SAFE MERGE: Only update fields intended for optimization to prevent data loss
      onChange({
        ...data,
        summary: proposedFixes.summary || data.summary,
        experience: proposedFixes.experience && proposedFixes.experience.length > 0 
          ? proposedFixes.experience 
          : data.experience,
        skills: proposedFixes.skills && proposedFixes.skills.length > 0 
          ? proposedFixes.skills 
          : data.skills
      });
      alert("Resume updated with AI optimizations!");
      onNavigateToEditor();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-black text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <h3 className="text-2xl font-black flex items-center gap-3 mb-2 tracking-tight">
          <span className="text-indigo-400">🔍</span> ATS Intelligence
        </h3>
        <p className="text-indigo-200/60 text-xs font-medium uppercase tracking-widest leading-relaxed">
          Cross-examine your professional profile against global hiring algorithms.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 no-print">
          <button 
            onClick={() => setUseUploaded(false)}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${!useUploaded ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Forge Draft
          </button>
          <button 
            onClick={() => setUseUploaded(true)}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${useUploaded ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Upload External PDF
          </button>
        </div>

        {useUploaded && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`group border-2 border-dashed rounded-[2.5rem] p-10 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
              uploadedFile ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-white'
            }`}
          >
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileUpload} />
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 ${uploadedFile ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm text-slate-400'}`}>
              {uploadedFile ? '📄' : '📤'}
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-slate-800 tracking-tight">
                {uploadedFile ? uploadedFile.name : 'Drop Resume PDF'}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                {uploadedFile ? 'Click to replace file' : 'PDF files only for visual AI scan'}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center ml-1">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Target Job Description</label>
            {result && !useUploaded && !showReview && (
              <button 
                onClick={handleRequestAutoFix}
                disabled={isFixing || isLoading}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
              >
                {isFixing ? '✨ Thinking...' : '⚡ AI Propose Fixes'}
              </button>
            )}
          </div>
          <textarea
            placeholder="Paste target job description here for the AI to scan..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-6 bg-white border border-slate-200 rounded-[2rem] min-h-[180px] focus:ring-4 focus:ring-indigo-500/10 outline-none shadow-sm transition-all leading-relaxed placeholder:text-slate-300 text-black font-medium"
          />
          <button
            onClick={handleCheck}
            disabled={isLoading || isFixing}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Executing Intelligence Scan...</span>
              </>
            ) : (
              <>
                <span>Run Match Analysis</span>
                <span className="opacity-40">→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {result && !showReview && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-6 duration-1000">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-500/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            
            <div className="relative inline-flex items-center justify-center mb-6">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                <circle 
                  cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={464.7} 
                  strokeDashoffset={464.7 - (464.7 * result.score) / 100}
                  strokeLinecap="round"
                  className={`${result.score > 80 ? 'text-emerald-500' : result.score > 50 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-black tracking-tighter">{result.score}%</span>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Match Accuracy</span>
              </div>
            </div>

            <h4 className="text-xl font-black text-black tracking-tight mb-2">
              {result.score > 80 ? 'Elite Professional Match' : result.score > 50 ? 'Viable Candidate Profile' : 'High Friction Score'}
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">{result.matchAnalysis}</p>
            
            {!useUploaded && (
              <button 
                onClick={handleRequestAutoFix}
                disabled={isFixing}
                className="mt-8 px-8 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              >
                {isFixing ? '✨ AI is architecting fixes...' : '⚡ Propose AI Optimizations'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h5 className="text-[10px] font-black uppercase text-black tracking-widest mb-4 flex items-center gap-2">
                <span className="text-amber-500">⚠️</span> Keyword Gaps
              </h5>
              <div className="flex flex-wrap gap-2">
                {(result.missingKeywords || []).map((word: string, i: number) => (
                  <span key={i} className="px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                    + {word}
                  </span>
                ))}
                {(!result.missingKeywords || result.missingKeywords.length === 0) && <span className="text-slate-400 text-xs italic">All semantic triggers identified.</span>}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h5 className="text-[10px] font-black uppercase text-black tracking-widest mb-4 flex items-center gap-2">
                <span className="text-indigo-500">⚙️</span> Layout Compliance
              </h5>
              <ul className="space-y-3">
                {(result.formattingIssues || []).map((issue: string, i: number) => (
                  <li key={i} className="text-xs text-slate-500 flex gap-3 font-medium">
                    <span className="text-rose-400">•</span> {issue}
                  </li>
                ))}
                {(!result.formattingIssues || result.formattingIssues.length === 0) && <li className="text-xs text-emerald-500 font-bold">Standard Layout Compliant</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {showReview && proposedFixes && (
        <div id="ai-review-section" className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl">✨</div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-70">Review Proposed Improvements</h4>
             <h3 className="text-3xl font-black mb-6 tracking-tighter">AI-Powered Optimization Draft</h3>
             <p className="text-indigo-100 text-sm leading-relaxed mb-8 max-w-xl">
               The AI has rewritten key sections of your resume to include missing keywords. Review and approve to update your active draft.
             </p>
             
             <div className="flex gap-4">
                <button 
                  onClick={handleApproveChanges}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                >
                  Approve & Apply
                </button>
                <button 
                  onClick={() => setShowReview(false)}
                  className="px-8 py-4 bg-indigo-500 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-400 transition-all border border-indigo-400"
                >
                  Discard
                </button>
             </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h5 className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-4">Summary Optimization</h5>
              <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-indigo-200 text-black text-sm leading-relaxed font-medium italic">
                "{proposedFixes.summary}"
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h5 className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-6">Experience Refinement</h5>
              <div className="space-y-6">
                {(proposedFixes.experience || []).map((exp, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-black">{exp.role} @ {exp.company}</span>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                    <div className="p-5 bg-indigo-50/30 rounded-2xl text-xs text-black leading-relaxed whitespace-pre-line border border-indigo-100">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
