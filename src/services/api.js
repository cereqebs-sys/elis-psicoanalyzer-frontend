import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://3001-iltjzkgesk8uek660u5bn-648a3937.manusvm.computer/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Serviços de autenticação
export const authService = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () =>
    api.get('/auth/me'),
};

// Serviços de sessões
export const sessionsService = {
  getAll: () =>
    api.get('/sessions'),
  getById: (id) =>
    api.get(`/sessions/${id}`),
  create: (data) =>
    api.post('/sessions', data),
  update: (id, data) =>
    api.put(`/sessions/${id}`, data),
  delete: (id) =>
    api.delete(`/sessions/${id}`),
};

// Serviços de documentos
export const documentsService = {
  getAll: () =>
    api.get('/documents'),
  getById: (id) =>
    api.get(`/documents/${id}`),
  create: (data) =>
    api.post('/documents', data),
  update: (id, data) =>
    api.put(`/documents/${id}`, data),
  delete: (id) =>
    api.delete(`/documents/${id}`),
};

// Serviços de resumo
export const summaryService = {
  getAll: () =>
    api.get('/summary'),
  getById: (id) =>
    api.get(`/summary/${id}`),
  generate: (data) =>
    api.post('/summary/generate', data),
  transcribe: (data) =>
    api.post('/summary/transcribe', data),
};

export default api;
