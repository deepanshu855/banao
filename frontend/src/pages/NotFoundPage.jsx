import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-dim text-center">
      <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link to="/" className="px-6 py-2 bg-surface-raised border border-border-subtle rounded-lg hover:bg-surface-overlay transition-colors">
        Go Home
      </Link>
    </div>
  );
}
