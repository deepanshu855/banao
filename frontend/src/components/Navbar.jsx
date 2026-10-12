import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BanaoLogo from './BanaoLogo';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, LogOut, FolderKanban, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#090a0f]/80 backdrop-blur-xl border-b border-[#272c3f]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Hindi Logo & Status */}
        <div className="flex items-center gap-6">
          <BanaoLogo size="md" />

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#141724] border border-[#272c3f] text-xs font-mono text-[#94a3b8]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>v2.4 Engine Live</span>
          </div>
        </div>

        {/* Center: Nav links for landing page */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Architecture</a>
          <a href="#templates" className="hover:text-white transition-colors">Templates</a>
          <a href="#velocity" className="hover:text-white transition-colors">Benchmarks</a>
        </div>

        {/* Right: Auth Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/projects"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#141724] hover:bg-[#1e2235] border border-[#323850] hover:border-[#8b5cf6]/50 transition-all shadow-sm"
              >
                <FolderKanban className="w-4 h-4 text-[#8b5cf6]" />
                <span>My Projects</span>
              </Link>

              <div className="flex items-center gap-3 pl-2 border-l border-[#272c3f]">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-8 h-8 rounded-full border border-[#8b5cf6]/40 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 text-white flex items-center justify-center text-xs font-bold">
                    {user?.name?.[0] || 'U'}
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 rounded-lg text-[#94a3b8] hover:text-rose-400 hover:bg-[#1e2235] border border-transparent hover:border-[#323850] transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-[#141724] border border-transparent hover:border-[#272c3f] transition-all"
              >
                Sign In
              </Link>

              <Link
                to="/login"
                className="btn-primary-gradient px-5 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.35)]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Continue with Google</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#141724] border border-[#272c3f] text-[#94a3b8] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-[#0d0e15] border-b border-[#272c3f] space-y-4">
          <div className="flex flex-col space-y-3 pt-2 text-sm text-[#94a3b8]">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-1">Features</a>
            <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="py-1">Architecture</a>
            <a href="#templates" onClick={() => setMobileMenuOpen(false)} className="py-1">Templates</a>
          </div>

          <div className="pt-4 border-t border-[#272c3f]">
            {isAuthenticated ? (
              <div className="space-y-3">
                <Link
                  to="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white bg-[#141724] border border-[#323850]"
                >
                  <FolderKanban className="w-4 h-4 text-[#8b5cf6]" />
                  <span>Open Projects Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-center text-sm text-rose-400"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary-gradient w-full py-3 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2"
                >
                  <span>Continue with Google</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
