import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BanaoLogo from '../components/BanaoLogo';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Code2,
  Boxes,
  Play,
  CheckCircle2,
  Copy,
  FolderPlus,
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    {
      title: 'Fintech Treasury',
      text: 'बनाओ an algorithmic crypto treasury dashboard with real-time websocket candles, ledger history, and dark obsidian UI.',
      stats: { latency: '24ms', mrr: '$128k', engine: 'Gemini 3.1 Pro' },
    },
    {
      title: 'AI Voice Workspace',
      text: 'बनाओ an autonomous voice agent workspace with real-time waveform visualization, webRTC audio, and function calling.',
      stats: { latency: '18ms', accuracy: '99.8%', engine: 'Gemini 3.1 Pro' },
    },
    {
      title: 'SaaS Kanban Platform',
      text: 'बनाओ a collaborative multi-tenant project kanban board with drag-and-drop, redis lock, and Postgres relations.',
      stats: { latency: '32ms', throughput: '10k req/s', engine: 'Gemini 3.1 Pro' },
    },
  ];

  const [selectedPrompt, setSelectedPrompt] = useState(samplePrompts[0]);

  const handleStartBuilding = () => {
    if (isAuthenticated) {
      navigate('/projects');
    } else {
      navigate('/login');
    }
  };

  const copyPrompt = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#e3e1e9] flex flex-col selection:bg-purple-500/30 selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-violet-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-purple-700/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[65%] left-[-10%] w-[600px] h-[600px] bg-cyan-700/10 blur-[140px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141724]/90 border border-[#323850] text-xs font-mono text-[#94a3b8] mb-8 shadow-lg hover:border-[#8b5cf6]/40 transition-colors">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b5cf6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b5cf6]"></span>
          </span>
          <span className="text-[#e3e1e9] font-medium">Banao 2.0 Engine Live</span>
          <span className="text-[#323850]">•</span>
          <span className="text-[#38bdf8]">Autonomous Full-Stack Synthesis</span>
        </div>

        {/* Brand Headline with Hindi Logo integration */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.15]">
          You describe it in natural language.{' '}
          <span className="inline-block relative">
            <span className="bg-gradient-to-r from-[#d0bcff] via-[#8b5cf6] to-[#38bdf8] bg-clip-text text-transparent font-devanagari font-black drop-shadow-[0_0_35px_rgba(139,92,246,0.5)]">
              बनाओ
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full blur-[1px]"></span>
          </span>{' '}
          builds the production app.
        </h1>

        {/* Subtitle with Hindi philosophy */}
        <p className="mt-8 text-lg sm:text-xl text-[#94a3b8] max-w-3xl leading-relaxed">
          From natural Hindi, Hinglish, or English prompts to full React, Next.js, and Node backends in seconds.
          Self-healing AST runtime with instantaneous isolated container sandboxes.{' '}
          <span className="font-devanagari text-white font-semibold">"सोचो और बनाओ"</span>
        </p>

        {/* Primary CTA Buttons with Google Option */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {isAuthenticated ? (
            <Link
              to="/projects"
              className="btn-primary-gradient w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              <FolderPlus className="w-5 h-5" />
              <span>Go to My Projects</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="btn-primary-gradient w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-3.5 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02] transition-all cursor-pointer group"
            >
              {/* Google G Icon */}
              <div className="w-6 h-6 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>

              <span>Continue with Google</span>
              <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          <a
            href="#demo"
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-medium text-[#e3e1e9] bg-[#141724] hover:bg-[#1e2235] border border-[#272c3f] hover:border-[#38bdf8]/40 transition-all flex items-center justify-center gap-2.5"
          >
            <Play className="w-4 h-4 text-[#38bdf8] fill-[#38bdf8]" />
            <span>Explore Studio Demo</span>
          </a>
        </div>

        {/* Micro-Trust Signals */}
        <div className="mt-5 flex items-center justify-center gap-6 text-xs font-mono text-[#94a3b8]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Free 1,000 monthly credits
          </span>
          <span className="text-[#323850]">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            No credit card required
          </span>
          <span className="text-[#323850]">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Zero setup in browser
          </span>
        </div>

        {/* ================= INTERACTIVE TERMINAL / STUDIO PREVIEW ================= */}
        <div id="demo" className="mt-16 w-full max-w-5xl rounded-2xl neo-glass border border-[#323850] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden text-left">
          {/* Top Window Bar */}
          <div className="px-5 py-3.5 bg-[#0d0e15] border-b border-[#272c3f] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                <div className="w-3 h-3 rounded-full bg-[#10b981]/80" />
              </div>
              <span className="font-mono text-xs text-[#94a3b8] pl-2 border-l border-[#272c3f]">
                banao-ide://workspace/k8s-pod-sandbox
              </span>
            </div>

            {/* Mock Tabs */}
            <div className="flex items-center gap-1 bg-[#141724] p-1 rounded-lg border border-[#272c3f] text-xs font-mono">
              <button
                onClick={() => setActiveTab('prompt')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'prompt' ? 'bg-[#1e2235] text-white shadow-sm' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                1. Natural Prompt
              </button>
              <button
                onClick={() => setActiveTab('ast')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'ast' ? 'bg-[#1e2235] text-white shadow-sm' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                2. Agent AST Reasoning
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'preview' ? 'bg-[#1e2235] text-[#38bdf8] shadow-sm font-semibold' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                3. Live Synthesized App
              </button>
            </div>
          </div>

          {/* Interactive Prompt Selector Bar */}
          <div className="p-4 bg-[#141724]/60 border-b border-[#272c3f] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#94a3b8]">Select Sample:</span>
              <div className="flex gap-2">
                {samplePrompts.map((p) => (
                  <button
                    key={p.title}
                    onClick={() => setSelectedPrompt(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedPrompt.title === p.title
                        ? 'bg-[#8b5cf6]/20 border border-[#8b5cf6] text-white'
                        : 'bg-[#0d0e15] border border-[#272c3f] text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => copyPrompt(selectedPrompt.text)}
              className="flex items-center gap-1.5 text-xs font-mono text-[#94a3b8] hover:text-[#38bdf8] transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
            </button>
          </div>

          {/* Studio Body */}
          <div className="p-6 md:p-8 bg-[#090a0f]/90 space-y-6">
            {/* Natural Prompt Bubble */}
            <div className="p-4 rounded-xl bg-[#141724] border border-[#323850] relative">
              <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8] mb-2">
                <span className="flex items-center gap-1.5 text-[#38bdf8]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Intent Input (Hindi / English / Code)
                </span>
                <span className="text-emerald-400">Stream Connected (HTTP/2)</span>
              </div>
              <p className="font-mono text-sm sm:text-base text-white leading-relaxed">
                <span className="text-[#8b5cf6] font-bold font-devanagari text-lg mr-1">बनाओ</span>
                {selectedPrompt.text.replace('बनाओ', '')}
              </p>
            </div>

            {/* Tab 1: AST / Terminal */}
            {activeTab === 'ast' && (
              <div className="p-4 rounded-xl bg-[#0d0e15] border border-[#272c3f] font-mono text-xs text-[#94a3b8] space-y-2">
                <div className="text-emerald-400">● [AST Planner] Deconstructing user specification...</div>
                <div className="text-[#38bdf8] pl-4">→ Identified Tech Stack: Vite + React 19 + Tailwind v4 + Socket.io + Express</div>
                <div className="text-[#38bdf8] pl-4">→ Synthesizing 7 React components with Obsidian Neo-glass styling</div>
                <div className="text-[#8b5cf6] pl-4">→ Creating file tree: src/components/CandleChart.jsx, src/state/TreasuryContext.jsx</div>
                <div className="text-white pl-4">→ Container health check passed. Pod ready in 2.1s.</div>
              </div>
            )}

            {/* Tab 2: Code Diff */}
            {activeTab === 'prompt' && (
              <div className="p-4 rounded-xl bg-[#0d0e15] border border-[#272c3f] font-mono text-xs text-[#94a3b8] space-y-1">
                <div className="text-xs text-[#8b5cf6] pb-2 border-b border-[#272c3f]">
                  // File: src/components/Dashboard.jsx
                </div>
                <div className="text-emerald-400">+ import React, &#123; useState, useEffect &#125; from 'react';</div>
                <div className="text-emerald-400">+ import &#123; LineChart, Candlestick &#125; from 'recharts';</div>
                <div className="text-emerald-400">+ export default function TreasuryApp() &#123;</div>
                <div className="text-emerald-400 pl-4">+ const [vaultBalance, setVaultBalance] = useState('$1,280,450.00');</div>
                <div className="text-emerald-400 pl-4">+ return &lt;div className="neo-glass p-8"&gt;...&lt;/div&gt;;</div>
                <div className="text-emerald-400">+ &#125;</div>
              </div>
            )}

            {/* Tab 3: Interactive Live Output Mockup */}
            {activeTab === 'preview' && (
              <div className="p-6 rounded-xl bg-[#141724]/90 border border-[#323850] shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#272c3f]">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      {selectedPrompt.title} Engine
                    </h3>
                    <p className="text-xs font-mono text-[#94a3b8] mt-0.5">
                      Target Pod: default/sandbox-preview • Port 5173
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#1e2235] text-xs font-mono text-[#38bdf8] border border-[#38bdf8]/30">
                      WebSocket: {selectedPrompt.stats.latency}
                    </span>
                    <button
                      onClick={handleStartBuilding}
                      className="px-3 py-1.5 rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-medium transition-colors"
                    >
                      Open in IDE →
                    </button>
                  </div>
                </div>

                {/* Dashboard Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#0d0e15] border border-[#272c3f]">
                    <span className="text-xs font-mono text-[#94a3b8]">Total Volume / MRR</span>
                    <p className="text-2xl font-bold text-white mt-1">$128,430</p>
                    <span className="text-xs text-emerald-400 font-mono">+18.4% this week</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0d0e15] border border-[#272c3f]">
                    <span className="text-xs font-mono text-[#94a3b8]">Autonomous Engine</span>
                    <p className="text-2xl font-bold text-[#8b5cf6] mt-1">{selectedPrompt.stats.engine}</p>
                    <span className="text-xs text-[#38bdf8] font-mono">Zero compile warnings</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0d0e15] border border-[#272c3f]">
                    <span className="text-xs font-mono text-[#94a3b8]">Live Ingress Latency</span>
                    <p className="text-2xl font-bold text-[#38bdf8] mt-1">{selectedPrompt.stats.latency}</p>
                    <span className="text-xs text-emerald-400 font-mono">Edge Cluster Active</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= VELOCITY METRICS TICKER ================= */}
      <section id="velocity" className="py-16 border-y border-[#272c3f] bg-[#0d0e15]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">4.8M+</p>
              <p className="text-xs sm:text-sm text-[#94a3b8]">Lines Shipped Autonomously</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#8b5cf6] font-mono">&lt; 35s</p>
              <p className="text-xs sm:text-sm text-[#94a3b8]">Average Time-to-Deployment</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#38bdf8] font-mono">99.4%</p>
              <p className="text-xs sm:text-sm text-[#94a3b8]">Zero-Error Syntheses Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">120k+</p>
              <p className="text-xs sm:text-sm text-[#94a3b8]">Developers &amp; Builders</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE ARCHITECTURAL FEATURES ================= */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#8b5cf6] mb-3">
            Architectural Precision
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineered for builders who want speed without sacrificing code quality.
          </h3>
          <p className="mt-4 text-[#94a3b8] text-base">
            Not toy mockups. Real TypeScript, real Vite servers, and real container isolated pods that compile and execute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl neo-glass hover:border-[#8b5cf6]/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex items-center justify-center text-[#8b5cf6] mb-6 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Multilingual Intent Parsing</h4>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Describe features in Hindi, Hinglish, or English. The agent parses semantic intent and structures components with enterprise rigor.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl neo-glass hover:border-[#38bdf8]/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Self-Healing AST Runtime</h4>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              If an import breaks or a syntax error occurs, Banao catches runtime logs in the container and automatically auto-corrects the code in 42ms.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl neo-glass hover:border-violet-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Production Stacks by Default</h4>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Produces clean React 19, Tailwind v4, Node.js microservices, PostgreSQL schemas, and WebSocket channels. No bloated lock-in.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-2xl neo-glass hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Boxes className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Kubernetes Pod Isolation</h4>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Each user project executes within its own dedicated sandbox pod with memory limits, hot reloading, and live terminal shell.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-8 rounded-2xl neo-glass hover:border-amber-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Obsidian Kinetic Design</h4>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Every synthesized UI automatically leverages our Obsidian Kinetic Neo-Glass design system with dark mode excellence and sleek micro-interactions.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-8 rounded-2xl neo-glass hover:border-rose-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Google SSO Security</h4>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Seamless zero-password authentication powered strictly by Google OAuth 2.0 with JWT tokens and end-to-end sandbox session validation.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STARTER TEMPLATES ================= */}
      <section id="templates" className="py-20 bg-[#0d0e15]/40 border-t border-[#272c3f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8]">
                Instant Starters
              </span>
              <h3 className="text-3xl font-bold text-white mt-1">
                Clone a production architecture with 1-click.
              </h3>
            </div>
            <Link
              to="/projects"
              className="text-sm text-[#8b5cf6] hover:text-[#d0bcff] font-medium flex items-center gap-1 transition-colors"
            >
              <span>Explore all templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Fintech Treasury & Ledger',
                desc: 'Real-time WebSocket market streams, balance accounting, dark neo-glass charts.',
                tags: ['React', 'WebSockets', 'Tailwind'],
              },
              {
                title: 'AI Voice Agent Workspace',
                desc: 'Edge audio streaming, live waveform canvas, and Gemini model function calling.',
                tags: ['WebRTC', 'Audio API', 'Vite'],
              },
              {
                title: 'Multi-Tenant SaaS Portal',
                desc: 'Role-based access control, billing metrics, and Postgres Prisma relations.',
                tags: ['PostgreSQL', 'Auth', 'Next.js'],
              },
              {
                title: 'Kinetic E-Commerce Suite',
                desc: 'High-speed product catalogue with instant search, stripe checkout, and cart state.',
                tags: ['Stripe', 'State Machine', 'Tailwind'],
              },
            ].map((tpl, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#141724] border border-[#272c3f] hover:border-[#8b5cf6]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e2235] text-[#38bdf8] border border-[#38bdf8]/20">
                      STARTER
                    </span>
                    <Sparkles className="w-4 h-4 text-[#8b5cf6] opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-bold text-white group-hover:text-[#d0bcff] transition-colors">{tpl.title}</h4>
                  <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">{tpl.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#272c3f]/80 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {tpl.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-[#94a3b8]">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={handleStartBuilding}
                    className="text-xs text-white hover:text-[#38bdf8] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Clone</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA / LAUNCHPAD ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
        <div className="p-10 md:p-16 rounded-3xl neo-glass-overlay border border-[#8b5cf6]/30 relative overflow-hidden">
          {/* Ambient inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-[#8b5cf6]/20 via-[#38bdf8]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <BanaoLogo size="lg" className="mb-6" />

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl">
              Ready to build something extraordinary?
            </h2>

            <p className="mt-4 text-xl font-devanagari text-[#d0bcff] font-medium">
              "सोचो और बनाओ — Think it. Build it."
            </p>

            <p className="mt-2 text-sm text-[#94a3b8] max-w-lg">
              Launch your autonomous cloud sandbox now. Free tier includes 1,000 monthly credits with instant access.
            </p>

            <div className="mt-8 w-full max-w-md">
              {isAuthenticated ? (
                <Link
                  to="/projects"
                  className="btn-primary-gradient w-full py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                >
                  <FolderPlus className="w-5 h-5" />
                  <span>Launch Projects Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary-gradient w-full py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(139,92,246,0.4)] group cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  </div>
                  <span>Continue with Google</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-[#272c3f] bg-[#0d0e15] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <BanaoLogo size="sm" showTagline />
            <p className="text-xs text-[#94a3b8] mt-1">
              © {new Date().getFullYear()} Banao (बनाओ) AI Inc. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#94a3b8]">
            <a href="#features" className="hover:text-white transition-colors">Architecture</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <Link to="/login" className="hover:text-white transition-colors">Google Sign-in</Link>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141724] border border-[#272c3f]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              All Systems 99.99% Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
