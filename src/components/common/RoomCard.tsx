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
  Clock,
  Sparkles
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
    <motion.div
      onClick={() => onSelect(room.id)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group bg-white rounded-2xl border border-stone-200 hover:border-brand-600 shadow-sm hover:shadow-card-hover transition-colors flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <motion.img
          key={currentImgIndex}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          src={room.images[currentImgIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1 bg-white text-brand-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-stone-200">
                <ShieldCheck className="w-3 h-3 text-brand-700" />
                <span>CHÍNH CHỦ</span>
              </span>
            )}
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-md bg-stone-900/80 text-white">
              {getRoomTypeLabel(room.roomType)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Toggle */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(room.id);
              }}
              className={`p-1.5 rounded-lg backdrop-blur-md transition shadow-xs ${
                isCompared
                  ? 'bg-clay-600 text-white'
                  : 'bg-white/90 hover:bg-white text-stone-800 hover:text-clay-600'
              }`}
              title={isCompared ? 'Bỏ so sánh' : 'So sánh'}
            >
              <Scale className="w-3.5 h-3.5" />
            </motion.button>

            {/* Favorite Toggle with Spring Pulse */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(room.id);
              }}
              className={`p-1.5 rounded-lg backdrop-blur-md transition shadow-xs ${
                isFav
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 hover:bg-white text-stone-800 hover:text-rose-500'
              }`}
              title={isFav ? 'Bỏ lưu' : 'Lưu tin'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Image Slider Arrows */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 pointer-events-none">
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

        {/* Rented Label */}
        {room.status === 'rented' && (
          <div className="absolute bottom-2 left-2.5 bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
            ĐÃ CHO THUÊ
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-extrabold text-lg sm:text-xl text-brand-800 tracking-tight">
              {formatCurrency(room.costs.rent, true)}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-stone-700 font-bold">
              <span>{formatArea(room.area)}</span>
              <span>•</span>
              <span>{room.capacity} người</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-stone-900 line-clamp-2 leading-snug group-hover:text-brand-800 transition mb-2">
            {room.title}
          </h3>

          {/* Location */}
          <div className="space-y-1 text-xs text-stone-700 mb-3 font-medium">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-stone-600 shrink-0" />
              <span className="truncate">{room.location.address}</span>
            </div>

            {nearestUni && (
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-900 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                <span>Cách {nearestUni.name}:</span>
                <span className="font-extrabold">{nearestUni.distanceKm} km</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer with specs */}
        <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-700 font-semibold">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-0.5 font-semibold" title={`Điện: ${room.costs.electricity} đ/kWh`}>
              <Zap className="w-3 h-3 text-clay-600" />
              <span>{room.costs.electricity ? `${room.costs.electricity / 1000}k/số` : 'Free'}</span>
            </span>

            <span className="flex items-center gap-0.5 font-semibold" title={`Nước: ${room.costs.water} đ`}>
              <Droplet className="w-3 h-3 text-blue-600" />
              <span>{room.costs.water ? `${room.costs.water / 1000}k` : 'Free'}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-stone-600 text-[11px] font-medium">
            <Clock className="w-3 h-3" />
            <span>{formatRelativeTime(room.updatedAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
