export type RoomType = 'single' | 'studio' | 'mini_apartment' | 'whole_house' | 'dormitory';

export type RoomStatus = 'available' | 'rented' | 'pending';

export type UserRole = 'tenant' | 'landlord' | 'admin';

export interface RoomCost {
  rent: number;              // VNĐ / tháng
  deposit: number;           // VNĐ
  electricity: number;       // VNĐ / kWh
  electricityType: 'counter' | 'fixed';
  water: number;             // VNĐ / khối hoặc người / tháng
  waterType: 'counter' | 'person' | 'fixed';
  internet: number;          // VNĐ / phòng hoặc miễn phí (0)
  parking: number;           // VNĐ / xe hoặc miễn phí (0)
  serviceFee?: number;       // Phí dịch vụ chung (vệ sinh, thang máy)
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'essential' | 'comfort' | 'security';
}

export interface RoomLocation {
  address: string;
  ward: string;              // Phường / Xã (Tân Thịnh, Quang Trung, Quyết Thắng,...)
  district: string;          // TP. Thái Nguyên, Sông Công, Phổ Yên,...
  city: 'Thái Nguyên';
  coordinates: {
    lat: number;
    lng: number;
  };
  nearUniversities: Array<{
    name: string;
    distanceKm: number;
  }>;
}

export interface Landlord {
  id: string;
  name: string;
  phone: string;
  zaloPhone?: string;
  avatar: string;
  joinDate: string;
  isVerified: boolean;
  responseTime: string;      // "Dưới 15 phút", "Trong 1 giờ", v.v.
  rating: number;            // 4.9
  reviewCount: number;
}

export interface Room {
  id: string;
  title: string;
  slug: string;
  description: string;
  roomType: RoomType;
  area: number;              // m2
  capacity: number;          // Số người tối đa (1 - 4)
  costs: RoomCost;
  location: RoomLocation;
  amenities: string[];       // Danh sách id của tiện nghi
  images: string[];
  rules: string[];           // "Giờ giấc tự do", "Không nuôi thú cưng",...
  landlord: Landlord;
  status: RoomStatus;
  isVerified: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  approvalStatus: 'approved' | 'pending' | 'rejected';
  rejectionReason?: string;
}

export interface FilterState {
  keyword: string;
  district: string;
  ward: string;
  university: string;
  roomType: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  amenities: string[];
  status: string;
  maxDeposit: number;        // Lọc theo tiền cọc
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc' | 'views';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'tenant' | 'landlord' | 'admin';
  avatar: string;
  savedRooms: string[];      // room IDs
  viewHistory: string[];     // room IDs
  savedSearches: Array<{
    id: string;
    name: string;
    filters: Partial<FilterState>;
    createdAt: string;
  }>;
}

export interface ViewingAppointment {
  id: string;
  roomId: string;
  roomTitle: string;
  userId: string;
  userName: string;
  userPhone: string;
  date: string;              // YYYY-MM-DD
  timeSlot: string;          // "09:00 - 10:00", "14:00 - 15:00",...
  note?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ViolationReport {
  id: string;
  roomId: string;
  roomTitle: string;
  userId?: string;
  reporterName: string;
  reporterPhone?: string;
  reason: 'fake_info' | 'scam_deposit' | 'wrong_price' | 'already_rented' | 'offensive_images' | 'other';
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface PlatformStat {
  totalRooms: number;
  activeRooms: number;
  pendingApprovals: number;
  totalUsers: number;
  totalLandlords: number;
  totalReports: number;
}
