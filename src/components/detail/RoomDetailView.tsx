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
    <div className="bg-stone-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-brand-700 bg-white hover:bg-stone-100 border border-stone-200 px-3.5 py-2 rounded-xl transition shadow-subtle"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại tìm kiếm</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(room.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                isCompared
                  ? 'bg-clay-600 border-clay-600 text-white'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'Đã thêm so sánh' : 'So sánh'}</span>
            </button>

            <button
              onClick={() => toggleFavorite(room.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                isFav
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-600' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'Đã lưu' : 'Lưu tin'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl transition shadow-subtle"
              title="Chia sẻ tin"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2 bg-white border border-stone-200 text-stone-400 hover:text-rose-600 rounded-xl transition shadow-subtle"
              title="Báo cáo vi phạm"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Room Header Info */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-card p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-brand-200">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                <span>CHỦ TRỌ ĐÃ XÁC MINH</span>
              </span>
            )}
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700">
              {getRoomTypeLabel(room.roomType)}
            </span>
            <span className="text-xs text-stone-400 font-normal flex items-center gap-1 ml-auto">
              <Clock className="w-3 h-3" />
              <span>Cập nhật {formatRelativeTime(room.updatedAt)}</span>
            </span>
          </div>

          <h1 className="font-display text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug mb-2">
            {room.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500">
            <span className="flex items-center gap-1 font-medium text-stone-800">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <span>{room.location.address}</span>
            </span>
            <span>•</span>
            <span>{room.location.ward}, {room.location.district}</span>
          </div>
        </div>

        {/* Bento Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-8">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 shadow-card">
            <img
              src={room.images[activeImgIndex] || room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            {room.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev - 1 + room.images.length) % room.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev + 1) % room.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
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
                  idx === activeImgIndex ? 'border-brand-600 scale-[1.02]' : 'border-transparent opacity-75 hover:opacity-100'
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-subtle">
              <div className="p-2 border-r border-stone-100 last:border-0">
                <span className="text-[10px] font-bold text-stone-400 uppercase">Giá thuê</span>
                <div className="font-display text-lg font-extrabold text-brand-700 mt-0.5">
                  {formatCurrency(room.costs.rent, true)}
                </div>
              </div>

              <div className="p-2 border-r border-stone-100 last:border-0">
                <span className="text-[10px] font-bold text-stone-400 uppercase">Diện tích</span>
                <div className="text-base font-bold text-stone-900 mt-0.5 flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
                  <span>{formatArea(room.area)}</span>
                </div>
              </div>

              <div className="p-2 border-r border-stone-100 last:border-0">
                <span className="text-[10px] font-bold text-stone-400 uppercase">Tiền đặt cọc</span>
                <div className="text-base font-bold text-stone-800 mt-0.5">
                  {formatCurrency(room.costs.deposit, true)}
                </div>
              </div>

              <div className="p-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase">Trạng thái</span>
                <div className="text-xs font-bold text-brand-600 mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-500 inline-block animate-pulse"></span>
                  <span>{room.status === 'available' ? 'Còn phòng' : 'Đã thuê'}</span>
                </div>
              </div>
            </div>

            {/* Cost Calculator */}
            <CostCalculator costs={room.costs} />

            {/* Detailed Description */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-subtle p-6">
              <h3 className="font-display text-base font-bold text-stone-900 mb-2.5">
                Mô tả chi tiết phòng trọ
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line font-light">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-subtle p-6">
              <h3 className="font-display text-base font-bold text-stone-900 mb-3.5">
                Tiện nghi & Dịch vụ sẵn có
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ALL_AMENITIES.map((item) => {
                  const hasIt = room.amenities.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium transition ${
                        hasIt
                          ? 'bg-brand-50/70 border-brand-200 text-brand-900 font-semibold'
                          : 'bg-stone-50 border-stone-100 text-stone-400 opacity-60 line-through'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                        hasIt ? 'bg-brand-600 text-white' : 'bg-stone-200 text-stone-400'
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
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-subtle p-6">
              <h3 className="font-display text-base font-bold text-stone-900 mb-3">
                Nội quy & Điều kiện thuê
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                {room.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location & Universities Distance */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-subtle p-6">
              <h3 className="font-display text-base font-bold text-stone-900 mb-3">
                Khoảng cách các trường ĐH & KCN lân cận
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {room.location.nearUniversities.map((uni, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                    <span className="font-medium text-stone-800">{uni.name}</span>
                    <span className="font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/60">
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
            <div className="bg-white rounded-3xl border border-stone-200 shadow-card p-5">
              <div className="flex items-center gap-3 pb-3.5 border-b border-stone-100">
                <img
                  src={room.landlord.avatar}
                  alt={room.landlord.name}
                  className="w-12 h-12 rounded-xl object-cover border border-brand-500"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-sm text-stone-900">{room.landlord.name}</h4>
                    {room.landlord.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400">Phản hồi: {room.landlord.responseTime}</p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-0.5">
                    <span>⭐ {room.landlord.rating}</span>
                    <span className="text-stone-400 font-normal">({room.landlord.reviewCount} đánh giá)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="py-3.5 space-y-2">
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-subtle transition"
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
                    className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Nhắn Zalo chính chủ</span>
                  </a>
                )}

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-2.5 bg-clay-600 hover:bg-clay-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-subtle transition"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Hẹn lịch xem phòng miễn phí</span>
                </button>
              </div>

              <div className="pt-2.5 border-t border-stone-100 flex items-start gap-1.5 text-[11px] text-stone-400">
                <Info className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                <span>Trọ Thái Nguyên không thu phí sinh viên. Bạn hãy xem phòng trực tiếp trước khi quyết định nhé!</span>
              </div>
            </div>

            {/* Safety Commitment */}
            <div className="bg-brand-50/60 rounded-2xl border border-brand-200/80 p-3.5 text-xs text-brand-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-brand-800">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>Cam kết minh bạch từ Trọ Thái Nguyên</span>
              </div>
              <p className="text-brand-950/70 text-[11px] leading-relaxed">
                Phòng trọ này đã được rà soát số điện thoại chính chủ, không qua môi giới trung gian thu phí.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Rooms Section */}
        {similarRooms.length > 0 && (
          <div className="mt-12 pt-8 border-t border-stone-200">
            <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900 mb-5">
              Phòng trọ tương tự cùng khu vực
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
