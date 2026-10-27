import { RoomType } from '../types';

export const formatCurrency = (amount: number, compact: boolean = false): string => {
  if (compact) {
    if (amount >= 1000000) {
      const millions = amount / 1000000;
      return `${millions % 1 === 0 ? millions : millions.toFixed(1)} tr/tháng`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}k/tháng`;
    }
  }
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
};

export const formatArea = (area: number): string => {
  return `${area} m²`;
};

export const getRoomTypeLabel = (type: RoomType): string => {
  const map: Record<RoomType, string> = {
    single: 'Phòng đơn khép kín',
    studio: 'Studio full đồ',
    mini_apartment: 'Chung cư mini',
    whole_house: 'Nhà nguyên căn',
    dormitory: 'Ký túc xá / Homestay',
  };
  return map[type] || 'Phòng trọ';
};

export const getRoomTypeBadgeColor = (type: RoomType): string => {
  const map: Record<RoomType, string> = {
    single: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    studio: 'bg-blue-50 text-blue-700 border-blue-200',
    mini_apartment: 'bg-purple-50 text-purple-700 border-purple-200',
    whole_house: 'bg-amber-50 text-amber-700 border-amber-200',
    dormitory: 'bg-teal-50 text-teal-700 border-teal-200',
  };
  return map[type] || 'bg-slate-50 text-slate-700 border-slate-200';
};

export const formatRelativeTime = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 5) return 'Vừa đăng';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 30) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  } catch {
    return 'Gần đây';
  }
};

export const maskPhoneNumber = (phone: string): string => {
  if (!phone || phone.length < 8) return phone;
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) {
    return `${clean.substring(0, 4)} xxx ${clean.substring(7)}`;
  }
  return `${phone.substring(0, 4)}...`;
};
