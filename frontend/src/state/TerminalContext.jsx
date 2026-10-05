import React, { createContext, useState } from 'react';

export const TerminalContext = createContext();

export function TerminalProvider({ children }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  return (
    <TerminalContext.Provider value={{ isTerminalOpen, setIsTerminalOpen }}>
      {children}
    </TerminalContext.Provider>
  );
}
