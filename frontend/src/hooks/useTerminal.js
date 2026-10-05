import { useContext, useEffect, useRef } from 'react';
import { TerminalContext } from '../state/TerminalContext';
import { SandboxContext } from '../state/SandboxContext';
import { terminalService } from '../services/terminalService';

export function useTerminal() {
  const { isTerminalOpen, setIsTerminalOpen } = useContext(TerminalContext);
  const { sandboxId } = useContext(SandboxContext);
  const isConnected = useRef(false);

  useEffect(() => {
    if (isTerminalOpen && sandboxId && !isConnected.current) {
      // connecting is typically done in the TerminalPanel directly to handle DOM ref
    }
  }, [isTerminalOpen, sandboxId]);

  return { isTerminalOpen, setIsTerminalOpen, terminalService };
}
