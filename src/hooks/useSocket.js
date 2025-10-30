/**
 * Socket.IO Hook - Real-time Communication
 * 
 * This custom hook manages Socket.IO connections for real-time features:
 * - Chat messaging between landlords and tenants
 * - Apartment broadcast messages
 * - Emergency alerts with visual indicators
 * - Payment notifications
 * 
 * Learning Goals Demonstrated:
 * - Custom React hooks
 * - WebSocket/Socket.IO integration
 * - Real-time event handling
 * - Connection management
 */

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

const useSocket = () => {
  const { user, getToken } = useAuth();
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  /**
   * Initialize Socket.IO connection
   */
  useEffect(() => {
    if (user && getToken()) {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://landlord-app-backend-1eph.onrender.com';
      
      // Create socket connection with authentication
      socketRef.current = io(API_BASE_URL, {
        auth: {
          token: getToken(),
          userId: user.id,
          userRole: user.profile?.role || user.role
        },
        transports: ['websocket', 'polling']
      });

      const socket = socketRef.current;

      // Connection event handlers
      socket.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
      });

      // Chat event handlers
      socket.on('new_message', (message) => {
        setMessages(prev => [...prev, {
          ...message,
          timestamp: new Date(message.timestamp)
        }]);
      });

      socket.on('emergency_alert', (alert) => {
        // Show emergency notification
        if (Notification.permission === 'granted') {
          new Notification('🚨 Emergency Alert', {
            body: alert.message,
            icon: '/favicon.ico'
          });
        }
        
        // Add emergency message to chat
        setMessages(prev => [...prev, {
          ...alert,
          isEmergency: true,
          timestamp: new Date(alert.timestamp)
        }]);
      });

      // User presence handlers
      socket.on('user_online', (users) => {
        setOnlineUsers(users);
      });

      socket.on('user_offline', (users) => {
        setOnlineUsers(users);
      });

      // Payment notifications
      socket.on('payment_received', (payment) => {
        if (Notification.permission === 'granted') {
          new Notification('💰 Payment Received', {
            body: `KSh ${payment.amount} from ${payment.tenant_name}`,
            icon: '/favicon.ico'
          });
        }
      });

      // Request notification permission
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }

      // Cleanup on unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [user, getToken]);

  /**
   * Join a conversation room
   * @param {number} conversationId - Conversation ID to join
   */
  const joinConversation = (conversationId) => {
    if (socketRef.current) {
      socketRef.current.emit('join_conversation', { conversationId });
    }
  };

  /**
   * Leave a conversation room
   * @param {number} conversationId - Conversation ID to leave
   */
  const leaveConversation = (conversationId) => {
    if (socketRef.current) {
      socketRef.current.emit('leave_conversation', { conversationId });
    }
  };

  /**
   * Send a message to a conversation
   * @param {number} conversationId - Conversation ID
   * @param {string} content - Message content
   * @param {boolean} isEmergency - Whether this is an emergency message
   */
  const sendMessage = (conversationId, content, isEmergency = false) => {
    if (socketRef.current && content.trim()) {
      const message = {
        conversationId,
        content: content.trim(),
        isEmergency,
        senderId: user.id,
        senderName: `${user.first_name} ${user.last_name}`,
        timestamp: new Date()
      };

      socketRef.current.emit('send_message', message);
      
      // Add to local messages immediately for better UX
      setMessages(prev => [...prev, message]);
    }
  };

  /**
   * Join apartment broadcast
   * @param {number} broadcastId - Broadcast ID to join
   */
  const joinBroadcast = (broadcastId) => {
    if (socketRef.current) {
      socketRef.current.emit('join_broadcast', { broadcastId });
    }
  };

  /**
   * Send broadcast message
   * @param {number} broadcastId - Broadcast ID
   * @param {string} content - Message content
   * @param {boolean} isEmergency - Whether this is an emergency alert
   */
  const sendBroadcastMessage = (broadcastId, content, isEmergency = false) => {
    if (socketRef.current && content.trim()) {
      const message = {
        broadcastId,
        content: content.trim(),
        isEmergency,
        senderId: user.id,
        senderName: `${user.first_name} ${user.last_name}`,
        timestamp: new Date()
      };

      socketRef.current.emit('send_broadcast_message', message);
      
      // Add to local messages
      setMessages(prev => [...prev, message]);
    }
  };

  /**
   * Send emergency alert to broadcast
   * @param {number} broadcastId - Broadcast ID
   * @param {string} message - Emergency message
   */
  const sendEmergencyAlert = (broadcastId, message) => {
    sendBroadcastMessage(broadcastId, `🚨 EMERGENCY: ${message}`, true);
  };

  /**
   * Clear messages (useful for switching conversations)
   */
  const clearMessages = () => {
    setMessages([]);
  };

  /**
   * Get typing indicator
   * @param {number} conversationId - Conversation ID
   */
  const startTyping = (conversationId) => {
    if (socketRef.current) {
      socketRef.current.emit('typing_start', { conversationId });
    }
  };

  const stopTyping = (conversationId) => {
    if (socketRef.current) {
      socketRef.current.emit('typing_stop', { conversationId });
    }
  };

  return {
    // Connection state
    connected,
    onlineUsers,
    
    // Messages
    messages,
    clearMessages,
    
    // Conversation methods
    joinConversation,
    leaveConversation,
    sendMessage,
    
    // Broadcast methods
    joinBroadcast,
    sendBroadcastMessage,
    sendEmergencyAlert,
    
    // Typing indicators
    startTyping,
    stopTyping,
    
    // Socket instance (for advanced usage)
    socket: socketRef.current
  };
};

export default useSocket;