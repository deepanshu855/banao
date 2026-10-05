import { useContext, useRef } from 'react';
import { ChatContext } from '../state/ChatContext';
import { SandboxContext } from '../state/SandboxContext';
import { invokeAI } from '../services/aiService';

export function useChat() {
  const { messages, addMessage, isStreaming, setIsStreaming, currentSteps, setCurrentSteps } = useContext(ChatContext);
  const { sandboxId } = useContext(SandboxContext);
  const abortControllerRef = useRef(null);

  const sendMessage = (text, onFilesUpdated) => {
    if (!text.trim() || !sandboxId) return;

    const userMsg = { role: 'user', content: text, id: Date.now() };
    addMessage(userMsg);
    
    setIsStreaming(true);
    setCurrentSteps([]);
    abortControllerRef.current = new AbortController();

    invokeAI(
      text, 
      sandboxId, 
      {
        onStep: (step) => {
          setCurrentSteps(prev => [...prev, step]);
          if (step.type === 'update_success' && onFilesUpdated) {
            onFilesUpdated();
          }
        },
        onDone: () => {
          setIsStreaming(false);
          addMessage({ role: 'assistant', content: 'Finished processing.', id: Date.now() + 1 });
        },
        onError: (err) => {
          setIsStreaming(false);
          addMessage({ role: 'error', content: err.message, id: Date.now() + 2 });
        }
      },
      abortControllerRef.current
    );
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  return { messages, sendMessage, isStreaming, currentSteps, stopStreaming };
}
