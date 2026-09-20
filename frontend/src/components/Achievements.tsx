import React, { useState } from 'react';
import { ACHIEVEMENT_CATEGORIES } from '../data/achievements';
import { 
  Trophy, 
  Award, 
  GraduationCap, 
  Code2, 
  Layers, 
  Sparkles, 
  Calendar, 
  Clock
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-5 h-5 text-cyan-400" />,
  Trophy: <Trophy className="w-5 h-5 text-amber-400" />,
  Code2: <Code2 className="w-5 h-5 text-emerald-400" />,
  Layers: <Layers className="w-5 h-5 text-blue-400" />,
  Award: <Award className="w-5 h-5 text-purple-400" />
};

export const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = ACHIEVEMENT_CATEGORIES;

  const totalMilestones = categories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <section id="achievements" className="py-24 relative bg-[#090e1a]/50 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>MILESTONES &amp; JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Achievements &amp; <span className="gradient-text-cyan-blue">Milestones</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg">
            Documenting academic growth, coding milestones, and technical achievements throughout my university journey.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            All Categories ({totalMilestones})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              {cat.name} ({cat.items.length})
            </button>
          ))}
        </div>

        {/* Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .filter((cat) => activeTab === 'all' || activeTab === cat.id)
            .map((cat) => {
              if (cat.items.length === 0) {
                // Elegant Empty State per User Instruction
                return (
                  <div
                    key={cat.id}
                    className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-slate-800/80 border-dashed group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                          {iconMap[cat.iconName] || <Award className="w-5 h-5 text-cyan-400" />}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">{cat.name}</h3>
                          <p className="text-[11px] text-slate-400 font-mono">Category Area</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-cyan-300/80">
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>More achievements will be added as the journey continues.</span>
                    </div>
                  </div>
                );
              }

              return cat.items.map((item, idx) => (
                <div
                  key={`${cat.id}-${idx}`}
                  className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-cyan-400">
                        {iconMap[cat.iconName] || <Award className="w-5 h-5 text-cyan-400" />}
                      </div>

                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-bold">
                        {item.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-cyan-400 uppercase">{cat.name}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mt-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.date} • {item.organization}</span>
                    </p>

                    <p className="mt-3.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Adamas University CSE (AI/ML)</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>
              ));
            })}
        </div>

        {/* Encouraging Footer Note */}
        <div className="mt-12 glass-panel p-5 rounded-2xl border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm text-slate-300">
              Actively preparing for upcoming collegiate hackathons, algorithmic contests, and engineering competitions.
            </span>
          </div>
          <a
            href="#contact"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline shrink-0"
          >
            Invite to a Hackathon Team →
          </a>
        </div>

      </div>
    </section>
  );
};
