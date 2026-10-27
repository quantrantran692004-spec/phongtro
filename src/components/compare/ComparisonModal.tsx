import React from 'react';
import { Scale, X, Check, ArrowRight, Maximize2, Trash2, ShieldCheck } from 'lucide-react';
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
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
            <Scale className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Chưa có phòng nào trong danh sách so sánh</h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            Bạn hãy bấm vào biểu tượng cân (So sánh) ở góc ảnh các phòng trọ để thêm vào bảng so sánh nhé!
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl"
          >
            Đã hiểu, quay lại tìm phòng
          </button>
        </div>
      </div>
    );
  }

  // Find lowest rent
  const lowestRent = Math.min(...compareRooms.map((r) => r.costs.rent));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Bảng so sánh chi tiết ({compareRooms.length} phòng)
              </h2>
              <p className="text-xs text-slate-500">Đối chiếu trực quan chi phí, diện tích và tiện nghi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa tất cả</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Table Content */}
        <div className="overflow-x-auto flex-1 p-4 sm:p-6">
          <table className="w-full border-collapse min-w-[650px] text-xs sm:text-sm">
            {/* Table Header: Room Card Overviews */}
            <thead>
              <tr className="border-b border-slate-200">
                <th className="w-36 sm:w-44 p-3 text-left font-bold text-slate-400 uppercase text-[11px] align-top bg-slate-50/40 rounded-tl-xl">
                  Thông tin phòng
                </th>
                {compareRooms.map((room) => (
                  <th key={room.id} className="p-3 text-left font-normal align-top min-w-[200px]">
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-2 bg-slate-100 border border-slate-200">
                      <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeCompare(room.id)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-full transition"
                        title="Bỏ phòng này"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-slate-900 line-clamp-2 mb-1">
                      {room.title}
                    </div>

                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {getRoomTypeLabel(room.roomType)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {/* Row: Price */}
              <tr className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">Giá thuê/tháng</td>
                {compareRooms.map((room) => {
                  const isBest = room.costs.rent === lowestRent;
                  return (
                    <td key={room.id} className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-base font-extrabold ${isBest ? 'text-emerald-700 font-black' : 'text-slate-900'}`}>
                          {formatCurrency(room.costs.rent)}
                        </span>
                        {isBest && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            Giá tốt nhất
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row: Area */}
              <tr className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">Diện tích</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 font-semibold text-slate-800">
                    {formatArea(room.area)} ({room.capacity} người)
                  </td>
                ))}
              </tr>

              {/* Row: Deposit */}
              <tr className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">Tiền đặt cọc</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 font-medium text-slate-700">
                    {formatCurrency(room.costs.deposit)}
                  </td>
                ))}
              </tr>

              {/* Row: Electricity & Water */}
              <tr className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">Điện & Nước</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-xs text-slate-700 space-y-0.5">
                    <div>⚡ Điện: {room.costs.electricity ? `${room.costs.electricity} đ/kWh` : 'Miễn phí'}</div>
                    <div>💧 Nước: {room.costs.water ? `${room.costs.water} đ` : 'Miễn phí'}</div>
                  </td>
                ))}
              </tr>

              {/* Row: Wifi & Parking */}
              <tr className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">Wifi & Gửi xe</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-xs text-slate-700 space-y-0.5">
                    <div>📶 Wifi: {room.costs.internet > 0 ? `${formatCurrency(room.costs.internet)}` : 'Miễn phí'}</div>
                    <div>🛵 Xe máy: {room.costs.parking > 0 ? `${formatCurrency(room.costs.parking)}` : 'Miễn phí'}</div>
                  </td>
                ))}
              </tr>

              {/* Row: Location & Nearest Uni */}
              <tr className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">Khu vực & ĐH gần nhất</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 text-xs text-slate-700 space-y-1">
                    <div className="font-semibold text-slate-800">{room.location.ward}</div>
                    {room.location.nearUniversities[0] && (
                      <div className="text-emerald-700 font-medium">
                        Cách {room.location.nearUniversities[0].name}: {room.location.nearUniversities[0].distanceKm} km
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Status */}
              <tr className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/40">Tình trạng</td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3 font-bold">
                    <span className={room.status === 'available' ? 'text-emerald-600' : 'text-slate-400'}>
                      {room.status === 'available' ? '● Còn phòng' : '● Đã cho thuê'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Amenities Section Header */}
              <tr className="bg-slate-100/70">
                <td colSpan={compareRooms.length + 1} className="p-2.5 font-black text-slate-700 text-xs uppercase tracking-wider">
                  Trang bị tiện nghi & Nội thất
                </td>
              </tr>

              {/* Selected Amenities Comparison Rows */}
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
                'no_landlord',
                'parking_space',
              ].map((amenityId) => {
                const amenityObj = ALL_AMENITIES.find((a) => a.id === amenityId);
                return (
                  <tr key={amenityId} className="hover:bg-slate-50/70">
                    <td className="p-3 font-medium text-slate-600 bg-slate-50/40">
                      {amenityObj?.name || amenityId}
                    </td>
                    {compareRooms.map((room) => {
                      const hasAmenity = room.amenities.includes(amenityId);
                      return (
                        <td key={room.id} className="p-3">
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                              <Check className="w-4 h-4 text-emerald-600" />
                              <span>Có sẵn</span>
                            </span>
                          ) : (
                            <span className="text-slate-300 font-medium text-xs">Không có</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Action Buttons Row */}
              <tr>
                <td className="p-3 bg-slate-50/40"></td>
                {compareRooms.map((room) => (
                  <td key={room.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectRoom(room.id);
                      }}
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1"
                    >
                      <span>Xem phòng này</span>
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
