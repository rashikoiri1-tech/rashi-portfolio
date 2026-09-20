import React, { useState } from 'react';
import { PROJECTS_DATA, Project } from '../data/projects';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  X, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filterOptions = ['All', 'Full-Stack', 'AI / ML', 'Problem Solving'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedFilter);

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Built & Functional':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Active Development':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Prototype / Concept':
      case 'Project Concept':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Ongoing Research':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <section id="projects" className="py-24 relative bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO &amp; LABS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Featured <span className="gradient-text-cyan-blue">Projects</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg">
            Real software projects, campus applications, and AI/ML prototypes built with clean architecture and database integration.
          </p>

          {/* Prominent GitHub Repository Callout */}
          <div className="mt-6">
            <a
              href="https://github.com/rashikoiri1-tech/rashi-portfolio.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-500/10 text-xs font-mono font-semibold transition-all shadow-lg"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>VIEW GITHUB REPOSITORY (rashikoiri1-tech/rashi-portfolio)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                  : 'glass-panel text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-800 hover:border-cyan-500/40 shadow-xl"
            >
              <div>
                {/* Project Image Preview with Overlay */}
                <div className="relative aspect-video overflow-hidden bg-slate-900 border-b border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/images/brand/logo.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#070b14]/85 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-400 font-semibold">
                    {project.category}
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-mono border backdrop-blur-md ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </div>

                  {/* Impact Metric Badge */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-[#070b14]/90 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{project.metrics}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-slate-900/90 text-[11px] font-mono text-slate-300 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-900/30 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>Architecture &amp; Features</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    className="p-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                    title="Live Overview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#090e1a] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/50">
                {activeModalProject.category}
              </span>
              <span className={`text-[11px] font-mono px-2.5 py-1 rounded border ${getStatusBadge(activeModalProject.status)}`}>
                {activeModalProject.status}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mt-2">{activeModalProject.title}</h3>

            <div className="my-4 aspect-video rounded-xl overflow-hidden border border-slate-800">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-xs font-mono text-cyan-300 my-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Highlight: {activeModalProject.metrics}</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {activeModalProject.detailedDescription}
            </p>

            {/* Key Features Checklist */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Implemented &amp; Planned Features</span>
              </h4>
              <ul className="space-y-2">
                {activeModalProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                    <span className="text-cyan-400">▹</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">TECHNOLOGIES USED</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-md bg-slate-800 text-xs font-mono text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono hover:bg-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repo</span>
              </a>

              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-mono"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
