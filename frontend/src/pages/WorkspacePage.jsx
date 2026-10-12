import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSandbox } from '../hooks/useSandbox';
import { useFiles } from '../hooks/useFiles';
import { WorkspaceLayout } from '../components/layout/WorkspaceLayout';
import { ChatPanel } from '../components/chat/ChatPanel';
import { FileExplorer } from '../components/explorer/FileExplorer';
import { PreviewCodeTabs } from '../components/layout/PreviewCodeTabs';
import { TerminalPanel } from '../components/terminal/TerminalPanel';

export default function WorkspacePage() {
  const { sandboxId: urlSandboxId } = useParams();
  const { sandboxId, setSandboxId } = useSandbox();
  const { refreshFiles } = useFiles();
  const navigate = useNavigate();

  // true once the pod has responded to at least one successful /list-files
  const [podReady, setPodReady] = useState(false);
  // true only if we can confirm the sandbox is permanently gone (e.g. no sandboxId at all)
  const [stale, setStale] = useState(false);

  // Sync sandboxId from URL param into context
  useEffect(() => {
    if (urlSandboxId && urlSandboxId !== sandboxId) {
      setSandboxId(urlSandboxId);
    } else if (!urlSandboxId && !sandboxId) {
      navigate('/');
    }
  }, [urlSandboxId, sandboxId, setSandboxId, navigate]);

  // Poll /list-files every 1 s until the pod responds successfully
  useEffect(() => {
    if (!sandboxId || podReady) return;

    let cancelled = false;

    const poll = async () => {
      while (!cancelled) {
        const success = await refreshFiles();
        if (success === true) {
          if (!cancelled) setPodReady(true);
          return;
        }
        // Wait 1 second before next attempt
        await new Promise((r) => setTimeout(r, 1000));
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [sandboxId, podReady, refreshFiles]);

  if (stale) {
    return (
      <div className="h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-4" style={{ color: '#8a8a9a' }}>
        <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f0eff4' }}>Sandbox not found or expired</p>
        <button
          onClick={() => { setStale(false); navigate('/projects'); }}
          className="btn-primary"
          style={{ padding: '10px 20px' }}
        >
          Return to Projects
        </button>
      </div>
    );
  }

  if (!sandboxId) {
    return (
      <div className="h-screen bg-[#0a0a0b] flex items-center justify-center" style={{ color: '#8a8a9a', fontSize: '0.875rem' }}>
        Loading workspace…
      </div>
    );
  }

  return (
    <WorkspaceLayout
      chatPanel={<ChatPanel />}
      fileExplorer={<FileExplorer podReady={podReady} />}
      mainArea={<PreviewCodeTabs podReady={podReady} />}
      terminalPanel={<TerminalPanel />}
    />
  );
}
