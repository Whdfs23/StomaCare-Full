import { FoodLog, UserProfile } from '../types';

const USER_KEY = 'stomacare_user';

export const mockService = {
  getLogs: async (userId: string): Promise<FoodLog[]> => {
    try {
      const res = await fetch(`/api/logs?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch logs');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  saveLog: async (log: Omit<FoodLog, 'id' | 'createdAt'>): Promise<FoodLog> => {
    const res = await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log)
    });
    if (!res.ok) throw new Error('Failed to save log');
    return await res.json();
  },

  deleteLog: async (id: string): Promise<void> => {
    await fetch(`/api/logs/${id}`, { method: 'DELETE' });
  },

  getUser: async (): Promise<UserProfile | null> => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  login: async (email: string, password?: string): Promise<UserProfile> => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
    
    const user = await res.json();
    const userProfile: UserProfile = {
      uid: user.id,
      email: user.email,
      displayName: user.displayName,
      role: 'user',
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(userProfile));
    return userProfile;
  },

  register: async (name: string, email: string, password?: string): Promise<UserProfile> => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    const user = await res.json();
    const userProfile: UserProfile = {
      uid: user.id,
      email: user.email,
      displayName: user.displayName,
      role: 'user',
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(userProfile));
    return userProfile;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(USER_KEY);
  }
};
