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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col shadow-card-hover border border-[#E5E2D9] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E2D9] flex items-center justify-between bg-[#FAF9F7]">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-12 h-12 rounded-md object-cover border border-[#E5E2D9]"
            />
            <div>
              <h2 className="font-semibold text-[#252725] text-lg leading-tight">{currentUser?.name}</h2>
              <p className="text-xs text-[#777B78]">{currentUser?.email} • {currentUser?.phone}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-[#777B78] hover:text-[#252725] rounded hover:bg-[#EFEEE8]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-[#E5E2D9] text-xs sm:text-sm font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 px-2 transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'saved' ? 'border-[#23483D] text-[#23483D] font-semibold' : 'border-transparent text-[#777B78] hover:text-[#252725]'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Phòng đã lưu ({savedRoomsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 px-2 transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'appointments' ? 'border-[#23483D] text-[#23483D] font-semibold' : 'border-transparent text-[#777B78] hover:text-[#252725]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#23483D]" />
            <span>Lịch hẹn xem ({myAppointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-2 transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'history' ? 'border-[#23483D] text-[#23483D] font-semibold' : 'border-transparent text-[#777B78] hover:text-[#252725]'
            }`}
          >
            <Clock className="w-4 h-4 text-[#777B78]" />
            <span>Lịch sử xem</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-2 transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'border-[#23483D] text-[#23483D] font-semibold' : 'border-transparent text-[#777B78] hover:text-[#252725]'
            }`}
          >
            <UserIcon className="w-4 h-4 text-[#777B78]" />
            <span>Thông tin cá nhân</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* TAB: SAVED ROOMS */}
          {activeTab === 'saved' && (
            <div>
              {savedRoomsList.length === 0 ? (
                <div className="text-center py-12 text-[#777B78] text-sm">
                  <Heart className="w-12 h-12 text-[#D5D5D5] mx-auto mb-2" />
                  <span>Bạn chưa lưu phòng trọ nào vào danh sách yêu thích.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedRoomsList.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-md border border-[#E5E2D9] hover:border-[#23483D] bg-[#FAF9F7] hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <img src={room.images[0]} alt="" className="w-16 h-16 rounded object-cover shrink-0" />
                        <div>
                          <div className="font-semibold text-[#252725] text-sm line-clamp-1">{room.title}</div>
                          <div className="text-xs text-[#23483D] font-semibold mt-0.5">
                            {formatCurrency(room.costs.rent, true)} • {room.area}m²
                          </div>
                          <div className="text-[11px] text-[#777B78]">{room.location.address}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectRoom(room.id);
                          }}
                          className="px-3.5 py-1.5 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs rounded-md flex items-center gap-1 shadow-whisper"
                        >
                          <span>Xem phòng</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(room.id)}
                          className="p-1.5 text-[#777B78] hover:text-rose-600 rounded"
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
                <div className="text-center py-12 text-[#777B78] text-sm">
                  <Calendar className="w-12 h-12 text-[#D5D5D5] mx-auto mb-2" />
                  <span>Chưa có lịch hẹn xem phòng nào.</span>
                </div>
              ) : (
                myAppointments.map((app) => (
                  <div key={app.id} className="p-4 rounded-md border border-[#E5E2D9] bg-[#FAF9F7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-block mb-1 ${
                        app.status === 'confirmed' ? 'bg-[#E8EEE9] text-[#23483D] border border-[#C9DCD3]' : 'bg-[#EFEEE8] text-[#777B78]'
                      }`}>
                        {app.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ chủ nhà xác nhận'}
                      </span>
                      <div className="font-semibold text-[#252725] text-sm">{app.roomTitle}</div>
                      <div className="text-xs text-[#777B78] mt-1 flex items-center gap-3">
                        <span className="font-semibold text-[#23483D]">Ngày: {app.date}</span>
                        <span>Giờ: {app.timeSlot}</span>
                      </div>
                    </div>

                    {app.status !== 'cancelled' && (
                      <button
                        onClick={() => cancelAppointment(app.id)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-medium border border-rose-200 px-3 py-1.5 rounded-md hover:bg-rose-50 self-end sm:self-center"
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
                  className="p-3 rounded-md border border-[#E5E2D9] hover:border-[#23483D] bg-[#FAF9F7] hover:bg-white transition cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={room.images[0]} alt="" className="w-12 h-12 rounded object-cover" />
                    <div>
                      <div className="font-semibold text-[#252725] text-sm line-clamp-1">{room.title}</div>
                      <div className="text-xs text-[#23483D] font-semibold">{formatCurrency(room.costs.rent, true)}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#777B78]" />
                </div>
              ))}
            </div>
          )}

          {/* TAB: PROFILE EDIT */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-[#252725] mb-1">Họ và tên:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm text-[#252725] focus:outline-none focus:border-[#23483D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252725] mb-1">Số điện thoại:</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm text-[#252725] focus:outline-none focus:border-[#23483D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252725] mb-1">Vai trò hiện tại:</label>
                <div className="text-sm font-semibold text-[#23483D] bg-[#E8EEE9] p-2.5 rounded-md border border-[#C9DCD3]">
                  {currentUser?.role === 'admin' ? '🛡️ Quản trị viên hệ thống' : currentUser?.role === 'landlord' ? '🏡 Chủ nhà trọ' : '🎓 Sinh viên / Người thuê'}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs rounded-md shadow-whisper"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium text-xs rounded-md"
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
