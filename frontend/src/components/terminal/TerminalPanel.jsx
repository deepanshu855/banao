import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { useTerminal } from '../../hooks/useTerminal';
import { useSandbox } from '../../hooks/useSandbox';
import { ChevronDown, ChevronUp, Terminal as TerminalIcon } from 'lucide-react';
import 'xterm/css/xterm.css';

export function TerminalPanel() {
  const terminalRef = useRef(null);
  const { isTerminalOpen, setIsTerminalOpen, terminalService } = useTerminal();
  const { sandboxId } = useSandbox();
  const fitAddonRef = useRef(new FitAddon());
  const xtermRef = useRef(null);

  useEffect(() => {
    if (!sandboxId || !terminalRef.current) return;

    if (!xtermRef.current) {
      xtermRef.current = new Terminal({
        theme: {
          background: '#0d0e15',
          foreground: '#e3e1e9',
          cursor: '#8b5cf6',
          selection: '#1e2235'
        },
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12
      });
      xtermRef.current.loadAddon(fitAddonRef.current);
      xtermRef.current.open(terminalRef.current);
      
      terminalService.connect(sandboxId, (data) => {
        xtermRef.current?.write(data);
      });

      xtermRef.current.onData(data => {
        terminalService.write(data);
      });
    }

    const handleResize = () => {
      try {
        fitAddonRef.current.fit();
        if (xtermRef.current) {
          terminalService.resize(xtermRef.current.cols, xtermRef.current.rows);
        }
      } catch (e) {
        // fit() might throw if terminal has no dimensions
      }
    };
    
    setTimeout(handleResize, 50);
    window.addEventListener('resize', handleResize);
    
    const observer = new ResizeObserver(handleResize);
    observer.observe(terminalRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      
      // We do not strictly need to disconnect terminalService here if we want to keep it alive
      // across component re-renders (in StrictMode). However, if the component truly unmounts,
      // it's safe to clean up.
      if (xtermRef.current) {
        xtermRef.current.dispose();
        xtermRef.current = null;
      }
      terminalService.disconnect();
    };
  }, [sandboxId, terminalService]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-10 border-b border-border-subtle flex items-center justify-between px-4 bg-surface shrink-0 cursor-pointer" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
        <div className="flex items-center gap-2 font-medium">
          <TerminalIcon size={14} className="text-text-muted" />
          Terminal
        </div>
        <button className="p-1 hover:bg-surface-overlay rounded text-text-muted hover:text-text-main">
          {isTerminalOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>
      <div className="flex-1 bg-surface p-2 overflow-hidden relative">
        <div ref={terminalRef} className="absolute inset-0 p-2" />
      </div>
    </div>
  );
}
