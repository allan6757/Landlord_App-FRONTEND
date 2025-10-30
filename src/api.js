const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://landlord-app-backend-1eph.onrender.com'

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

const handleResponse = async (response) => {
  console.log('API Response:', response.status, response.url)
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('API Error:', errorText)
    
    let error
    try {
      error = JSON.parse(errorText)
    } catch {
      error = { message: errorText || 'Network error' }
    }
    
    throw new Error(error.message || error.error || `HTTP ${response.status}`)
  }
  
  const data = await response.json()
  console.log('API Data:', data)
  return data
}

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },
  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  }
}

// Auth functions
export const auth = {
  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    return data
  },
  register: async (userData) => {
    const data = await api.post('/auth/register', userData)
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    return data
  },
  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }
}

// Properties functions
export const properties = {
  getAll: () => api.get('/properties'),
  getById: (id) => api.get(`/properties/${id}`),
  create: (data) => api.post('/properties', data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`)
}

export default API_BASE_URL