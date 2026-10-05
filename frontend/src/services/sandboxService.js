import axiosClient from './axiosClient';

/**
 * Starts a new sandbox instance
 * @returns {Promise<{message: string, sandboxId: string, previewUrl: string}>}
 */
export async function startSandbox() {
  const response = await axiosClient.post('/api/sandbox/start');
  const data = response.data;
  if (!data.sandboxId || !data.previewUrl) {
    throw new Error('Invalid response from start API: missing sandboxId or previewUrl');
  }
  return data;
}
