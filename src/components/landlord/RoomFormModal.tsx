import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { Room, RoomType } from '../../types';
import { ALL_AMENITIES } from '../../data/amenities';
import { WARDS_BY_DISTRICT, THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

interface RoomFormModalProps {
  initialRoom?: Room | null;
  onClose: () => void;
}

export const RoomFormModal: React.FC<RoomFormModalProps> = ({ initialRoom, onClose }) => {
  const { createRoom, updateRoom } = useRooms();
  const { currentUser } = useAuth();

  const [step, setStep] = useState(1);

  // Form states
  const [title, setTitle] = useState(initialRoom?.title || '');
  const [description, setDescription] = useState(initialRoom?.description || '');
  const [roomType, setRoomType] = useState<RoomType>(initialRoom?.roomType || 'single');
  const [area, setArea] = useState(initialRoom?.area || 22);
  const [capacity, setCapacity] = useState(initialRoom?.capacity || 2);

  // Costs
  const [rent, setRent] = useState(initialRoom?.costs.rent || 1500000);
  const [deposit, setDeposit] = useState(initialRoom?.costs.deposit || 1500000);
  const [electricity, setElectricity] = useState(initialRoom?.costs.electricity || 3200);
  const [water, setWater] = useState(initialRoom?.costs.water || 25000);
  const [internet, setInternet] = useState(initialRoom?.costs.internet || 60000);
  const [parking, setParking] = useState(initialRoom?.costs.parking || 0);

  // Location
  const [address, setAddress] = useState(initialRoom?.location.address || 'Ngõ 284 Lương Ngọc Quyến');
  const [ward, setWard] = useState(initialRoom?.location.ward || 'Quang Trung');
  const [nearestUni, setNearestUni] = useState(initialRoom?.location.nearUniversities[0]?.name || 'Đại học Y Dược Thái Nguyên');
  const [distanceKm, setDistanceKm] = useState(initialRoom?.location.nearUniversities[0]?.distanceKm || 0.4);

  // Amenities
  const [amenities, setAmenities] = useState<string[]>(
    initialRoom?.amenities || ['private_bathroom', 'water_heater', 'wifi', 'free_hours']
  );

  // Images
  const [images, setImages] = useState<string[]>(
    initialRoom?.images || [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&auto=format&fit=crop&q=80',
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  // Rules
  const [rules, setRules] = useState<string[]>(
    initialRoom?.rules || ['Giờ giấc tự do 24/24', 'Giữ gìn vệ sinh chung', 'Không hút thuốc trong phòng']
  );

  const wards = WARDS_BY_DISTRICT['TP. Thái Nguyên'] || [];

  const handleToggleAmenity = (id: string) => {
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const roomPayload = {
      title,
      description,
      roomType,
      area: Number(area),
      capacity: Number(capacity),
      costs: {
        rent: Number(rent),
        deposit: Number(deposit),
        electricity: Number(electricity),
        electricityType: 'counter' as const,
        water: Number(water),
        waterType: 'counter' as const,
        internet: Number(internet),
        parking: Number(parking),
        serviceFee: 30000,
      },
      location: {
        address,
        ward,
        district: 'TP. Thái Nguyên',
        city: 'Thái Nguyên' as const,
        coordinates: { lat: 21.588, lng: 105.83 },
        nearUniversities: [
          {
            name: nearestUni,
            distanceKm: Number(distanceKm),
          },
        ],
      },
      amenities,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000'],
      rules,
      landlord: initialRoom?.landlord || {
        id: currentUser?.id || 'landlord-me',
        name: currentUser?.name || 'Cô Lan',
        phone: currentUser?.phone || '0984512345',
        zaloPhone: currentUser?.phone || '0984512345',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        joinDate: new Date().toISOString().split('T')[0],
        isVerified: true,
        responseTime: 'Dưới 15 phút',
        rating: 4.9,
        reviewCount: 1,
      },
      status: initialRoom?.status || 'available',
      isVerified: true,
      isFeatured: false,
    };

    if (initialRoom) {
      updateRoom(initialRoom.id, roomPayload);
    } else {
      createRoom(roomPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-elevated border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div>
            <h3 className="font-display font-extrabold text-stone-900 text-base sm:text-lg">
              {initialRoom ? 'Chỉnh sửa tin phòng trọ' : 'Đăng tin phòng trọ mới'}
            </h3>
            <p className="text-[11px] text-stone-500">Bước {step} trên 4: {
              step === 1 ? 'Thông tin phòng & Vị trí' :
              step === 2 ? 'Chi phí & Tiền cọc' :
              step === 3 ? 'Tiện nghi & Hình ảnh' : 'Xem trước & Xác nhận'
            }</p>
          </div>

          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-1">
          <div
            className="bg-brand-600 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Tiêu đề bài đăng *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Phòng trọ khép kín gác xép mới xây, cách ĐH Y Dược 300m"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Loại phòng</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as RoomType)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="single">Phòng đơn</option>
                    <option value="studio">Studio</option>
                    <option value="mini_apartment">Chung cư mini</option>
                    <option value="whole_house">Nhà nguyên căn</option>
                    <option value="dormitory">Ký túc xá</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Diện tích (m²)</label>
                  <input
                    type="number"
                    min="10"
                    max="150"
                    required
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Sức chứa (người)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Địa chỉ chi tiết</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, ngõ, tên đường..."
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Phường / Xã</label>
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  >
                    {wards.filter((w) => w !== 'Tất cả' && w !== 'Tất cả phường/xã').map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Trường ĐH / KCN gần nhất</label>
                  <select
                    value={nearestUni}
                    onChange={(e) => setNearestUni(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  >
                    {THAI_NGUYEN_UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.name}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Khoảng cách (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="15"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">Mô tả phòng</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả ánh sáng, cửa sổ, ban công, an ninh..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Giá thuê (VNĐ/tháng) *</label>
                  <input
                    type="number"
                    step="50000"
                    required
                    value={rent}
                    onChange={(e) => setRent(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-brand-700"
                  />
                  <span className="text-[10px] text-stone-400 mt-0.5 block">{formatCurrency(rent)}</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Tiền đặt cọc (VNĐ) *</label>
                  <input
                    type="number"
                    step="50000"
                    required
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800"
                  />
                  <span className="text-[10px] text-stone-400 mt-0.5 block">{formatCurrency(deposit)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-stone-100">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Tiền điện (VNĐ/kWh)</label>
                  <input
                    type="number"
                    value={electricity}
                    onChange={(e) => setElectricity(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Tiền nước (VNĐ)</label>
                  <input
                    type="number"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Tiền Wifi (VNĐ)</label>
                  <input
                    type="number"
                    value={internet}
                    onChange={(e) => setInternet(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Phí gửi xe (VNĐ)</label>
                  <input
                    type="number"
                    value={parking}
                    onChange={(e) => setParking(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1.5">
                  Tiện nghi có sẵn ({amenities.length} đã chọn)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-44 overflow-y-auto pr-1">
                  {ALL_AMENITIES.map((a) => {
                    const isChecked = amenities.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => handleToggleAmenity(a.id)}
                        className={`p-2 rounded-xl text-xs text-left border flex items-center gap-1.5 transition ${
                          isChecked
                            ? 'bg-brand-50 border-brand-500 text-brand-900 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-brand-600 text-white' : 'border border-stone-300'
                        }`}>
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className="truncate">{a.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2.5 border-t border-stone-100">
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Hình ảnh ({images.length} ảnh)
                </label>
                <div className="flex gap-2 mb-2.5">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Dán link ảnh (https://...)"
                    className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-3 py-1.5 bg-brand-600 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm ảnh</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-stone-200 group">
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-80 group-hover:opacity-100 transition shadow"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-brand-50 rounded-xl p-3 border border-brand-200 text-xs text-brand-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Kiểm tra lại toàn bộ thông tin trước khi hoàn tất đăng tin.</span>
              </div>

              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 space-y-1.5 text-xs">
                <div>
                  <span className="text-stone-400 font-bold">Tiêu đề:</span>
                  <div className="font-bold text-stone-900 text-sm">{title || 'Chưa có tiêu đề'}</div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-stone-200">
                  <div>
                    <span className="text-stone-400">Giá thuê:</span>
                    <span className="font-bold text-brand-700 ml-1">{formatCurrency(rent)}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">Đặt cọc:</span>
                    <span className="font-bold text-stone-800 ml-1">{formatCurrency(deposit)}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">Diện tích:</span>
                    <span className="font-bold text-stone-800 ml-1">{area} m²</span>
                  </div>
                  <div>
                    <span className="text-stone-400">Khu vực:</span>
                    <span className="font-bold text-stone-800 ml-1">{ward}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 border border-stone-200 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-100 transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="inline-flex items-center gap-1 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition shadow-xs"
              >
                <span>Tiếp tục</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition shadow"
              >
                <Check className="w-4 h-4" />
                <span>Xác nhận & Đăng tin</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
