
import React from 'react';

interface NavbarProps {
  currentView: string;
  setView: (view: any) => void;
  isLoggedIn: boolean;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isLoggedIn, onAuthClick, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[80] px-6 py-6 no-print">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setView('landing')}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm">C</div>
          <span className="font-black text-white tracking-tighter text-lg hidden sm:block uppercase">Career Forge</span>
        </div>

        <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <button 
            onClick={() => setView('features')}
            className={`hover:text-white transition-colors ${currentView === 'features' ? 'text-indigo-400' : ''}`}
          >
            Features
          </button>
          <button 
            onClick={() => setView('pricing')}
            className={`hover:text-white transition-colors ${currentView === 'pricing' ? 'text-indigo-400' : ''}`}
          >
            Pricing
          </button>
          <button 
            onClick={() => setView('contact')}
            className={`hover:text-white transition-colors ${currentView === 'contact' ? 'text-indigo-400' : ''}`}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('builder')}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
              >
                Go to Dashboard
              </button>
              <button onClick={onLogout} className="text-[11px] font-black text-slate-500 hover:text-white uppercase tracking-widest">Logout</button>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-indigo-400 hover:text-white transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
