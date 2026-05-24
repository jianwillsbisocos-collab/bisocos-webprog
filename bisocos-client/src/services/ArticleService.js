import axios from 'axios';
import { HOST } from '../constants';

const API = axios.create({
  baseURL: `${HOST}/api/articles`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchArticles = () => API.get('/');
export const createArticle = (article) => API.post('/', article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);