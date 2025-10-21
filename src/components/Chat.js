import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

const Chat = ({ userType }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: userType === 'landlord' ? 'John Doe' : 'Jane Smith',
      message: 'Hello! I have a question about the rent payment.',
      timestamp: '2024-01-15 10:30',
      isOwn: false
    },
    {
      id: 2,
      sender: userType === 'landlord' ? 'You' : 'You',
      message: 'Hi! How can I help you today?',
      timestamp: '2024-01-15 10:32',
      isOwn: true
    },
    {
      id: 3,
      sender: userType === 'landlord' ? 'John Doe' : 'Jane Smith',
      message: 'I made the payment yesterday but it\'s still showing as pending. Could you please check?',
      timestamp: '2024-01-15 10:35',
      isOwn: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(userType === 'landlord' ? 'John Doe' : 'Jane Smith');

  const contacts = userType === 'landlord' 
    ? ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson']
    : ['Jane Smith']; // Tenant only chats with landlord

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow h-96 flex">
      {/* Contacts Sidebar */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            {userType === 'landlord' ? 'Tenants' : 'Landlord'}
          </h3>
        </div>
        <div className="overflow-y-auto">
          {contacts.map(contact => (
            <button
              key={contact}
              onClick={() => setSelectedContact(contact)}
              className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 ${
                selectedContact === contact ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-gray-600">
                    {contact.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{contact}</p>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 text-gray-600 mr-2" />
            <h4 className="font-semibold text-gray-900">{selectedContact}</h4>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
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
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;