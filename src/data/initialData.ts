import { User, ViolationReport, ViewingAppointment } from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'user-tenant',
    name: 'Nguyễn Văn An',
    email: 'an.sinhvien@tump.edu.vn',
    phone: '0988112233',
    role: 'tenant',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    savedRooms: ['room-tn-01', 'room-tn-02'],
    viewHistory: ['room-tn-01', 'room-tn-02', 'room-tn-03'],
    savedSearches: [
      {
        id: 'search-1',
        name: 'Gần ĐH Y Dược dưới 2tr',
        filters: { keyword: 'Y Dược', maxPrice: 2000000 },
        createdAt: '2026-10-24T10:00:00Z',
      },
    ],
  },
  {
    id: 'landlord-01',
    name: 'Cô Lan Tân Thịnh',
    email: 'colan.tro@gmail.com',
    phone: '0984512345',
    role: 'landlord',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    savedRooms: [],
    viewHistory: [],
    savedSearches: [],
  },
  {
    id: 'user-admin',
    name: 'Admin Trọ Thái Nguyên',
    email: 'admin@trothainguyen.vn',
    phone: '0901234567',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    savedRooms: [],
    viewHistory: [],
    savedSearches: [],
  },
];

export const INITIAL_REPORTS: ViolationReport[] = [
  {
    id: 'rep-01',
    roomId: 'room-tn-03',
    roomTitle: 'Phòng trọ sinh viên giá rẻ, khép kín, an ninh tốt gần ĐH CNTT (ICTU)',
    reporterName: 'Trần Minh Quân',
    reporterPhone: '0977889900',
    reason: 'wrong_price',
    description: 'Chủ nhà báo giá đến xem thực tế là 1tr1 chứ không phải 950k như bài đăng.',
    status: 'pending',
    createdAt: '2026-10-26T08:00:00Z',
  },
];

export const INITIAL_APPOINTMENTS: ViewingAppointment[] = [
  {
    id: 'app-01',
    roomId: 'room-tn-01',
    roomTitle: 'Phòng trọ cao cấp gác xép full đồ, cách ĐH Y Dược Thái Nguyên 300m',
    userId: 'user-tenant',
    userName: 'Nguyễn Văn An',
    userPhone: '0988112233',
    date: '2026-10-28',
    timeSlot: '14:00 - 15:00',
    note: 'Em là sinh viên năm nhất Y Dược muốn qua xem trực tiếp phòng tầng 2 ạ.',
    status: 'confirmed',
    createdAt: '2026-10-26T15:30:00Z',
  },
];
