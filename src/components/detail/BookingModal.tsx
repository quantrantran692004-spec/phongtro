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
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Đặt lịch thành công!</h3>
            <p className="text-sm text-slate-600">
              Chủ trọ <strong>{room.landlord.name}</strong> sẽ gọi điện hoặc nhắn tin Zalo cho bạn trước khi đến xem phòng nhé.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Hẹn lịch xem phòng trực tiếp</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{room.title}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ngày bạn muốn đến xem:
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
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
                      className={`p-2 rounded-xl border text-center transition font-medium ${
                        timeSlot === slot
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0988..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ghi chú cho chủ nhà (tùy chọn):
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="VD: Em là sinh viên năm nhất ĐH Sư Phạm, muốn qua xem phòng tầng 2 ạ..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition"
                >
                  Xác nhận đặt lịch xem phòng
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
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
