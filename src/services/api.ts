import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: 'pt-BR',
  },
});

export default api;
