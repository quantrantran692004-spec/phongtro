import React from 'react';
import { Scale, X, Check, ArrowRight, Trash2 } from 'lucide-react';
import { useRooms } from '../../context/RoomContext';
import { ALL_AMENITIES } from '../../data/amenities';
import { formatCurrency, formatArea, getRoomTypeLabel } from '../../utils/formatters';

interface ComparisonModalProps {
  onClose: () => void;
  onSelectRoom: (roomId: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ onClose, onSelectRoom }) => {
  const { compareRooms, removeCompare, clearCompare } = useRooms();

  if (compareRooms.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center shadow-[0_24px_48px_rgba(0,0,0,0.2)] border border-slate-200 relative animate-in zoom-in-95 duration-200">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Scale className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Chưa Chọn Phòng So Sánh</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed font-normal">
            Bạn hãy bấm vào biểu tượng cân ở góc ảnh các phòng trọ để thêm vào danh sách đối chiếu nhé!
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full uppercase tracking-wider shadow-md transition"
          >
            Quay lại tìm phòng
          </button>
        </div>
      </div>
    );
  }

  const lowestRent = Math.min(...compareRooms.map((r) => r.costs.rent));

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-[0_24px_48px_rgba(0,0,0,0.2)] border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Scale className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Bảng Đối Chiếu So Sánh ({compareRooms.length} phòng)
              </h2>
              <p className="text-xs text-slate-500">Xem trực quan sự khác biệt về giá thuê, tiền cọc và tiện nghi thực tế</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-full hover:bg-slate-100 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa tất cả</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto flex-1 p-5 sm:p-6">
          <table className="w-full border-collapse min-w-[620px] text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="w-36 sm:w-44 p-3.5 text-left font-bold text-slate-500 uppercase text-[11px] tracking-wider align-top bg-slate-50/80 rounded-tl-2xl">
                  Thông tin phòng
                </th>
                {compareRooms.map((room) => (
                  <th key={room.id} className="p-3.5 text-left font-normal align-top min-w-[200px]">
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-2.5 bg-slate-100 border border-slate-200 shadow-xs">
                      <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeCompare(room.id)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-full transition backdrop-blur-xs"
                        title="Bỏ phòng"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-sm font-bold text-slate-900 line-clamp-2 mb-1.5 leading-snug">
                      {room.title}
                    </div>

                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {getRoomTypeLabel(room.roomType)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Row: Price */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-600 bg-slate-50/80">Giá thuê / tháng</td>
                {compareRooms.map((room) => {
                  const isBest = room.costs.rent === lowestRent;
                  return (
                    <td key={room.id} className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${isBest ? 'text-amber-600' : 'text-slate-900'}`}>
                          {formatCurrency(room.costs.rent)}
                        </span>
                        {isBest && (
                          <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200/80 px-2 py-0.5 rounded-full font-bold">
                            Tốt nhất
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Area */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-600 bg-slate-50/80">Diện tích</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3.5 font-semibold text-slate-900">
                    {formatArea(room.area)}
                  </td>
                ))}
              </tr>

              {/* Row: Deposit */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-600 bg-slate-50/80">Tiền cọc</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3.5 text-slate-800 font-semibold">
                    {formatCurrency(room.costs.deposit)}
                  </td>
                ))}
              </tr>

              {/* Row: Electricity */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-600 bg-slate-50/80">Giá điện</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3.5 text-slate-800 font-medium">
                    {room.costs.electricity ? `${room.costs.electricity.toLocaleString('vi-VN')} đ/kWh` : 'Miễn phí'}
                  </td>
                ))}
              </tr>

              {/* Row: Water */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-600 bg-slate-50/80">Giá nước</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3.5 text-slate-800 font-medium">
                    {room.costs.water ? `${room.costs.water.toLocaleString('vi-VN')} đ/tháng` : 'Miễn phí'}
                  </td>
                ))}
              </tr>

              {/* Row: Address */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-600 bg-slate-50/80">Địa chỉ & Phường</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3.5 text-slate-600">
                    <div className="font-bold text-slate-900">{room.location.ward}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{room.location.address}</div>
                  </td>
                ))}
              </tr>

              {/* Amenities comparison */}
              {ALL_AMENITIES.map((amenity) => {
                return (
                  <tr key={amenity.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/80 truncate">{amenity.name}</td>
                    {compareRooms.map((room) => {
                      const hasAmenity = room.amenities.includes(amenity.id);
                      return (
                        <td key={room.id} className="p-3">
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Có</span>
                            </span>
                          ) : (
                            <span className="text-slate-300 font-normal">Không</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Action Buttons Row */}
              <tr>
                <td className="p-4 bg-slate-50/80 rounded-bl-2xl"></td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-4">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectRoom(room.id);
                      }}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-md transition flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <span>Xem phòng</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
