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
  Info,
  Sparkles
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
    <div className="bg-[#F8FAFC] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-full transition shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại tìm kiếm</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(room.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border transition shadow-xs ${
                isCompared
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'Đã thêm so sánh' : 'So sánh'}</span>
            </button>

            <button
              onClick={() => toggleFavorite(room.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border transition shadow-xs ${
                isFav
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-600' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'Đã lưu' : 'Lưu tin'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition shadow-xs"
              title="Chia sẻ tin"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition shadow-xs"
              title="Báo cáo vi phạm"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Room Header Info */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CHỦ TRỌ ĐÃ THẨM ĐỊNH</span>
              </span>
            )}
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">
              {getRoomTypeLabel(room.roomType)}
            </span>
            <span className="text-xs text-slate-500 font-normal flex items-center gap-1.5 ml-auto">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Cập nhật {formatRelativeTime(room.updatedAt)}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-slate-900 tracking-tight leading-snug mb-3.5">
            {room.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{room.location.address}</span>
            </span>
            <span>•</span>
            <span>{room.location.ward}, {room.location.district}</span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200">
            <img
              src={room.images[activeImgIndex] || room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            {room.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev - 1 + room.images.length) % room.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 shadow-md backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev + 1) % room.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 shadow-md backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-white/20">
              Ảnh {activeImgIndex + 1} / {room.images.length}
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-3">
            {room.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                  idx === activeImgIndex 
                    ? 'border-amber-500 shadow-md scale-[1.02]' 
                    : 'border-transparent opacity-75 hover:opacity-100 hover:scale-[1.01]'
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="p-3 border-r border-slate-100 last:border-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Giá thuê</span>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {formatCurrency(room.costs.rent, true)}
                </div>
              </div>

              <div className="p-3 border-r border-slate-100 last:border-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Diện tích</span>
                <div className="text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-amber-600" />
                  <span>{formatArea(room.area)}</span>
                </div>
              </div>

              <div className="p-3 border-r border-slate-100 last:border-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tiền cọc</span>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {formatCurrency(room.costs.deposit, true)}
                </div>
              </div>

              <div className="p-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tình trạng</span>
                <div className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span>{room.status === 'available' ? 'Còn phòng' : 'Đã thuê'}</span>
                </div>
              </div>
            </div>

            {/* Cost Calculator */}
            <CostCalculator costs={room.costs} />

            {/* Detailed Description */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
                Mô tả chi tiết phòng trọ
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">
                Tiện nghi & Dịch vụ sẵn có
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALL_AMENITIES.map((item) => {
                  const hasIt = room.amenities.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-semibold transition ${
                        hasIt
                          ? 'bg-slate-50/80 border-slate-200 text-slate-900'
                          : 'bg-white border-slate-100 text-slate-300 line-through'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        hasIt ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-300'
                      }`}>
                        {hasIt ? <Check className="w-3.5 h-3.5" /> : '×'}
                      </div>
                      <span className="truncate">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
                Nội quy & Điều kiện thuê phòng
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-normal">
                {room.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location & Universities Distance */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
                Khoảng cách các trường ĐH & KCN lân cận
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.location.nearUniversities.map((uni, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-xs">
                    <span className="font-semibold text-slate-800">{uni.name}</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {uni.distanceKm} km
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            {/* Host Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <img
                  src={room.landlord.avatar}
                  alt={room.landlord.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-900 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-base text-slate-900">{room.landlord.name}</h4>
                    {room.landlord.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">Phản hồi: {room.landlord.responseTime}</p>
                  <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-1">
                    <span>⭐ {room.landlord.rating}</span>
                    <span className="text-slate-400 font-normal">({room.landlord.reviewCount} đánh giá)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="py-5 space-y-3">
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-md transition tracking-wider uppercase"
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
                    className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Nhắn Zalo chính chủ</span>
                  </a>
                )}

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition tracking-wider uppercase"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Hẹn lịch xem phòng miễn phí</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed font-normal">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Trọ Thái Nguyên cam kết không thu phí người thuê. Hãy đến kiểm tra phòng trực tiếp trước khi đặt cọc nhé!</span>
              </div>
            </div>

            {/* Safety Commitment Card */}
            <div className="bg-emerald-50/80 rounded-2xl border border-emerald-200/80 p-5 text-xs text-emerald-950 space-y-1.5 shadow-xs">
              <div className="font-bold flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cam kết minh bạch từ Trọ Thái Nguyên</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed font-normal">
                Phòng trọ này đã được rà soát số điện thoại chính chủ, không qua môi giới trung gian thu phí.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Rooms Section */}
        {similarRooms.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900 tracking-tight mb-7">
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
