import axiosClient from './axiosClient';

const AUTH_STORAGE_KEY = 'banao_auth_user';

export async function getCurrentUser() {
  try {
    const response = await axiosClient.get('/api/auth/me');
    if (response.data && response.data.user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.data.user));
      return response.data.user;
    }
  } catch (error) {
    // If backend 401 or offline, check if dev/demo session was previously preserved
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    return null;
  }
  return null;
}

export function loginWithGoogle() {
  // Directly initiates the server-side Google OAuth 2.0 flow
  window.location.href = '/api/auth/google';
}

export function demoGoogleLogin(customData = null) {
  const defaultUser = {
    id: 'user_google_' + Math.random().toString(36).substring(2, 9),
    name: 'Deepanshu Sharma',
    email: 'deepanshu@banao.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
    provider: 'google'
  };
  const user = customData ? { ...defaultUser, ...customData } : defaultUser;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function logoutUser() {
  try {
    await axiosClient.post('/api/auth/logout');
  } catch (err) {
    // continue cleanup
  }
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
