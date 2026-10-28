import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Eye, 
  Calendar, 
  Edit3, 
  Trash2, 
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';
import { Room } from '../../types';
import { useRooms } from '../../context/RoomContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatArea } from '../../utils/formatters';
import { RoomFormModal } from './RoomFormModal';

interface LandlordPortalProps {
  onSelectRoom: (roomId: string) => void;
}

export const LandlordPortal: React.FC<LandlordPortalProps> = ({ onSelectRoom }) => {
  const { rooms, toggleRoomStatus, deleteRoom, appointments } = useRooms();
  const { currentUser } = useAuth();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const myRooms = rooms.filter(
    (r) => r.landlord.id === currentUser?.id || r.landlord.id === 'landlord-01' || currentUser?.role === 'admin'
  );

  const availableCount = myRooms.filter((r) => r.status === 'available').length;
  const totalViews = myRooms.reduce((acc, curr) => acc + curr.views, 0);

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingRoom(null);
    setFormModalOpen(true);
  };

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23483D] bg-[#E8EEE9] px-3 py-1 rounded-full mb-2 border border-[#C9DCD3]">
              <Building2 className="w-3.5 h-3.5 text-[#23483D]" />
              <span>Kênh Quản Trị Dành Cho Chủ Trọ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-[#252725] tracking-tight">
              Quản Lý Danh Sách Phòng Cho Thuê
            </h1>
            <p className="text-xs sm:text-sm text-[#777B78] mt-1 font-normal">
              Chủ trọ: <strong className="text-[#252725] font-semibold">{currentUser?.name || 'Cô Lan Tân Thịnh'}</strong> • SĐT: {currentUser?.phone || '0984512345'}
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-md shadow-whisper transition"
          >
            <Plus className="w-4 h-4" />
            <span>Đăng phòng trọ mới</span>
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg border border-[#E5E2D9] shadow-whisper">
            <span className="text-[11px] font-semibold text-[#777B78] uppercase tracking-wider">Tổng số phòng</span>
            <div className="text-2xl sm:text-3xl font-semibold text-[#252725] mt-1">
              {myRooms.length}
            </div>
            <span className="text-[11px] text-[#777B78]">Đang lưu trên hệ thống</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#E5E2D9] shadow-whisper">
            <span className="text-[11px] font-semibold text-[#777B78] uppercase tracking-wider">Phòng còn trống</span>
            <div className="text-2xl sm:text-3xl font-semibold text-[#23483D] mt-1">
              {availableCount}
            </div>
            <span className="text-[11px] text-[#23483D] font-medium">Sẵn sàng đón khách</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#E5E2D9] shadow-whisper">
            <span className="text-[11px] font-semibold text-[#777B78] uppercase tracking-wider">Lượt xem tin</span>
            <div className="text-2xl sm:text-3xl font-semibold text-[#252725] mt-1">
              {totalViews}
            </div>
            <span className="text-[11px] text-[#777B78]">Từ sinh viên Thái Nguyên</span>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#E5E2D9] shadow-whisper">
            <span className="text-[11px] font-semibold text-[#777B78] uppercase tracking-wider">Lịch hẹn xem phòng</span>
            <div className="text-2xl sm:text-3xl font-semibold text-[#23483D] mt-1">
              {appointments.length}
            </div>
            <span className="text-[11px] text-[#777B78]">Cần liên hệ xác nhận</span>
          </div>
        </div>

        {/* Listings Section */}
        <div className="bg-white rounded-lg border border-[#E5E2D9] shadow-whisper p-5 sm:p-6 mb-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base sm:text-lg font-bold text-stone-900">
              Danh sách phòng của bạn ({myRooms.length})
            </h2>
            <span className="text-xs text-stone-400">Bấm nút để đổi trạng thái Còn phòng / Đã thuê</span>
          </div>

          {myRooms.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-stone-500 text-xs mb-3">Bạn chưa có tin đăng phòng nào.</p>
              <button
                onClick={handleCreateNew}
                className="px-3.5 py-1.5 bg-brand-600 text-white rounded-xl text-xs font-bold"
              >
                Đăng tin đầu tiên ngay
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {myRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border border-stone-200 hover:border-brand-300 transition bg-stone-50/50 hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-display text-xs sm:text-sm font-bold text-brand-700">
                          {formatCurrency(room.costs.rent)}/tháng
                        </span>
                        <span>•</span>
                        <span className="text-xs text-stone-500">{formatArea(room.area)}</span>
                        <span>•</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          room.status === 'available' ? 'bg-brand-50 text-brand-800' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {room.status === 'available' ? 'CÒN TRỐNG' : 'ĐÃ CHO THUÊ'}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-1 max-w-md">
                        {room.title}
                      </h3>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        {room.location.address}, {room.location.ward}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => toggleRoomStatus(room.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        room.status === 'available'
                          ? 'bg-brand-50 text-brand-800 border-brand-300 hover:bg-brand-100'
                          : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                      }`}
                      title="Chuyển trạng thái"
                    >
                      {room.status === 'available' ? 'Đổi: ĐÃ THUÊ' : 'Đổi: CÒN TRỐNG'}
                    </button>

                    <button
                      onClick={() => onSelectRoom(room.id)}
                      className="p-1.5 text-stone-600 hover:text-brand-700 hover:bg-stone-100 rounded-xl border border-stone-200"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleEdit(room)}
                      className="p-1.5 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl border border-stone-200"
                      title="Chỉnh sửa tin"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
                          deleteRoom(room.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-stone-200"
                      title="Xóa tin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-card p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-brand-600" />
            <h2 className="font-display text-base font-bold text-stone-900">
              Sinh viên đăng ký hẹn xem phòng ({appointments.length})
            </h2>
          </div>

          <div className="space-y-2.5">
            {appointments.map((app) => (
              <div
                key={app.id}
                className="p-3.5 bg-stone-50/70 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-stone-900">{app.userName}</span>
                    <span className="text-stone-500 font-mono flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {app.userPhone}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {app.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    </span>
                  </div>

                  <p className="text-stone-700 font-medium">
                    Phòng: <span className="font-bold text-stone-900">{app.roomTitle}</span>
                  </p>

                  <div className="flex items-center gap-3 text-stone-500 mt-1">
                    <span className="font-semibold text-brand-700">Ngày: {app.date}</span>
                    <span>Giờ: {app.timeSlot}</span>
                  </div>

                  {app.note && (
                    <p className="text-stone-500 italic mt-1 bg-white p-2 rounded-lg border border-stone-200">
                      "{app.note}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${app.userPhone}`}
                    className="px-3 py-1.5 bg-brand-600 text-white font-bold rounded-xl flex items-center gap-1 shadow-xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Gọi điện</span>
                  </a>
                  <a
                    href={`https://zalo.me/${app.userPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 font-bold rounded-xl"
                  >
                    Zalo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {formModalOpen && (
        <RoomFormModal initialRoom={editingRoom} onClose={() => setFormModalOpen(false)} />
      )}
    </div>
  );
};
