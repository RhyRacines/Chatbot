# OpenRouter AI Chatbot

A React application that allows you to chat with various AI models using the OpenRouter API.

## Features

- Chat with different AI models (Qwen3 4B, Llama 4 Maverick)
- Simple and responsive user interface
- Real-time chat experience

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm or yarn
- OpenRouter API key (sign up at [OpenRouter](https://openrouter.ai/))

### Installation

1. Clone this repository:
   ```
   git clone <your-repo-url>
   cd chatbot-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   cp .env.example .env
   ```

4. Add your OpenRouter API key to the `.env` file:
   ```
   REACT_APP_OPENROUTER_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Using the Chatbot

1. Select an AI model from the dropdown menu.
2. Type your message in the input field.
3. Press the send button or hit Enter to send your message.
4. Wait for the AI to respond.

## Available Models

The chatbot supports the following free models:
- Qwen3 4B - A lightweight but capable model from Alibaba Cloud
- Llama 4 Maverick - Meta's latest open-source model

## Customization

You can customize the application by:
- Adding more models to the list in `ChatInterface.js`
- Modifying the UI/UX in the CSS files
- Adding additional functionality like chat history, session management, etc.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenRouter](https://openrouter.ai/) for providing access to various AI models
- [React](https://reactjs.org/) for the frontend framework
