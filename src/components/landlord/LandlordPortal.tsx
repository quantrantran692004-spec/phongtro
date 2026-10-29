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
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Rocket
} from 'lucide-react';
import { Room } from '../../types';
import { useRooms } from '../../context/RoomContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatArea } from '../../utils/formatters';
import { RoomFormModal } from './RoomFormModal';

interface LandlordPortalProps {
  onSelectRoom: (roomId: string) => void;
}

export const LandlordPortal: React.FC<LandlordPortalProps> = ({ onSelectRoom }) => {
  const { rooms, toggleRoomStatus, deleteRoom, appointments } = useRooms();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const myRooms = rooms.filter(
    (r) => r.landlord.id === currentUser?.id || r.landlord.id === 'landlord-01' || currentUser?.role === 'admin'
  );

  const availableCount = myRooms.filter((r) => r.status === 'available').length;
  const verifiedCount = myRooms.filter((r) => r.isVerified).length;
  const totalViews = myRooms.reduce((acc, curr) => acc + curr.views, 0);

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingRoom(null);
    setFormModalOpen(true);
  };

  const handleUpgradeVip = (room: Room) => {
    showToast(`Đã kích hoạt Đẩy Top VIP #1 cho "${room.title}" thành công!`, 'success');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full mb-2 border border-teal-200/80 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Bảng Điều Khiển Dành Cho Chủ Trọ Thái Nguyên</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quản Lý Danh Sách Phòng Cho Thuê
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Chủ trọ: <strong className="text-slate-900 font-bold">{currentUser?.name || 'Cô Lan Tân Thịnh'}</strong> • SĐT: {currentUser?.phone || '0984512345'}
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Đăng phòng trọ mới</span>
          </button>
        </div>

        {/* Overview Stats (Polished KPI Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Rooms */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Tổng số phòng</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tabular-nums">
              {myRooms.length}
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1 block">Đang lưu trên hệ thống</span>
          </div>

          {/* Card 2: Active Available Rooms */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Phòng còn trống</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">
                Sẵn sàng
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1.5 tabular-nums">
              {availableCount}
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 mt-1 block">Đang hiển thị cho sinh viên</span>
          </div>

          {/* Card 3: Total Views */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lượt xem tin</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/70">
                +24% tuần
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 mt-1.5 tabular-nums">
              {totalViews}
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1 block">Từ người thuê Thái Nguyên</span>
          </div>

          {/* Card 4: Appointments */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lịch hẹn xem phòng</span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70">
                Cần gọi
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1.5 tabular-nums">
              {appointments.length}
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1 block">Khách đang đợi liên hệ</span>
          </div>
        </div>

        {/* Listings Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Danh Sách Phòng Của Bạn ({myRooms.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Bấm nút trạng thái để chuyển đổi nhanh hoặc nâng cấp VIP đẩy Top vị trí #1</p>
            </div>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-center">
              Xác thực: {verifiedCount}/{myRooms.length} phòng chính chủ
            </span>
          </div>

          {myRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm mb-4 font-medium">Bạn chưa có tin đăng phòng trọ nào.</p>
              <button
                onClick={handleCreateNew}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Đăng tin đầu tiên ngay (0đ)
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {myRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition-all bg-white hover:bg-slate-50/50 shadow-2xs hover:shadow-sm"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-2xs"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-extrabold text-teal-700">
                          {formatCurrency(room.costs.rent)}/tháng
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {formatArea(room.area)}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          room.status === 'available' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {room.status === 'available' ? '✓ CÒN TRỐNG' : 'ĐÃ CHO THUÊ'}
                        </span>
                        {room.isVerified && (
                          <span className="text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                            CHÍNH CHỦ
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1 max-w-lg">
                        {room.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 truncate">
                        {room.location.address}, {room.location.ward}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Monetization Button */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center flex-wrap">
                    
                    {/* MONETIZATION ACTION BUTTON: Nâng cấp Tin VIP / Đẩy Top */}
                    <button
                      onClick={() => handleUpgradeVip(room)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-sm hover:shadow transition active:scale-95 whitespace-nowrap"
                      title="Nâng cấp tin VIP đẩy Top 1 trang tìm kiếm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Đẩy Top VIP #1</span>
                    </button>

                    {/* Quick status toggle */}
                    <button
                      onClick={() => toggleRoomStatus(room.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                        room.status === 'available'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Chuyển trạng thái"
                    >
                      {room.status === 'available' ? 'Đổi: ĐÃ THUÊ' : 'Đổi: CÒN TRỐNG'}
                    </button>

                    <button
                      onClick={() => onSelectRoom(room.id)}
                      className="p-2 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl border border-slate-200 transition"
                      title="Xem trước tin"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleEdit(room)}
                      className="p-2 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl border border-slate-200 transition"
                      title="Chỉnh sửa nội dung"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
                          deleteRoom(room.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition"
                      title="Xóa phòng trọ"
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
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <Calendar className="w-4 h-4 text-teal-600" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Sinh viên đăng ký hẹn xem phòng ({appointments.length})
            </h2>
          </div>

          <div className="space-y-3">
            {appointments.map((app) => (
              <div
                key={app.id}
                className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">{app.userName}</span>
                    <span className="text-slate-500 font-mono flex items-center gap-1 font-semibold">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {app.userPhone}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                      {app.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ gọi xác nhận'}
                    </span>
                  </div>

                  <p className="text-slate-700 font-medium">
                    Phòng: <span className="font-bold text-slate-900">{app.roomTitle}</span>
                  </p>

                  <div className="flex items-center gap-3 text-slate-500 mt-1 font-medium">
                    <span className="font-bold text-teal-700">Ngày: {app.date}</span>
                    <span>Khung giờ: {app.timeSlot}</span>
                  </div>

                  {app.note && (
                    <p className="text-slate-600 italic mt-1.5 bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                      "{app.note}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${app.userPhone}`}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Gọi điện</span>
                  </a>
                  <a
                    href={`https://zalo.me/${app.userPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold rounded-xl transition"
                  >
                    Nhắn Zalo
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
