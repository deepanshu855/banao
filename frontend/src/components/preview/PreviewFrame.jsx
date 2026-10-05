import React, { useState, useEffect } from 'react';
import { useSandbox } from '../../hooks/useSandbox';
import { getPreviewUrl } from '../../utils/urlBuilders';
import { RefreshCw, Monitor, Tablet, Smartphone, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export function PreviewFrame() {
  const { sandboxId, previewUrl: contextPreviewUrl } = useSandbox();
  const [device, setDevice] = useState('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  const getWidth = () => {
    switch(device) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  let previewUrl = contextPreviewUrl;
  if (!previewUrl && sandboxId) {
    try {
      previewUrl = getPreviewUrl(sandboxId);
    } catch(e) {}
  }

  return (
    <div className="flex flex-col h-full bg-surface-dim">
      <div className="h-12 border-b border-border-subtle flex items-center justify-between px-4 bg-surface shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-raised border border-border-subtle rounded px-2 py-1 items-center gap-2 max-w-sm w-full font-mono text-xs text-text-muted truncate">
            {previewUrl || 'Loading preview url...'}
          </div>
          <button onClick={() => setIframeKey(k => k + 1)} className="p-1.5 hover:bg-surface-overlay rounded text-text-muted hover:text-text-main" disabled={!previewUrl}>
            <RefreshCw size={14} />
          </button>
          <a href={previewUrl || '#'} target="_blank" rel="noopener noreferrer" className={cn("p-1.5 hover:bg-surface-overlay rounded text-text-muted hover:text-text-main", !previewUrl && "pointer-events-none opacity-50")}>
            <ExternalLink size={14} />
          </a>
        </div>
        
        <div className="flex items-center gap-1 bg-surface-raised border border-border-subtle rounded p-1">
          <button onClick={() => setDevice('desktop')} className={cn("p-1 rounded", device === 'desktop' ? "bg-surface text-primary" : "text-text-muted hover:text-text-main")}>
            <Monitor size={14} />
          </button>
          <button onClick={() => setDevice('tablet')} className={cn("p-1 rounded", device === 'tablet' ? "bg-surface text-primary" : "text-text-muted hover:text-text-main")}>
            <Tablet size={14} />
          </button>
          <button onClick={() => setDevice('mobile')} className={cn("p-1 rounded", device === 'mobile' ? "bg-surface text-primary" : "text-text-muted hover:text-text-main")}>
            <Smartphone size={14} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-surface-dim flex justify-center p-4">
        <div 
          className="bg-white rounded overflow-hidden shadow-2xl border border-border-subtle transition-all duration-300 relative"
          style={{ width: getWidth(), height: '100%' }}
        >
          {previewUrl ? (
            <iframe 
              key={iframeKey}
              src={previewUrl}
              className="w-full h-full border-none bg-white"
              title="Preview"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-dim text-text-muted">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
              <p>Starting your sandbox...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
