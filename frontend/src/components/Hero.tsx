import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PROFILE_DATA } from '../data/profile';
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Sparkles, 
  Layers, 
  Terminal, 
  Play, 
  Pause, 
  RotateCw,
  ChevronDown,
  Cpu
} from 'lucide-react';

const TOTAL_FRAMES = 240;

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [activeVisualTab, setActiveVisualTab] = useState<'portrait' | 'frames'>('portrait');
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [hasCanvasError, setHasCanvasError] = useState<boolean>(false);
  const autoRotateTimerRef = useRef<number | null>(null);

  // Preload frames progressively in the background
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/frame_${frameNum}.png`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === 1 && canvasRef.current) {
          drawFrame(0);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        setHasCanvasError(true);
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Draw specific frame onto canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(frameIndex)));
    const img = imagesRef.current[safeIndex];

    if (img && img.complete && img.naturalWidth > 0) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const aspect = img.naturalWidth / img.naturalHeight;
      let drawW = canvas.width;
      let drawH = canvas.width / aspect;

      if (drawH > canvas.height) {
        drawH = canvas.height;
        drawW = canvas.height * aspect;
      }

      const dx = (canvas.width - drawW) / 2;
      const dy = (canvas.height - drawH) / 2;

      ctx.drawImage(img, dx, dy, drawW, drawH);
    }
  }, []);

  // Update canvas on frame change
  useEffect(() => {
    if (activeVisualTab === 'frames') {
      drawFrame(currentFrame);
    }
  }, [currentFrame, activeVisualTab, drawFrame]);

  // Scroll scrubbing listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      const totalDist = rect.height + windowH;
      const currentPos = windowH - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));

      const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
      if (frameIndex !== currentFrame) {
        setIsAutoRotating(false);
        setCurrentFrame(frameIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentFrame]);

  // Auto-rotation when frames view is active
  useEffect(() => {
    if (!isAutoRotating || activeVisualTab !== 'frames') return;

    const interval = window.setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
    }, 1000 / 30);

    autoRotateTimerRef.current = interval;

    return () => {
      if (autoRotateTimerRef.current) clearInterval(autoRotateTimerRef.current);
    };
  }, [isAutoRotating, activeVisualTab]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Cinematic Ambient Glow Background Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center hero-grid">
          
          {/* Left Column: Authentic Student Identity, Tagline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{PROFILE_DATA.academicStage}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{PROFILE_DATA.university}</span>
            </div>

            {/* Main Name Heading */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Personal Technology Portfolio</span>
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                {PROFILE_DATA.name.toUpperCase()}
              </h1>
              
              {/* Dual Positioning Sub-headlines */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  {PROFILE_DATA.role.toUpperCase()}
                </span>
                <span className="text-slate-600 font-mono text-xl">•</span>
                <span className="text-slate-200">
                  SOFTWARE DEVELOPER
                </span>
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              "{PROFILE_DATA.tagline}"
            </p>

            {/* Academic Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-1">
              {PROFILE_DATA.metrics.map((metric, idx) => (
                <div key={idx} className="glass-panel p-3.5 rounded-xl border border-slate-800">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">{metric.value}</div>
                  <div className="text-xs text-cyan-400 font-medium mt-0.5">{metric.label}</div>
                  <div className="text-[11px] text-slate-400">{metric.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              {/* Primary CTA: View My Work */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider font-mono"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>

              {/* Secondary CTA: Download Resume */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass-panel border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-white font-semibold text-sm transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>

              {/* Real Profile Links */}
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all flex items-center gap-2 text-xs font-mono"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl glass-panel text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-all flex items-center gap-2 text-xs font-mono"
                title="View LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Micro Badge */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Adamas University Student
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Full-Stack &amp; AI/ML Learner
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual Center (Portrait & 240-Frame Interactive Engine) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Visual View Switcher (Portrait vs 3D Scroll Frames) */}
            <div className="w-full max-w-[460px] flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveVisualTab('portrait')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeVisualTab === 'portrait'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'glass-panel text-slate-400 hover:text-white'
                  }`}
                >
                  Portrait Showcase
                </button>
                <button
                  onClick={() => setActiveVisualTab('frames')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeVisualTab === 'frames'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'glass-panel text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>3D Animation (240f)</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
                {activeVisualTab === 'portrait' ? 'Official Portrait' : `Frame: ${currentFrame + 1}/240`}
              </span>
            </div>

            {/* TAB 1: RASHI KOIRI OFFICIAL PORTRAIT */}
            {activeVisualTab === 'portrait' && (
              <div className="relative w-full max-w-[460px] mx-auto rounded-3xl glass-card p-4 border border-slate-700/60 shadow-2xl shadow-cyan-950/60 group">
                
                {/* Header info badge inside card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-white font-semibold">{PROFILE_DATA.name}</span>
                  </div>
                  <span className="text-cyan-400 font-mono text-[11px]">{PROFILE_DATA.academicStage}</span>
                </div>

                {/* Portrait Image Container with subtle glow and lighting */}
                <div className="relative w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden my-3 border border-cyan-500/30 bg-slate-950 flex items-center justify-center">
                  <img
                    src={PROFILE_DATA.avatar}
                    alt={PROFILE_DATA.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback gracefully if image is unavailable
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = '/images/brand/logo.svg';
                    }}
                  />
                  {/* Subtle dark cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-60" />

                  {/* Floating Identity Chip */}
                  <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-xl border border-cyan-500/30 flex items-center justify-between backdrop-blur-md">
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">{PROFILE_DATA.name}</h4>
                      <p className="text-[11px] text-cyan-300 font-mono mt-1">CSE (AI/ML) • Adamas University</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>

                {/* Card footer description */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Student &amp; Full-Stack Builder</span>
                  <button
                    onClick={() => setActiveVisualTab('frames')}
                    className="text-cyan-400 hover:text-cyan-300 underline text-[11px]"
                  >
                    Explore 3D Scroll Canvas →
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: 240-FRAME INTERACTIVE CANVAS ANIMATION */}
            {activeVisualTab === 'frames' && (
              <div className="relative w-full max-w-[460px] mx-auto rounded-3xl glass-card p-4 border border-slate-700/60 shadow-2xl shadow-cyan-950/60 group">
                
                {/* Header inside canvas container */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Scroll Scrub Engine (240 Frames)</span>
                  </div>
                  <div className="text-slate-400">
                    Frame: <span className="text-cyan-400 font-bold">{currentFrame + 1}</span>/240
                  </div>
                </div>

                {/* Canvas element */}
                <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center overflow-hidden my-2 bg-slate-950/60 rounded-xl">
                  {!hasCanvasError ? (
                    <canvas
                      ref={canvasRef}
                      className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
                      title="Scroll page or drag slider to scrub animation frames"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
                      <Layers className="w-10 h-10 text-cyan-400 mb-2" />
                      <p className="text-sm">Interactive CSS/WebGL Fallback Active</p>
                    </div>
                  )}

                  {/* Buffering status */}
                  {loadedCount < TOTAL_FRAMES && !hasCanvasError && (
                    <div className="absolute bottom-2 left-3 right-3 bg-[#070b14]/90 backdrop-blur-md rounded-lg p-2 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                      <span>Buffering frames...</span>
                      <span className="text-cyan-400 font-mono">
                        {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Interactive Controls & Scrub Slider */}
                <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsAutoRotating(!isAutoRotating)}
                      className="p-1.5 rounded-lg glass-panel hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                      title={isAutoRotating ? 'Pause rotation' : 'Play rotation'}
                    >
                      {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <input
                      type="range"
                      min="0"
                      max={TOTAL_FRAMES - 1}
                      value={currentFrame}
                      onChange={(e) => {
                        setIsAutoRotating(false);
                        setCurrentFrame(parseInt(e.target.value, 10));
                      }}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />

                    <button
                      onClick={() => {
                        setCurrentFrame(0);
                        setIsAutoRotating(true);
                      }}
                      className="p-1.5 rounded-lg glass-panel hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                      title="Reset to frame 1"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Scroll page or drag slider to scrub</span>
                    <button
                      onClick={() => setActiveVisualTab('portrait')}
                      className="text-cyan-400 hover:text-cyan-300 underline"
                    >
                      View Portrait →
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full flex justify-center mt-12">
        <a
          href="#about"
          className="flex flex-col items-center text-slate-500 hover:text-cyan-400 transition-colors"
          aria-label="Scroll down to About section"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest mb-1">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
