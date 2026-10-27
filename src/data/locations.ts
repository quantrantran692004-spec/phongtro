export interface University {
  id: string;
  name: string;
  shortName: string;
  address: string;
  ward: string;
  coordinates: { lat: number; lng: number };
  badge: string;
}

export const THAI_NGUYEN_UNIVERSITIES: University[] = [
  {
    id: 'tump',
    name: 'Đại học Y Dược Thái Nguyên',
    shortName: 'ĐH Y Dược',
    address: '284 Lương Ngọc Quyến, P. Quang Trung',
    ward: 'Quang Trung',
    coordinates: { lat: 21.5878, lng: 105.8285 },
    badge: 'Khu Y Dược',
  },
  {
    id: 'tnue',
    name: 'Đại học Sư Phạm Thái Nguyên',
    shortName: 'ĐH Sư Phạm',
    address: '20 Lương Ngọc Quyến, P. Quang Trung',
    ward: 'Quang Trung',
    coordinates: { lat: 21.5892, lng: 105.8341 },
    badge: 'Khu Sư Phạm',
  },
  {
    id: 'ictu',
    name: 'Đại học CNTT & Truyền Thông (ICTU)',
    shortName: 'ĐH CNTT (ICTU)',
    address: 'Đường Z115, Xã Quyết Thắng',
    ward: 'Quyết Thắng',
    coordinates: { lat: 21.5861, lng: 105.7972 },
    badge: 'Khu Z115',
  },
  {
    id: 'tueba',
    name: 'Đại học Kinh Tế & QTKD (TUEBA)',
    shortName: 'ĐH Kinh Tế',
    address: 'Phường Tân Thịnh, TP. Thái Nguyên',
    ward: 'Tân Thịnh',
    coordinates: { lat: 21.5824, lng: 105.8155 },
    badge: 'Làng ĐH Tân Thịnh',
  },
  {
    id: 'tnut',
    name: 'Đại học Kỹ Thuật Công Nghiệp (TNUT)',
    shortName: 'ĐH Kỹ Thuật Công Nghiệp',
    address: '666 Đường 3/2, P. Tích Lương',
    ward: 'Tích Lương',
    coordinates: { lat: 21.5542, lng: 105.8521 },
    badge: 'Khu Tích Lương',
  },
  {
    id: 'tuaf',
    name: 'Đại học Nông Lâm Thái Nguyên',
    shortName: 'ĐH Nông Lâm',
    address: 'Tổ 10, Xã Quyết Thắng',
    ward: 'Quyết Thắng',
    coordinates: { lat: 21.5947, lng: 105.8016 },
    badge: 'Khu Nông Lâm',
  },
  {
    id: 'samsung',
    name: 'Tổ Hợp KCN Samsung Thái Nguyên (SEVT)',
    shortName: 'KCN Samsung (SEVT)',
    address: 'KCN Yên Bình, Phường Đồng Tiến, TP. Phổ Yên',
    ward: 'Phổ Yên',
    coordinates: { lat: 21.4326, lng: 105.8674 },
    badge: 'Công Nhân Viên',
  },
];

export const DISTRICTS = [
  'TP. Thái Nguyên',
  'TP. Sông Công',
  'TP. Phổ Yên',
  'Huyện Phú Bình',
  'Huyện Đại Từ',
];

export const WARDS_BY_DISTRICT: Record<string, string[]> = {
  'TP. Thái Nguyên': [
    'Tất cả phường/xã',
    'Tân Thịnh',
    'Quang Trung',
    'Quyết Thắng',
    'Hoàng Văn Thụ',
    'Tích Lương',
    'Phan Đình Phùng',
    'Tân Long',
    'Gia Sàng',
    'Đồng Quang',
    'Thịnh Đán',
  ],
  'TP. Sông Công': ['Tất cả', 'Bách Quang', 'Cải Đan', 'Lương Sơn', 'Mỏ Chè', 'Phố Cò'],
  'TP. Phổ Yên': ['Tất cả', 'Đồng Tiến', 'Ba Hàng', 'Bãi Bông', 'Hồng Tiến', 'Đắc Sơn'],
  'Huyện Phú Bình': ['Tất cả', 'Điềm Thụy', 'Hương Sơn', 'Kha Sơn'],
  'Huyện Đại Từ': ['Tất cả', 'Hùng Sơn', 'Quân Chu', 'Hà Thượng'],
};

export const POPULAR_AREAS = [
  {
    name: 'Khu Vực Tân Thịnh',
    tag: 'Tập trung nhiều trường ĐH',
    count: 148,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
    ward: 'Tân Thịnh',
    description: 'Thủ phủ sinh viên với hàng ngàn phòng trọ giá rẻ, ăn uống sầm uất.',
  },
  {
    name: 'Đường Z115 - Quyết Thắng',
    tag: 'Gần ICTU & Nông Lâm',
    count: 92,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80',
    ward: 'Quyết Thắng',
    description: 'Nhiều dãy trọ khép kín mới xây, giờ giấc tự do, an ninh tốt.',
  },
  {
    name: 'Phường Quang Trung & Lương Ngọc Quyến',
    tag: 'ĐH Y Dược & Sư Phạm',
    count: 115,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80',
    ward: 'Quang Trung',
    description: 'Vị trí trung tâm tiện xe buýt, phòng sạch đẹp, gần bệnh viện TW.',
  },
  {
    name: 'Khu Vực Phổ Yên - Samsung SEVT',
    tag: 'Dành cho công nhân viên',
    count: 86,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80',
    ward: 'Phổ Yên',
    description: 'Chung cư mini và phòng trọ tiện nghi, xe đưa đón Samsung đỗ tận cửa.',
  },
];
