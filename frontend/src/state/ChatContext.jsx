import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentSteps, setCurrentSteps] = useState([]);
  
  const addMessage = (msg) => setMessages(prev => [...prev, msg]);
  
  return (
    <ChatContext.Provider value={{
      messages, setMessages, addMessage,
      isStreaming, setIsStreaming,
      currentSteps, setCurrentSteps
    }}>
      {children}
    </ChatContext.Provider>
  );
}
