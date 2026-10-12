import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BanaoLogo from '../components/BanaoLogo';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, FolderOpen, Sparkles, Zap, Code2, MessageSquare } from 'lucide-react';

/* ─────────────────────────────────────────────
   Landing Page — minimal, premium redesign
   Focus: React website generation from prompts
───────────────────────────────────────────── */
export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('output');

  const handleCTA = () => navigate(isAuthenticated ? '/projects' : '/login');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0b',
        color: '#f0eff4',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Navbar />

      {/* ── HERO ──────────────────────────────────── */}
      <section
        style={{
          flex: '1 0 auto',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '96px 24px 80px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 12px',
            borderRadius: 99,
            border: '1px solid #26262e',
            marginBottom: 36,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#9d7fff',
              flexShrink: 0,
              display: 'block',
            }}
          />
          <span style={{ fontSize: '0.8rem', color: '#8a8a9a', fontWeight: 500, letterSpacing: '0.01em' }}>
            React website builder · AI-powered
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.07,
            color: '#f0eff4',
            maxWidth: 820,
            margin: '0 auto 24px',
          }}
        >
          Describe it.{' '}
          <span
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              color: '#9d7fff',
            }}
          >
            बनाओ
          </span>{' '}
          builds it.
        </h1>

        {/* Supporting sentence */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
            color: '#8a8a9a',
            maxWidth: 520,
            margin: '0 auto 44px',
            lineHeight: 1.65,
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          Type a prompt in Hindi, Hinglish, or English — and get a live, editable React
          website in seconds.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {isAuthenticated ? (
            <Link
              to="/projects"
              className="btn-primary"
              style={{ textDecoration: 'none', padding: '11px 24px', fontSize: '0.9375rem' }}
            >
              <FolderOpen size={16} />
              My Projects
            </Link>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
              style={{ padding: '11px 24px', fontSize: '0.9375rem' }}
            >
              {/* Google G inline */}
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              Continue with Google
            </button>
          )}

          <a
            href="#demo"
            className="btn-ghost"
            style={{ padding: '11px 24px', fontSize: '0.9375rem', textDecoration: 'none' }}
          >
            See how it works
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* ── INTERACTIVE DEMO ──────────────────────── */}
      <section
        id="demo"
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '0 24px 96px',
          width: '100%',
        }}
      >
        {/* Demo window */}
        <div
          style={{
            border: '1px solid #26262e',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#111114',
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid #1e1e26',
              background: '#0f0f12',
            }}
          >
            {/* Dots */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', opacity: 0.7, display: 'block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', opacity: 0.7, display: 'block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', opacity: 0.7, display: 'block' }} />
              <span
                style={{
                  marginLeft: 10,
                  fontSize: '0.75rem',
                  color: '#55555f',
                  fontFamily: 'monospace',
                  fontWeight: 400,
                }}
              >
                banao · live workspace
              </span>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, background: '#0a0a0b', padding: '3px', borderRadius: 7, border: '1px solid #1e1e26' }}>
              {['prompt', 'output'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 5,
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: activeTab === tab ? '#18181c' : 'transparent',
                    color: activeTab === tab ? '#f0eff4' : '#55555f',
                    fontFamily: 'inherit',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {tab === 'prompt' ? 'Prompt' : 'Live output'}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: 24, minHeight: 280 }}>
            {activeTab === 'prompt' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* User message */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      maxWidth: 500,
                      padding: '10px 14px',
                      borderRadius: '12px 12px 4px 12px',
                      background: 'rgba(124, 92, 252, 0.12)',
                      border: '1px solid rgba(124, 92, 252, 0.2)',
                      fontSize: '0.875rem',
                      color: '#ddd6ff',
                      lineHeight: 1.6,
                      fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif",
                    }}
                  >
                    <span style={{ color: '#9d7fff', fontWeight: 700 }}>बनाओ</span> a clean SaaS
                    landing page with a hero section, pricing table, and testimonials. Use a dark
                    theme with purple accents.
                  </div>
                </div>

                {/* AI response */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'rgba(124, 92, 252, 0.1)',
                      border: '1px solid rgba(124, 92, 252, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: 13, color: '#9d7fff', fontWeight: 700 }}>ब</span>
                  </div>
                  <div
                    style={{
                      maxWidth: 480,
                      padding: '10px 14px',
                      borderRadius: '4px 12px 12px 12px',
                      background: '#18181c',
                      border: '1px solid #26262e',
                      fontSize: '0.875rem',
                      color: '#8a8a9a',
                      lineHeight: 1.6,
                    }}
                  >
                    Building your SaaS landing page... Setting up React components, routing, and
                    Tailwind styles. Your live preview will be ready in a few seconds.
                    <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                      {['HeroSection.jsx', 'Pricing.jsx', 'Testimonials.jsx'].map((f) => (
                        <span
                          key={f}
                          style={{
                            padding: '2px 8px',
                            borderRadius: 4,
                            background: '#111114',
                            border: '1px solid #26262e',
                            fontSize: '0.7rem',
                            color: '#55555f',
                            fontFamily: 'monospace',
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Live output mockup */
              <div
                style={{
                  background: '#0a0a0b',
                  border: '1px solid #1e1e26',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                {/* Mini browser bar */}
                <div
                  style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid #1e1e26',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: '#55555f', fontFamily: 'monospace' }}>
                    localhost:5173
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.7rem',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'block' }} />
                    Live
                  </span>
                </div>

                {/* Fake page content */}
                <div style={{ padding: '28px 24px' }}>
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: 99,
                        background: 'rgba(124, 92, 252, 0.1)',
                        border: '1px solid rgba(124, 92, 252, 0.2)',
                        fontSize: '0.72rem',
                        color: '#9d7fff',
                        marginBottom: 14,
                      }}
                    >
                      Built with Banāo
                    </div>
                    <div
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#f0eff4',
                        letterSpacing: '-0.04em',
                        marginBottom: 8,
                      }}
                    >
                      Ship faster than ever
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#8a8a9a', maxWidth: 320, margin: '0 auto' }}>
                      The modern SaaS platform built for teams who move fast.
                    </div>
                    <div
                      style={{
                        display: 'inline-flex',
                        gap: 10,
                        marginTop: 16,
                      }}
                    >
                      <div
                        style={{
                          padding: '7px 18px',
                          borderRadius: 6,
                          background: '#7c5cfc',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: '#fff',
                        }}
                      >
                        Get started
                      </div>
                      <div
                        style={{
                          padding: '7px 18px',
                          borderRadius: 6,
                          background: '#18181c',
                          border: '1px solid #26262e',
                          fontSize: '0.78rem',
                          fontWeight: 500,
                          color: '#8a8a9a',
                        }}
                      >
                        View pricing
                      </div>
                    </div>
                  </div>

                  {/* Pricing row */}
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                      { tier: 'Starter', price: 'Free', highlighted: false },
                      { tier: 'Pro', price: '$19/mo', highlighted: true },
                      { tier: 'Enterprise', price: 'Custom', highlighted: false },
                    ].map((plan) => (
                      <div
                        key={plan.tier}
                        style={{
                          padding: '14px 18px',
                          borderRadius: 8,
                          border: `1px solid ${plan.highlighted ? 'rgba(124,92,252,0.4)' : '#26262e'}`,
                          background: plan.highlighted ? 'rgba(124, 92, 252, 0.08)' : '#111114',
                          minWidth: 100,
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', color: '#8a8a9a', marginBottom: 4 }}>{plan.tier}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: plan.highlighted ? '#9d7fff' : '#f0eff4', letterSpacing: '-0.02em' }}>
                          {plan.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer bar: try it */}
          <div
            style={{
              padding: '12px 24px',
              borderTop: '1px solid #1e1e26',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#0f0f12',
            }}
          >
            <span style={{ fontSize: '0.78rem', color: '#55555f' }}>
              React · Vite · Tailwind · Live preview
            </span>
            <button
              onClick={handleCTA}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 6,
                background: '#7c5cfc',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#fff',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
            >
              Open in IDE
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────── */}
      <section
        id="features"
        style={{
          borderTop: '1px solid #1e1e26',
          padding: '80px 24px',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#f0eff4',
              marginBottom: 12,
            }}
          >
            Everything you need to build
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#8a8a9a', maxWidth: 440, margin: '0 auto', lineHeight: 1.65 }}>
            From prompt to working React website — without writing a single line of boilerplate.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {[
            {
              icon: MessageSquare,
              title: 'Natural language prompts',
              desc: 'Describe your website in Hindi, Hinglish, or English. Banāo understands your intent and structures components accurately.',
            },
            {
              icon: Zap,
              title: 'Instant live preview',
              desc: 'Each project runs in an isolated sandbox. See your React app running live in a matter of seconds — hot reload included.',
            },
            {
              icon: Code2,
              title: 'Clean React output',
              desc: 'Get well-structured React components with Tailwind styling. No lock-in — all code is yours and fully editable.',
            },
            {
              icon: Sparkles,
              title: 'AI-powered editing',
              desc: 'Ask follow-up prompts to refine, extend, or redesign any part of your project. Iterative by design.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card"
              style={{ padding: 24 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(124, 92, 252, 0.08)',
                  border: '1px solid rgba(124, 92, 252, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  color: '#9d7fff',
                }}
              >
                <Icon size={17} />
              </div>
              <h3
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#f0eff4',
                  marginBottom: 8,
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#8a8a9a', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid #1e1e26',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <BanaoLogo size="lg" to={null} className="justify-center mb-6" />
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#f0eff4',
            marginBottom: 16,
            marginTop: 24,
          }}
        >
          Ready to build something?
        </h2>
        <p
          style={{
            fontSize: '0.9375rem',
            color: '#8a8a9a',
            marginBottom: 36,
            lineHeight: 1.65,
          }}
        >
          <span style={{ fontFamily: "'Noto Sans Devanagari'", color: '#9d7fff', fontWeight: 600 }}>सोचो और बनाओ</span>
          {' '}— Think it. Build it.
        </p>

        {isAuthenticated ? (
          <Link
            to="/projects"
            className="btn-primary"
            style={{ textDecoration: 'none', padding: '12px 28px', fontSize: '0.9375rem' }}
          >
            <FolderOpen size={16} />
            Go to my projects
          </Link>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '0.9375rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            Continue with Google
          </button>
        )}
      </section>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid #1e1e26',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <BanaoLogo size="sm" showTagline={false} />
        <p style={{ fontSize: '0.78rem', color: '#55555f' }}>
          © {new Date().getFullYear()} Banāo. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'Features', href: '#features' },
            { label: 'Demo', href: '#demo' },
            { label: 'Sign in', href: '/login', isLink: true },
          ].map((item) =>
            item.isLink ? (
              <Link
                key={item.label}
                to={item.href}
                style={{ fontSize: '0.78rem', color: '#55555f', textDecoration: 'none', transition: 'color 0.15s ease' }}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                style={{ fontSize: '0.78rem', color: '#55555f', textDecoration: 'none', transition: 'color 0.15s ease' }}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      </footer>
    </div>
  );
}
