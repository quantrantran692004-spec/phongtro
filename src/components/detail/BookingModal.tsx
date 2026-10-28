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
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-card-hover border border-[#E5E2D9] relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#777B78] hover:text-[#252725] rounded transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#E8EEE9] border border-[#23483D]/20 text-[#23483D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-[#252725]">Đặt Lịch Thành Công!</h3>
            <p className="text-sm text-[#555955] font-normal leading-relaxed">
              Chủ nhà <strong>{room.landlord.name}</strong> sẽ gọi điện hoặc nhắn tin Zalo cho bạn trước khi đến xem phòng.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#E5E2D9]">
              <div className="w-10 h-10 rounded-md bg-[#23483D] text-white flex items-center justify-center shadow-whisper">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#252725] text-base">Hẹn Lịch Xem Phòng Trực Tiếp</h3>
                <p className="text-xs text-[#777B78] line-clamp-1 mt-0.5">{room.title}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">
                  Ngày bạn muốn đến xem:
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#777B78] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm font-medium text-[#252725] focus:outline-none focus:border-[#23483D] focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">
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
                      className={`p-2.5 rounded-md border text-center transition font-medium ${
                        timeSlot === slot
                          ? 'bg-[#23483D] border-[#23483D] text-white'
                          : 'bg-[#FAF9F7] border-[#E5E2D9] text-[#252725] hover:bg-[#E8EEE9]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">Họ và tên:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full px-3 py-2 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm font-medium text-[#252725] focus:outline-none focus:border-[#23483D] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">Số điện thoại:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0988..."
                    className="w-full px-3 py-2 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm font-medium text-[#252725] focus:outline-none focus:border-[#23483D] focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555955] uppercase tracking-wider mb-1.5">
                  Ghi chú cho chủ nhà (tùy chọn):
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="VD: Em là sinh viên năm nhất ĐH Sư Phạm, muốn qua xem phòng tầng 2..."
                  rows={2}
                  className="w-full p-2.5 bg-[#FAF9F7] border border-[#E5E2D9] rounded-md text-sm font-normal text-[#252725] focus:outline-none focus:border-[#23483D] focus:bg-white resize-none transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-sm rounded-md shadow-whisper transition tracking-wide"
                >
                  Xác nhận đặt lịch xem phòng
                </button>
                <p className="text-xs text-[#777B78] text-center mt-2 font-normal">
                  Hoàn toàn miễn phí • Không phát sinh phí môi giới
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};