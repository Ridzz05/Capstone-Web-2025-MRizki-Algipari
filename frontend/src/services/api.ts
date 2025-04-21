import axios from 'axios';

// Define base URL for API requests
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

// Define TypeScript interfaces for data models
export interface Post {
  id: number;
  title: string;
  content: string;
  published_at: string;
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service methods
export const api = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    const response = await apiClient.get('/api/posts');
    return response.data;
  },

  // Get single post by ID
  getPost: async (id: number): Promise<Post> => {
    const response = await apiClient.get(`/api/posts/${id}`);
    return response.data;
  },

  // Create new post
  createPost: async (postData: Omit<Post, 'id' | 'published_at'>): Promise<Post> => {
    const response = await apiClient.post('/api/posts', postData);
    return response.data;
  },

  // Update existing post
  updatePost: async (id: number, postData: Partial<Post>): Promise<Post> => {
    const response = await apiClient.put(`/api/posts/${id}`, postData);
    return response.data;
  },

  // Delete post
  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/posts/${id}`);
  },
};

export default api;
