import { fetchEventSource } from '@microsoft/fetch-event-source';
import { API_BASE_URL } from '../utils/constants';

/**
 * Invokes AI via SSE streaming
 * @param {string} message 
 * @param {string} projectId 
 * @param {Object} callbacks - { onStep(step), onDone(), onError(error) }
 * @param {AbortController} abortController 
 */
export function invokeAI(message, projectId, callbacks, abortController) {
  if (!projectId) throw new Error("sandboxId is missing");
  let isDone = false;

  fetchEventSource(`${API_BASE_URL}/api/ai/invoke`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, projectID: projectId }),
    signal: abortController.signal,
    async onopen(response) {
      if (response.ok && response.headers.get('content-type')?.includes('text/event-stream')) {
        return; // everything's good
      } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw new Error('Client error');
      }
    },
    onmessage(msg) {
      if (msg.event === 'done') {
        abortController.abort(); // Prevent fetchEventSource from retrying
        if (!isDone) {
          isDone = true;
          callbacks.onDone();
        }
        return;
      }
      
      const text = msg.data;
      if (!text) return;
      
      let type = 'generic';
      let content = text;
      
      if (text.startsWith('Files listed successfully.')) {
        type = 'listed';
      } else if (text.startsWith('Reading files in project directory...')) {
        type = 'reading';
      } else if (text.startsWith('Files read successfully.')) {
        type = 'read_success';
      } else if (text.startsWith('Updating files...')) {
        type = 'updating';
      } else if (text.startsWith('Files updated successfully.')) {
        type = 'update_success';
      }
      
      callbacks.onStep({ type, message: content, raw: text });
    },
    onclose() {
      if (!isDone) {
        isDone = true;
        callbacks.onDone();
      }
    },
    onerror(err) {
      callbacks.onError(err);
      throw err; // throw to stop retrying
    }
  });
}
