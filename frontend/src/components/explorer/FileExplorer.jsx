import React, { useState } from 'react';
import { useFiles } from '../../hooks/useFiles';
import {
  Folder, FolderOpen, FileText, FileCode2, FileJson, Image,
  ChevronRight, ChevronDown, RefreshCw, Loader2,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const getFileIcon = (filename) => {
  if (!filename) return <FileText size={16} />;
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'js': case 'jsx': case 'ts': case 'tsx':
      return <FileCode2 size={16} className="text-secondary" />;
    case 'json':
      return <FileJson size={16} className="text-yellow-500" />;
    case 'css':
      return <FileCode2 size={16} className="text-blue-400" />;
    case 'html':
      return <FileCode2 size={16} className="text-orange-500" />;
    case 'png': case 'svg': case 'jpg': case 'jpeg': case 'ico':
      return <Image size={16} className="text-purple-400" />;
    default:
      return <FileText size={16} className="text-text-muted" />;
  }
};

const FileTreeNode = ({ node, level = 0 }) => {
  const { openFile, activeFile } = useFiles();
  const [isOpen, setIsOpen] = useState(level === 0 || level === 1);
  const isDir = node.type === 'directory';

  const handleClick = () => {
    if (isDir) setIsOpen(!isOpen);
    else openFile(node.path);
  };

  const isActive = !isDir && activeFile === node.path;

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1.5 py-1 px-2 cursor-pointer hover:bg-surface-overlay transition-colors select-none',
          isActive && 'bg-primary/10 text-primary border-l-2 border-primary',
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        <div className="w-4 flex items-center justify-center shrink-0">
          {isDir
            ? isOpen
              ? <ChevronDown size={14} className="text-text-muted" />
              : <ChevronRight size={14} className="text-text-muted" />
            : null}
        </div>
        {isDir
          ? isOpen
            ? <FolderOpen size={16} className="text-primary" />
            : <Folder size={16} className="text-primary" />
          : getFileIcon(node.name)}
        <span className={cn('truncate', isActive ? 'font-medium' : 'text-text-main')}>{node.name}</span>
      </div>

      {isDir && isOpen && node.children && (
        <div>
          {node.children.map((child, i) => (
            <FileTreeNode key={child.path || child.name + i} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * FileExplorer
 * - podReady=false  → show "Initialising sandbox…" loading state
 * - podReady=true   → show file tree (or "No files" if empty)
 */
export function FileExplorer({ podReady = false }) {
  const { files, refreshFiles } = useFiles();

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="h-12 border-b border-border-subtle flex items-center justify-between px-4 shrink-0 font-medium">
        <span>Files</span>
        <button
          onClick={refreshFiles}
          disabled={!podReady}
          className="p-1 hover:bg-surface-overlay rounded text-text-muted hover:text-text-main disabled:opacity-40 disabled:cursor-not-allowed"
          title="Refresh file tree"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto py-2 font-mono text-xs">
        {!podReady ? (
          /* ── Pod still initialising ── */
          <div className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center py-10">
            <Loader2 size={18} className="animate-spin text-primary opacity-70" />
            <span className="text-text-muted text-[11px] leading-relaxed">
              Initialising sandbox…<br />
              <span className="opacity-60">Files will appear shortly</span>
            </span>
          </div>
        ) : files.length === 0 ? (
          <div className="px-4 text-text-muted">No files</div>
        ) : (
          files.map((node, i) => (
            <FileTreeNode key={node.path || node.name + i} node={node} />
          ))
        )}
      </div>
    </div>
  );
}
