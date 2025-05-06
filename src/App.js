import React from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenRouter AI Chatbot</h1>
      </header>
      <main className="App-main">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;
