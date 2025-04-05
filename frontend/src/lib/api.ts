const API_URL = 'http://localhost:5000/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Helper function to handle responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// Register a new user
export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  
  return handleResponse(response);
};

// Login a user
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  return handleResponse(response);
};

// Get current user data using token
export const getCurrentUser = async (token: string): Promise<{ user: User }> => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse(response);
}; 