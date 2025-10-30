/**
 * Broadcast Chat Component - Apartment-wide Communication
 * 
 * Community chat system for all apartment residents with emergency alerts
 * 
 * Features:
 * - Group messaging for all residents
 * - Emergency alert system with visual indicators
 * - Real-time message persistence
 * - User identification and timestamps
 */

import React, { useState } from 'react';
import { Send, Users, AlertTriangle } from 'lucide-react';

const BroadcastChat = ({ userRole = "tenant", userName = "You" }) => {
  const broadcastKey = 'demo_broadcast_chat';
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(broadcastKey);
    return saved ? JSON.parse(saved).map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    })) : [
      {
        id: 1,
        sender: 'Property Manager',
        content: 'Welcome to Greenshade Apartments community chat! Use this space to communicate with your neighbors.',
        timestamp: new Date(Date.now() - 86400000),
        isOwn: false,
        isEmergency: false,
        userRole: 'landlord'
      },
      {
        id: 2,
        sender: 'John (A1)',
        content: '🚨 EMERGENCY: Power outage in building A. Anyone else experiencing this?',
        timestamp: new Date(Date.now() - 3600000),
        isOwn: false,
        isEmergency: true,
        userRole: 'tenant'
      },
      {
        id: 3,
        sender: 'Jane (B2)',
        content: 'Yes, same here in B2. Already reported to management.',
        timestamp: new Date(Date.now() - 3000000),
        isOwn: false,
        isEmergency: false,
        userRole: 'tenant'
      }
    ];
  });
  
  const [newMessage, setNewMessage] = useState('');
  const [showEmergencyButton, setShowEmergencyButton] = useState(true);

  const handleSendMessage = (isEmergency = false) => {
    let messageContent = newMessage.trim();
    
    if (isEmergency && !messageContent) {
      messageContent = prompt('Describe the emergency:');
      if (!messageContent) return;
      messageContent = `🚨 EMERGENCY: ${messageContent}`;
    }
    
    if (messageContent) {
      const message = {
        id: Date.now(),
        sender: userName,
        content: messageContent,
        timestamp: new Date(),
        isOwn: true,
        isEmergency: isEmergency,
        userRole: userRole
      };
      
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      localStorage.setItem(broadcastKey, JSON.stringify(updatedMessages));
      setNewMessage('');
      
      // Simulate community responses for emergency
      if (isEmergency) {
        setTimeout(() => {
          const responses = [
            'Property Manager: Emergency received. Dispatching maintenance team immediately.',
            'Security: On our way to investigate.',
            'Neighbor: Stay safe everyone!'
          ];
          
          responses.forEach((response, index) => {
            setTimeout(() => {
              const [sender, content] = response.split(': ');
              const autoResponse = {
                id: Date.now() + index + 1,
                sender: sender,
                content: content,
                timestamp: new Date(),
                isOwn: false,
                isEmergency: false,
                userRole: sender === 'Property Manager' ? 'landlord' : 'tenant'
              };
              
              setMessages(prev => {
                const updated = [...prev, autoResponse];
                localStorage.setItem(broadcastKey, JSON.stringify(updated));
                return updated;
              });
            }, (index + 1) * 2000);
          });
        }, 1000);
      }
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Apartment Community Chat</h3>
          </div>
          <span className="text-xs text-gray-500">
            {messages.filter(m => m.timestamp > new Date(Date.now() - 86400000)).length} messages today
          </span>
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
                message.isEmergency
                  ? 'bg-red-100 border-2 border-red-300 text-red-900'
                  : message.isOwn
                  ? 'bg-blue-600 text-white'
                  : message.userRole === 'landlord'
                  ? 'bg-green-100 text-green-900'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {!message.isOwn && (
                <p className={`text-xs font-medium mb-1 ${
                  message.isEmergency ? 'text-red-700' : 
                  message.userRole === 'landlord' ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {message.sender}
                  {message.isEmergency && ' ⚠️'}
                </p>
              )}
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isEmergency ? 'text-red-600' :
                message.isOwn ? 'text-blue-100' : 
                message.userRole === 'landlord' ? 'text-green-600' : 'text-gray-500'
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
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message to the community..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        {/* Emergency Button */}
        <button
          onClick={() => handleSendMessage(true)}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Send Emergency Alert
        </button>
      </div>
    </div>
  );
};

export default BroadcastChat;