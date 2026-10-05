import React, { createContext, useState, useEffect } from 'react';
import { getPreviewUrl } from '../utils/urlBuilders';

export const SandboxContext = createContext();

export function SandboxProvider({ children }) {
  const [sandboxId, setSandboxId] = useState(() => {
    const saved = localStorage.getItem('banao_sandboxId');
    if (!saved || saved === 'undefined' || saved === 'null' || saved.trim() === '') return null;
    return saved;
  });
  const [previewUrl, setPreviewUrl] = useState(() => {
    const saved = localStorage.getItem('banao_previewUrl');
    if (!saved || saved === 'undefined' || saved === 'null' || saved.trim() === '') return null;
    return saved;
  });

  useEffect(() => {
    console.debug("[sandbox]", { sandboxId, previewUrl });
    if (sandboxId) {
      localStorage.setItem('banao_sandboxId', sandboxId);
      try {
        const url = getPreviewUrl(sandboxId);
        setPreviewUrl(url);
        localStorage.setItem('banao_previewUrl', url);
      } catch (err) {
        // Handle error silently or log
      }
    } else {
      localStorage.removeItem('banao_sandboxId');
      localStorage.removeItem('banao_previewUrl');
      setPreviewUrl(null);
    }
  }, [sandboxId]);

  return (
    <SandboxContext.Provider value={{ sandboxId, setSandboxId, previewUrl, setPreviewUrl }}>
      {children}
    </SandboxContext.Provider>
  );
}
