import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';
import openRouterService from '../services/openRouterService';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('qwen/qwen1.5-4b-chat');
  const [apiKeyError, setApiKeyError] = useState(false);
  const messagesEndRef = useRef(null);

  // Available models
  const models = [
    { id: 'qwen/qwen1.5-4b-chat', name: 'Qwen3 4B (Free)' },
    { id: 'meta-llama/llama-4-maverick', name: 'Llama 4 Maverick (Free)' }
  ];

  // Check API key on component mount
  useEffect(() => {
    const apiKey = "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";
    if (!apiKey || apiKey === 'your_api_key_here') {
      setApiKeyError(true);
    }
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearChat = () => {
    setMessages([]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage = {
      role: 'user',
      content: input,
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await openRouterService.sendChatMessage([...messages, userMessage], selectedModel);
      
      if (response.choices && response.choices.length > 0) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            role: 'assistant',
            content: response.choices[0].message.content,
          }
        ]);
      }
    } catch (error) {
      console.error('Error communicating with OpenRouter:', error);
      
      let errorMessage = 'Sorry, I encountered an error. ';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          errorMessage += 'Please check your API key and make sure it is valid.';
          setApiKeyError(true);
        } else if (error.response.status === 429) {
          errorMessage += 'Rate limit exceeded. Please try again later.';
        } else {
          errorMessage += `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage += 'No response from server. Please check your internet connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage += error.message;
      }
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: errorMessage,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (apiKeyError) {
    return (
      <div className="error-container">
        <h2>API Key Error</h2>
        <p>Please set up your OpenRouter API key:</p>
        <ol>
          <li>Sign up at <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer">OpenRouter</a></li>
          <li>Get your API key from the dashboard</li>
          <li>Create a <code>.env</code> file in the project root</li>
          <li>Add this line to the file:
            <pre>REACT_APP_OPENROUTER_API_KEY=your_api_key_here</pre>
          </li>
          <li>Replace <code>your_api_key_here</code> with your actual API key</li>
          <li>Restart the development server</li>
        </ol>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="model-selector">
          <label htmlFor="model-select">Model: </label>
          <select 
            id="model-select" 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={isLoading}
          >
            {models.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>
        {messages.length > 0 && (
          <button 
            className="clear-chat-button"
            onClick={clearChat}
            disabled={isLoading}
          >
            Clear Chat
          </button>
        )}
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to the OpenRouter AI Chatbot</h2>
            <p>Start a conversation by sending a message below.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
            >
              <div className="message-content">{message.content}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || input.trim() === ''}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface; 