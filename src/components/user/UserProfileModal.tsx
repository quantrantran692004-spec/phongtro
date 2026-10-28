import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Calendar, 
  Clock, 
  User as UserIcon, 
  Phone, 
  Mail, 
  Building2, 
  Trash2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRooms } from '../../context/RoomContext';
import { formatCurrency } from '../../utils/formatters';

interface UserProfileModalProps {
  initialTab?: 'saved' | 'appointments' | 'profile';
  onClose: () => void;
  onSelectRoom: (roomId: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  initialTab = 'saved',
  onClose,
  onSelectRoom,
}) => {
  const { currentUser, updateProfile, logout } = useAuth();
  const { rooms, favorites, toggleFavorite, appointments, cancelAppointment, viewHistory } = useRooms();

  const [activeTab, setActiveTab] = useState<'saved' | 'appointments' | 'profile' | 'history'>(initialTab);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  // Saved rooms list
  const savedRoomsList = rooms.filter((r) => favorites.includes(r.id));
  
  // History rooms list
  const historyRoomsList = rooms.filter((r) => viewHistory.includes(r.id));

  // User's appointments
  const myAppointments = appointments.filter((a) => a.userId === currentUser?.id || a.userPhone === currentUser?.phone);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-[0_24px_48px_rgba(0,0,0,0.2)] border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3.5">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-900 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">{currentUser?.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white shadow-2xs">
                  {currentUser?.role === 'admin' ? 'Quản trị' : currentUser?.role === 'landlord' ? 'Chủ trọ' : 'Sinh viên'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-0.5">{currentUser?.email} • {currentUser?.phone}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200/60 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-6 pt-4 pb-2 border-b border-slate-100 bg-slate-50/40 overflow-x-auto no-scrollbar">
          {[
            { id: 'saved', label: 'Phòng đã lưu', count: savedRoomsList.length },
            { id: 'appointments', label: 'Lịch hẹn xem', count: myAppointments.length },
            { id: 'history', label: 'Đã xem gần đây', count: historyRoomsList.length },
            { id: 'profile', label: 'Thông tin cá nhân' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-amber-400 text-slate-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB: SAVED */}
          {activeTab === 'saved' && (
            <div>
              {savedRoomsList.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  <Heart className="w-12 h-12 text-slate-200 mx-auto mb-2" />
                  <span>Bạn chưa lưu phòng trọ nào vào danh sách yêu thích.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedRoomsList.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-slate-200/80 hover:border-slate-900 bg-slate-50/80 hover:bg-white transition shadow-2xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <img src={room.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900 text-sm line-clamp-1">{room.title}</div>
                          <div className="text-xs text-amber-600 font-bold mt-0.5">
                            {formatCurrency(room.costs.rent, true)} • {room.area}m²
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{room.location.address}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectRoom(room.id);
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-xs transition"
                        >
                          <span>Xem</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(room.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition"
                          title="Bỏ lưu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-3">
              {myAppointments.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-2" />
                  <span>Chưa có lịch hẹn xem phòng nào.</span>
                </div>
              ) : (
                myAppointments.map((app) => (
                  <div key={app.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block mb-1 ${
                        app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {app.status === 'confirmed' ? '✓ Đã xác nhận' : '⏳ Chờ chủ nhà xác nhận'}
                      </span>
                      <div className="font-bold text-slate-900 text-sm">{app.roomTitle}</div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                        <span className="font-semibold text-slate-800">Ngày: {app.date}</span>
                        <span>Giờ: {app.timeSlot}</span>
                      </div>
                    </div>

                    {app.status !== 'cancelled' && (
                      <button
                        onClick={() => cancelAppointment(app.id)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-bold border border-rose-200 px-4 py-2 rounded-full hover:bg-rose-50 self-end sm:self-center transition"
                      >
                        Hủy lịch hẹn
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {historyRoomsList.map((room) => (
                <div
                  key={room.id}
                  onClick={() => {
                    onClose();
                    onSelectRoom(room.id);
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-slate-900 bg-slate-50/80 hover:bg-white transition cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <img src={room.images[0]} alt="" className="w-13 h-13 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm line-clamp-1">{room.title}</div>
                      <div className="text-xs text-amber-600 font-bold">{formatCurrency(room.costs.rent, true)}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {/* TAB: PROFILE EDIT */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Họ và tên:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Số điện thoại:</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Vai trò hiện tại:</label>
                <div className="text-sm font-bold text-slate-900 bg-slate-100 p-3 rounded-xl border border-slate-200">
                  {currentUser?.role === 'admin' ? '🛡️ Quản trị viên hệ thống' : currentUser?.role === 'landlord' ? '🏡 Chủ nhà trọ' : '🎓 Sinh viên / Người thuê'}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-md transition"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="px-5 py-3 text-rose-600 hover:bg-rose-50 font-bold text-xs rounded-full border border-rose-200 transition"
                >
                  Đăng xuất
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
