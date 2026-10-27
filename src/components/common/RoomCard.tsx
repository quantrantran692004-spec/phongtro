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
  Clock
} from 'lucide-react';
import { Room } from '../../types';
import { formatCurrency, formatArea, getRoomTypeLabel, getRoomTypeBadgeColor, formatRelativeTime } from '../../utils/formatters';
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
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Media Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={room.images[currentImgIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1 bg-emerald-600/95 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ĐÃ XÁC MINH</span>
              </span>
            )}
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border backdrop-blur-md bg-white/95 ${getRoomTypeBadgeColor(room.roomType)}`}>
              {getRoomTypeLabel(room.roomType)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(room.id);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition shadow-sm ${
                isCompared
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/90 hover:bg-white text-slate-700 hover:text-amber-600'
              }`}
              title={isCompared ? 'Bỏ so sánh' : 'Thêm vào so sánh'}
            >
              <Scale className="w-4 h-4" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(room.id);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition shadow-sm ${
                isFav
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500'
              }`}
              title={isFav ? 'Bỏ lưu' : 'Lưu tin'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Image Slider Controls (if multiple images) */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImgIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Status Tag (Bottom Left of Image) */}
        {room.status === 'rented' && (
          <div className="absolute bottom-2.5 left-3 bg-slate-900/90 text-slate-200 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
            ĐÃ CHO THUÊ
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Area Header */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-emerald-700 tracking-tight">
                {formatCurrency(room.costs.rent, true)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-0.5">
                <Maximize2 className="w-3.5 h-3.5" />
                {formatArea(room.area)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <Users className="w-3.5 h-3.5" />
                {room.capacity} người
              </span>
            </div>
          </div>

          {/* Room Title */}
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition mb-2">
            {room.title}
          </h3>

          {/* Location & University */}
          <div className="space-y-1 text-xs text-slate-600 mb-3">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{room.location.address}</span>
            </div>

            {nearestUni && (
              <div className="inline-flex items-center gap-1 text-[11px] font-medium text-tea-700 bg-tea-50 px-2 py-0.5 rounded-md">
                <span>🎓 Cách {nearestUni.name}:</span>
                <span className="font-bold">{nearestUni.distanceKm} km</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer of Card: Quick Utility Cost & Landlord Info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-600" title={`Điện: ${room.costs.electricity} đ/kWh`}>
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{room.costs.electricity ? `${room.costs.electricity / 1000}k` : 'Miễn phí'}</span>
            </span>

            <span className="flex items-center gap-1 text-slate-600" title={`Nước: ${room.costs.water} đ`}>
              <Droplet className="w-3.5 h-3.5 text-blue-500" />
              <span>{room.costs.water ? `${room.costs.water / 1000}k` : 'Miễn phí'}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="w-3 h-3" />
            <span>{formatRelativeTime(room.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
