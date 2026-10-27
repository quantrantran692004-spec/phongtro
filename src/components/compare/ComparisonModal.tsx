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
        <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-elevated relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto mb-2.5">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-display text-base font-bold text-stone-900 mb-1">Chưa chọn phòng so sánh</h3>
          <p className="text-xs text-stone-500 mb-4 leading-relaxed">
            Bạn hãy bấm vào biểu tượng cân ở góc ảnh các phòng trọ để thêm vào danh sách đối chiếu nhé!
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 bg-brand-600 text-white font-bold text-xs rounded-xl"
          >
            Đã hiểu, quay lại tìm phòng
          </button>
        </div>
      </div>
    );
  }

  const lowestRent = Math.min(...compareRooms.map((r) => r.costs.rent));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-elevated border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-sm sm:text-base font-bold text-stone-900">
                Bảng so sánh đối chiếu ({compareRooms.length} phòng)
              </h2>
              <p className="text-[11px] text-stone-500">Xem sự khác biệt về giá thuê, tiền cọc và tiện nghi thực tế</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-stone-400 hover:text-rose-600 flex items-center gap-1 font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa tất cả</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto flex-1 p-4 sm:p-6">
          <table className="w-full border-collapse min-w-[620px] text-xs">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="w-36 sm:w-44 p-3 text-left font-bold text-stone-400 uppercase text-[10px] align-top bg-stone-50/50 rounded-tl-xl">
                  Thông tin phòng
                </th>
                {compareRooms.map((room) => (
                  <th key={room.id} className="p-3 text-left font-normal align-top min-w-[190px]">
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-2 bg-stone-100 border border-stone-200">
                      <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeCompare(room.id)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-full transition"
                        title="Bỏ phòng"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-stone-900 line-clamp-2 mb-1">
                      {room.title}
                    </div>

                    <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {getRoomTypeLabel(room.roomType)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {/* Row: Price */}
              <tr className="hover:bg-stone-50/60">
                <td className="p-3 font-bold text-stone-700 bg-stone-50/50">Giá thuê/tháng</td>
                {compareRooms.map((room) => {
                  const isBest = room.costs.rent === lowestRent;
                  return (
                    <td key={room.id} className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-display text-sm font-extrabold ${isBest ? 'text-brand-700' : 'text-stone-900'}`}>
                          {formatCurrency(room.costs.rent)}
                        </span>
                        {isBest && (
                          <span className="text-[9px] font-bold bg-brand-100 text-brand-800 px-1.5 py-0.5 rounded">
                            Tốt nhất
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Area */}
              <tr className="hover:bg-stone-50/60">
                <td className="p-3 font-bold text-stone-700 bg-stone-50/50">Diện tích</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 font-semibold text-stone-800">
                    {formatArea(room.area)} ({room.capacity} người)
                  </td>
                ))}
              </tr>

              {/* Row: Deposit */}
              <tr className="hover:bg-stone-50/60">
                <td className="p-3 font-bold text-stone-700 bg-stone-50/50">Tiền đặt cọc</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 font-medium text-stone-700">
                    {formatCurrency(room.costs.deposit)}
                  </td>
                ))}
              </tr>

              {/* Row: Utilities */}
              <tr className="hover:bg-stone-50/60">
                <td className="p-3 font-bold text-stone-700 bg-stone-50/50">Điện & Nước</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-[11px] text-stone-600 space-y-0.5">
                    <div>Điện: {room.costs.electricity ? `${room.costs.electricity} đ/kWh` : 'Miễn phí'}</div>
                    <div>Nước: {room.costs.water ? `${room.costs.water} đ` : 'Miễn phí'}</div>
                  </td>
                ))}
              </tr>

              {/* Row: Location */}
              <tr className="hover:bg-stone-50/60">
                <td className="p-3 font-bold text-stone-700 bg-stone-50/50">Khu vực</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-[11px] text-stone-700">
                    <div className="font-bold text-stone-900">{room.location.ward}</div>
                    {room.location.nearUniversities[0] && (
                      <div className="text-brand-700">
                        Cách {room.location.nearUniversities[0].name}: {room.location.nearUniversities[0].distanceKm} km
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Status */}
              <tr className="hover:bg-stone-50/60">
                <td className="p-3 font-bold text-stone-700 bg-stone-50/50">Tình trạng</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 font-bold">
                    <span className={room.status === 'available' ? 'text-brand-600' : 'text-stone-400'}>
                      {room.status === 'available' ? '● Còn phòng' : '● Đã cho thuê'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Amenities Section Header */}
              <tr className="bg-stone-100/60">
                <td colSpan={compareRooms.length + 1} className="p-2 font-bold text-stone-600 text-[10px] uppercase tracking-wider">
                  Trang bị tiện nghi & Nội thất
                </td>
              </tr>

              {[
                'air_conditioner',
                'water_heater',
                'mezzanine',
                'private_bathroom',
                'kitchen_shelf',
                'washing_machine',
                'refrigerator',
                'wifi',
                'camera',
                'fingerprint_lock',
                'free_hours',
                'parking_space',
              ].map((amenityId) => {
                const amenityObj = ALL_AMENITIES.find((a) => a.id === amenityId);
                return (
                  <tr key={amenityId} className="hover:bg-stone-50/60">
                    <td className="p-2.5 font-medium text-stone-600 bg-stone-50/50">
                      {amenityObj?.name || amenityId}
                    </td>
                    {compareRooms.map((room) => {
                      const hasAmenity = room.amenities.includes(amenityId);
                      return (
                        <td key={room.id} className="p-2.5">
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1 text-brand-700 font-bold text-xs">
                              <Check className="w-3.5 h-3.5 text-brand-600" />
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
                <td className="p-3 bg-stone-50/50"></td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectRoom(room.id);
                      }}
                      className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1"
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
