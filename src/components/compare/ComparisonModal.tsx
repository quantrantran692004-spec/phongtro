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
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-md max-w-sm w-full p-6 text-center shadow-card border border-[#E6E4DE] relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-charcoal-400 hover:text-charcoal-800 rounded">
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-sm bg-[#F7F6F2] border border-[#E6E4DE] text-brand-700 flex items-center justify-center mx-auto mb-3">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1.5">Chưa Chọn Phòng So Sánh</h3>
          <p className="text-xs text-charcoal-600 mb-5 leading-relaxed">
            Bạn hãy bấm vào biểu tượng cân ở góc ảnh các phòng trọ để thêm vào danh sách đối chiếu nhé!
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#23483D] text-white font-bold text-xs rounded-sm uppercase tracking-wider shadow-whisper"
          >
            Quay lại tìm phòng
          </button>
        </div>
      </div>
    );
  }

  const lowestRent = Math.min(...compareRooms.map((r) => r.costs.rent));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-md w-full max-w-6xl max-h-[92vh] flex flex-col shadow-elevated border border-[#E6E4DE] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E6E4DE] flex items-center justify-between bg-[#F7F6F2]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#23483D] text-white flex items-center justify-center shadow-whisper">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-charcoal-900">
                Bảng So Sánh Đối Chiếu ({compareRooms.length} không gian)
              </h2>
              <p className="text-[11px] text-charcoal-500">Xem sự khác biệt về giá thuê, tiền cọc và tiện nghi thực tế</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-charcoal-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa tất cả</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-charcoal-400 hover:text-charcoal-800 rounded hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto flex-1 p-4 sm:p-6">
          <table className="w-full border-collapse min-w-[620px] text-xs">
            <thead>
              <tr className="border-b border-[#E6E4DE]">
                <th className="w-36 sm:w-44 p-3 text-left font-mono font-bold text-charcoal-500 uppercase text-[10px] tracking-wider align-top bg-[#F7F6F2]">
                  Thông tin phòng
                </th>
                {compareRooms.map((room) => (
                  <th key={room.id} className="p-3 text-left font-normal align-top min-w-[190px]">
                    <div className="relative rounded-sm overflow-hidden aspect-[16/10] mb-2 bg-[#F7F6F2] border border-[#E6E4DE]">
                      <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeCompare(room.id)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-full transition"
                        title="Bỏ phòng"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-charcoal-900 line-clamp-2 mb-1">
                      {room.title}
                    </div>

                    <span className="text-[10px] font-medium text-charcoal-600 bg-[#F7F6F2] px-2 py-0.5 rounded-sm border border-[#E6E4DE]">
                      {getRoomTypeLabel(room.roomType)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E6E4DE]">
              {/* Row: Price */}
              <tr className="hover:bg-[#F7F6F2]/50">
                <td className="p-3 font-bold text-charcoal-700 bg-[#F7F6F2]">Giá thuê/tháng</td>
                {compareRooms.map((room) => {
                  const isBest = room.costs.rent === lowestRent;
                  return (
                    <td key={room.id} className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-display text-sm font-extrabold ${isBest ? 'text-brand-800' : 'text-charcoal-900'}`}>
                          {formatCurrency(room.costs.rent)}
                        </span>
                        {isBest && (
                          <span className="text-[10px] bg-emerald-100 text-brand-900 px-1.5 py-0.2 rounded font-bold">
                            Tốt nhất
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Area */}
              <tr className="hover:bg-[#F7F6F2]/50">
                <td className="p-3 font-bold text-charcoal-700 bg-[#F7F6F2]">Diện tích</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 font-semibold text-charcoal-800">
                    {formatArea(room.area)}
                  </td>
                ))}
              </tr>

              {/* Row: Deposit */}
              <tr className="hover:bg-[#F7F6F2]/50">
                <td className="p-3 font-bold text-charcoal-700 bg-[#F7F6F2]">Tiền cọc</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-charcoal-800">
                    {formatCurrency(room.costs.deposit)}
                  </td>
                ))}
              </tr>

              {/* Row: Electricity */}
              <tr className="hover:bg-[#F7F6F2]/50">
                <td className="p-3 font-bold text-charcoal-700 bg-[#F7F6F2]">Giá điện</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-charcoal-800">
                    {room.costs.electricity ? `${room.costs.electricity.toLocaleString('vi-VN')} đ/kWh` : 'Miễn phí'}
                  </td>
                ))}
              </tr>

              {/* Row: Water */}
              <tr className="hover:bg-[#F7F6F2]/50">
                <td className="p-3 font-bold text-charcoal-700 bg-[#F7F6F2]">Giá nước</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-charcoal-800">
                    {room.costs.water ? `${room.costs.water.toLocaleString('vi-VN')} đ/tháng` : 'Miễn phí'}
                  </td>
                ))}
              </tr>

              {/* Row: Address */}
              <tr className="hover:bg-[#F7F6F2]/50">
                <td className="p-3 font-bold text-charcoal-700 bg-[#F7F6F2]">Địa chỉ & Phường</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-charcoal-600">
                    <div className="font-semibold text-charcoal-900">{room.location.ward}</div>
                    <div className="text-[11px] line-clamp-1">{room.location.address}</div>
                  </td>
                ))}
              </tr>

              {/* Amenities comparison */}
              {ALL_AMENITIES.map((amenity) => {
                return (
                  <tr key={amenity.id} className="hover:bg-[#F7F6F2]/50">
                    <td className="p-2.5 font-medium text-charcoal-600 bg-[#F7F6F2] truncate">{amenity.name}</td>
                    {compareRooms.map((room) => {
                      const hasAmenity = room.amenities.includes(amenity.id);
                      return (
                        <td key={room.id} className="p-2.5">
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1 text-brand-800 font-bold text-xs">
                              <Check className="w-3.5 h-3.5 text-brand-700" />
                              <span>Có</span>
                            </span>
                          ) : (
                            <span className="text-stone-300 font-normal">Không</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Action Buttons Row */}
              <tr>
                <td className="p-3 bg-[#F7F6F2]"></td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectRoom(room.id);
                      }}
                      className="w-full py-2.5 bg-[#23483D] hover:bg-[#1A372E] text-white font-bold text-xs rounded-sm shadow-whisper transition flex items-center justify-center gap-1.5 uppercase tracking-wider"
                    >
                      <span>Xem phòng</span>
                      <ArrowRight className="w-3 h-3" />
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