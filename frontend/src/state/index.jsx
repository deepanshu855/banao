import React from 'react';
import { SandboxProvider } from './SandboxContext';
import { ChatProvider } from './ChatContext';
import { FileProvider } from './FileContext';
import { TerminalProvider } from './TerminalContext';

export function AppProviders({ children }) {
  return (
    <SandboxProvider>
      <FileProvider>
        <ChatProvider>
          <TerminalProvider>
            {children}
          </TerminalProvider>
        </ChatProvider>
      </FileProvider>
    </SandboxProvider>
  );
}
