import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { SandboxProvider } from './SandboxContext';
import { ChatProvider } from './ChatContext';
import { FileProvider } from './FileContext';
import { TerminalProvider } from './TerminalContext';

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <SandboxProvider>
        <FileProvider>
          <ChatProvider>
            <TerminalProvider>
              {children}
            </TerminalProvider>
          </ChatProvider>
        </FileProvider>
      </SandboxProvider>
    </AuthProvider>
  );
}

