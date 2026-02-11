
import React, { useState } from 'react';

interface NavbarProps {
  currentView: string;
  setView: (view: any) => void;
  isLoggedIn: boolean;
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isLoggedIn, user, onAuthClick, onLogout }) => {
  const [imgError, setImgError] = useState(false);

  const getInitial = () => {
    if (!user) return '?';
    if (user.displayName) return user.displayName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return 'U';
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[80] px-6 py-6 no-print">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setView('landing')}
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            {!imgError ? (
              <img 
                src="logo.png" 
                alt="Career Forge" 
                className="w-full h-full rounded-xl object-contain bg-white/5 p-1.5 transition-opacity duration-300"
                onError={() => setImgError(true)} 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                C
              </div>
            )}
          </div>
          <span className="font-black text-white tracking-tighter text-xl hidden sm:block uppercase">Career Forge</span>
        </div>

        <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
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
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setView('builder')}
                className="hidden sm:block px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
              >
                Go to Dashboard
              </button>
              <div className="relative group">
                <button 
                  onClick={onLogout}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white/20 flex items-center justify-center text-white font-black text-sm shadow-lg hover:scale-110 transition-transform"
                  title="Logout"
                >
                  {getInitial()}
                </button>
                <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-48 bg-[#151921] border border-white/10 rounded-xl p-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2 px-1 truncate">{user.email}</p>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
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
