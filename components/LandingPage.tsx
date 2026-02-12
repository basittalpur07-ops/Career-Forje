
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
    <div className="min-h-screen bg-[#050608] text-slate-300 overflow-x-hidden font-display">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-600/5 rounded-full blur-[180px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#050608_100%)]"></div>
      </div>

      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-40 grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full shadow-2xl backdrop-blur-xl">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Universal AI Career Suite</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8]">
            Build The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">Unstoppable.</span>
          </h1>
          
          <p className="text-2xl text-slate-400 max-w-xl leading-relaxed font-medium">
            Architect your career with our multi-engine AI ecosystem. Optimize, analyze, and launch your next professional move with surgical precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-8">
            <button 
              onClick={onStart}
              className="group relative px-14 py-6 bg-white text-black rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-[0_20px_80px_rgba(255,255,255,0.1)] active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              Start Your Journey
            </button>
            
            <div className="flex items-center gap-6 px-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl">
              <div className="flex -space-x-4">
                {avatars.map((url, i) => (
                  <img key={i} src={url} className="w-14 h-14 rounded-full border-4 border-[#050608] object-cover ring-2 ring-white/10" alt="User" />
                ))}
              </div>
              <div className="text-left border-l border-white/10 pl-6 py-4">
                <div className="text-xl font-black text-white">12,400+</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Placements Secured</div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Fidelity Mockup */}
        <div className="relative group lg:block hidden animate-in fade-in slide-in-from-right-20 duration-1000">
          <div className="absolute -inset-24 bg-indigo-500/10 rounded-full blur-[160px] group-hover:bg-indigo-500/20 transition-all duration-1000"></div>
          
          <div className="relative bg-[#0d1016] border border-white/10 rounded-[4rem] shadow-[0_0_120px_rgba(0,0,0,0.8)] p-12 transform rotate-3 group-hover:rotate-0 transition-all duration-700 ease-out">
            <div className="flex justify-between items-center border-b border-white/10 pb-10 mb-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
                   <div className="w-full h-full bg-[#0d1016] rounded-[1.4rem] flex items-center justify-center font-black text-white text-lg">JD</div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-white/20 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 bg-indigo-400 w-3/4 animate-pulse"></div>
                  </div>
                  <div className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em]">Architect v3.0 // ACTIVE</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-4xl font-black text-white">98%</div>
                <div className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">Optimized Score</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Semantic Analysis</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/10 rounded-full"></div>
                  <div className="h-2 w-[90%] bg-white/10 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-indigo-500/10 rounded-[2rem] border border-indigo-500/20 flex flex-col items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Rewrite</span>
                </div>
                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 flex flex-col items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Keywords</span>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] border border-white/10">
                <p className="text-sm font-bold text-white mb-3 leading-relaxed italic">
                  "Spearheaded multi-cloud deployment strategies, optimizing latency by 150% and reducing..."
                </p>
                <div className="h-1 w-24 bg-indigo-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Workflow Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Import Intelligence", desc: "Sync your existing profile or start from a blank canvas. Our AI scans for potential from the first keystroke." },
              { step: "02", title: "Sculpt & Optimize", desc: "Use the Multi-Engine AI to rewrite bullet points, suggest keywords, and architect a premium narrative." },
              { step: "03", title: "Deploy Anywhere", desc: "Export high-fidelity PDFs optimized for modern ATS filters and human recruiters alike." }
            ].map((item, i) => (
              <div key={i} className="group p-12 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-indigo-900/10 transition-all">
                <div className="text-5xl font-black text-indigo-500/20 mb-8 group-hover:text-indigo-500 transition-colors">{item.step}</div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
