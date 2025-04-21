import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

// Interfaces
export interface LoginData {
  identifier: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

// Service untuk autentikasi dengan Strapi
const authService = {
  // Login menggunakan Strapi API
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/api/auth/local`, {
      identifier: data.identifier,
      password: data.password,
    });

    // Simpan token JWT dan user data ke localStorage
    if (response.data.jwt) {
      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('isLoggedIn', 'true');
    }

    return response.data;
  },

  // Register menggunakan Strapi API
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/api/auth/local/register`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return response.data;
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  },

  // Get current user data
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Check if user is logged in
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('isLoggedIn');
  },
};

export default authService;
