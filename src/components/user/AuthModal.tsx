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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_24px_48px_rgba(0,0,0,0.2)] border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1-Click Fast Demo Login Switcher */}
        <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl mb-6">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Đăng nhập thử nghiệm nhanh:</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleQuickDemo('tenant')}
              className="p-2 bg-white hover:bg-slate-900 hover:text-white rounded-xl border border-slate-200 transition flex flex-col items-center gap-1 text-slate-700 shadow-2xs"
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Sinh viên</span>
            </button>
            <button
              onClick={() => handleQuickDemo('landlord')}
              className="p-2 bg-white hover:bg-slate-900 hover:text-white rounded-xl border border-slate-200 transition flex flex-col items-center gap-1 text-slate-700 shadow-2xs"
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Chủ trọ</span>
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="p-2 bg-white hover:bg-slate-900 hover:text-white rounded-xl border border-slate-200 transition flex flex-col items-center gap-1 text-slate-700 shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <span>Quản trị</span>
            </button>
          </div>
        </div>

        {/* Tabs Segmented Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full mb-6 text-xs font-bold">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-full transition-all duration-200 ${
              tab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 rounded-full transition-all duration-200 ${
              tab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Đăng ký mới
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email tài khoản:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="an.sinhvien@tump.edu.vn"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mật khẩu:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-md transition tracking-wide"
            >
              Đăng nhập ngay
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Họ và tên:</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Số điện thoại liên hệ:</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0988xxxxxx"
                  className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bạn là:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setRole('tenant')}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    role === 'tenant' ? 'bg-slate-900 border-slate-900 text-white shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  🎓 Người cần thuê
                </button>
                <button
                  type="button"
                  onClick={() => setRole('landlord')}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    role === 'landlord' ? 'bg-slate-900 border-slate-900 text-white shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  🏡 Chủ nhà trọ
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm rounded-full shadow-md transition tracking-wide"
            >
              Tạo tài khoản miễn phí
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
