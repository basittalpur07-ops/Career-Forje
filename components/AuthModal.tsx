
import React, { useState } from 'react';
import { authService } from '../services/firebase';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await authService.signIn(email, password);
      } else {
        await authService.signUp(email, password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0c10]/80 backdrop-blur-xl flex items-center justify-center p-6 no-print animate-in fade-in duration-300">
      <div className="bg-[#151921] border border-white/10 w-full max-w-md p-10 rounded-[2.5rem] relative shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-3xl font-black text-white mb-2">{isLogin ? "Welcome Back" : "Join the Forge"}</h3>
        <p className="text-slate-500 text-sm mb-8">{isLogin ? "Access your saved career assets." : "Start building your professional future today."}</p>

        <form onSubmit={handleAction} className="space-y-4">
          {error && (
            <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl text-xs font-bold text-center border border-rose-500/20">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Work Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-white" 
              placeholder="name@company.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-white" 
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs mt-4"
          >
            {isLoading ? "Synchronizing..." : isLogin ? "Login Intelligence" : "Establish Identity"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors"
          >
            {isLogin ? "Need a new identity? Sign Up" : "Already forged? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
