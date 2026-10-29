import React, { useState } from 'react';
import { 
  Heart, 
  Scale, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Droplet, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  Sparkles,
  Flame,
  Check
} from 'lucide-react';
import { Room } from '../../types';
import { formatCurrency, formatArea, getRoomTypeLabel, formatRelativeTime } from '../../utils/formatters';
import { useRooms } from '../../context/RoomContext';

interface RoomCardProps {
  room: Room;
  onSelect: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect }) => {
  const { toggleFavorite, isFavorite, toggleCompare, compareList } = useRooms();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const isFav = isFavorite(room.id);
  const isCompared = compareList.includes(room.id);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const nearestUni = room.location.nearUniversities?.[0];
  const isNearSamsung = room.location.ward === 'Phổ Yên' || room.location.address.toLowerCase().includes('samsung');

  // Utility transparency badge string
  const elecText = room.costs.electricity 
    ? (room.costs.electricity <= 3500 ? `⚡ Điện ${room.costs.electricity / 1000}k` : `⚡ Điện ${room.costs.electricity / 1000}k`) 
    : '⚡ Điện free';
  const waterText = room.costs.waterType === 'person'
    ? `Nước ${room.costs.water ? `${room.costs.water / 1000}k/người` : 'dân'}`
    : room.costs.waterType === 'counter'
    ? `Nước ${room.costs.water ? `${room.costs.water / 1000}k/khối` : 'dân'}`
    : 'Nước giá dân';

  const utilityBadge = `${elecText} • ${waterText}`;

  return (
    <div
      onClick={() => onSelect(room.id)}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* 1. Image Area with Airbnb-Plus 4:3 Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 rounded-t-2xl">
        <img
          key={currentImgIndex}
          src={room.images[currentImgIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

        {/* Top-Left Badges: Verified status or Gần KCN Samsung */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {room.isVerified ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-600/95 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md border border-emerald-400/40">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Đã khảo sát 100%</span>
            </span>
          ) : isNearSamsung ? (
            <span className="inline-flex items-center gap-1 bg-amber-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md border border-amber-400/30">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>🔥 Gần KCN Samsung</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-teal-700/85 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md border border-white/20">
              <Sparkles className="w-3 h-3" />
              <span>Chính chủ</span>
            </span>
          )}

          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md bg-slate-900/60 text-white border border-white/20">
            {getRoomTypeLabel(room.roomType)}
          </span>
        </div>

        {/* Top-Right Interactive Buttons: Heart (Save) & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Compare Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(room.id);
            }}
            className={`p-2 rounded-full border shadow-md transition-all duration-200 active:scale-95 ${
              isCompared
                ? 'bg-teal-600 border-teal-500 text-white'
                : 'bg-white/85 backdrop-blur-md border-white/80 text-slate-700 hover:bg-white hover:text-teal-700'
            }`}
            title={isCompared ? 'Bỏ so sánh' : 'Thêm vào so sánh'}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(room.id);
            }}
            className={`p-2 rounded-full border shadow-md transition-all duration-200 active:scale-95 ${
              isFav
                ? 'bg-rose-500 border-rose-500 text-white'
                : 'bg-white/85 backdrop-blur-md border-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
            }`}
            title={isFav ? 'Bỏ lưu' : 'Lưu tin phòng'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-white' : ''}`} />
          </button>
        </div>

        {/* Image Slider Controls (Appear on hover) */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
              aria-label="Ảnh sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Micro Slider Dots */}
            <div className="absolute bottom-2.5 right-3 flex justify-center gap-1 pointer-events-none z-10">
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImgIndex ? 'bg-white w-3.5' : 'bg-white/50 w-1.5'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* ĐÃ CHO THUÊ Overlay */}
        {room.status === 'rented' && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none">
            <span className="text-white font-extrabold text-xs tracking-widest uppercase bg-rose-600/90 px-3.5 py-1.5 rounded-full shadow-lg">
              ĐÃ CHO THUÊ
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Address & Proximity */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1 text-slate-500 text-xs truncate">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="truncate font-medium">{room.location.ward}, {room.location.district}</span>
            </div>

            <div className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
              {formatArea(room.area)}
            </div>
          </div>

          {/* Room Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-teal-700 transition-colors mb-2">
            {room.title}
          </h3>

          {/* Nearest University Badge */}
          {nearestUni && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50/80 border border-teal-100 text-teal-800 text-[11px] font-semibold">
                <span className="text-teal-600 font-normal">Gần:</span>
                <span>{nearestUni.name.replace('Trường ', '').replace('Đại học ', 'ĐH ')}</span>
                <span className="text-teal-600 font-bold">({nearestUni.distanceKm} km)</span>
              </span>
            </div>
          )}
        </div>

        {/* 3. Transparency Price Footer (Core tenant pain-point solver) */}
        <div className="pt-3 border-t border-slate-100 space-y-2 mt-auto">
          {/* Base Rent + Transparent Utility Badge */}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-teal-700 tracking-tight">
                {formatCurrency(room.costs.rent, true)}
              </span>
            </div>

            {/* Utility Transparency Badge */}
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full whitespace-nowrap">
              {utilityBadge}
            </span>
          </div>

          {/* Landlord Contact & Update Time */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-100/80">
            <span className="truncate font-medium text-slate-500">
              Chủ trọ: <strong className="text-slate-700 font-semibold">{room.landlord.name}</strong>
            </span>
            <span className="flex items-center gap-1 shrink-0 font-medium text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(room.updatedAt)}</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
