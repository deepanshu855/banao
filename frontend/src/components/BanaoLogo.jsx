import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BanaoLogo — redesigned wordmark
 * Clean, minimal: a small purple "ब" monogram + "Banāo" roman wordmark with devanagari subtitle.
 */
export default function BanaoLogo({ size = 'md', to = '/', showTagline = false, className = '' }) {
  const sizes = {
    sm: { mark: 28, markText: '14px', wordmark: '15px', tagline: '10px', gap: 8 },
    md: { mark: 34, markText: '17px', wordmark: '18px', tagline: '10.5px', gap: 10 },
    lg: { mark: 44, markText: '22px', wordmark: '24px', tagline: '11px', gap: 12 },
    xl: { mark: 56, markText: '28px', wordmark: '30px', tagline: '12px', gap: 14 },
  };

  const s = sizes[size] || sizes.md;

  const Content = (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{ gap: s.gap }}
    >
      {/* Monogram mark */}
      <div
        style={{
          width: s.mark,
          height: s.mark,
          borderRadius: 8,
          background: 'rgba(124, 92, 252, 0.1)',
          border: '1px solid rgba(124, 92, 252, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontWeight: 700,
            fontSize: s.markText,
            color: '#9d7fff',
            lineHeight: 1,
          }}
        >
          ब
        </span>
      </div>

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontSize: s.wordmark,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#f0eff4',
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1,
          }}
        >
          Banāo
        </span>
        {showTagline && (
          <span
            style={{
              fontSize: s.tagline,
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              color: '#55555f',
              marginTop: 3,
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            सोचो और बनाओ
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none" style={{ textDecoration: 'none' }}>
        {Content}
      </Link>
    );
  }

  return Content;
}
