import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleButton({
  text = 'Continue with Google',
  className = '',
  onSuccessRedirect = '/projects',
  showDevOption = true,
}) {
  const { loginWithGoogle, demoGoogleLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleGoogleClick = () => {
    setIsSubmitting(true);
    try {
      loginWithGoogle();
    } catch (err) {
      console.error('Google login redirect error:', err);
      setIsSubmitting(false);
    }
  };

  const handleInstantDemo = (e) => {
    e.stopPropagation();
    setIsSubmitting(true);
    setTimeout(() => {
      demoGoogleLogin({
        name: 'Deepanshu Sharma',
        email: 'deepanshu@banao.ai',
      });
      setIsSubmitting(false);
      navigate(onSuccessRedirect);
    }, 400);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={isSubmitting}
        className={`btn-google ${className}`}
        style={{
          opacity: isSubmitting ? 0.7 : 1,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
      >
        {isSubmitting ? (
          <Loader2
            size={18}
            style={{ color: '#7c5cfc', animation: 'spin 1s linear infinite', flexShrink: 0 }}
          />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
        )}
        <span
          style={{
            fontWeight: 500,
            color: '#f0eff4',
            letterSpacing: '-0.01em',
          }}
        >
          {isSubmitting ? 'Connecting…' : text}
        </span>
      </button>

      {showDevOption && (
        <button
          type="button"
          onClick={handleInstantDemo}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.75rem',
            color: '#55555f',
            cursor: 'pointer',
            textDecoration: 'underline',
            textDecorationStyle: 'dotted',
            textUnderlineOffset: 3,
            transition: 'color 0.15s ease',
            paddingTop: 4,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#8a8a9a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#55555f')}
        >
          Dev: instant demo login
        </button>
      )}

      {/* Spin keyframe (same as ProjectsPage, isolated) */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
