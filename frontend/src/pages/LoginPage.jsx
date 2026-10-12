import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BanaoLogo from '../components/BanaoLogo';
import GoogleButton from '../components/GoogleButton';
import { Shield, Sparkles, Zap, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect straight to projects
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const destination = location.state?.from?.pathname || '/projects';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#e3e1e9] flex flex-col justify-between selection:bg-purple-500/30 selection:text-white relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-violet-600/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 blur-[130px] pointer-events-none -z-10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Top Bar with Back Link */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#94a3b8] hover:text-white transition-colors bg-[#141724]/80 px-4 py-2 rounded-xl border border-[#272c3f]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing</span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#141724] border border-[#272c3f] text-xs font-mono text-[#94a3b8]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OAuth 2.0 Secure Ingress</span>
        </div>
      </header>

      {/* Main Login / Register Container with Ample Breathing Space */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Main Neo-Glass Card */}
          <div className="p-8 sm:p-12 rounded-3xl neo-glass-overlay border border-[#323850] shadow-[0_25px_70px_-20px_rgba(0,0,0,0.85)] flex flex-col items-center text-center relative overflow-hidden">
            {/* Subtle card top glowing border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent opacity-60" />

            {/* Brand Logo in Hindi with Ample Breathing Room */}
            <div className="mb-8">
              <BanaoLogo size="lg" showTagline />
            </div>

            {/* Title & Description */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome to Banao
            </h1>

            <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed max-w-xs">
              Sign in to launch your autonomous sandbox and access your existing projects.
            </p>

            {/* ONLY Google Authentication Option */}
            <div className="mt-10 w-full">
              <GoogleButton
                text="Continue with Google"
                onSuccessRedirect="/projects"
                className="py-4 text-base"
              />
            </div>

            {/* Security Guarantee Pill */}
            <div className="mt-8 pt-8 border-t border-[#272c3f] w-full flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#94a3b8]">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Zero password storage • 100% Google verified</span>
              </div>

              <p className="text-[11px] text-[#64748b] leading-tight">
                By continuing, you agree to the Terms of Service & Privacy Protocol of Banao.
              </p>
            </div>
          </div>

          {/* Quick Value Props below Card with generous breathing room */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#141724]/60 border border-[#272c3f] flex flex-col items-center">
              <Sparkles className="w-4 h-4 text-[#8b5cf6] mb-1" />
              <span className="text-[11px] text-white font-medium">1,000 Credits</span>
              <span className="text-[10px] text-[#94a3b8]">Free Every Month</span>
            </div>

            <div className="p-3 rounded-xl bg-[#141724]/60 border border-[#272c3f] flex flex-col items-center">
              <Zap className="w-4 h-4 text-[#38bdf8] mb-1" />
              <span className="text-[11px] text-white font-medium">Instant Pod</span>
              <span className="text-[10px] text-[#94a3b8]">K8s Isolation</span>
            </div>

            <div className="p-3 rounded-xl bg-[#141724]/60 border border-[#272c3f] flex flex-col items-center">
              <Lock className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] text-white font-medium">Auto-Saving</span>
              <span className="text-[10px] text-[#94a3b8]">State Persisted</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-[#64748b]">
        © {new Date().getFullYear()} Banao (बनाओ) AI • All rights reserved
      </footer>
    </div>
  );
}
