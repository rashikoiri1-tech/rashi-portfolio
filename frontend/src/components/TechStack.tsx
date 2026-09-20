import React, { useState } from 'react';
import { SKILL_GROUPS, SkillLevel } from '../data/skills';
import { 
  Cpu, 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Brain, 
  Terminal, 
  CheckCircle2
} from 'lucide-react';

const categoryIconMap: Record<string, React.ReactNode> = {
  'Programming Languages': <Code2 className="w-4 h-4 text-cyan-400" />,
  'Frontend Development': <Layout className="w-4 h-4 text-blue-400" />,
  'Backend & APIs': <Server className="w-4 h-4 text-emerald-400" />,
  'Database & SQL': <Database className="w-4 h-4 text-amber-400" />,
  'AI & Machine Learning': <Brain className="w-4 h-4 text-purple-400" />,
  'Developer Tools': <Terminal className="w-4 h-4 text-rose-400" />,
  'CS Fundamentals': <Cpu className="w-4 h-4 text-indigo-400" />
};

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_GROUPS.map((g) => g.category)];

  const displayedGroups = selectedCategory === 'All'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter((g) => g.category === selectedCategory);

  const getLevelBadge = (level: SkillLevel) => {
    switch (level) {
      case 'Building With':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Building With</span>
          </span>
        );
      case 'Practicing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Practicing</span>
          </span>
        );
      case 'Learning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Learning</span>
          </span>
        );
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#090e1a]/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>SKILLS &amp; COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Technical <span className="gradient-text-cyan-blue">Skills</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg">
            Practical skills, languages, and tools categorized by active usage rather than arbitrary percentage scores.
          </p>
        </div>

        {/* Level Legend Chips */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-semibold">Building With:</span>
            <span className="text-slate-400">Actively applied in live and full-stack projects</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-white font-semibold">Practicing:</span>
            <span className="text-slate-400">Regular problem solving and algorithm practice</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-white font-semibold">Learning:</span>
            <span className="text-slate-400">Ongoing academic coursework and self-study</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                  : 'glass-panel text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grouped Skills Display */}
        <div className="space-y-10">
          {displayedGroups.map((group) => (
            <div key={group.category} className="space-y-4">
              
              {/* Group Title */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/80">
                {categoryIconMap[group.category] || <Code2 className="w-4 h-4 text-cyan-400" />}
                <h3 className="text-lg font-bold text-white tracking-tight">{group.category}</h3>
                <span className="text-xs text-slate-500 font-mono hidden sm:inline">— {group.description}</span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-card p-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </span>
                        {getLevelBadge(skill.level)}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>{group.category}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500/70" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
