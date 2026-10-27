import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Phone, Lock, Sparkles, Building2, ShieldCheck, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login, register, switchDemoRole } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'tenant' | 'landlord'>('tenant');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email.trim());
      onClose();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && phone.trim()) {
      register(name.trim(), email.trim(), phone.trim(), role);
      onClose();
    }
  };

  const handleQuickDemo = (demoRole: 'tenant' | 'landlord' | 'admin') => {
    switchDemoRole(demoRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1-Click Fast Demo Login Switcher */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-3.5 rounded-2xl mb-6">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đăng nhập nhanh 1 chạm (Tài khoản mẫu):</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-bold">
            <button
              onClick={() => handleQuickDemo('tenant')}
              className="p-2 bg-white hover:bg-emerald-100/60 border border-emerald-200 rounded-xl text-emerald-900 transition flex flex-col items-center gap-1 text-center"
            >
              <span className="text-base">🎓</span>
              <span className="text-[11px] leading-tight">Sinh viên</span>
            </button>

            <button
              onClick={() => handleQuickDemo('landlord')}
              className="p-2 bg-white hover:bg-emerald-100/60 border border-emerald-200 rounded-xl text-emerald-900 transition flex flex-col items-center gap-1 text-center"
            >
              <span className="text-base">🏡</span>
              <span className="text-[11px] leading-tight">Chủ trọ</span>
            </button>

            <button
              onClick={() => handleQuickDemo('admin')}
              className="p-2 bg-white hover:bg-purple-100/60 border border-purple-200 rounded-xl text-purple-900 transition flex flex-col items-center gap-1 text-center"
            >
              <span className="text-base">🛡️</span>
              <span className="text-[11px] leading-tight">Admin</span>
            </button>
          </div>
        </div>

        {/* Tab Header */}
        <div className="flex items-center justify-center gap-6 border-b border-slate-100 mb-6 text-sm font-bold">
          <button
            onClick={() => setTab('login')}
            className={`pb-2.5 transition relative ${
              tab === 'login' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>Đăng nhập</span>
            {tab === 'login' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setTab('register')}
            className={`pb-2.5 transition relative ${
              tab === 'register' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>Đăng ký mới</span>
            {tab === 'register' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email hoặc Số điện thoại:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="an.sinhvien@tump.edu.vn"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mật khẩu:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition"
            >
              Đăng nhập ngay
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên:</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại liên hệ:</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0988xxxxxx"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bạn là:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRole('tenant')}
                  className={`p-2 rounded-xl border text-center font-bold transition ${
                    role === 'tenant' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  🎓 Người cần thuê
                </button>
                <button
                  type="button"
                  onClick={() => setRole('landlord')}
                  className={`p-2 rounded-xl border text-center font-bold transition ${
                    role === 'landlord' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  🏡 Chủ nhà trọ
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition"
            >
              Tạo tài khoản miễn phí
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
