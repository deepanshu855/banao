import React, { useMemo } from 'react';
import { useFiles } from '../../hooks/useFiles';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { getLanguage } from '../../utils/getLanguage';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export function CodeViewer() {
  const { activeFile, fileContents } = useFiles();
  const [isCopied, copy] = useCopyToClipboard();

  const content = fileContents[activeFile] || '';
  const language = getLanguage(activeFile);

  const isBinary = ['png', 'jpg', 'jpeg', 'svg', 'ico', 'webp'].includes(activeFile?.split('.').pop()?.toLowerCase());

  const handleCopy = () => {
    copy(content);
  };

  const memoizedHighlighter = useMemo(() => {
    return (
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '13px', minHeight: '100%' }}
        showLineNumbers
        wrapLines
      >
        {content}
      </SyntaxHighlighter>
    );
  }, [content, language]);

  if (!activeFile) return null;

  if (isBinary) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-text-muted">
        <div className="mb-4">Image/Binary file</div>
        <div>{activeFile}</div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-surface-dim overflow-auto">
      <button 
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 bg-surface-raised border border-border-subtle rounded-md hover:bg-surface-overlay transition-colors z-10 text-text-muted flex items-center justify-center"
        title="Copy code"
      >
        {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
      {memoizedHighlighter}
    </div>
  );
}
