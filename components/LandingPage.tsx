
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=80&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80"
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300 overflow-hidden">
      {/* Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[160px]"></div>
      </div>

      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-40 text-center lg:text-left grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl backdrop-blur-md">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Next Gen Career Architect</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
            Forge Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Masterpiece.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
            Step beyond templates. Experience an AI-driven ecosystem designed to architect, optimize, and launch your professional legacy.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onStart}
              className="px-12 py-5 bg-white text-[#0a0c10] rounded-2xl font-black text-lg hover:bg-indigo-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Start Your Forge
            </button>
            
            <div className="flex items-center gap-5 px-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-lg">
              <div className="flex -space-x-4">
                {avatars.map((url, i) => (
                  <img key={i} src={url} className="w-12 h-12 rounded-full border-4 border-[#0a0c10] object-cover ring-2 ring-white/5" alt="User" />
                ))}
              </div>
              <div className="text-left">
                <div className="text-base font-black text-white">12,400+</div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Placements</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group lg:block hidden">
          <div className="absolute -inset-20 bg-indigo-500/10 rounded-full blur-[120px] group-hover:bg-indigo-500/15 transition-all duration-1000"></div>
          <div className="relative bg-[#151921]/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl p-12 animate-float transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                  <div className="h-6 w-48 bg-white/20 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black">94%</div>
              </div>
              <div className="h-32 w-full bg-white/5 rounded-3xl border border-white/5"></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-24 bg-indigo-500/10 rounded-3xl border border-indigo-500/20"></div>
                <div className="h-24 bg-white/5 rounded-3xl border border-white/5"></div>
              </div>
              <div className="h-16 w-full bg-white/5 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
