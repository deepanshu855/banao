import React from 'react';
import { Link } from 'react-router-dom';
import { useTerminal } from '../../hooks/useTerminal';
import { useResizable } from '../../hooks/useResizable';
import BanaoLogo from '../BanaoLogo';
import { ArrowLeft, Terminal, Sparkles, FolderTree } from 'lucide-react';

export function WorkspaceLayout({ chatPanel, fileExplorer, mainArea, terminalPanel }) {
  const { isTerminalOpen, toggleTerminal } = useTerminal();
  const explorerSize = useResizable(260, 160, 420);
  const chatSize = useResizable(380, 260, 650);
  const terminalSize = useResizable(220, 100, 600);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#090a0f] overflow-hidden text-sm text-[#e3e1e9]">
      {/* Top Workspace Header Bar */}
      <header className="h-11 px-4 bg-[#0d0e15] border-b border-[#272c3f] flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-4">
          <Link
            to="/projects"
            className="flex items-center gap-1.5 text-xs text-[#94a3b8] hover:text-white px-2.5 py-1 rounded-lg hover:bg-[#141724] border border-transparent hover:border-[#272c3f] transition-all"
            title="Return to Projects Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-medium">Projects</span>
          </Link>

          <div className="h-4 w-[1px] bg-[#272c3f]" />

          <BanaoLogo size="sm" />
        </div>

        {/* Center Environment Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#141724] border border-[#272c3f] text-xs font-mono text-[#94a3b8]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Container Sandbox Active</span>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTerminal}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
              isTerminalOpen
                ? 'bg-[#8b5cf6]/20 border-[#8b5cf6]/50 text-white'
                : 'bg-[#141724] border-[#272c3f] text-[#94a3b8] hover:text-white hover:border-[#323850]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>
        </div>
      </header>

      {/* 3-Column Workspace Grid: Files (Left) | Preview/Code/Terminal (Center) | AI Chat (Right) */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. File Explorer (Left) */}
        <div
          style={{ width: explorerSize.size }}
          className="flex-shrink-0 border-r border-[#272c3f] bg-[#0d0e15] flex flex-col overflow-hidden"
        >
          {fileExplorer}
        </div>

        {/* Left Resizer (Files <-> Main Area) */}
        <div
          className="w-1 cursor-col-resize hover:bg-[#8b5cf6]/50 active:bg-[#8b5cf6] transition-colors flex-shrink-0 bg-transparent hover:w-1"
          onMouseDown={(e) => explorerSize.startResizing(e, 'horizontal')}
          title="Drag to resize file explorer"
        />

        {/* 2. Main Area: Preview / Code / Terminal (Center) */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#090a0f] overflow-hidden">
          <div className="flex-1 overflow-hidden">
            {mainArea}
          </div>

          {/* Bottom Terminal Panel */}
          {isTerminalOpen && (
            <div
              className="h-1 cursor-row-resize hover:bg-[#8b5cf6]/50 active:bg-[#8b5cf6] transition-colors flex-shrink-0"
              onMouseDown={(e) => terminalSize.startResizing(e, 'vertical-reverse')}
              title="Drag to resize terminal"
            />
          )}
          <div
            style={{ height: isTerminalOpen ? terminalSize.size : 40 }}
            className="flex-shrink-0 border-t border-[#272c3f] bg-[#141724] flex flex-col transition-all duration-200 overflow-hidden"
          >
            {terminalPanel}
          </div>
        </div>

        {/* Right Resizer (Main Area <-> AI Chat) */}
        <div
          className="w-1 cursor-col-resize hover:bg-[#8b5cf6]/50 active:bg-[#8b5cf6] transition-colors flex-shrink-0 bg-transparent hover:w-1"
          onMouseDown={(e) => chatSize.startResizing(e, 'horizontal-reverse')}
          title="Drag to resize AI chat"
        />

        {/* 3. AI Chat Panel (Right) */}
        <div
          style={{ width: chatSize.size }}
          className="flex-shrink-0 border-l border-[#272c3f] bg-[#0d0e15] flex flex-col overflow-hidden"
        >
          {chatPanel}
        </div>
      </div>
    </div>
  );
}

