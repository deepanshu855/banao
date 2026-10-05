import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSandbox } from '../hooks/useSandbox';
import { useFiles } from '../hooks/useFiles';
import { WorkspaceLayout } from '../components/layout/WorkspaceLayout';
import { ChatPanel } from '../components/chat/ChatPanel';
import { FileExplorer } from '../components/explorer/FileExplorer';
import { PreviewCodeTabs } from '../components/layout/PreviewCodeTabs';
import { TerminalPanel } from '../components/terminal/TerminalPanel';
import { Loader2 } from 'lucide-react';

export default function WorkspacePage() {
  const { sandboxId: urlSandboxId } = useParams();
  const { sandboxId, setSandboxId, start, isStarting } = useSandbox();
  const { refreshFiles } = useFiles();
  const navigate = useNavigate();
  const [stale, setStale] = useState(false);

  useEffect(() => {
    if (stale) return; // Don't resync if marked as stale
    if (urlSandboxId && urlSandboxId !== sandboxId) {
      setSandboxId(urlSandboxId);
    } else if (!urlSandboxId && !sandboxId) {
      navigate('/');
    }
  }, [urlSandboxId, sandboxId, setSandboxId, navigate, stale]);

  useEffect(() => {
    if (sandboxId) {
      refreshFiles().then(success => {
        if (success === false) {
          setStale(true);
          setSandboxId(null);
        } else {
          setStale(false);
        }
      });
    }
  }, [sandboxId, refreshFiles, setSandboxId]);

  if (stale) {
    return (
      <div className="h-screen bg-surface-dim flex flex-col items-center justify-center text-text-muted gap-4">
        <p className="text-xl font-medium">Sandbox not found or expired</p>
        <button 
          onClick={async () => {
            try {
              const data = await start();
              navigate(`/workspace/${data.sandboxId}`);
              setStale(false);
            } catch (e) {
              console.error(e);
            }
          }}
          disabled={isStarting}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 font-medium shadow-[0_0_16px_rgba(139,92,246,0.3)]"
        >
          {isStarting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
          {isStarting ? 'Starting...' : 'Start new sandbox'}
        </button>
      </div>
    );
  }

  if (!sandboxId) return <div className="h-screen bg-surface-dim flex items-center justify-center text-text-muted">Loading Workspace...</div>;

  return (
    <WorkspaceLayout
      chatPanel={<ChatPanel />}
      fileExplorer={<FileExplorer />}
      mainArea={<PreviewCodeTabs />}
      terminalPanel={<TerminalPanel />}
    />
  );
}
