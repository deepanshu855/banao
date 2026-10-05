import React, { useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { Brain, ChevronDown, ChevronRight, Loader2, Check } from 'lucide-react';

export function ThinkingStream() {
  const { currentSteps } = useChat();
  const [isExpanded, setIsExpanded] = useState(true);

  if (currentSteps.length === 0) {
    return (
      <div className="p-3 bg-surface-raised rounded-lg border border-border-subtle flex items-center gap-3 self-start text-text-muted">
        <Brain className="animate-pulse text-primary" size={16} />
        Thinking...
      </div>
    );
  }

  return (
    <div className="bg-surface-raised rounded-lg border border-border-subtle self-start max-w-[90%] overflow-hidden flex flex-col">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 p-2 hover:bg-surface-overlay transition-colors text-left"
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <Brain className="text-primary" size={16} />
        <span className="font-medium text-text-main">Thinking & planning changes...</span>
      </button>
      
      {isExpanded && (
        <div className="p-3 pt-0 flex flex-col gap-2 font-mono text-xs">
          {currentSteps.map((step, idx) => (
            <div key={idx} className="flex gap-2 text-text-muted">
              {idx === currentSteps.length - 1 ? (
                <Loader2 size={14} className="animate-spin text-secondary shrink-0 mt-0.5" />
              ) : (
                <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
              )}
              <div className="break-words whitespace-pre-wrap">
                {step.message.length > 300 ? step.message.substring(0, 300) + '... (show more)' : step.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
