import axios from 'axios';
import { getAgentBaseUrl } from '../utils/urlBuilders';

/**
 * Lists files in the sandbox
 * @param {string} sandboxId 
 * @returns {Promise<string[]>}
 */
export async function listFiles(sandboxId) {
  if (!sandboxId) throw new Error("sandboxId is missing");
  const url = getAgentBaseUrl(sandboxId) + '/list-files';
  const response = await axios.get(url);
  return response.data.files || [];
}

/**
 * Reads contents of specified files
 * @param {string} sandboxId 
 * @param {string[]} paths 
 * @returns {Promise<Object<string, string>>}
 */
export async function readFiles(sandboxId, paths) {
  if (!sandboxId) throw new Error("sandboxId is missing");
  if (!paths || paths.length === 0) return {};
  const url = getAgentBaseUrl(sandboxId) + '/read-files';
  const response = await axios.get(url, { params: { files: paths.join(',') } });
  
  const fileArray = response.data.files || [];
  const result = {};
  fileArray.forEach(fileObj => {
    Object.keys(fileObj).forEach(key => {
      const normalizedKey = key.startsWith('/') ? key.substring(1) : key;
      result[normalizedKey] = fileObj[key];
    });
  });
  return result;
}

// export async function uploadFiles(sandboxId, updates) {
//   // STUB for later
// }
