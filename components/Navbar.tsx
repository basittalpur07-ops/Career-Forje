
import React from 'react';

interface NavbarProps {
  currentView: string;
  setView: (view: any) => void;
  isLoggedIn: boolean;
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isLoggedIn, user, onAuthClick, onLogout }) => {
  const getInitial = () => {
    if (!user) return '?';
    if (user.displayName) return user.displayName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return 'U';
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[80] px-6 py-6 no-print">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div 
          className="flex items-center gap-3 cursor-pointer group px-4"
          onClick={() => setView('landing')}
        >
          <span className="font-black text-white tracking-tighter text-2xl uppercase group-hover:text-indigo-400 transition-colors">Career Forge</span>
        </div>

        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
          <button 
            onClick={() => setView('features')}
            className={`hover:text-white transition-all hover:tracking-[0.3em] ${currentView === 'features' ? 'text-indigo-400' : ''}`}
          >
            Features
          </button>
          <button 
            onClick={() => setView('pricing')}
            className={`hover:text-white transition-all hover:tracking-[0.3em] ${currentView === 'pricing' ? 'text-indigo-400' : ''}`}
          >
            Pricing
          </button>
          <button 
            onClick={() => setView('faq')}
            className={`hover:text-white transition-all hover:tracking-[0.3em] ${currentView === 'faq' ? 'text-indigo-400' : ''}`}
          >
            FAQ
          </button>
          <button 
            onClick={() => setView('contact')}
            className={`hover:text-white transition-all hover:tracking-[0.3em] ${currentView === 'contact' ? 'text-indigo-400' : ''}`}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setView('builder')}
                className="hidden sm:block px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl"
              >
                Dashboard
              </button>
              <div className="relative group">
                <button 
                  onClick={onLogout}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white/20 flex items-center justify-center text-white font-black text-sm shadow-lg hover:scale-110 transition-transform"
                >
                  {getInitial()}
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-xl"
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
