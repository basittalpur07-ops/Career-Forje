
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
  const [showPassword, setShowPassword] = useState(false);
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
      setError(err.message || "Authentication failed. Please check your credentials.");
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
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-700" 
              placeholder="name@company.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Password</label>
            <div className="relative group/pass">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-700" 
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs mt-4"
          >
            {isLoading ? "Authenticating..." : isLogin ? "Login Intelligence" : "Establish Identity"}
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
