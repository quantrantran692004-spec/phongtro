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
      <div className="bg-white rounded-md max-w-md w-full p-6 shadow-elevated border border-[#E6E4DE] relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-charcoal-400 hover:text-charcoal-800 rounded transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-brand-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-charcoal-900">Đã Tiếp Nhận Phản Ánh</h3>
            <p className="text-xs text-charcoal-600 font-light">
              Cảm ơn bạn đã đồng hành hỗ trợ xây dựng cộng đồng lưu trú Thái Nguyên an toàn và minh bạch!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#E6E4DE]">
              <div className="w-9 h-9 rounded-sm bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-charcoal-900 text-base">Báo Cáo Vi Phạm Tin Đăng</h3>
                <p className="text-xs text-charcoal-500 line-clamp-1">{room.title}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5">Lý do báo cáo:</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white"
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
                <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1.5">Mô tả chi tiết sự việc:</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả cụ thể trải nghiệm của bạn khi liên hệ hoặc xem phòng..."
                  className="w-full p-2.5 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-medium text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1">Họ tên bạn:</label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full p-2 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-medium text-charcoal-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1">Số điện thoại:</label>
                  <input
                    type="tel"
                    value={reporterPhone}
                    onChange={(e) => setReporterPhone(e.target.value)}
                    placeholder="0988..."
                    className="w-full p-2 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-medium text-charcoal-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-sm shadow-whisper transition tracking-wider uppercase"
                >
                  Gửi báo cáo vi phạm
                </button>
                <p className="text-[11px] text-charcoal-500 text-center mt-2 font-light">
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