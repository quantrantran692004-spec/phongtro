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
  Clock
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

  return (
    <div
      onClick={() => onSelect(room.id)}
      className="group bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col overflow-hidden cursor-pointer relative border border-slate-100"
    >
      {/* Image Area with 4:3 Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          key={currentImgIndex}
          src={room.images[currentImgIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges and Action Buttons */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none z-10">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CHÍNH CHỦ</span>
              </span>
            )}
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md bg-black/50 text-white border border-white/20">
              {getRoomTypeLabel(room.roomType)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(room.id);
              }}
              className={`p-2 rounded-full border shadow-sm transition ${
                isCompared
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70'
              }`}
              title={isCompared ? 'Bỏ so sánh' : 'So sánh'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(room.id);
              }}
              className={`p-2 rounded-full border shadow-sm transition ${
                isFav
                  ? 'bg-rose-500 border-rose-500 text-white'
                  : 'bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-rose-500'
              }`}
              title={isFav ? 'Bỏ lưu' : 'Lưu tin'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Price Badge Overlaid at Bottom-Left */}
        <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-md text-amber-300 font-bold text-sm px-3 py-1.5 rounded-full shadow-sm z-10">
          {formatCurrency(room.costs.rent, true)}
        </div>

        {/* Image Slider Controls */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 z-10"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 z-10"
              aria-label="Ảnh sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Micro Slider Dots */}
            <div className="absolute bottom-3 right-3 flex justify-center gap-1 pointer-events-none z-10">
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImgIndex ? 'bg-white w-4' : 'bg-white/60 w-1.5'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* ĐÃ CHO THUÊ Overlay */}
        {room.status === 'rented' && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none">
            <span className="text-white font-bold text-sm tracking-widest uppercase">
              ĐÃ CHO THUÊ
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Subtle Price Line & Area Badge */}
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-slate-900">
              {formatCurrency(room.costs.rent, true)}
            </span>
            <span className="text-slate-500 text-xs">/tháng</span>
          </div>

          <div className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {formatArea(room.area)}
          </div>
        </div>

        {/* Room Title */}
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-slate-700 transition mb-2">
          {room.title}
        </h3>

        {/* Address & Proximity */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-1 text-slate-500 text-xs truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{room.location.address}</span>
          </div>

          {nearestUni && (
            <div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium">
                <span className="text-blue-500 font-normal">Gần:</span>
                <span>{nearestUni.name.replace('Trường ', '').replace('Đại học ', 'ĐH ')}</span>
                <span className="text-blue-500 font-normal">({nearestUni.distanceKm} km)</span>
              </span>
            </div>
          )}
        </div>

        {/* Spec Strip & Footer */}
        <div className="mt-auto pt-3 border-t border-slate-100 space-y-2.5">
          {/* Spec Strip */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5">
              <span className="text-slate-400">Ở:</span>
              <span className="font-semibold text-slate-700">{room.capacity} người</span>
            </span>
            <span
              className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5"
              title={`Điện: ${room.costs.electricity} đ/kWh`}
            >
              <Zap className="w-3 h-3 text-amber-500" />
              <span className="font-semibold text-slate-700">
                {room.costs.electricity ? `${room.costs.electricity / 1000}k` : 'Free'}
              </span>
            </span>
            <span
              className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5"
              title={`Nước: ${room.costs.water} đ`}
            >
              <Droplet className="w-3 h-3 text-blue-500" />
              <span className="font-semibold text-slate-700">
                {room.costs.water ? `${room.costs.water / 1000}k` : 'Free'}
              </span>
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <span className="truncate">Chủ trọ: {room.landlord.name}</span>
            <span className="flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(room.updatedAt)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
