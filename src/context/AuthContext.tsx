import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { DEMO_USERS } from '../data/initialData';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, role?: 'tenant' | 'landlord' | 'admin') => boolean;
  register: (name: string, email: string, phone: string, role: 'tenant' | 'landlord') => void;
  logout: () => void;
  switchDemoRole: (role: 'tenant' | 'landlord' | 'admin') => void;
  updateProfile: (data: Partial<User>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLandlord: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'tro_thainguyen_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default to student tenant for smooth preview
    return DEMO_USERS[0];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (email: string, role: 'tenant' | 'landlord' | 'admin' = 'tenant') => {
    const existing = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      showToast(`Đăng nhập thành công! Xin chào ${existing.name}`, 'success');
      return true;
    }

    // Auto-create user for quick testing
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      phone: '0988000111',
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      savedRooms: [],
      viewHistory: [],
      savedSearches: [],
    };
    setCurrentUser(newUser);
    showToast(`Đăng nhập thành công với vai trò ${role === 'admin' ? 'Quản trị viên' : role === 'landlord' ? 'Chủ trọ' : 'Người thuê'}!`, 'success');
    return true;
  };

  const register = (name: string, email: string, phone: string, role: 'tenant' | 'landlord') => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      savedRooms: [],
      viewHistory: [],
      savedSearches: [],
    };
    setCurrentUser(newUser);
    showToast(`Đăng ký tài khoản thành công! Chào mừng ${name}`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất khỏi hệ thống', 'info');
  };

  const switchDemoRole = (role: 'tenant' | 'landlord' | 'admin') => {
    const target = DEMO_USERS.find((u) => u.role === role);
    if (target) {
      setCurrentUser(target);
      const roleName = role === 'admin' ? 'Quản Trị Viên' : role === 'landlord' ? 'Chủ Trọ (Cô Lan)' : 'Sinh Viên Thuê Trọ (An)';
      showToast(`Đã chuyển sang tài khoản: ${roleName}`, 'success');
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    showToast('Cập nhật thông tin cá nhân thành công!', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        switchDemoRole,
        updateProfile,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        isLandlord: currentUser?.role === 'landlord' || currentUser?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
