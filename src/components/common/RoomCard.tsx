import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const nearestUni = room.location.nearUniversities[0];

  return (
    <div
      onClick={() => onSelect(room.id)}
      className="group bg-white rounded-lg border border-[#E5E2D9] hover:border-[#23483D] shadow-whisper hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Section with 16:10 Architectural Aspect Ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF9F7]">
        <img
          key={currentImgIndex}
          src={room.images[currentImgIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Soft, Daylight Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Discreet Editorial Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#23483D] text-[11px] font-semibold px-2.5 py-1 rounded-sm shadow-whisper border border-[#E5E2D9]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#23483D]" />
                <span>CHÍNH CHỦ</span>
              </span>
            )}
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-sm backdrop-blur-sm bg-white/90 text-[#252725] border border-[#E5E2D9] shadow-whisper">
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
              className={`p-2 rounded-md backdrop-blur-sm transition shadow-whisper border ${
                isCompared
                  ? 'bg-[#23483D] border-[#23483D] text-white'
                  : 'bg-white/90 hover:bg-white border-[#E5E2D9] text-[#777B78] hover:text-[#23483D]'
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
              className={`p-2 rounded-md backdrop-blur-sm transition shadow-whisper border ${
                isFav
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white/90 hover:bg-white border-[#E5E2D9] text-[#777B78] hover:text-rose-600'
              }`}
              title={isFav ? 'Bỏ lưu' : 'Lưu tin'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Image Slider Controls */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#252725] flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-whisper"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#252725] flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-whisper"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Micro Slider Dots */}
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 pointer-events-none">
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentImgIndex ? 'bg-white w-4' : 'bg-white/60 w-1'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Rented Badge */}
        {room.status === 'rented' && (
          <div className="absolute bottom-2.5 left-3 bg-[#252725]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">
            ĐÃ CHO THUÊ
          </div>
        )}
      </div>

      {/* Content Area: Professional Real Estate Architectural Layout */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header: Large, Confident Anchor */}
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#23483D] tracking-tight">
                {formatCurrency(room.costs.rent, true)}
              </span>
              <span className="text-xs text-[#777B78] font-normal">/tháng</span>
            </div>

            <div className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E8EEE9] text-[#23483D] border border-[#C9DCD3]">
              {formatArea(room.area)}
            </div>
          </div>

          {/* Property Title: 2 full readable lines */}
          <h3 className="text-base sm:text-lg font-medium text-[#252725] line-clamp-2 leading-snug group-hover:text-[#23483D] transition mb-3">
            {room.title}
          </h3>

          {/* Location & Proximity Row */}
          <div className="space-y-1.5 mb-4 text-xs">
            <div className="flex items-center gap-1.5 text-[#555955] truncate">
              <MapPin className="w-3.5 h-3.5 text-[#23483D] shrink-0" />
              <span className="truncate">{room.location.address}</span>
            </div>

            {nearestUni && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FAF9F7] border border-[#E5E2D9] text-[#252725] font-medium">
                <span className="text-[#777B78]">Gần:</span>
                <span className="text-[#23483D] font-semibold">{nearestUni.name.replace('Trường ', '').replace('Đại học ', 'ĐH ')}</span>
                <span className="text-[#777B78]">({nearestUni.distanceKm} km)</span>
              </div>
            )}
          </div>
        </div>

        {/* Structured Specifications & Footer */}
        <div className="space-y-3 pt-3 border-t border-[#E5E2D9]">
          {/* Micro Specs Strip */}
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <div className="bg-[#FAF9F7] border border-[#E5E2D9] rounded px-2 py-1 flex items-center justify-center gap-1 text-[#252725]">
              <span className="text-[#777B78]">Ở:</span>
              <span className="font-semibold">{room.capacity} người</span>
            </div>
            <div className="bg-[#FAF9F7] border border-[#E5E2D9] rounded px-2 py-1 flex items-center justify-center gap-1 text-[#252725]" title={`Điện: ${room.costs.electricity} đ/kWh`}>
              <Zap className="w-3 h-3 text-[#23483D]" />
              <span className="font-semibold">{room.costs.electricity ? `${room.costs.electricity / 1000}k` : 'Free'}</span>
            </div>
            <div className="bg-[#FAF9F7] border border-[#E5E2D9] rounded px-2 py-1 flex items-center justify-center gap-1 text-[#252725]" title={`Nước: ${room.costs.water} đ`}>
              <Droplet className="w-3 h-3 text-[#23483D]" />
              <span className="font-semibold">{room.costs.water ? `${room.costs.water / 1000}k` : 'Free'}</span>
            </div>
          </div>

          {/* Time & Landlord Guarantee */}
          <div className="flex items-center justify-between text-[11px] text-[#777B78]">
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
