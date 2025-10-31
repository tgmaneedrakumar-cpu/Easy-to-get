
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';

const AiIcon = () => (
  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
    <span>AI</span>
  </div>
);

const UserIcon = () => (
  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  </div>
);

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hi! I'm Foodie, your AI assistant. How can I help you find something delicious today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    const chatHistory = messages.map(msg => ({
        role: msg.sender === 'ai' ? 'model' as const : 'user' as const,
        parts: [{ text: msg.text }]
    }));

    const aiResponseText = await generateChatResponse(chatHistory, input);
    const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">AI Assistant</h1>
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <AiIcon />}
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'ai' ? 'bg-gray-100 text-gray-800 rounded-tl-none' : 'bg-orange-500 text-white rounded-br-none'}`}>
              <p className="text-sm break-words">{msg.text}</p>
            </div>
            {msg.sender === 'user' && <UserIcon />}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <AiIcon />
            <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none flex items-center">
                <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for a recipe, dish, etc..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 disabled:bg-orange-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" transform="rotate(90 12 12)" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
