import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BanaoLogo from './BanaoLogo';
import { useAuth } from '../context/AuthContext';
import { FolderKanban, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: 'rgba(10, 10, 11, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1e1e26',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Logo */}
        <BanaoLogo size="md" />

        {/* Center: Nav links (desktop) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
          className="hidden lg:flex"
        >
          {[
            { label: 'Features', href: '#features' },
            { label: 'How it works', href: '#demo' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#8a8a9a',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#f0eff4')}
              onMouseLeave={(e) => (e.target.style.color = '#8a8a9a')}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: Actions (desktop) */}
        <div className="hidden sm:flex" style={{ alignItems: 'center', gap: 12 }}>
          {isAuthenticated ? (
            <>
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#f0eff4',
                  background: '#18181c',
                  border: '1px solid #26262e',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s ease',
                  letterSpacing: '-0.01em',
                }}
              >
                <FolderKanban size={14} style={{ color: '#9d7fff' }} />
                My Projects
              </Link>

              {/* User avatar */}
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1px solid #26262e' }}
                />
              ) : (
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: '#7c5cfc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {user?.name?.[0] || 'U'}
                </div>
              )}

              <button
                onClick={handleLogout}
                title="Sign out"
                style={{
                  padding: 6,
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  color: '#55555f',
                  cursor: 'pointer',
                  display: 'flex',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#55555f')}
              >
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#8a8a9a',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  letterSpacing: '-0.01em',
                }}
              >
                Sign in
              </Link>
              <Link
                to="/login"
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.8125rem', textDecoration: 'none' }}
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            padding: 8,
            background: 'transparent',
            border: '1px solid #26262e',
            borderRadius: 8,
            color: '#8a8a9a',
            cursor: 'pointer',
          }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            padding: '12px 24px 24px',
            borderBottom: '1px solid #1e1e26',
            background: '#0a0a0b',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
          className="sm:hidden"
        >
          <a
            href="#features"
            onClick={() => setMobileOpen(false)}
            style={{ color: '#8a8a9a', textDecoration: 'none', fontSize: '0.875rem', padding: '8px 0' }}
          >
            Features
          </a>
          <a
            href="#demo"
            onClick={() => setMobileOpen(false)}
            style={{ color: '#8a8a9a', textDecoration: 'none', fontSize: '0.875rem', padding: '8px 0' }}
          >
            How it works
          </a>
          <div style={{ borderTop: '1px solid #1e1e26', marginTop: 8, paddingTop: 12 }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link
                  to="/projects"
                  onClick={() => setMobileOpen(false)}
                  className="btn-ghost"
                  style={{ textDecoration: 'none', width: '100%' }}
                >
                  My Projects
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#f87171',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    padding: '8px 0',
                    textAlign: 'center',
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ textDecoration: 'none', width: '100%' }}
              >
                Get started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
