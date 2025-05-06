import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

let apiKey = null;

export const openRouterService = {
  setApiKey: (key) => {
    apiKey = key;
  },

  /**
   * Send a chat message to the OpenRouter API
   * @param {Array} messages - Array of message objects with role and content
   * @param {string} model - Model identifier
   * @returns {Promise} - Response from OpenRouter API
   */
  sendChatMessage: async (messages, model = 'openai/gpt-3.5-turbo') => {
    if (!apiKey) {
      throw new Error('API key not set');
    }

    try {
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model,
          messages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error in OpenRouter API call:', error);
      throw error;
    }
  },
};

export default openRouterService; 