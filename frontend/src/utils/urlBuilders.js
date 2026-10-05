import { AGENT_HOST_TEMPLATE, PREVIEW_HOST_TEMPLATE } from './constants';

export function getAgentBaseUrl(sandboxId) {
  if (!sandboxId || sandboxId === 'undefined' || sandboxId === 'null') {
    throw new Error("sandboxId is missing");
  }
  return AGENT_HOST_TEMPLATE.replace('__SANDBOX_ID__', sandboxId);
}

export function getPreviewUrl(sandboxId) {
  if (!sandboxId || sandboxId === 'undefined' || sandboxId === 'null') {
    throw new Error("sandboxId is missing");
  }
  return PREVIEW_HOST_TEMPLATE.replace('__SANDBOX_ID__', sandboxId);
}
