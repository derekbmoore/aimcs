import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react';
import azureRealtimeService from '../services/azureRealtimeService';

const RealtimeVoiceChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Ready to connect');
  
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioStreamRef = useRef(null);
  const websocketRef = useRef(null);

  // Initialize audio context and get microphone stream
  const initializeAudio = async () => {
    try {
      setError(null);
      setStatus('Initializing audio...');
      
      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
          channelCount: 1
        }
      });
      
      audioStreamRef.current = stream;
      audioContextRef.current = new AudioContext();
      
      setStatus('Audio initialized');
      return stream;
    } catch (err) {
      setError('Failed to access microphone: ' + err.message);
      setStatus('Audio initialization failed');
      throw err;
    }
  };

  // Connect to Azure OpenAI Realtime API
  const connectToRealtimeAPI = async () => {
    try {
      setStatus('Connecting to Azure OpenAI...');
      
      // Initialize real-time session
      const session = await azureRealtimeService.initializeRealtimeSession();
      
      // In a real implementation, this would establish a WebSocket connection
      // For now, we'll simulate the connection
      websocketRef.current = {
        sessionId: session.sessionId,
        send: (data) => console.log('Sending to realtime API:', data),
        close: () => console.log('Closing realtime connection')
      };
      
      setIsConnected(true);
      setStatus('Connected to Azure OpenAI Realtime API');
      
    } catch (error) {
      setError('Failed to connect to Azure OpenAI: ' + error.message);
      setStatus('Connection failed');
      throw error;
    }
  };

  // Start real-time conversation
  const startConversation = async () => {
    try {
      if (!isConnected) {
        await connectToRealtimeAPI();
      }
      
      const stream = await initializeAudio();
      
      // Create a MediaRecorder for the audio stream
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      // Handle audio data
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && websocketRef.current) {
          // Send audio chunk to real-time API
          await azureRealtimeService.sendAudioChunk(
            websocketRef.current.sessionId, 
            event.data
          );
        }
      };
      
      // Start recording in small chunks for real-time processing
      mediaRecorder.start(100); // 100ms chunks
      setIsListening(true);
      setStatus('Listening... Speak now!');
      
    } catch (error) {
      setError('Failed to start conversation: ' + error.message);
      setStatus('Failed to start');
    }
  };

  // Stop conversation
  const stopConversation = () => {
    try {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null;
      }
      
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
        audioStreamRef.current = null;
      }
      
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
      
      setIsListening(false);
      setIsConnected(false);
      setStatus('Conversation ended');
      
    } catch (error) {
      console.error('Error stopping conversation:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopConversation();
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Real-time Voice Chat
        </h2>
        <p className="text-gray-600">
          Direct voice conversation with GPT-4o-mini-realtime-preview
        </p>
      </div>

      {/* Status Display */}
      <div className="text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          isConnected 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isConnected ? 'bg-green-500' : 'bg-gray-500'
          }`} />
          {status}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Main Control Button */}
      <div className="relative">
        <button
          onClick={isListening ? stopConversation : startConversation}
          disabled={!isConnected && isListening}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200
            ${isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-blue-500 hover:bg-blue-600'
            }
            text-white shadow-lg hover:shadow-xl disabled:opacity-50
          `}
        >
          {isListening ? (
            <PhoneOff className="w-8 h-8" />
          ) : (
            <Phone className="w-8 h-8" />
          )}
        </button>
        
        {/* Listening indicator */}
        {isListening && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600 max-w-md">
        {!isListening ? (
          <p>Click the phone button to start a real-time voice conversation with the AI</p>
        ) : (
          <p>Speaking... The AI will respond in real-time</p>
        )}
      </div>

      {/* Audio Level Indicator (placeholder) */}
      {isListening && (
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-gray-500" />
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RealtimeVoiceChat; 