import React, { useState, useEffect, useRef } from 'react';
import { useSandbox } from '../../hooks/useSandbox';
import { getPreviewUrl } from '../../utils/urlBuilders';
import { RefreshCw, Monitor, Tablet, Smartphone, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * PreviewFrame
 *
 * podReady (bool) — passed from WorkspacePage
 *   false → pod still initialising, show a spinner + "Starting sandbox" overlay
 *   true  → render the iframe; the iframe itself has an onLoad guard in case
 *            Vite's dev server needs a few extra seconds after the pod becomes Ready
 */
export function PreviewFrame({ podReady = false }) {
  const { sandboxId, previewUrl: contextPreviewUrl } = useSandbox();
  const [device, setDevice] = useState('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const retryTimerRef = useRef(null);

  const getWidth = () => {
    switch (device) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  let previewUrl = contextPreviewUrl;
  if (!previewUrl && sandboxId) {
    try { previewUrl = getPreviewUrl(sandboxId); } catch (e) {}
  }

  // Once the pod is ready, start polling the iframe by periodically bumping
  // iframeKey — Vite's dev server may take a few seconds to come up inside the pod.
  useEffect(() => {
    if (!podReady || iframeLoaded) return;

    // Retry every 3 s until the iframe fires onLoad
    retryTimerRef.current = setInterval(() => {
      setIframeKey((k) => k + 1);
    }, 3000);

    return () => clearInterval(retryTimerRef.current);
  }, [podReady, iframeLoaded]);

  // Stop retrying once the iframe loads successfully
  const handleIframeLoad = () => {
    setIframeLoaded(true);
    clearInterval(retryTimerRef.current);
  };

  return (
    <div className="flex flex-col h-full bg-surface-dim">
      {/* Toolbar */}
      <div className="h-12 border-b border-border-subtle flex items-center justify-between px-4 bg-surface shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-raised border border-border-subtle rounded px-2 py-1 items-center gap-2 max-w-sm w-full font-mono text-xs text-text-muted truncate">
            {previewUrl || 'Initialising preview…'}
          </div>
          <button
            onClick={() => { setIframeLoaded(false); setIframeKey((k) => k + 1); }}
            disabled={!podReady}
            className="p-1.5 hover:bg-surface-overlay rounded text-text-muted hover:text-text-main disabled:opacity-40 disabled:cursor-not-allowed"
            title="Refresh preview"
          >
            <RefreshCw size={14} />
          </button>
          <a
            href={previewUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'p-1.5 hover:bg-surface-overlay rounded text-text-muted hover:text-text-main',
              !podReady && 'pointer-events-none opacity-40',
            )}
          >
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Device switcher */}
        <div className="flex items-center gap-1 bg-surface-raised border border-border-subtle rounded p-1">
          {[
            { id: 'desktop', Icon: Monitor },
            { id: 'tablet',  Icon: Tablet },
            { id: 'mobile',  Icon: Smartphone },
          ].map(({ id, Icon }) => (
            <button
              key={id}
              onClick={() => setDevice(id)}
              className={cn('p-1 rounded', device === id ? 'bg-surface text-primary' : 'text-text-muted hover:text-text-main')}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-surface-dim flex justify-center p-4">
        <div
          className="bg-white rounded overflow-hidden shadow-2xl border border-border-subtle transition-all duration-300 relative"
          style={{ width: getWidth(), height: '100%' }}
        >
          {/* Loading overlay — shown while pod is initialising OR while iframe hasn't loaded yet */}
          {(!podReady || !iframeLoaded) && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-dim gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-primary opacity-70" />
              <div className="text-center">
                <p className="text-sm font-medium text-text-main">
                  {!podReady ? 'Initialising sandbox…' : 'Starting dev server…'}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {!podReady
                    ? 'Your React environment is being created'
                    : 'Vite is compiling your project'}
                </p>
              </div>
            </div>
          )}

          {/* Iframe — rendered (but hidden by overlay) even while loading so it begins
              connecting as soon as the pod accepts connections */}
          {previewUrl && (
            <iframe
              key={iframeKey}
              src={previewUrl}
              onLoad={handleIframeLoad}
              className="w-full h-full border-none bg-white"
              title="Preview"
            />
          )}
        </div>
      </div>
    </div>
  );
}
