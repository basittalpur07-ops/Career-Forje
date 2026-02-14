
import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types';
import { searchJobs } from '../services/geminiService';

interface JobScoutProps {
  data: ResumeData;
}

const JobScout: React.FC<JobScoutProps> = ({ data }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Initializing GPS signals...');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  const checkApiKeyAndSearch = async (coords?: { lat: number, lng: number }) => {
    // Pro search models require user API key for billing compliance
    if (!(window as any).aistudio || !(await (window as any).aistudio.hasSelectedApiKey())) {
      setNeedsApiKey(true);
      setStatusMessage('Authentication required for real-time search.');
      return;
    }
    setNeedsApiKey(false);
    performAutoSearch(coords);
  };

  const handleOpenKeyDialog = async () => {
    if ((window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      // Assume success after dialog trigger
      performAutoSearch(currentLocation || undefined);
      setNeedsApiKey(false);
    }
  };

  const performAutoSearch = async (coords?: { lat: number, lng: number }) => {
    setIsLoading(true);
    setStatusMessage(coords ? 'GPS Lock found. Scanning local job market...' : 'GPS unavailable. Scanning based on profile location...');
    
    try {
      const results = await searchJobs(data, {
        coords: coords,
        text: !coords ? data.personalInfo.location : undefined
      });
      setJobs(results);
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
        setNeedsApiKey(true);
      }
      setStatusMessage('Satellite link failed. Ensure a valid API key is selected.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!data.personalInfo.jobTitle) {
      setStatusMessage('Awaiting job title in profile to focus scan...');
      return;
    }

    // Attempt Geolocation automatically
    if ("geolocation" in navigator) {
      setStatusMessage('Acquiring physical coordinates...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(coords);
          checkApiKeyAndSearch(coords);
        },
        (error) => {
          console.warn("Geolocation denied or unavailable:", error);
          checkApiKeyAndSearch(); // Fallback to resume location text
        },
        { timeout: 10000 }
      );
    } else {
      checkApiKeyAndSearch();
    }
  }, [data.personalInfo.jobTitle]);

  if (needsApiKey) {
    return (
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white border border-white/5 shadow-2xl text-center space-y-6">
        <div className="text-4xl">🔐</div>
        <h2 className="text-2xl font-black tracking-tighter">Premium Intelligence Lock</h2>
        <p className="text-sm text-slate-400 max-w-xs mx-auto">
          To provide real-time, non-hallucinated job postings, this feature requires a paid Gemini API key.
        </p>
        <div className="space-y-4">
          <button 
            onClick={handleOpenKeyDialog}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
          >
            Select API Key
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            className="block text-[10px] text-slate-500 uppercase font-black hover:text-indigo-400"
          >
            Learn about Billing & Keys
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-6 duration-700">
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2">Satellite Intelligence</h3>
              <h2 className="text-4xl font-black tracking-tighter">Job Scout v3.0</h2>
            </div>
            <div className={`px-4 py-2 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-widest ${currentLocation ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
              {currentLocation ? '📍 GPS ACTIVE' : '🌐 CLOUD SYNC'}
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6 flex items-center gap-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl bg-white/5 ${isLoading ? 'animate-pulse' : ''}`}>
              {isLoading ? '🛰️' : '🔭'}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Current Protocol</p>
              <p className="text-sm font-bold text-white tracking-tight">{statusMessage}</p>
            </div>
            <button 
              onClick={() => performAutoSearch(currentLocation || undefined)}
              disabled={isLoading}
              className="px-6 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
            >
              Re-Scan
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center gap-6 text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🌎</div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 animate-pulse">Scanning Proximate Zones</p>
            <p className="text-xs text-slate-500 font-medium">Analyzing real-time openings for {data.personalInfo.jobTitle}...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job, i) => (
            <div key={i} className="group bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-100">
                      {job.matchScore}% Match
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      {job.postedDate || 'Active'}
                    </span>
                    {job.distance && (
                      <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">
                        📍 {job.distance} Away
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">{job.title}</h4>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <span className="text-slate-800">{job.company}</span>
                    <span className="opacity-20">•</span>
                    <span>{job.location}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-2xl">{job.reasoning}</p>
                </div>
                <div className="flex items-center gap-6">
                  <a 
                    href={job.url !== "#" ? job.url : undefined} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (job.url === "#") {
                        e.preventDefault();
                        alert("Source link not available for this entry.");
                      }
                    }}
                    className={`bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-slate-200 ${job.url === "#" ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
          {jobs.length === 0 && !isLoading && (
            <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <span className="text-5xl mb-6 block">🛰️</span>
              <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] max-w-xs mx-auto">
                No active signals found in your immediate vicinity.
              </p>
              <button 
                 onClick={() => checkApiKeyAndSearch()}
                 className="mt-8 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline"
              >
                Expand Search Parameters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobScout;
