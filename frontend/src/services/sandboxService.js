import axiosClient from './axiosClient';

/**
 * Starts a new sandbox instance for a project
 * @param {string} projectId - The ID of the project
 * @returns {Promise<{message: string, sandboxId: string, previewUrl: string}>}
 */
export async function startSandbox(projectId) {
  const response = await axiosClient.post('/api/sandbox/start', { projectId });
  const data = response.data;
  if (!data.sandboxId || !data.previewUrl) {
    throw new Error('Invalid response from start API: missing sandboxId or previewUrl');
  }
  return data;
}

/**
 * Creates a new project
 * @param {string} title - The title of the project
 * @returns {Promise<{message: string, project: any}>}
 */
export async function createProject(title) {
  const response = await axiosClient.post('/api/sandbox/project', { title });
  return response.data;
}

/**
 * Retrieves all projects for the current user
 * @returns {Promise<{message: string, projects: any[]}>}
 */
export async function getProjects() {
  const response = await axiosClient.get('/api/sandbox/projects');
  return response.data;
}
