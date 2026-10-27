import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Building2, 
  DollarSign, 
  Layers, 
  Image as ImageIcon, 
  Eye, 
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
        name: currentUser?.name || 'Chủ trọ',
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
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              {initialRoom ? 'Chỉnh sửa tin phòng trọ' : 'Đăng tin phòng trọ mới'}
            </h3>
            <p className="text-xs text-slate-500">Bước {step} trên 4: {
              step === 1 ? 'Thông tin phòng & Vị trí' :
              step === 2 ? 'Chi phí & Tiền cọc' :
              step === 3 ? 'Tiện nghi & Hình ảnh' : 'Xem trước & Xác nhận'
            }</p>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-emerald-600 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: Basic Info & Location */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề tin đăng * (rõ ràng, thu hút)
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Phòng trọ khép kín gác xép, mới xây cách ĐH Y Dược 300m"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Loại phòng</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as RoomType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="single">Phòng đơn khép kín</option>
                    <option value="studio">Studio cao cấp</option>
                    <option value="mini_apartment">Chung cư mini</option>
                    <option value="whole_house">Nhà nguyên căn</option>
                    <option value="dormitory">Ký túc xá / Box</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Diện tích (m²)</label>
                  <input
                    type="number"
                    min="10"
                    max="150"
                    required
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sức chứa tối đa</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ chi tiết</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, tên ngõ, đường..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phường / Xã</label>
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {wards.filter((w) => w !== 'Tất cả' && w !== 'Tất cả phường/xã').map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Trường ĐH / KCN gần nhất</label>
                  <select
                    value={nearestUni}
                    onChange={(e) => setNearestUni(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {THAI_NGUYEN_UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.name}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Khoảng cách (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="15"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả chi tiết phòng</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả ánh sáng, ban công, an ninh, giờ giấc..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Costs */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giá thuê (VNĐ / tháng) *</label>
                  <input
                    type="number"
                    step="50000"
                    required
                    value={rent}
                    onChange={(e) => setRent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-0.5 block">{formatCurrency(rent)}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tiền đặt cọc (VNĐ) *</label>
                  <input
                    type="number"
                    step="50000"
                    required
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-0.5 block">{formatCurrency(deposit)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tiền điện (VNĐ / kWh)</label>
                  <input
                    type="number"
                    value={electricity}
                    onChange={(e) => setElectricity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                  <span className="text-[11px] text-slate-400">VD: 3200 hoặc 3500 đ/số</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tiền nước (VNĐ)</label>
                  <input
                    type="number"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                  <span className="text-[11px] text-slate-400">VD: 25000 đ/khối hoặc 60000 đ/người</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tiền Internet / Wifi (VNĐ)</label>
                  <input
                    type="number"
                    value={internet}
                    onChange={(e) => setInternet(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                  <span className="text-[11px] text-slate-400">Điền 0 nếu miễn phí</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phí gửi xe (VNĐ)</label>
                  <input
                    type="number"
                    value={parking}
                    onChange={(e) => setParking(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                  <span className="text-[11px] text-slate-400">Điền 0 nếu miễn phí</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Amenities & Photos */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Tiện nghi có sẵn ({amenities.length} đã chọn)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {ALL_AMENITIES.map((a) => {
                    const isChecked = amenities.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => handleToggleAmenity(a.id)}
                        className={`p-2 rounded-xl text-xs text-left border flex items-center gap-2 transition ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="truncate">{a.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hình ảnh phòng trọ ({images.length} ảnh)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Dán link ảnh (https://...)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-3.5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm ảnh</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group">
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

          {/* STEP 4: Preview & Confirm */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kiểm tra lại toàn bộ thông tin trước khi hoàn tất đăng tin lên hệ thống.</span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-500">Tiêu đề:</span>
                  <div className="font-bold text-slate-900 text-base">{title || 'Chưa nhập tiêu đề'}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-slate-500">Giá thuê:</span>
                    <span className="font-bold text-emerald-700 ml-1">{formatCurrency(rent)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Đặt cọc:</span>
                    <span className="font-bold text-slate-800 ml-1">{formatCurrency(deposit)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Diện tích:</span>
                    <span className="font-bold text-slate-800 ml-1">{area} m²</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Khu vực:</span>
                    <span className="font-bold text-slate-800 ml-1">{ward}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Địa chỉ:</span>
                  <span className="font-semibold text-slate-800 ml-1">{address}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow"
              >
                <span>Tiếp tục</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm rounded-xl transition shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Hoàn tất & Đăng tin</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
