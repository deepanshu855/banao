import React from 'react';
import { Link } from 'react-router-dom';

export default function BanaoLogo({ size = 'md', to = '/', showTagline = false, className = '' }) {
  const sizeStyles = {
    sm: {
      box: 'w-8 h-8 rounded-lg text-lg',
      text: 'text-xl',
      badge: 'text-[9px] px-1.5 py-0.5',
      gap: 'gap-2.5',
    },
    md: {
      box: 'w-10 h-10 rounded-xl text-xl',
      text: 'text-2xl',
      badge: 'text-[10px] px-2 py-0.5',
      gap: 'gap-3.5',
    },
    lg: {
      box: 'w-14 h-14 rounded-2xl text-3xl',
      text: 'text-4xl',
      badge: 'text-xs px-2.5 py-1',
      gap: 'gap-4',
    },
    xl: {
      box: 'w-20 h-20 rounded-3xl text-5xl',
      text: 'text-6xl',
      badge: 'text-xs px-3 py-1',
      gap: 'gap-5',
    },
  }[size] || {
    box: 'w-10 h-10 rounded-xl text-xl',
    text: 'text-2xl',
    badge: 'text-[10px] px-2 py-0.5',
    gap: 'gap-3.5',
  };

  const Content = (
    <div className={`inline-flex items-center ${sizeStyles.gap} group select-none tracking-normal ${className}`}>
      {/* Geometric Monogram Icon */}
      <div
        className={`relative ${sizeStyles.box} flex items-center justify-center font-bold font-devanagari bg-gradient-to-br from-[#141724] to-[#0d0e15] border border-[#323850] shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_28px_rgba(139,92,246,0.45)] group-hover:border-[#8b5cf6]/60 transition-all duration-300 overflow-hidden`}
      >
        {/* Ambient interior glow light */}
        <div className="absolute inset-0 bg-radial from-violet-500/20 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        
        {/* Subtle corner tech accent */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#38bdf8]/60" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#8b5cf6]/60" />

        {/* Central Hindi Glyphic Initial */}
        <span className="relative z-10 bg-gradient-to-r from-[#e3e1e9] via-[#d0bcff] to-[#38bdf8] bg-clip-text text-transparent font-black leading-none drop-shadow-[0_2px_10px_rgba(139,92,246,0.3)]">
          ब
        </span>
      </div>

      {/* Main Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <span
            className={`${sizeStyles.text} font-extrabold font-devanagari tracking-tight text-[#e3e1e9] group-hover:text-white transition-colors drop-shadow-[0_1px_8px_rgba(255,255,255,0.06)]`}
            style={{ letterSpacing: '0.04em' }}
          >
            बनाओ
          </span>
          
          <span
            className={`font-mono font-medium rounded-full bg-[#1e2235]/80 text-[#38bdf8] border border-[#38bdf8]/30 ${sizeStyles.badge} tracking-wider shadow-[0_0_8px_rgba(56,189,248,0.2)]`}
          >
            AI IDE
          </span>
        </div>

        {showTagline && (
          <span className="text-[11px] font-mono tracking-widest text-[#94a3b8] uppercase mt-0.5 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            सोचो और बनाओ • Autonomous Builder
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
        {Content}
      </Link>
    );
  }

  return Content;
}
