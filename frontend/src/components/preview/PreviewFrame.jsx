import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSandbox } from '../../hooks/useSandbox';
import { getPreviewUrl } from '../../utils/urlBuilders';
import { RefreshCw, Monitor, Tablet, Smartphone, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * PreviewFrame
 *
 * podReady (bool) — passed from WorkspacePage via PreviewCodeTabs
 *   false → pod container is still being initialized
 *   true  → pod agent responded, dev server is coming up
 */
export function PreviewFrame({ podReady = false }) {
  const { sandboxId, previewUrl: contextPreviewUrl } = useSandbox();
  const [device, setDevice] = useState('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [serverReady, setServerReady] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showRetryOption, setShowRetryOption] = useState(false);

  const getWidth = () => {
    switch (device) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  let previewUrl = contextPreviewUrl;
  if (!previewUrl && sandboxId) {
    try {
      previewUrl = getPreviewUrl(sandboxId);
    } catch (e) {}
  }

  // Poll the preview URL once podReady is true to ensure Vite is up before loading iframe
  useEffect(() => {
    if (!podReady || !previewUrl || serverReady) return;

    let cancelled = false;
    let attempts = 0;

    const checkServer = async () => {
      attempts++;
      try {
        const res = await fetch(previewUrl, { cache: 'no-store' });
        // Status 200..399 indicates Vite is up and serving HTML
        if (res.status >= 200 && res.status < 400) {
          if (!cancelled) {
            setServerReady(true);
          }
          return;
        }
      } catch (err) {
        // Proxy not ready or connection refused, keep polling
      }

      // Safety fallback: after 6 attempts (~9s) if fetch was blocked (e.g. CORS/extension),
      // mark serverReady so the iframe can mount
      if (attempts >= 6) {
        if (!cancelled) {
          setServerReady(true);
        }
        return;
      }

      if (!cancelled) {
        setTimeout(checkServer, 1500);
      }
    };

    checkServer();

    // Show manual retry button if taking longer than 8 seconds
    const slowTimer = setTimeout(() => {
      if (!cancelled && !serverReady) {
        setShowRetryOption(true);
      }
    }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(slowTimer);
    };
  }, [podReady, previewUrl, serverReady]);

  const handleRefresh = useCallback(() => {
    setIframeLoaded(false);
    setServerReady(false);
    setShowRetryOption(false);
    setIframeKey((k) => k + 1);
  }, []);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const isFullyLoaded = podReady && serverReady && iframeLoaded;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0b]">
      {/* Toolbar */}
      <div className="h-12 border-b border-[#26262e] flex items-center justify-between px-4 bg-[#111114] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex bg-[#18181c] border border-[#26262e] rounded px-2.5 py-1 items-center gap-2 max-w-sm w-full font-mono text-xs text-[#8a8a9a] truncate">
            {previewUrl || 'Initialising preview…'}
          </div>
          <button
            onClick={handleRefresh}
            disabled={!podReady}
            className="p-1.5 hover:bg-[#1e1e24] rounded text-[#8a8a9a] hover:text-[#f0eff4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Refresh preview"
          >
            <RefreshCw size={14} className={cn(!isFullyLoaded && podReady && 'animate-spin opacity-70')} />
          </button>
          <a
            href={previewUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'p-1.5 hover:bg-[#1e1e24] rounded text-[#8a8a9a] hover:text-[#f0eff4] transition-colors',
              !podReady && 'pointer-events-none opacity-40',
            )}
            title="Open preview in new tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Device switcher */}
        <div className="flex items-center gap-1 bg-[#18181c] border border-[#26262e] rounded p-1">
          {[
            { id: 'desktop', Icon: Monitor },
            { id: 'tablet',  Icon: Tablet },
            { id: 'mobile',  Icon: Smartphone },
          ].map(({ id, Icon }) => (
            <button
              key={id}
              onClick={() => setDevice(id)}
              className={cn(
                'p-1 rounded transition-colors',
                device === id ? 'bg-[#111114] text-[#7c5cfc]' : 'text-[#8a8a9a] hover:text-[#f0eff4]'
              )}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-[#0a0a0b] flex justify-center p-4">
        <div
          className="bg-white rounded-lg overflow-hidden shadow-2xl border border-[#26262e] transition-all duration-300 relative"
          style={{ width: getWidth(), height: '100%' }}
        >
          {/* Loading overlay — opaque so proxy errors never bleed through */}
          {!isFullyLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0e0e11] gap-3 select-none">
              <Loader2 className="w-7 h-7 animate-spin text-[#7c5cfc] opacity-80" />
              <div className="text-center px-4">
                <p className="text-sm font-medium text-[#f0eff4]">
                  {!podReady
                    ? 'Initialising sandbox…'
                    : !serverReady
                    ? 'Starting dev server…'
                    : 'Loading preview…'}
                </p>
                <p className="text-xs text-[#8a8a9a] mt-1">
                  {!podReady
                    ? 'Your React environment is being created'
                    : !serverReady
                    ? 'Vite is preparing your project'
                    : 'Connecting to application'}
                </p>
                {showRetryOption && (
                  <button
                    onClick={handleRefresh}
                    className="mt-4 px-3 py-1.5 text-xs bg-[#18181c] hover:bg-[#1e1e24] text-[#7c5cfc] border border-[#26262e] rounded-md transition-colors inline-flex items-center gap-1.5"
                  >
                    <RefreshCw size={12} />
                    Retry connection
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Iframe — only mounted once server is confirmed ready to prevent proxy error flicker */}
          {serverReady && previewUrl && (
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
