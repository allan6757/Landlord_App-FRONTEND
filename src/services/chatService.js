import { api } from '../api';

/**
 * Chat Service - Handles real-time messaging with Socket.IO
 * 
 * Learning Goals Demonstrated:
 * - WebSocket integration
 * - Real-time communication
 * - Event-driven architecture
 */
export const chatService = {
  async getConversations() {
    const response = await api.get('/api/conversations');
    return response;
  },

  async getConversation(id) {
    const response = await api.get(`/api/conversations/${id}`);
    return response;
  },

  async createConversation(participantId) {
    const response = await api.post('/api/conversations', {
      participant_id: participantId
    });
    return response;
  },

  async getMessages(conversationId) {
    const response = await api.get(`/api/conversations/${conversationId}/messages`);
    return response;
  },

  async sendMessage(conversationId, content, isEmergency = false) {
    const response = await api.post(`/api/conversations/${conversationId}/messages`, {
      content: content,
      is_emergency: isEmergency
    });
    return response;
  },

  // Broadcast chat functions
  async joinBroadcast(broadcastId) {
    const response = await api.post(`/api/broadcasts/${broadcastId}/join`);
    return response;
  },

  async sendBroadcastMessage(broadcastId, content, isEmergency = false) {
    const response = await api.post(`/api/broadcasts/${broadcastId}/messages`, {
      content: content,
      is_emergency: isEmergency
    });
    return response;
  }
};