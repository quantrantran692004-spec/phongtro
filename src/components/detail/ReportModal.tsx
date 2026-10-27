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
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Đã tiếp nhận phản ánh</h3>
            <p className="text-xs text-slate-600">
              Cảm ơn bạn đã hỗ trợ xây dựng cộng đồng trọ Thái Nguyên an toàn và minh bạch!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Báo cáo tin đăng có vấn đề</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{room.title}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Lý do báo cáo:
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'fake_info', label: 'Thông tin hoặc hình ảnh phòng không đúng thực tế' },
                    { id: 'scam_deposit', label: 'Có dấu hiệu lừa đảo / ép chuyển khoản cọc trước' },
                    { id: 'wrong_price', label: 'Giá thuê thực tế khi hỏi khác giá bài đăng' },
                    { id: 'already_rented', label: 'Phòng đã cho thuê nhưng chủ nhà chưa gỡ' },
                    { id: 'other', label: 'Lý do khác' },
                  ].map((item) => (
                    <label
                      key={item.id}
                      onClick={() => setReason(item.id)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition ${
                        reason === item.id
                          ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold'
                          : 'hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        checked={reason === item.id}
                        onChange={() => setReason(item.id)}
                        className="accent-rose-600"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả chi tiết vi phạm:
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Vui lòng mô tả cụ thể tình huống bạn gặp phải..."
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md transition"
                >
                  Gửi báo cáo tới Ban quản trị
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
