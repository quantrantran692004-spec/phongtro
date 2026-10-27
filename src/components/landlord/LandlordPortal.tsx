import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Eye, 
  Calendar, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
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

  // Filter rooms belonging to current landlord or demo rooms
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
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Cổng quản lý dành cho Chủ Nhà Trọ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Quản lý danh sách phòng cho thuê
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Chủ trọ: <strong>{currentUser?.name || 'Cô Lan Tân Thịnh'}</strong> • SĐT: {currentUser?.phone || '0984512345'}
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md transition"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Đăng phòng trọ mới</span>
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <span className="text-xs font-bold text-slate-400 uppercase">Tổng số phòng</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {myRooms.length}
            </div>
            <span className="text-[11px] text-slate-500">Đang quản lý trên hệ thống</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <span className="text-xs font-bold text-slate-400 uppercase">Phòng còn trống</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
              {availableCount}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">Sẵn sàng đón khách</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <span className="text-xs font-bold text-slate-400 uppercase">Lượt xem tin</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">
              {totalViews}
            </div>
            <span className="text-[11px] text-slate-500">Từ sinh viên & người đi làm</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <span className="text-xs font-bold text-slate-400 uppercase">Lịch hẹn xem phòng</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
              {appointments.length}
            </div>
            <span className="text-[11px] text-slate-500">Đã đăng ký trực tuyến</span>
          </div>
        </div>

        {/* Room Listings Table / Cards */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-slate-900">
              Danh sách phòng ({myRooms.length})
            </h2>
            <span className="text-xs text-slate-400">Bấm nút để bật/tắt trạng thái phòng trống</span>
          </div>

          {myRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm mb-4">Bạn chưa có tin đăng phòng trọ nào.</p>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Đăng tin đầu tiên ngay
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 transition bg-slate-50/50 hover:bg-white"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-extrabold text-emerald-700">
                          {formatCurrency(room.costs.rent)}/tháng
                        </span>
                        <span>•</span>
                        <span className="text-xs text-slate-500 font-medium">{formatArea(room.area)}</span>
                        <span>•</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          room.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {room.status === 'available' ? 'CÒN TRỐNG' : 'ĐÃ CHO THUÊ'}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1 max-w-lg">
                        {room.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {room.location.address}, {room.location.ward}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {/* Toggle status */}
                    <button
                      onClick={() => toggleRoomStatus(room.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        room.status === 'available'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                      }`}
                      title="Chuyển đổi trạng thái Còn phòng <-> Đã thuê"
                    >
                      {room.status === 'available' ? 'Đánh dấu: ĐÃ THUÊ' : 'Đánh dấu: CÒN PHÒNG'}
                    </button>

                    {/* View */}
                    <button
                      onClick={() => onSelectRoom(room.id)}
                      className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl border border-slate-200"
                      title="Xem trang chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(room)}
                      className="p-2 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl border border-slate-200"
                      title="Chỉnh sửa tin"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa tin phòng trọ này?')) {
                          deleteRoom(room.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200"
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
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900">
              Danh sách sinh viên hẹn xem phòng ({appointments.length})
            </h2>
          </div>

          <div className="space-y-3">
            {appointments.map((app) => (
              <div
                key={app.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">{app.userName}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3" />
                      {app.userPhone}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {app.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    Phòng: <span className="font-bold text-slate-800">{app.roomTitle}</span>
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1 font-semibold text-emerald-700">
                      <Calendar className="w-3.5 h-3.5" />
                      {app.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {app.timeSlot}
                    </span>
                  </div>

                  {app.note && (
                    <p className="text-xs text-slate-500 italic mt-1 bg-white p-2 rounded-lg border border-slate-200">
                      "{app.note}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${app.userPhone}`}
                    className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Gọi điện</span>
                  </a>
                  <a
                    href={`https://zalo.me/${app.userPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs rounded-xl"
                  >
                    Zalo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {formModalOpen && (
        <RoomFormModal initialRoom={editingRoom} onClose={() => setFormModalOpen(false)} />
      )}
    </div>
  );
};
