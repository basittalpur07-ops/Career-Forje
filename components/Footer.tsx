
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#050608] border-t border-white/5 pt-24 pb-12 px-6 no-print">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-black text-white tracking-tighter text-2xl uppercase">Career Forge</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The ultimate AI-driven career ecosystem. Architecting professional legacies through cutting-edge linguistic intelligence.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/smokeyfreak._/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500 transition-all cursor-pointer group"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.15.26-2.914.557-.79.307-1.459.718-2.126 1.384-.666.667-1.077 1.336-1.384 2.126-.297.764-.5 1.637-.557 2.914-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.26 2.15.557 2.914.307.79.718 1.459 1.384 2.126.667.666 1.336 1.077 2.126 1.384.764.297 1.637.5 2.914.557 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.15-.26 2.914-.557.79-.307 1.459-.718 2.126-1.384.666-.667 1.077-1.336 1.384-2.126.297-.764.5-1.637.557-2.914.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.26-2.15-.557-2.914-.307-.79-.718-1.459-1.384-2.126-.667-.666-1.336-1.077-2.126-1.384-.764-.297-1.637-.5-2.914-.557-1.28-.058-1.688-.072-4.947-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/abdul-basit-65537b384/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a 
                href="https://github.com/basittalpur07-ops" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">AI Builder</li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">ATS Optimizer</li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">Letter Architect</li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">FAQ Base</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">Features</li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">Pricing</li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">Career Blog</li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">Privacy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Join the Forge</h4>
            <p className="text-slate-500 text-sm mb-6">Get career intelligence delivered to your inbox weekly.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@work.com" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
              />
              <button className="bg-white text-black px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2025 Career Forge AI. Built for the Unstoppable.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Security</span>
            <span className="hover:text-white cursor-pointer">Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
