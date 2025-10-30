import { api } from '../api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response;
  },

  async register(userData) {
    const response = await api.post('/api/auth/register', {
      email: userData.email,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.lastName,
      role: userData.role
    });
    return response;
  },

  async getProfile() {
    const response = await api.get('/api/auth/profile');
    return response;
  },

  async updateProfile(userData) {
    const response = await api.put('/api/auth/profile', userData);
    return response;
  },
};