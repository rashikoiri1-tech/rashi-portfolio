import React from 'react';
import { MessageSquareQuote, Users, ArrowRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 relative bg-[#070b14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>COLLABORATION &amp; FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            Testimonials &amp; <span className="gradient-text-cyan-blue">Endorsements</span>
          </h2>
        </div>

        {/* Elegant Honest Empty State */}
        <div className="max-w-2xl mx-auto glass-card p-8 sm:p-10 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center mx-auto mb-5 text-cyan-400 shadow-lg shadow-cyan-950/40">
            <Users className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold text-white mb-2">
            Testimonials will appear here as I collaborate on more projects.
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
            As a 2nd year B.Tech student, I prioritize transparent engineering. Peer reviews, faculty feedback, and hackathon teammate testimonials will be published here as projects deploy.
          </p>

          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <span>Collaborate on a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
