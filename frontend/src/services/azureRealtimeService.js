import OpenAI from 'openai';

// Configuration - these should be moved to environment variables
const AZURE_OPENAI_ENDPOINT = process.env.VITE_AZURE_OPENAI_ENDPOINT || 'https://aimcs-resource.cognitiveservices.azure.com';
const AZURE_OPENAI_API_KEY = process.env.VITE_AZURE_OPENAI_API_KEY || 'your-api-key';
const AZURE_OPENAI_DEPLOYMENT = process.env.VITE_AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini-realtime-preview';

class AzureRealtimeService {
  constructor() {
    this.client = new OpenAI({
      apiKey: AZURE_OPENAI_API_KEY,
      baseURL: `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}`,
      defaultQuery: { 'api-version': '2024-10-01-preview' },
      defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY }
    });
    this.deployment = AZURE_OPENAI_DEPLOYMENT;
  }

  // Initialize real-time audio session
  async initializeRealtimeSession() {
    try {
      // This would use the Realtime API to establish a WebSocket connection
      // The exact implementation depends on the specific Realtime API endpoints
      
      const response = await fetch(`${AZURE_OPENAI_ENDPOINT}/openai/realtime?api-version=2024-10-01-preview&deployment=${this.deployment}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_OPENAI_API_KEY,
        },
        body: JSON.stringify({
          // Realtime API configuration
          audio_format: 'webm',
          sample_rate: 16000,
          channels: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to initialize realtime session: ${response.statusText}`);
      }

      const sessionData = await response.json();
      return sessionData;
    } catch (error) {
      console.error('Error initializing realtime session:', error);
      throw error;
    }
  }

  // Start real-time audio conversation
  async startRealtimeConversation(audioStream, onAudioReceived, onError) {
    try {
      // This is a placeholder for the actual Realtime API implementation
      // The real implementation would establish a WebSocket connection and handle bidirectional audio streaming
      
      console.log('Starting real-time conversation...');
      
      // For now, we'll implement a basic version that processes audio chunks
      // In the actual implementation, this would use WebSocket or WebRTC for real-time streaming
      
      const session = await this.initializeRealtimeSession();
      
      // Process audio stream in real-time
      const reader = audioStream.getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Send audio chunk to Azure OpenAI Realtime API
        await this.sendAudioChunk(session.sessionId, value);
      }
      
    } catch (error) {
      console.error('Error in realtime conversation:', error);
      onError?.(error);
    }
  }

  // Send audio chunk to the real-time API
  async sendAudioChunk(sessionId, audioChunk) {
    try {
      // This would send the audio chunk via WebSocket or the appropriate real-time protocol
      console.log('Sending audio chunk:', audioChunk.length, 'bytes');
      
      // Placeholder for actual implementation
      // In reality, this would be a WebSocket message or similar
      
    } catch (error) {
      console.error('Error sending audio chunk:', error);
      throw error;
    }
  }

  // Fallback to text-based conversation for now
  async sendTextMessage(message, conversationHistory = []) {
    try {
      const messages = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Respond concisely and helpfully.'
        },
        ...conversationHistory,
        {
          role: 'user',
          content: message
        }
      ];

      const response = await this.client.chat.completions.create({
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Azure OpenAI API error:', error);
      throw new Error('Failed to get response from AI');
    }
  }
}

export default new AzureRealtimeService(); 