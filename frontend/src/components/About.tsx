import React, { useState } from 'react';
import { PROFILE_DATA } from '../data/profile';
import { Terminal, Check, Copy, GraduationCap, BookOpen, Code2, Database, Cpu, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const studentSnippet = `const student = {
  name: "${PROFILE_DATA.name}",
  university: "${PROFILE_DATA.university}",
  degree: "${PROFILE_DATA.degree}",
  specialization: "${PROFILE_DATA.specialization}",
  currentStage: "${PROFILE_DATA.academicStage}",
  learningFocus: [
    "Full-Stack Web Development (React & Node.js)",
    "Backend Engineering & RESTful APIs",
    "MySQL Database Design & Query Optimization",
    "Data Structures & Algorithms (DSA)",
    "Artificial Intelligence & Machine Learning Models"
  ],
  passion: "Building real-world software & participating in hackathons",
  status: "Actively building & learning through implementation"
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(studentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-24 relative bg-[#090e1a]/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>BACKGROUND &amp; ASPIRATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            About <span className="gradient-text-cyan-blue">Me</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg">
            An ambitious Computer Science student actively building software, exploring AI/ML, and turning concepts into working applications.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative & Education Timeline */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Identity Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-slate-800">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-cyan-500/40 shrink-0">
                <img
                  src={PROFILE_DATA.avatar}
                  alt={PROFILE_DATA.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = '/images/brand/logo.svg';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{PROFILE_DATA.name}</h3>
                <p className="text-cyan-400 font-mono text-xs mt-0.5">
                  {PROFILE_DATA.academicStage} • {PROFILE_DATA.university}
                </p>
                <p className="text-slate-400 text-xs mt-1">Specialization: {PROFILE_DATA.specialization}</p>
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <p className="text-slate-300 leading-relaxed text-base">
              I am currently in my second year pursuing a <strong className="text-white">B.Tech in Computer Science &amp; Engineering with specialization in AI &amp; Machine Learning</strong> at Adamas University. My passion lies in software development, backend systems, and building solutions that solve concrete problems.
            </p>

            <p className="text-slate-400 leading-relaxed text-sm">
              Rather than just studying theory, I believe in learning by implementation. I am actively building full-stack web applications with <span className="text-cyan-300">React</span>, <span className="text-cyan-300">Node.js</span>, <span className="text-cyan-300">Express</span>, and <span className="text-cyan-300">MySQL</span>, practicing clean REST API design, strengthening my foundation in <span className="text-cyan-300">Data Structures &amp; Algorithms</span>, and exploring applied <span className="text-cyan-300">Machine Learning</span> models.
            </p>

            {/* Education Timeline */}
            <div id="journey" className="pt-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Education Timeline</span>
              </h4>

              <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-6">
                
                {/* Node 1: Adamas University B.Tech */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#070b14]" />
                  <div className="glass-panel p-4 rounded-xl border border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white">{PROFILE_DATA.education.degree}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {PROFILE_DATA.education.timeline}
                      </span>
                    </div>
                    <div className="text-xs text-cyan-400 font-mono mt-1">{PROFILE_DATA.education.institution}</div>
                    <p className="text-xs text-slate-300 mt-2">
                      Specialization in <strong>{PROFILE_DATA.education.specialization}</strong>. Coursework includes Data Structures &amp; Algorithms, Database Management Systems, Object-Oriented Programming, Machine Learning, and Computer Networks.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Core Interest Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="glass-card p-3.5 rounded-xl border border-slate-800">
                <Code2 className="w-5 h-5 text-cyan-400 mb-1.5" />
                <h5 className="text-white font-semibold text-xs">Full-Stack Dev</h5>
                <p className="text-slate-400 text-[11px] mt-0.5">React, Node.js, Express &amp; Modern UI</p>
              </div>

              <div className="glass-card p-3.5 rounded-xl border border-slate-800">
                <Database className="w-5 h-5 text-purple-400 mb-1.5" />
                <h5 className="text-white font-semibold text-xs">Databases &amp; APIs</h5>
                <p className="text-slate-400 text-[11px] mt-0.5">MySQL, Schema Design &amp; REST</p>
              </div>

              <div className="glass-card p-3.5 rounded-xl border border-slate-800">
                <Cpu className="w-5 h-5 text-emerald-400 mb-1.5" />
                <h5 className="text-white font-semibold text-xs">AI/ML &amp; DSA</h5>
                <p className="text-slate-400 text-[11px] mt-0.5">Python, Model Basics &amp; Problem Solving</p>
              </div>
            </div>

          </div>

          {/* Right Column: Code Snippet / Terminal Window */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl glass-panel border border-slate-700/80 shadow-2xl overflow-hidden">
              
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#070b14]/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>rashi-profile.ts</span>
                  </span>
                </div>

                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy code snippet"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Body */}
              <pre className="p-5 text-xs sm:text-[13px] font-mono overflow-x-auto text-slate-200 leading-relaxed bg-[#070b14]/70">
                <code>
                  <span className="text-purple-400">const</span> <span className="text-cyan-300">student</span> = &#123;{'\n'}
                  {'  '}<span className="text-slate-400">name</span>: <span className="text-emerald-300">"{PROFILE_DATA.name}"</span>,{'\n'}
                  {'  '}<span className="text-slate-400">university</span>: <span className="text-emerald-300">"{PROFILE_DATA.university}"</span>,{'\n'}
                  {'  '}<span className="text-slate-400">degree</span>: <span className="text-emerald-300">"B.Tech CSE (AI &amp; ML)"</span>,{'\n'}
                  {'  '}<span className="text-slate-400">stage</span>: <span className="text-amber-300">"2nd Year Student"</span>,{'\n'}
                  {'  '}<span className="text-slate-400">learningFocus</span>: [{'\n'}
                  {'    '}<span className="text-emerald-300">"Full-Stack Web (React &amp; Node.js)"</span>,{'\n'}
                  {'    '}<span className="text-emerald-300">"Backend Engineering &amp; REST APIs"</span>,{'\n'}
                  {'    '}<span className="text-emerald-300">"MySQL &amp; Relational Schema Design"</span>,{'\n'}
                  {'    '}<span className="text-emerald-300">"Data Structures &amp; Algorithms"</span>,{'\n'}
                  {'    '}<span className="text-emerald-300">"Machine Learning Models (Python)"</span>{'\n'}
                  {'  '}],{'\n'}
                  {'  '}<span className="text-slate-400">mindset</span>: <span className="text-cyan-300">"Learning by implementation"</span>,{'\n'}
                  {'  '}<span className="text-slate-400">aspirations</span>: <span className="text-purple-300">"Hackathons &amp; Impactful Software"</span>{'\n'}
                  &#125;;
                </code>
              </pre>

              {/* Window Footer */}
              <div className="px-4 py-2.5 bg-[#070b14]/95 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Adamas University • School of Engineering</span>
                </span>
                <span className="text-emerald-400 font-semibold">● Open to Collaborations</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
