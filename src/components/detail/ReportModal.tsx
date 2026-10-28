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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-card-hover border border-[#E5E2D9] relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#777B78] hover:text-[#252725] rounded transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#E8EEE9] border border-[#23483D]/20 text-[#23483D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-[#252725]">Đã Tiếp Nhận Phản Ánh</h3>
            <p className="text-sm text-[#555955] font-normal leading-relaxed">
              Cảm ơn bạn đã đồng hành xây dựng cộng đồng lưu trú Thái Nguyên an toàn và minh bạch.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#E5E2D9]">
              <div className="w-10 h-10 rounded-md bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center shadow-whisper">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#252725] text-base">Báo Cáo Vi Phạm Tin Đăng</h3>
                <p className="text-xs text-[#777B78] line-clamp-1 mt-0.5">{room.title}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">Lý do báo cáo:</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm font-medium text-[#252725] focus:outline-none focus:border-[#23483D] focus:bg-white transition"
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
                <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">Mô tả chi tiết sự việc:</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả cụ thể trải nghiệm của bạn khi liên hệ hoặc xem phòng..."
                  className="w-full p-2.5 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm font-normal text-[#252725] focus:outline-none focus:border-[#23483D] focus:bg-white resize-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">Họ tên bạn:</label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm font-medium text-[#252725] focus:outline-none focus:border-[#23483D] focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">Số điện thoại:</label>
                  <input
                    type="tel"
                    value={reporterPhone}
                    onChange={(e) => setReporterPhone(e.target.value)}
                    placeholder="0988..."
                    className="w-full px-3 py-2 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm font-medium text-[#252725] focus:outline-none focus:border-[#23483D] focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-medium text-xs rounded-md shadow-whisper transition tracking-wide uppercase"
                >
                  Gửi báo cáo vi phạm
                </button>
                <p className="text-xs text-[#777B78] text-center mt-2 font-normal">
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