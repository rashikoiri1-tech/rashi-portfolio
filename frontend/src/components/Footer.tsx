import React from 'react';
import { PROFILE_DATA } from '../data/profile';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-12 bg-[#050810] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Brand & Positioning */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1.5px]">
              <div className="w-full h-full bg-[#050810] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-cyan-400 font-mono text-sm">RK</span>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight uppercase">
                {PROFILE_DATA.name}
              </span>
              <p className="text-xs text-slate-400 font-mono">
                {PROFILE_DATA.role} • {PROFILE_DATA.subRole}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {PROFILE_DATA.university} (CSE AI/ML)
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl glass-panel hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-all flex items-center gap-2 text-xs font-mono"
            title="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Lower Footer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 {PROFILE_DATA.name}. All rights reserved.</span>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-4">
            <a
              href={PROFILE_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PROFILE_DATA.socials.email}`}
              className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-1.5"
              title="Email Inquiry"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
