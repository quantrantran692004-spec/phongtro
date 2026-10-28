import React, { useState } from 'react';
import { ShieldAlert, X, CheckCircle2 } from 'lucide-react';
import { Room } from '../../types';
import { useRooms } from '../../context/RoomContext';
import { useAuth } from '../../context/AuthContext';

interface ReportModalProps {
  room: Room;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ room, onClose }) => {
  const { submitReport } = useRooms();
  const { currentUser } = useAuth();

  const [reason, setReason] = useState<any>('fake_info');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState(currentUser?.name || '');
  const [reporterPhone, setReporterPhone] = useState(currentUser?.phone || '');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      roomId: room.id,
      roomTitle: room.title,
      userId: currentUser?.id,
      reporterName: reporterName || 'Người dùng ẩn danh',
      reporterPhone,
      reason,
      description,
    });
    setIsDone(true);
    setTimeout(() => {
      onClose();
    }, 2000);
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

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Đã Tiếp Nhận Phản Ánh</h3>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Cảm ơn bạn đã đồng hành xây dựng cộng đồng lưu trú Thái Nguyên an toàn và minh bạch.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-xs">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">Báo Cáo Vi Phạm</h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{room.title}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Lý do báo cáo:</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                >
                  <option value="fake_info">Thông tin, hình ảnh không đúng thực tế</option>
                  <option value="price_mismatch">Giá thuê báo khác so với tin đăng</option>
                  <option value="fraud">Có dấu hiệu lừa đảo, bắt cọc online</option>
                  <option value="rented_already">Phòng đã cho thuê từ lâu</option>
                  <option value="bad_landlord">Thái độ chủ trọ thiếu tôn trọng</option>
                  <option value="other">Lý do khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mô tả chi tiết sự việc:</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả cụ thể trải nghiệm của bạn khi liên hệ hoặc xem phòng..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white resize-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Họ tên bạn:</label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Số điện thoại:</label>
                  <input
                    type="tel"
                    value={reporterPhone}
                    onChange={(e) => setReporterPhone(e.target.value)}
                    placeholder="0988..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full shadow-md transition tracking-wide uppercase"
                >
                  Gửi báo cáo vi phạm
                </button>
                <p className="text-xs text-slate-500 text-center mt-2.5 font-normal">
                  Thông tin phản ánh của bạn sẽ được ban quản trị xác minh bảo mật
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
