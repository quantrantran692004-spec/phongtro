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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/60 px-4 py-3 flex items-center gap-4 max-w-2xl w-[92%] sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>Đang chọn {compareRooms.length}/4 phòng</span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">Đối chiếu chi phí & tiện nghi</p>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {compareRooms.map((room) => (
          <div key={room.id} className="relative group shrink-0">
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-11 h-11 rounded-lg object-cover border border-slate-700"
            />
            <button
              onClick={() => removeCompare(room.id)}
              className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 shadow hover:scale-110 transition"
              title="Gỡ phòng này"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="text-[10px] text-slate-300 font-semibold text-center truncate max-w-[50px] mt-0.5">
              {formatCurrency(room.costs.rent, true)}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-2">
        <button
          onClick={clearCompare}
          className="text-xs text-slate-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-slate-800 transition"
        >
          Xóa
        </button>

        <button
          onClick={onOpenCompare}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-xl transition shadow"
        >
          <span>So sánh ({compareRooms.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
