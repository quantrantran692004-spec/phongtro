import React, { useState } from 'react';
import { 
  Heart, 
  Scale, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Droplet, 
  Users, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Clock,
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

  const nearestUni = room.location.nearUniversities[0];

  return (
    <div
      onClick={() => onSelect(room.id)}
      className="group bg-white rounded-2xl border border-stone-200/80 hover:border-brand-500/50 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <img
          src={room.images[currentImgIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-stone-200/60">
                <ShieldCheck className="w-3 h-3 text-brand-600" />
                <span>CHÍNH CHỦ</span>
              </span>
            )}
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-md bg-stone-900/75 text-stone-100">
              {getRoomTypeLabel(room.roomType)}
            </span>
          </div>

          <div className="flex items-center gap-1 pointer-events-auto">
            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(room.id);
              }}
              className={`p-1.5 rounded-lg backdrop-blur-md transition shadow-xs ${
                isCompared
                  ? 'bg-clay-600 text-white'
                  : 'bg-white/90 hover:bg-white text-stone-700 hover:text-clay-600'
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
              className={`p-1.5 rounded-lg backdrop-blur-md transition shadow-xs ${
                isFav
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 hover:bg-white text-stone-700 hover:text-rose-500'
              }`}
              title={isFav ? 'Bỏ lưu' : 'Lưu tin'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Slider Controls */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 pointer-events-none">
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1 h-1 rounded-full transition-all ${
                    idx === currentImgIndex ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Rented Label */}
        {room.status === 'rented' && (
          <div className="absolute bottom-2 left-2.5 bg-stone-900/90 text-stone-200 text-[10px] font-bold px-2 py-0.5 rounded">
            ĐÃ CHO THUÊ
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-[18px] text-stone-900 tracking-tight">
                {formatCurrency(room.costs.rent, true)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <span>{formatArea(room.area)}</span>
              <span>•</span>
              <span>{room.capacity} người</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[13px] font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-brand-700 transition mb-2">
            {room.title}
          </h3>

          {/* Location */}
          <div className="space-y-1 text-xs text-stone-500 mb-3">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate">{room.location.address}</span>
            </div>

            {nearestUni && (
              <div className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                <span>Cách {nearestUni.name}:</span>
                <span className="font-bold">{nearestUni.distanceKm} km</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-0.5" title={`Điện: ${room.costs.electricity} đ/kWh`}>
              <Zap className="w-3 h-3 text-clay-500" />
              <span>{room.costs.electricity ? `${room.costs.electricity / 1000}k` : 'Free'}</span>
            </span>

            <span className="flex items-center gap-0.5" title={`Nước: ${room.costs.water} đ`}>
              <Droplet className="w-3 h-3 text-blue-500" />
              <span>{room.costs.water ? `${room.costs.water / 1000}k` : 'Free'}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <Clock className="w-3 h-3" />
            <span>{formatRelativeTime(room.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
