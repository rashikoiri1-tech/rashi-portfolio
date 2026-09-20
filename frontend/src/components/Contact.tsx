import React, { useState } from 'react';
import { PROFILE_DATA } from '../data/profile';
import { api, ContactPayload } from '../services/api';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Clock, 
  Github, 
  Linkedin, 
  Loader2,
  ArrowUpRight,
  Database
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactPayload, string>> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters describing your inquiry.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (fieldErrors[name as keyof ContactPayload]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus('error');
      setStatusMessage('Please correct the highlighted fields before submitting.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await api.submitContact(formData);

      if (response.success) {
        setStatus('success');
        setStatusMessage(response.message || 'Thank you! Your message has been received successfully. I will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFieldErrors({});
      } else {
        setStatus('error');
        setStatusMessage(response.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network communication error with Express backend. Please ensure the backend is running.');
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#090e1a]/70 border-t border-slate-800/80">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Let's Build <span className="gradient-text-cyan-blue">Something</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg">
            Have a project idea, hackathon collaboration, or technical opportunity? Feel free to reach out directly through this form.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">Contact Details</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                I am actively seeking hackathon collaborations, internship opportunities, and real-world project partnerships.
              </p>

              <div className="space-y-4 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href={`mailto:${PROFILE_DATA.socials.email}`} className="hover:text-cyan-400 transition-colors truncate">
                    {PROFILE_DATA.socials.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{PROFILE_DATA.university} • {PROFILE_DATA.location}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>IST (UTC+5:30) • Student Schedule</span>
                </div>
              </div>

              {/* Verified Online Profiles */}
              <div className="pt-8 mt-8 border-t border-slate-800">
                <h4 className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">OFFICIAL PROFILES</h4>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={PROFILE_DATA.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 hover:text-white transition-all flex items-center justify-between text-xs font-mono group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-cyan-400" />
                      <span>GitHub: rashikoiri1-tech</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={PROFILE_DATA.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 hover:text-white transition-all flex items-center justify-between text-xs font-mono group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span>LinkedIn: rashi-koiri-73a074384</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Architecture Architecture Proof Card */}
            <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 flex items-center gap-3.5">
              <Database className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs font-mono text-slate-300">
                <span className="text-white font-semibold block">Full-Stack MySQL Integration</span>
                Form submits via REST API into Express &amp; MySQL table <code className="text-cyan-400">contacts</code> with rate limiting.
              </div>
            </div>
          </div>

          {/* Right Column: Express-Connected Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* Status Alert Banner */}
                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/60 flex items-center gap-3 text-emerald-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/60 flex items-center gap-3 text-rose-300 text-sm">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-2 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Priyanshu Roy"
                      className={`w-full px-4 py-3 rounded-xl bg-[#070b14]/90 border text-white placeholder-slate-500 focus:outline-none text-sm transition-all ${
                        fieldErrors.name
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="mt-1.5 text-xs text-rose-400 font-mono">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-2 uppercase">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. colleague@university.edu"
                      className={`w-full px-4 py-3 rounded-xl bg-[#070b14]/90 border text-white placeholder-slate-500 focus:outline-none text-sm transition-all ${
                        fieldErrors.email
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-rose-400 font-mono">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-2 uppercase">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Hackathon Team Collaboration / Full-Stack Project"
                    className="w-full px-4 py-3 rounded-xl bg-[#070b14]/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-2 uppercase">
                    Message Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share details about the project, event, or technical question..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#070b14]/90 border text-white placeholder-slate-500 focus:outline-none text-sm transition-all resize-none ${
                      fieldErrors.message
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Submit Controls */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Protected by Node.js rate-limiter &amp; sanitization</span>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending to API...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
