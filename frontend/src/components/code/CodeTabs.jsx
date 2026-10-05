import React from 'react';
import { useFiles } from '../../hooks/useFiles';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function CodeTabs() {
  const { openFiles, activeFile, openFile, closeFile } = useFiles();

  return (
    <div className="flex items-center bg-surface border-b border-border-subtle h-10 overflow-x-auto shrink-0 scrollbar-hide">
      {openFiles.map(path => {
        const name = path.split('/').pop();
        const isActive = activeFile === path;
        return (
          <div 
            key={path}
            className={cn(
              "flex items-center gap-2 px-3 h-full border-r border-border-subtle cursor-pointer text-xs font-mono group select-none min-w-[100px] max-w-[200px]",
              isActive ? "bg-surface-dim text-primary border-t-2 border-t-primary" : "bg-surface text-text-muted hover:bg-surface-raised border-t-2 border-t-transparent"
            )}
            onClick={() => openFile(path)}
          >
            <span className="truncate flex-1">{name}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeFile(path);
              }}
              className={cn("p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-surface-overlay", isActive && "opacity-100")}
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
