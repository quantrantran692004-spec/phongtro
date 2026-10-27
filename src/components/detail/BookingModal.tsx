import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MessageSquare, X, CheckCircle2 } from 'lucide-react';
import { Room } from '../../types';
import { useRooms } from '../../context/RoomContext';
import { useAuth } from '../../context/AuthContext';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ room, onClose }) => {
  const { bookAppointment } = useRooms();
  const { currentUser } = useAuth();

  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('14:00 - 15:30 (Chiều)');
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    bookAppointment({
      roomId: room.id,
      roomTitle: room.title,
      userId: currentUser?.id || 'guest-' + Date.now(),
      userName: name,
      userPhone: phone,
      date,
      timeSlot,
      note,
    });

    setIsSubmitted(true);
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

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-brand-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-charcoal-900">Đặt Lịch Thành Công!</h3>
            <p className="text-xs sm:text-sm text-charcoal-600 font-light">
              Chủ nhà <strong>{room.landlord.name}</strong> sẽ gọi điện hoặc nhắn tin Zalo cho bạn trước khi đến xem phòng nhé.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#E6E4DE]">
              <div className="w-9 h-9 rounded-sm bg-[#23483D] text-white flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-charcoal-900 text-base">Hẹn Lịch Khảo Sát Phòng Trực Tiếp</h3>
                <p className="text-xs text-charcoal-500 line-clamp-1">{room.title}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1">
                  Ngày bạn muốn đến xem:
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1">
                  Khung giờ thuận tiện:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    '08:30 - 10:00 (Sáng)',
                    '10:30 - 12:00 (Trưa)',
                    '14:00 - 15:30 (Chiều)',
                    '17:30 - 19:30 (Tối)',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`p-2 rounded-sm border text-center transition font-semibold ${
                        timeSlot === slot
                          ? 'bg-[#23483D] border-[#23483D] text-white font-bold'
                          : 'bg-[#F7F6F2] border-[#E6E4DE] text-charcoal-700 hover:bg-stone-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1">Họ và tên:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1">Số điện thoại:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0988..."
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-bold text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase tracking-wider mb-1">
                  Ghi chú cho chủ nhà (tùy chọn):
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="VD: Em là sinh viên năm nhất ĐH Sư Phạm, muốn qua xem phòng tầng 2 ạ..."
                  rows={2}
                  className="w-full p-2.5 bg-[#F7F6F2] border border-[#E6E4DE] rounded-sm text-xs font-medium text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-brand-700 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#23483D] hover:bg-[#1A372E] text-white font-bold text-xs rounded-sm shadow-whisper transition tracking-wider uppercase"
                >
                  Xác nhận đặt lịch xem phòng
                </button>
                <p className="text-[11px] text-charcoal-500 text-center mt-2 font-light">
                  Hoàn toàn miễn phí • Không bắt buộc thuê sau khi xem
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};