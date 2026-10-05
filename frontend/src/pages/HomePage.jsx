import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSandbox } from '../hooks/useSandbox';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

export default function HomePage() {
  const { start, isStarting, error } = useSandbox();
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      const { sandboxId } = await start();
      navigate(`/workspace/${sandboxId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-dim">
      <div className="w-full max-w-lg p-10 rounded-xl bg-surface-raised border border-border-subtle shadow-2xl text-center flex flex-col items-center">
        <Sparkles className="text-primary w-12 h-12 mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-text-main">
          Banao AI
        </h1>
        <p className="text-text-muted mb-8 text-lg">Your intelligent app builder environment.</p>
        
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        <button 
          onClick={handleStart}
          disabled={isStarting}
          className={cn(
            "px-8 py-4 rounded-lg font-medium text-lg flex items-center gap-3 transition-all w-full justify-center",
            isStarting 
              ? "bg-border-subtle text-text-muted cursor-not-allowed" 
              : "bg-primary text-white hover:bg-opacity-90 shadow-[0_0_24px_rgba(139,92,246,0.3)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)]"
          )}
        >
          {isStarting ? <Loader2 className="w-6 h-6 animate-spin" /> : null}
          {isStarting ? 'Starting Environment...' : 'Start Building'}
        </button>
      </div>
    </div>
  );
}
