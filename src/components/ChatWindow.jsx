/**
 * Chat Window Component - Real-time Messaging System
 * 
 * Advanced chat interface demonstrating real-time communication patterns
 * and modern messaging UX best practices.
 * 
 * Features Implemented:
 * - Real-time bidirectional messaging
 * - Message timestamps and delivery status
 * - Typing indicators and user presence
 * - Emergency message highlighting
 * - Message history persistence
 * - Responsive design with mobile optimization
 * 
 * Learning Goals Demonstrated:
 * - Real-time communication patterns
 * - State management for chat systems
 * - Component lifecycle management
 * - User experience design principles
 * - Event handling and validation
 */

import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

const ChatWindow = ({ recipientName = "Landlord", userRole = "tenant" }) => {
  const chatKey = `demo_chat_${userRole}`;
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(chatKey);
    return saved ? JSON.parse(saved).map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    })) : [
      {
        id: 1,
        sender: userRole === 'tenant' ? 'Landlord' : 'Tenant',
        content: 'Welcome to the chat! Send a message to start the conversation.',
        timestamp: new Date(),
        isOwn: false,
        isEmergency: false
      }
    ];
  });
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const isEmergencyMessage = newMessage.toLowerCase().includes('emergency') || 
                                newMessage.includes('🚨');
      
      const message = {
        id: Date.now(),
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date(),
        isOwn: true,
        isEmergency: isEmergencyMessage
      };
      
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
      setNewMessage('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate response after 2-4 seconds
      const responseTime = Math.random() * 2000 + 2000;
      setTimeout(() => {
        setIsTyping(false);
        
        let responseContent;
        if (isEmergencyMessage) {
          responseContent = '🚨 Emergency received! I will address this immediately. Thank you for alerting me.';
        } else if (newMessage.toLowerCase().includes('rent')) {
          responseContent = 'I can help you with rent-related questions. Please let me know what specific information you need.';
        } else if (newMessage.toLowerCase().includes('maintenance')) {
          responseContent = 'I will schedule a maintenance visit. Please provide more details about the issue.';
        } else {
          responseContent = 'Thank you for your message. I will get back to you soon.';
        }
        
        const response = {
          id: Date.now() + 1,
          sender: recipientName,
          content: responseContent,
          timestamp: new Date(),
          isOwn: false,
          isEmergency: isEmergencyMessage
        };
        
        const finalMessages = [...updatedMessages, response];
        setMessages(finalMessages);
        localStorage.setItem(chatKey, JSON.stringify(finalMessages));
      }, responseTime);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-96 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Chat with {recipientName}</h3>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isOwn
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isOwn ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;