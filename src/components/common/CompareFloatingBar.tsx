import React from 'react';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useRooms } from '../../context/RoomContext';

interface CompareFloatingBarProps {
  onOpenCompare: () => void;
}

export const CompareFloatingBar: React.FC<CompareFloatingBarProps> = ({ onOpenCompare }) => {
  const { compareRooms, removeCompare, clearCompare } = useRooms();

  if (compareRooms.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 backdrop-blur-xl bg-slate-950/90 text-white rounded-full px-5 py-3 shadow-float border border-white/10 flex items-center gap-3 max-w-xl w-[92%] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>So sánh {compareRooms.length}/4 phòng</span>
          </div>
          <p className="text-[10px] text-slate-400 hidden sm:block">Đối chiếu chi phí & tiện nghi</p>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto py-0.5">
        {compareRooms.map((room) => (
          <div key={room.id} className="relative group shrink-0">
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-9 h-9 rounded-full object-cover border-2 border-slate-700"
            />
            <button
              onClick={() => removeCompare(room.id)}
              className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full p-0.5 shadow hover:scale-110 transition"
              title="Gỡ phòng này"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-2">
        <button
          onClick={clearCompare}
          className="text-white/50 hover:text-white text-xs px-3 py-2 rounded-full hover:bg-white/10 transition"
        >
          Xóa
        </button>

        <button
          onClick={onOpenCompare}
          className="bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold px-5 py-2 rounded-full transition flex items-center gap-1.5 shadow-sm"
        >
          <span>So sánh ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
