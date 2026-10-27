import { Amenity } from '../types';

export const ALL_AMENITIES: Amenity[] = [
  { id: 'air_conditioner', name: 'Điều hòa nhiệt độ', icon: 'Wind', category: 'comfort' },
  { id: 'water_heater', name: 'Bình nóng lạnh', icon: 'Flame', category: 'essential' },
  { id: 'mezzanine', name: 'Gác xép kiên cố', icon: 'Layers', category: 'comfort' },
  { id: 'private_bathroom', name: 'Vệ sinh khép kín', icon: 'Bath', category: 'essential' },
  { id: 'kitchen_shelf', name: 'Kệ bếp nấu ăn', icon: 'Utensils', category: 'essential' },
  { id: 'washing_machine', name: 'Máy giặt riêng/chung', icon: 'Shirt', category: 'comfort' },
  { id: 'refrigerator', name: 'Tủ lạnh', icon: 'Refrigerator', category: 'comfort' },
  { id: 'bed_mattress', name: 'Giường nệm', icon: 'Bed', category: 'comfort' },
  { id: 'wardrobe', name: 'Tủ quần áo', icon: 'Archive', category: 'comfort' },
  { id: 'wifi', name: 'Wifi cáp quang', icon: 'Wifi', category: 'essential' },
  { id: 'camera', name: 'Camera an ninh 24/7', icon: 'ShieldCheck', category: 'security' },
  { id: 'fingerprint_lock', name: 'Khóa cửa vân tay', icon: 'Key', category: 'security' },
  { id: 'free_hours', name: 'Giờ giấc tự do', icon: 'Clock', category: 'security' },
  { id: 'no_landlord', name: 'Không chung chủ', icon: 'Home', category: 'security' },
  { id: 'balcony', name: 'Ban công / Cửa sổ thoáng', icon: 'SunMedium', category: 'comfort' },
  { id: 'parking_space', name: 'Chỗ để xe rộng', icon: 'Car', category: 'essential' },
  { id: 'pet_allowed', name: 'Cho nuôi thú cưng', icon: 'Heart', category: 'comfort' },
];

export const AMENITY_MAP = ALL_AMENITIES.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, Amenity>);
