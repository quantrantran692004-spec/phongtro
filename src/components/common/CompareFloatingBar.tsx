import React from 'react';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useRooms } from '../../context/RoomContext';
import { formatCurrency } from '../../utils/formatters';

interface CompareFloatingBarProps {
  onOpenCompare: () => void;
}

export const CompareFloatingBar: React.FC<CompareFloatingBarProps> = ({ onOpenCompare }) => {
  const { compareRooms, removeCompare, clearCompare } = useRooms();

  if (compareRooms.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#161816]/95 backdrop-blur-md text-white rounded-md shadow-elevated border border-[#2A2E2A] px-4 py-2.5 flex items-center gap-3.5 max-w-xl w-[92%] sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-250">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-sm bg-[#23483D] text-white flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>So sánh {compareRooms.length}/4 phòng</span>
          </div>
          <p className="text-[10px] text-stone-400 hidden sm:block">Đối chiếu chi phí & tiện nghi</p>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        {compareRooms.map((room) => (
          <div key={room.id} className="relative group shrink-0">
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-10 h-10 rounded-sm object-cover border border-[#2A2E2A]"
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
      <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-2">
        <button
          onClick={clearCompare}
          className="text-xs text-stone-400 hover:text-white px-2 py-1 rounded transition"
        >
          Xóa
        </button>

        <button
          onClick={onOpenCompare}
          className="flex items-center gap-1.5 bg-[#23483D] hover:bg-[#1A372E] text-white text-xs font-bold px-3.5 py-1.5 rounded-sm transition shadow-whisper tracking-wider uppercase"
        >
          <span>So sánh ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};