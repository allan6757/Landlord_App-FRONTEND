const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://landlord-app-backend-1eph.onrender.com'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders()
    })
    return response.json()
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  },
  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  },
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    return response.json()
  }
}

// Auth functions
export const auth = {
  login: async (email, password) => {
    const data = await api.post('/api/auth/login', { email, password })
    if (data.access_token) {
      localStorage.setItem('token', data.access_token)
    }
    return data
  },
  register: async (userData) => {
    return api.post('/api/auth/register', userData)
  },
  logout: () => {
    localStorage.removeItem('token')
  }
}

// Properties functions
export const properties = {
  getAll: () => api.get('/api/properties'),
  getById: (id) => api.get(`/api/properties/${id}`),
  create: (data) => api.post('/api/properties', data),
  update: (id, data) => api.put(`/api/properties/${id}`, data),
  delete: (id) => api.delete(`/api/properties/${id}`)
}

export default API_BASE_URL