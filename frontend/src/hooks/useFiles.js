import { useContext, useCallback } from 'react';
import { FileContext } from '../state/FileContext';
import { SandboxContext } from '../state/SandboxContext';
import { listFiles, readFiles } from '../services/fileService';
import { buildFileTree } from '../utils/buildFileTree';

export function useFiles() {
  const { files, setFiles, fileContents, setFileContents, openFiles, setOpenFiles, activeFile, setActiveFile } = useContext(FileContext);
  const { sandboxId } = useContext(SandboxContext);

  const refreshFiles = useCallback(async () => {
    if (!sandboxId) return false;
    try {
      const paths = await listFiles(sandboxId);
      const tree = buildFileTree(paths);
      setFiles(tree);
      return true;
    } catch (err) {
      console.error('Failed to list files', err);
      return false;
    }
  }, [sandboxId, setFiles]);

  const loadFile = useCallback(async (path) => {
    if (!sandboxId) return;
    try {
      const result = await readFiles(sandboxId, [path]);
      if (result[path] !== undefined) {
        setFileContents(prev => ({ ...prev, [path]: result[path] }));
      }
    } catch (err) {
      console.error('Failed to read file', err);
    }
  }, [sandboxId, setFileContents]);

  const openFile = useCallback(async (path) => {
    if (!openFiles.includes(path)) {
      setOpenFiles(prev => [...prev, path]);
    }
    setActiveFile(path);
    if (fileContents[path] === undefined) {
      await loadFile(path);
    }
  }, [openFiles, fileContents, loadFile, setActiveFile, setOpenFiles]);

  const closeFile = useCallback((path) => {
    setOpenFiles(prev => prev.filter(p => p !== path));
    if (activeFile === path) {
      setActiveFile(openFiles.length > 1 ? openFiles[0] : null);
    }
  }, [activeFile, openFiles, setActiveFile, setOpenFiles]);
  
  const reloadOpenFiles = useCallback(async () => {
    if (!sandboxId || openFiles.length === 0) return;
    try {
      const result = await readFiles(sandboxId, openFiles);
      setFileContents(prev => ({ ...prev, ...result }));
    } catch (err) {
      console.error('Failed to reload open files', err);
    }
  }, [sandboxId, openFiles, setFileContents]);

  return {
    files, refreshFiles,
    fileContents, loadFile,
    openFiles, openFile, closeFile,
    activeFile, setActiveFile, reloadOpenFiles
  };
}
