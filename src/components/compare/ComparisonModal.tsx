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
        <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center shadow-card-hover border border-[#E5E2D9] relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-[#777B78] hover:text-[#252725] rounded transition">
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-md bg-[#EFEEE8] border border-[#E5E2D9] text-[#23483D] flex items-center justify-center mx-auto mb-3 shadow-whisper">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-[#252725] mb-1.5">Chưa Chọn Phòng So Sánh</h3>
          <p className="text-xs sm:text-sm text-[#777B78] mb-5 leading-relaxed font-normal">
            Bạn hãy bấm vào biểu tượng cân ở góc ảnh các phòng trọ để thêm vào danh sách đối chiếu nhé!
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs rounded-md uppercase tracking-wider shadow-whisper transition"
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
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[92vh] flex flex-col shadow-card-hover border border-[#E5E2D9] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5E2D9] flex items-center justify-between bg-[#FAF9F7]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#23483D] text-white flex items-center justify-center shadow-whisper">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#252725]">
                Bảng So Sánh Đối Chiếu ({compareRooms.length} không gian)
              </h2>
              <p className="text-xs text-[#777B78]">Xem chi tiết sự khác biệt về giá thuê, tiền cọc và tiện nghi thực tế</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-[#777B78] hover:text-rose-600 flex items-center gap-1 font-medium transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa tất cả</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#777B78] hover:text-[#252725] rounded hover:bg-[#EFEEE8] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto flex-1 p-4 sm:p-6">
          <table className="w-full border-collapse min-w-[620px] text-xs">
            <thead>
              <tr className="border-b border-[#E5E2D9]">
                <th className="w-36 sm:w-44 p-3 text-left font-semibold text-[#555955] uppercase text-[11px] tracking-wider align-top bg-[#FAF9F7]">
                  Thông tin phòng
                </th>
                {compareRooms.map((room) => (
                  <th key={room.id} className="p-3 text-left font-normal align-top min-w-[190px]">
                    <div className="relative rounded-md overflow-hidden aspect-[16/10] mb-2 bg-[#FAF9F7] border border-[#E5E2D9]">
                      <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeCompare(room.id)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-full transition"
                        title="Bỏ phòng"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-sm font-medium text-[#252725] line-clamp-2 mb-1">
                      {room.title}
                    </div>

                    <span className="text-[11px] font-medium text-[#555955] bg-[#EFEEE8] px-2 py-0.5 rounded border border-[#E5E2D9]">
                      {getRoomTypeLabel(room.roomType)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E2D9]">
              {/* Row: Price */}
              <tr className="hover:bg-[#FAF9F7]/70">
                <td className="p-3 font-semibold text-[#555955] bg-[#FAF9F7]">Giá thuê/tháng</td>
                {compareRooms.map((room) => {
                  const isBest = room.costs.rent === lowestRent;
                  return (
                    <td key={room.id} className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-base font-semibold ${isBest ? 'text-[#23483D]' : 'text-[#252725]'}`}>
                          {formatCurrency(room.costs.rent)}
                        </span>
                        {isBest && (
                          <span className="text-[10px] bg-[#E8EEE9] text-[#23483D] border border-[#23483D]/30 px-1.5 py-0.2 rounded font-semibold">
                            Tốt nhất
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Area */}
              <tr className="hover:bg-[#FAF9F7]/70">
                <td className="p-3 font-semibold text-[#555955] bg-[#FAF9F7]">Diện tích</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 font-medium text-[#252725]">
                    {formatArea(room.area)}
                  </td>
                ))}
              </tr>

              {/* Row: Deposit */}
              <tr className="hover:bg-[#FAF9F7]/70">
                <td className="p-3 font-semibold text-[#555955] bg-[#FAF9F7]">Tiền cọc</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-[#252725] font-medium">
                    {formatCurrency(room.costs.deposit)}
                  </td>
                ))}
              </tr>

              {/* Row: Electricity */}
              <tr className="hover:bg-[#FAF9F7]/70">
                <td className="p-3 font-semibold text-[#555955] bg-[#FAF9F7]">Giá điện</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-[#252725]">
                    {room.costs.electricity ? `${room.costs.electricity.toLocaleString('vi-VN')} đ/kWh` : 'Miễn phí'}
                  </td>
                ))}
              </tr>

              {/* Row: Water */}
              <tr className="hover:bg-[#FAF9F7]/70">
                <td className="p-3 font-semibold text-[#555955] bg-[#FAF9F7]">Giá nước</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-[#252725]">
                    {room.costs.water ? `${room.costs.water.toLocaleString('vi-VN')} đ/tháng` : 'Miễn phí'}
                  </td>
                ))}
              </tr>

              {/* Row: Address */}
              <tr className="hover:bg-[#FAF9F7]/70">
                <td className="p-3 font-semibold text-[#555955] bg-[#FAF9F7]">Địa chỉ & Phường</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-[#555955]">
                    <div className="font-semibold text-[#252725]">{room.location.ward}</div>
                    <div className="text-xs line-clamp-1">{room.location.address}</div>
                  </td>
                ))}
              </tr>

              {/* Amenities comparison */}
              {ALL_AMENITIES.map((amenity) => {
                return (
                  <tr key={amenity.id} className="hover:bg-[#FAF9F7]/70">
                    <td className="p-2.5 font-medium text-[#555955] bg-[#FAF9F7] truncate">{amenity.name}</td>
                    {compareRooms.map((room) => {
                      const hasAmenity = room.amenities.includes(amenity.id);
                      return (
                        <td key={room.id} className="p-2.5">
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1 text-[#23483D] font-semibold text-xs">
                              <Check className="w-3.5 h-3.5 text-[#23483D]" />
                              <span>Có</span>
                            </span>
                          ) : (
                            <span className="text-[#B0B2AF] font-normal">Không</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Action Buttons Row */}
              <tr>
                <td className="p-3 bg-[#FAF9F7]"></td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectRoom(room.id);
                      }}
                      className="w-full py-2.5 bg-[#23483D] hover:bg-[#1A372E] text-white font-medium text-xs rounded-md shadow-whisper transition flex items-center justify-center gap-1.5 uppercase tracking-wider"
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