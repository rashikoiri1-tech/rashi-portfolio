import React from 'react';
import { 
  Layers, 
  Layout, 
  Brain, 
  Server, 
  Database, 
  Cpu, 
  Wrench, 
  ArrowRight
} from 'lucide-react';

interface BuildCard {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  gradient: string;
}

export const Services: React.FC = () => {
  const buildCards: BuildCard[] = [
    {
      number: '01',
      title: 'FULL-STACK APPLICATIONS',
      subtitle: 'Modern User Interfaces & Backends',
      description: 'Building end-to-end responsive web applications using React, TypeScript, Node.js, Express, and MySQL with modular component structures and state workflows.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express'],
      icon: <Layout className="w-6 h-6 text-cyan-400" />,
      gradient: 'from-cyan-500/10 to-blue-500/10'
    },
    {
      number: '02',
      title: 'AI / ML SOLUTIONS',
      subtitle: 'Intelligent Algorithms & Data Models',
      description: 'Developing exploratory machine learning models, predictive pipelines, and applied AI tools using Python, Scikit-Learn, Pandas, and neural network foundations.',
      technologies: ['Python', 'Machine Learning', 'NumPy', 'Pandas', 'Scikit-Learn'],
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      gradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      number: '03',
      title: 'REST APIs & BACKEND SYSTEMS',
      subtitle: 'Robust Web Services & Routing',
      description: 'Engineering clean RESTful APIs with Express and Node.js featuring request validation, rate limiting, error middleware, and parameterized database queries.',
      technologies: ['Node.js', 'Express.js', 'REST Architecture', 'Postman', 'JSON'],
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      gradient: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      number: '04',
      title: 'DATA-DRIVEN APPLICATIONS',
      subtitle: 'Relational Schemas & Analytical Views',
      description: 'Architecting normalized MySQL databases, complex table joins, transaction handling, and dashboard analytics for data-heavy operations like HRMS.',
      technologies: ['MySQL', 'SQL Workbench', 'Relational Schemas', 'Indexes', 'CRUD'],
      icon: <Database className="w-6 h-6 text-amber-400" />,
      gradient: 'from-amber-500/10 to-orange-500/10'
    },
    {
      number: '05',
      title: 'SOFTWARE PROJECTS',
      subtitle: 'Clean Code & Structured Architecture',
      description: 'Constructing desktop and academic software utilizing Object-Oriented Principles in C++, Java, and Python with emphasis on maintainability and separation of concerns.',
      technologies: ['C++', 'Java', 'Python', 'OOP Design', 'Git / GitHub'],
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      gradient: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      number: '06',
      title: 'PROBLEM-SOLVING SYSTEMS',
      subtitle: 'Algorithmic Optimization & DSA',
      description: 'Implementing efficient algorithms and core data structures to solve computational problems, optimize time/space complexity, and engineer scalable logic.',
      technologies: ['DSA', 'Algorithms', 'Time Complexity', 'C++', 'Java'],
      icon: <Wrench className="w-6 h-6 text-rose-400" />,
      gradient: 'from-rose-500/10 to-red-500/10'
    }
  ];

  return (
    <section id="services" className="py-24 relative bg-[#070b14]">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            What I <span className="gradient-text-cyan-blue">Build</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg">
            A breakdown of technical areas where I focus my development efforts, build applications, and deepen my engineering skills.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildCards.map((card) => (
            <div
              key={card.number}
              className="glass-card rounded-2xl p-7 flex flex-col justify-between group relative overflow-hidden border border-slate-800 hover:border-cyan-500/40"
            >
              {/* Subtle hover gradient wash */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div>
                {/* Card Top Row: Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-cyan-400 transition-colors">
                    {card.number}
                  </span>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300">
                    {card.icon}
                  </div>
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs font-mono text-cyan-300/80 mt-1">
                  {card.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-400 text-sm mt-3.5 leading-relaxed">
                  {card.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {card.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300 group-hover:border-slate-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Link to Projects */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                >
                  <span>See Related Projects</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
