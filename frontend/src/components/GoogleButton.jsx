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
    // Trigger real Google OAuth redirect
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
    <div className="w-full flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={isSubmitting}
        className={`relative w-full flex items-center justify-center gap-3.5 px-6 py-3.5 rounded-xl text-sm md:text-base font-medium text-[#e3e1e9] bg-[#141724]/90 hover:bg-[#1e2235] border border-[#323850] hover:border-[#8b5cf6]/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] transition-all duration-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer ${className}`}
      >
        {/* Subtle ambient border shine */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin text-[#8b5cf6]" />
        ) : (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
        )}

        <span className="font-medium tracking-wide text-white group-hover:text-white transition-colors">
          {isSubmitting ? 'Connecting with Google...' : text}
        </span>
      </button>

      {showDevOption && (
        <button
          type="button"
          onClick={handleInstantDemo}
          className="text-xs text-[#94a3b8] hover:text-[#38bdf8] transition-colors underline decoration-dotted underline-offset-4 cursor-pointer pt-1"
        >
          Dev Quick Access (Instant Demo Google Login)
        </button>
      )}
    </div>
  );
}
