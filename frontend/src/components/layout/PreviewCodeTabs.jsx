import React, { useState } from 'react';
import { Eye, Code2 } from 'lucide-react';
import { PreviewFrame } from '../preview/PreviewFrame';
import { CodeTabs } from '../code/CodeTabs';
import { CodeViewer } from '../code/CodeViewer';
import { useFiles } from '../../hooks/useFiles';
import { cn } from '../../utils/cn';

export function PreviewCodeTabs() {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code'
  const { activeFile } = useFiles();

  return (
    <div className="h-full flex flex-col bg-surface-dim">
      <div className="flex items-center h-12 px-4 border-b border-border-subtle bg-surface-raised shrink-0">
        <div className="flex gap-4 h-full">
          <button 
            className={cn(
              "flex items-center gap-2 h-full px-2 border-b-2 transition-colors",
              activeTab === 'preview' ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-main"
            )}
            onClick={() => setActiveTab('preview')}
          >
            <Eye size={16} /> Preview
          </button>
          <button 
            className={cn(
              "flex items-center gap-2 h-full px-2 border-b-2 transition-colors",
              activeTab === 'code' ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-main"
            )}
            onClick={() => setActiveTab('code')}
          >
            <Code2 size={16} /> Code
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <div className={cn("absolute inset-0", activeTab === 'preview' ? "z-10" : "z-0 opacity-0 pointer-events-none")}>
          <PreviewFrame />
        </div>
        <div className={cn("absolute inset-0 flex flex-col", activeTab === 'code' ? "z-10" : "z-0 opacity-0 pointer-events-none")}>
          <CodeTabs />
          <div className="flex-1 overflow-hidden">
            {activeFile ? <CodeViewer /> : <div className="h-full flex items-center justify-center text-text-muted">Select a file to view</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
