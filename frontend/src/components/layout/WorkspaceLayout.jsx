import React from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import { useResizable } from '../../hooks/useResizable';

export function WorkspaceLayout({ chatPanel, fileExplorer, mainArea, terminalPanel }) {
  const { isTerminalOpen } = useTerminal();
  const chatSize = useResizable(380, 200, 600);
  const explorerSize = useResizable(240, 150, 400);
  const terminalSize = useResizable(200, 100, 600);

  return (
    <div className="h-screen w-screen flex flex-col bg-surface-dim overflow-hidden text-sm">
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel */}
        <div style={{ width: chatSize.size }} className="flex-shrink-0 border-r border-border-subtle bg-surface flex flex-col">
          {chatPanel}
        </div>
        
        {/* Resizer */}
        <div 
          className="w-1 cursor-col-resize hover:bg-primary/50 active:bg-primary transition-colors flex-shrink-0"
          onMouseDown={(e) => chatSize.startResizing(e, 'horizontal')}
        />

        {/* File Explorer */}
        <div style={{ width: explorerSize.size }} className="flex-shrink-0 border-r border-border-subtle bg-surface flex flex-col">
          {fileExplorer}
        </div>

        {/* Resizer */}
        <div 
          className="w-1 cursor-col-resize hover:bg-primary/50 active:bg-primary transition-colors flex-shrink-0"
          onMouseDown={(e) => explorerSize.startResizing(e, 'horizontal')}
        />

        {/* Main Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-surface-dim">
          <div className="flex-1 overflow-hidden">
            {mainArea}
          </div>

          {/* Terminal */}
          {isTerminalOpen && (
            <>
              {/* Vertical Resizer */}
              <div 
                className="h-1 cursor-row-resize hover:bg-primary/50 active:bg-primary transition-colors flex-shrink-0"
                onMouseDown={(e) => terminalSize.startResizing(e, 'vertical')}
              />
              <div style={{ height: terminalSize.size }} className="flex-shrink-0 border-t border-border-subtle bg-surface-raised flex flex-col">
                {terminalPanel}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
