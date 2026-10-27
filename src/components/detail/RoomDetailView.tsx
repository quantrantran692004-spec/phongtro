import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Scale, 
  Share2, 
  ShieldAlert, 
  ShieldCheck, 
  MapPin, 
  Maximize2, 
  Users, 
  Clock, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Check, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Room } from '../../types';
import { useRooms } from '../../context/RoomContext';
import { useToast } from '../../context/ToastContext';
import { ALL_AMENITIES, AMENITY_MAP } from '../../data/amenities';
import { formatCurrency, formatArea, getRoomTypeLabel, getRoomTypeBadgeColor, formatRelativeTime, maskPhoneNumber } from '../../utils/formatters';
import { CostCalculator } from './CostCalculator';
import { BookingModal } from './BookingModal';
import { ReportModal } from './ReportModal';
import { RoomCard } from '../common/RoomCard';

interface RoomDetailViewProps {
  room: Room;
  onBack: () => void;
  onSelectSimilarRoom: (roomId: string) => void;
}

export const RoomDetailView: React.FC<RoomDetailViewProps> = ({ room, onBack, onSelectSimilarRoom }) => {
  const { toggleFavorite, isFavorite, toggleCompare, compareList, rooms } = useRooms();
  const { showToast } = useToast();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const isFav = isFavorite(room.id);
  const isCompared = compareList.includes(room.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Đã sao chép liên kết phòng trọ vào bộ nhớ tạm!', 'success');
  };

  // Find similar rooms in same ward or similar price
  const similarRooms = rooms
    .filter((r) => r.id !== room.id && (r.location.ward === room.location.ward || Math.abs(r.costs.rent - room.costs.rent) <= 500000))
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl transition shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại tìm kiếm</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(room.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                isCompared
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">{isCompared ? 'Đã thêm so sánh' : 'So sánh'}</span>
            </button>

            <button
              onClick={() => toggleFavorite(room.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                isFav
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-rose-600' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'Đã lưu' : 'Lưu tin'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition shadow-2xs"
              title="Chia sẻ tin"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 rounded-xl transition shadow-2xs"
              title="Báo cáo tin sai / có vấn đề"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Room Header Info */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>CHỦ TRỌ ĐÃ ĐƯỢC XÁC MINH</span>
              </span>
            )}
            <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${getRoomTypeBadgeColor(room.roomType)}`}>
              {getRoomTypeLabel(room.roomType)}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              <span>Cập nhật {formatRelativeTime(room.updatedAt)}</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-3">
            {room.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-600 flex-wrap">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{room.location.address}</span>
            </span>
            <span>•</span>
            <span>{room.location.ward}, {room.location.district}</span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-8">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={room.images[activeImgIndex] || room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            {/* Slider Controls */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev - 1 + room.images.length) % room.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev + 1) % room.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
              Ảnh {activeImgIndex + 1} / {room.images.length}
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-2.5">
            {room.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                  idx === activeImgIndex ? 'border-emerald-500 scale-[1.02]' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Highlight Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft">
              <div className="border-r border-slate-100 last:border-0 p-2 text-center sm:text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Giá thuê</span>
                <div className="text-xl font-extrabold text-emerald-700 mt-0.5">
                  {formatCurrency(room.costs.rent, true)}
                </div>
              </div>

              <div className="border-r border-slate-100 last:border-0 p-2 text-center sm:text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Diện tích</span>
                <div className="text-xl font-extrabold text-slate-900 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                  <Maximize2 className="w-4 h-4 text-slate-400" />
                  <span>{formatArea(room.area)}</span>
                </div>
              </div>

              <div className="border-r border-slate-100 last:border-0 p-2 text-center sm:text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Tiền đặt cọc</span>
                <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {formatCurrency(room.costs.deposit, true)}
                </div>
              </div>

              <div className="p-2 text-center sm:text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Trạng thái</span>
                <div className="text-sm font-bold text-emerald-600 mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span>{room.status === 'available' ? 'Còn phòng' : 'Đã thuê'}</span>
                </div>
              </div>
            </div>

            {/* Transparent Cost Calculator */}
            <CostCalculator costs={room.costs} />

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Mô tả chi tiết phòng trọ</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Tiện nghi & Dịch vụ sẵn có</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALL_AMENITIES.map((item) => {
                  const hasIt = room.amenities.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition ${
                        hasIt
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-semibold'
                          : 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60 line-through'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        hasIt ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        {hasIt ? <Check className="w-3.5 h-3.5" /> : '×'}
                      </div>
                      <span className="truncate">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Nội quy & Điều kiện thuê</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {room.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location & Universities Distance */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Khoảng cách tới các trường ĐH & KCN</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {room.location.nearUniversities.map((uni, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm">
                    <span className="font-semibold text-slate-800">🎓 {uni.name}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {uni.distanceKm} km
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-5">
            {/* Host Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <img
                  src={room.landlord.avatar}
                  alt={room.landlord.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-base text-slate-900">{room.landlord.name}</h4>
                    {room.landlord.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500">Phản hồi: {room.landlord.responseTime}</p>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                    <span>⭐ {room.landlord.rating}</span>
                    <span className="text-slate-400 font-normal">({room.landlord.reviewCount} đánh giá)</span>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="py-4 space-y-2.5">
                {/* Reveal Phone Button */}
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>
                    {showPhone ? room.landlord.phone : `${maskPhoneNumber(room.landlord.phone)} (Bấm để xem số)`}
                  </span>
                </button>

                {/* Zalo Button */}
                {room.landlord.zaloPhone && (
                  <a
                    href={`https://zalo.me/${room.landlord.zaloPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Nhắn tin qua Zalo</span>
                  </a>
                )}

                {/* Book Appointment Modal Button */}
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Đặt lịch hẹn xem phòng trực tiếp</span>
                </button>
              </div>

              {/* Safety Reminder Note */}
              <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Trọ Thái Nguyên không thu phí sinh viên. Bạn hãy hẹn xem phòng trực tiếp trước khi quyết định đặt cọc nhé!
                </span>
              </div>
            </div>

            {/* Quick Safety Box */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 text-xs text-emerald-950 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4" />
                <span>Cam kết minh bạch từ Trọ Thái Nguyên</span>
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                Phòng trọ này đã được rà soát số điện thoại chính chủ, không thông qua môi giới trung gian thu phí.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Rooms Section */}
        {similarRooms.length > 0 && (
          <div className="mt-14 pt-8 border-t border-slate-200">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
              Các phòng trọ tương tự cùng khu vực
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarRooms.map((r) => (
                <RoomCard key={r.id} room={r} onSelect={onSelectSimilarRoom} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal room={room} onClose={() => setBookingModalOpen(false)} />
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <ReportModal room={room} onClose={() => setReportModalOpen(false)} />
      )}
    </div>
  );
};
