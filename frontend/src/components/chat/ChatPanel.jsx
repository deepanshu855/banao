import React, { useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { useFiles } from '../../hooks/useFiles';
import { Sparkles, StopCircle, Paperclip, Send } from 'lucide-react';
import { ThinkingStream } from './ThinkingStream';
import { cn } from '../../utils/cn';

export function ChatPanel() {
  const { messages, sendMessage, isStreaming, stopStreaming } = useChat();
  const { reloadOpenFiles, refreshFiles } = useFiles();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    sendMessage(input, () => {
      refreshFiles();
      reloadOpenFiles();
    });
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="h-12 border-b border-border-subtle flex items-center px-4 shrink-0">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles size={16} className="text-primary" />
          Banao Assistant
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn(
            "p-3 rounded-lg max-w-[90%] whitespace-pre-wrap break-words",
            msg.role === 'user' ? "bg-surface-raised border border-border-subtle self-end text-text-main" :
            msg.role === 'error' ? "bg-red-500/10 border border-red-500/20 text-red-400 self-start" :
            "bg-primary/10 border border-primary/20 text-text-main self-start"
          )}>
            {msg.content}
          </div>
        ))}
        {isStreaming && <ThinkingStream />}
      </div>

      <div className="p-4 border-t border-border-subtle bg-surface-raised shrink-0">
        <div className="relative flex flex-col gap-2 bg-surface border border-border-subtle rounded-lg p-2 focus-within:border-primary transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe changes or ask anything..."
            className="w-full bg-transparent text-text-main outline-none resize-none min-h-[80px]"
            disabled={isStreaming}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button className="p-1.5 text-text-muted hover:text-text-main rounded"><Paperclip size={16} /></button>
            </div>
            {isStreaming ? (
              <button onClick={stopStreaming} className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded flex items-center gap-1 px-3">
                <StopCircle size={16} /> Stop
              </button>
            ) : (
              <button onClick={handleSend} disabled={!input.trim()} className="p-1.5 bg-primary text-white rounded hover:bg-opacity-90 disabled:opacity-50 flex items-center gap-1 px-3">
                <Send size={16} /> Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
