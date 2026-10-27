import { apiClient } from './apiClient';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/initialData';

const STORAGE_USER_KEY = 'tro_thainguyen_auth_user';
const STORAGE_USERS_LIST = 'tn_all_users_v1';

export class AuthService {
  private getLocalUsers(): User[] {
    const raw = localStorage.getItem(STORAGE_USERS_LIST);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_LIST, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEMO_USERS;
    }
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    if (!raw) {
      const defaultUser = DEMO_USERS[0];
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  async login(phoneOrEmail: string, role: UserRole = 'tenant'): Promise<User> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.post<{ user: User; token: string }>('/auth/login', {
        phoneOrEmail,
        role,
      });
      if (res.success && res.data) {
        apiClient.setToken(res.data.token);
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(res.data.user));
        return res.data.user;
      }
      throw new Error(res.error || 'Đăng nhập không thành công');
    }

    // Mock Login
    const users = this.getLocalUsers();
    let found = users.find(
      (u) => (u.phone === phoneOrEmail || u.email.toLowerCase() === phoneOrEmail.toLowerCase()) && u.role === role
    );

    if (!found) {
      found = {
        id: `user-${Date.now()}`,
        name: phoneOrEmail.includes('@') ? phoneOrEmail.split('@')[0] : `Người dùng ${phoneOrEmail.slice(-4)}`,
        phone: phoneOrEmail.startsWith('0') ? phoneOrEmail : '0988000111',
        email: phoneOrEmail.includes('@') ? phoneOrEmail : `${phoneOrEmail}@phongtrotn.vn`,
        role,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        savedRooms: [],
        viewHistory: [],
        savedSearches: [],
      };
      localStorage.setItem(STORAGE_USERS_LIST, JSON.stringify([...users, found]));
    }

    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(found));
    return found;
  }

  async register(data: { name: string; phone: string; email: string; role: UserRole }): Promise<User> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.post<{ user: User; token: string }>('/auth/register', data);
      if (res.success && res.data) {
        apiClient.setToken(res.data.token);
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(res.data.user));
        return res.data.user;
      }
      throw new Error(res.error || 'Đăng ký thất bại');
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: data.role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      savedRooms: [],
      viewHistory: [],
      savedSearches: [],
    };

    const users = this.getLocalUsers();
    localStorage.setItem(STORAGE_USERS_LIST, JSON.stringify([...users, newUser]));
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
    return newUser;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const current = this.getCurrentUser();
    if (!current) throw new Error('Chưa đăng nhập');

    if (!apiClient.isMockEnabled) {
      const res = await apiClient.put<User>('/auth/profile', updates);
      if (res.success && res.data) {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(res.data));
        return res.data;
      }
      throw new Error(res.error || 'Cập nhật thất bại');
    }

    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updated));

    const users = this.getLocalUsers().map((u) => (u.id === updated.id ? updated : u));
    localStorage.setItem(STORAGE_USERS_LIST, JSON.stringify(users));

    return updated;
  }

  logout(): void {
    apiClient.setToken(null);
    localStorage.removeItem(STORAGE_USER_KEY);
  }
}

export const authService = new AuthService();
