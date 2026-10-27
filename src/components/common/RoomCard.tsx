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
    <motion.div
      onClick={() => onSelect(room.id)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group bg-white rounded-md border border-[#E6E4DE] hover:border-charcoal-400 shadow-whisper hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7F6F2]">
        <motion.img
          key={currentImgIndex}
          initial={{ opacity: 0.95 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          src={room.images[currentImgIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {room.isVerified && (
              <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-brand-800 text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-whisper border border-[#E6E4DE] tracking-wider uppercase">
                <ShieldCheck className="w-3 h-3 text-brand-700" />
                <span>CHÍNH CHỦ</span>
              </span>
            )}
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm backdrop-blur-md bg-charcoal-900/80 text-white tracking-wide">
              {getRoomTypeLabel(room.roomType)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(room.id);
              }}
              className={`p-1.5 rounded-sm backdrop-blur-md transition shadow-whisper border ${
                isCompared
                  ? 'bg-brand-700 border-brand-700 text-white'
                  : 'bg-white/90 hover:bg-white border-[#E6E4DE] text-charcoal-800 hover:text-brand-700'
              }`}
              title={isCompared ? 'Bỏ so sánh' : 'So sánh'}
            >
              <Scale className="w-3.5 h-3.5" />
            </motion.button>

            {/* Favorite Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(room.id);
              }}
              className={`p-1.5 rounded-sm backdrop-blur-md transition shadow-whisper border ${
                isFav
                  ? 'bg-rose-600 border-rose-600 text-white'
                  : 'bg-white/90 hover:bg-white border-[#E6E4DE] text-charcoal-800 hover:text-rose-600'
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
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-charcoal-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-whisper border border-[#E6E4DE]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-charcoal-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-whisper border border-[#E6E4DE]"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Slider Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 pointer-events-none">
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentImgIndex ? 'bg-white w-3.5' : 'bg-white/60 w-1'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Rented Status Badge */}
        {room.status === 'rented' && (
          <div className="absolute bottom-2 left-2.5 bg-charcoal-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-whisper tracking-wider uppercase">
            ĐÃ CHO THUÊ
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Monthly Rent & Area/Capacity */}
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-display font-extrabold text-lg sm:text-xl text-brand-800 tracking-tight">
              {formatCurrency(room.costs.rent, true)}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-charcoal-600 font-semibold">
              <span>{formatArea(room.area)}</span>
              <span>•</span>
              <span>{room.capacity} người</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-charcoal-900 line-clamp-2 leading-snug group-hover:text-brand-800 transition mb-2">
            {room.title}
          </h3>

          {/* Location */}
          <div className="space-y-1 text-xs text-charcoal-600 mb-3 font-medium">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
              <span className="truncate">{room.location.address}</span>
            </div>

            {nearestUni && (
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-900 bg-[#F7F6F2] px-2 py-0.5 rounded-sm border border-[#E6E4DE]">
                <span>Cách {nearestUni.name}:</span>
                <span className="font-extrabold text-brand-800">{nearestUni.distanceKm} km</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer with specs */}
        <div className="pt-2.5 border-t border-[#E6E4DE] flex items-center justify-between text-xs text-charcoal-700 font-semibold">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title={`Điện: ${room.costs.electricity} đ/kWh`}>
              <Zap className="w-3.5 h-3.5 text-amber-700" />
              <span>{room.costs.electricity ? `${room.costs.electricity / 1000}k/số` : 'Free'}</span>
            </span>

            <span className="flex items-center gap-1" title={`Nước: ${room.costs.water} đ`}>
              <Droplet className="w-3.5 h-3.5 text-blue-700" />
              <span>{room.costs.water ? `${room.costs.water / 1000}k` : 'Free'}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-charcoal-500 text-[11px] font-medium">
            <Clock className="w-3 h-3" />
            <span>{formatRelativeTime(room.updatedAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};