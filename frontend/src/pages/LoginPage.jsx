import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BanaoLogo from '../components/BanaoLogo';
import GoogleButton from '../components/GoogleButton';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const destination = location.state?.from?.pathname || '/projects';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

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
      {/* Top bar */}
      <header
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.8125rem',
            color: '#8a8a9a',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f0eff4')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a9a')}
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <BanaoLogo size="sm" />
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 360 }}>
          {/* Logo & heading */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <BanaoLogo size="lg" to={null} className="justify-center mb-6" />

            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: '#f0eff4',
                marginTop: 24,
                marginBottom: 8,
              }}
            >
              Welcome back
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#8a8a9a', lineHeight: 1.6 }}>
              Sign in to create and manage your projects.
            </p>
          </div>

          {/* Sign-in card */}
          <div
            style={{
              background: '#111114',
              border: '1px solid #26262e',
              borderRadius: 12,
              padding: '28px 24px',
            }}
          >
            <GoogleButton
              text="Continue with Google"
              onSuccessRedirect="/projects"
              showDevOption={true}
            />

            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: '1px solid #1e1e26',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#55555f',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                By continuing you agree to our{' '}
                <span style={{ color: '#8a8a9a' }}>Terms of Service</span> and{' '}
                <span style={{ color: '#8a8a9a' }}>Privacy Policy</span>.
              </p>
            </div>
          </div>

          {/* Reassurance line */}
          <p
            style={{
              fontSize: '0.78rem',
              color: '#55555f',
              textAlign: 'center',
              marginTop: 20,
              letterSpacing: '0.01em',
            }}
          >
            No password · Secured by Google OAuth 2.0
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: '20px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '0.75rem', color: '#55555f', margin: 0 }}>
          © {new Date().getFullYear()} Banāo. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
