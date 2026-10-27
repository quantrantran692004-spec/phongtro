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
  Clock, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Check, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { Room } from '../../types';
import { useRooms } from '../../context/RoomContext';
import { useToast } from '../../context/ToastContext';
import { ALL_AMENITIES } from '../../data/amenities';
import { formatCurrency, formatArea, getRoomTypeLabel, formatRelativeTime, maskPhoneNumber } from '../../utils/formatters';
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

  const similarRooms = rooms
    .filter((r) => r.id !== room.id && (r.location.ward === room.location.ward || Math.abs(r.costs.rent - room.costs.rent) <= 500000))
    .slice(0, 3);

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-7 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-800 hover:text-brand-800 bg-white hover:bg-stone-50 border border-[#E6E4DE] px-4 py-2 rounded-sm transition shadow-whisper tracking-wide"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại tìm kiếm</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(room.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold border transition shadow-whisper ${
                isCompared
                  ? 'bg-[#23483D] border-[#23483D] text-white'
                  : 'bg-white border-[#E6E4DE] text-charcoal-800 hover:bg-stone-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'Đã thêm so sánh' : 'So sánh'}</span>
            </button>

            <button
              onClick={() => toggleFavorite(room.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold border transition shadow-whisper ${
                isFav
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-[#E6E4DE] text-charcoal-800 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-600' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'Đã lưu' : 'Lưu tin'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-white border border-[#E6E4DE] text-charcoal-700 hover:bg-stone-50 rounded-sm transition shadow-whisper"
              title="Chia sẻ tin"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2 bg-white border border-[#E6E4DE] text-charcoal-400 hover:text-rose-600 rounded-sm transition shadow-whisper"
              title="Báo cáo vi phạm"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Room Header Info: Architectural Poise */}
        <div className="bg-white rounded-md border border-[#E6E4DE] shadow-whisper p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1 bg-[#F7F6F2] text-brand-900 text-[10px] font-mono tracking-wider uppercase font-bold px-2.5 py-0.5 rounded-sm border border-[#E6E4DE]">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
                <span>CHỦ TRỌ ĐÃ THẨM ĐỊNH</span>
              </span>
            )}
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-sm bg-[#F7F6F2] text-charcoal-800 border border-[#E6E4DE] uppercase tracking-wider">
              {getRoomTypeLabel(room.roomType)}
            </span>
            <span className="text-xs text-charcoal-500 font-medium flex items-center gap-1 ml-auto">
              <Clock className="w-3.5 h-3.5 text-charcoal-400" />
              <span>Cập nhật {formatRelativeTime(room.updatedAt)}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif text-charcoal-900 tracking-tight leading-snug mb-2.5">
            {room.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-charcoal-600">
            <span className="flex items-center gap-1 font-semibold text-charcoal-900">
              <MapPin className="w-4 h-4 text-brand-700 shrink-0" />
              <span>{room.location.address}</span>
            </span>
            <span>•</span>
            <span>{room.location.ward}, {room.location.district}</span>
          </div>
        </div>

        {/* Bento Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 mb-8">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-sm overflow-hidden bg-charcoal-900 shadow-whisper border border-[#E6E4DE]">
            <img
              src={room.images[activeImgIndex] || room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            {room.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev - 1 + room.images.length) % room.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 shadow-whisper"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev + 1) % room.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 shadow-whisper"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-sm">
              Ảnh {activeImgIndex + 1} / {room.images.length}
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-2.5">
            {room.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer border-2 transition ${
                  idx === activeImgIndex ? 'border-[#23483D]' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-5 rounded-md border border-[#E6E4DE] shadow-whisper">
              <div className="p-2 border-r border-[#E6E4DE] last:border-0">
                <span className="text-[10px] font-mono font-bold text-charcoal-500 uppercase tracking-wider">Giá thuê</span>
                <div className="text-xl font-display font-extrabold text-brand-800 mt-1">
                  {formatCurrency(room.costs.rent, true)}
                </div>
              </div>

              <div className="p-2 border-r border-[#E6E4DE] last:border-0">
                <span className="text-[10px] font-mono font-bold text-charcoal-500 uppercase tracking-wider">Diện tích</span>
                <div className="text-base font-bold text-charcoal-900 mt-1 flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-charcoal-400" />
                  <span>{formatArea(room.area)}</span>
                </div>
              </div>

              <div className="p-2 border-r border-[#E6E4DE] last:border-0">
                <span className="text-[10px] font-mono font-bold text-charcoal-500 uppercase tracking-wider">Tiền cọc</span>
                <div className="text-base font-bold text-charcoal-900 mt-1">
                  {formatCurrency(room.costs.deposit, true)}
                </div>
              </div>

              <div className="p-2">
                <span className="text-[10px] font-mono font-bold text-charcoal-500 uppercase tracking-wider">Tình trạng</span>
                <div className="text-xs font-bold text-brand-800 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                  <span>{room.status === 'available' ? 'Còn phòng' : 'Đã thuê'}</span>
                </div>
              </div>
            </div>

            {/* Cost Calculator */}
            <CostCalculator costs={room.costs} />

            {/* Detailed Description */}
            <div className="bg-white rounded-md border border-[#E6E4DE] shadow-whisper p-6 sm:p-7">
              <h3 className="text-base font-bold text-charcoal-900 mb-3">
                Mô tả chi tiết phòng trọ
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed whitespace-pre-line font-normal">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-md border border-[#E6E4DE] shadow-whisper p-6 sm:p-7">
              <h3 className="text-base font-bold text-charcoal-900 mb-4">
                Tiện nghi & Dịch vụ sẵn có
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ALL_AMENITIES.map((item) => {
                  const hasIt = room.amenities.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-2.5 p-2.5 rounded-sm border text-xs font-semibold transition ${
                        hasIt
                          ? 'bg-[#F7F6F2] border-[#E6E4DE] text-charcoal-900'
                          : 'bg-white border-[#E6E4DE] text-stone-400 line-through'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-sm flex items-center justify-center shrink-0 ${
                        hasIt ? 'bg-[#23483D] text-white' : 'bg-stone-200 text-stone-400'
                      }`}>
                        {hasIt ? <Check className="w-3 h-3" /> : '×'}
                      </div>
                      <span className="truncate">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-md border border-[#E6E4DE] shadow-whisper p-6 sm:p-7">
              <h3 className="text-base font-bold text-charcoal-900 mb-3">
                Nội quy & Điều kiện thuê phòng
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-charcoal-700 font-medium">
                {room.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location & Universities Distance */}
            <div className="bg-white rounded-md border border-[#E6E4DE] shadow-whisper p-6 sm:p-7">
              <h3 className="text-base font-bold text-charcoal-900 mb-3">
                Khoảng cách các trường ĐH & KCN lân cận
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.location.nearUniversities.map((uni, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#F7F6F2] rounded-sm border border-[#E6E4DE] text-xs">
                    <span className="font-bold text-charcoal-900">{uni.name}</span>
                    <span className="font-bold text-brand-900 bg-white px-2 py-0.5 rounded-sm border border-[#E6E4DE]">
                      {uni.distanceKm} km
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-22 space-y-4">
            {/* Host Card */}
            <div className="bg-white rounded-md border border-[#E6E4DE] shadow-whisper p-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#E6E4DE]">
                <img
                  src={room.landlord.avatar}
                  alt={room.landlord.name}
                  className="w-13 h-13 rounded-sm object-cover border-2 border-brand-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-charcoal-900">{room.landlord.name}</h4>
                    {room.landlord.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
                    )}
                  </div>
                  <p className="text-[11px] text-charcoal-500 font-medium mt-0.5">Phản hồi: {room.landlord.responseTime}</p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-700 font-bold mt-0.5">
                    <span>⭐ {room.landlord.rating}</span>
                    <span className="text-charcoal-500 font-normal">({room.landlord.reviewCount} đánh giá)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="py-4 space-y-2.5">
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full py-3 bg-[#23483D] hover:bg-[#1A372E] text-white rounded-sm font-bold text-xs flex items-center justify-center gap-2 shadow-whisper transition tracking-wider uppercase"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>
                    {showPhone ? room.landlord.phone : `${maskPhoneNumber(room.landlord.phone)} (Hiện SĐT)`}
                  </span>
                </button>

                {room.landlord.zaloPhone && (
                  <a
                    href={`https://zalo.me/${room.landlord.zaloPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-sm font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Nhắn Zalo chính chủ</span>
                  </a>
                )}

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-3 bg-charcoal-900 hover:bg-black text-white font-bold text-xs rounded-sm flex items-center justify-center gap-2 shadow-whisper transition tracking-wider uppercase"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Hẹn lịch xem phòng miễn phí</span>
                </button>
              </div>

              <div className="pt-3 border-t border-[#E6E4DE] flex items-start gap-2 text-[11px] text-charcoal-600 font-medium">
                <Info className="w-3.5 h-3.5 text-brand-700 shrink-0 mt-0.5" />
                <span>Trọ Thái Nguyên cam kết không thu phí người thuê. Bạn hãy đến xem phòng trực tiếp trước khi đặt cọc nhé!</span>
              </div>
            </div>

            {/* Safety Commitment */}
            <div className="bg-[#F2F6F4] rounded-sm border border-[#C9DCD3] p-4 text-xs text-brand-900 space-y-1.5">
              <div className="font-bold flex items-center gap-2 text-brand-900">
                <ShieldCheck className="w-4 h-4 text-brand-700" />
                <span>Cam kết minh bạch từ Trọ Thái Nguyên</span>
              </div>
              <p className="text-charcoal-700 text-[11px] leading-relaxed">
                Phòng trọ này đã được rà soát số điện thoại chính chủ, không qua môi giới trung gian thu phí.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Rooms Section */}
        {similarRooms.length > 0 && (
          <div className="mt-14 pt-10 border-t border-[#E6E4DE]">
            <h3 className="text-xl sm:text-2xl font-serif text-charcoal-900 mb-6">
              Không Gian Tương Tự Cùng Khu Vực
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarRooms.map((r) => (
                <RoomCard key={r.id} room={r} onSelect={onSelectSimilarRoom} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {bookingModalOpen && (
        <BookingModal room={room} onClose={() => setBookingModalOpen(false)} />
      )}
      {reportModalOpen && (
        <ReportModal room={room} onClose={() => setReportModalOpen(false)} />
      )}
    </div>
  );
};