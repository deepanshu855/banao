import { useContext, useState } from 'react';
import { SandboxContext } from '../state/SandboxContext';
import { startSandbox as apiStartSandbox } from '../services/sandboxService';

export function useSandbox() {
  const { sandboxId, setSandboxId, previewUrl, setPreviewUrl } = useContext(SandboxContext);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState(null);

  const start = async () => {
    setIsStarting(true);
    setError(null);
    try {
      const data = await apiStartSandbox();
      setSandboxId(data.sandboxId);
      if (setPreviewUrl) setPreviewUrl(data.previewUrl);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to start sandbox');
      throw err;
    } finally {
      setIsStarting(false);
    }
  };

  return { sandboxId, setSandboxId, previewUrl, setPreviewUrl, isStarting, error, start };
}
