import React, { createContext, useState } from 'react';

export const FileContext = createContext();

export function FileProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [fileContents, setFileContents] = useState({});
  const [openFiles, setOpenFiles] = useState([]); // array of paths
  const [activeFile, setActiveFile] = useState(null); // active path

  return (
    <FileContext.Provider value={{
      files, setFiles,
      fileContents, setFileContents,
      openFiles, setOpenFiles,
      activeFile, setActiveFile
    }}>
      {children}
    </FileContext.Provider>
  );
}
