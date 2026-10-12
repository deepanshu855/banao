import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import BanaoLogo from './BanaoLogo';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex flex-col items-center justify-center gap-6 p-4">
        <BanaoLogo size="lg" />
        <div className="flex items-center gap-3 text-sm font-mono text-[#94a3b8] bg-[#141724] px-4 py-2 rounded-xl border border-[#272c3f]">
          <Loader2 className="w-4 h-4 animate-spin text-[#8b5cf6]" />
          <span>Validating session credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
