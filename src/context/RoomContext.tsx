import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Room, FilterState, ViewingAppointment, ViolationReport } from '../types';
import { SEED_ROOMS } from '../data/seedRooms';
import { INITIAL_APPOINTMENTS, INITIAL_REPORTS } from '../data/initialData';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

export const DEFAULT_FILTERS: FilterState = {
  keyword: '',
  district: 'Tất cả',
  ward: 'Tất cả',
  university: 'Tất cả',
  roomType: 'all',
  minPrice: 0,
  maxPrice: 10000000,
  minArea: 0,
  maxArea: 100,
  amenities: [],
  status: 'all',
  maxDeposit: 10000000,
  sortBy: 'newest',
};

interface RoomContextType {
  rooms: Room[];
  filteredRooms: Room[];
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
  quickSearch: (keyword: string, district?: string, roomType?: string) => void;
  
  // Selection & Detail
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
  selectedRoom: Room | undefined;
  
  // Comparison
  compareList: string[];
  toggleCompare: (roomId: string) => void;
  removeCompare: (roomId: string) => void;
  clearCompare: () => void;
  compareRooms: Room[];

  // Favorites
  favorites: string[];
  toggleFavorite: (roomId: string) => void;
  isFavorite: (roomId: string) => boolean;

  // View History
  viewHistory: string[];
  addToHistory: (roomId: string) => void;

  // Appointments
  appointments: ViewingAppointment[];
  bookAppointment: (data: Omit<ViewingAppointment, 'id' | 'createdAt' | 'status'>) => void;
  cancelAppointment: (id: string) => void;

  // Reports
  reports: ViolationReport[];
  submitReport: (data: Omit<ViolationReport, 'id' | 'createdAt' | 'status'>) => void;
  resolveReport: (reportId: string) => void;
  dismissReport: (reportId: string) => void;

  // Room CRUD (Landlord & Admin)
  createRoom: (room: Omit<Room, 'id' | 'slug' | 'views' | 'createdAt' | 'updatedAt' | 'approvalStatus'>) => void;
  updateRoom: (roomId: string, data: Partial<Room>) => void;
  deleteRoom: (roomId: string) => void;
  toggleRoomStatus: (roomId: string) => void;

  // Admin Specific
  approveRoom: (roomId: string) => void;
  rejectRoom: (roomId: string, reason: string) => void;
  toggleVerifyRoom: (roomId: string) => void;
  importRoomsFromData: (imported: Partial<Room>[]) => number;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

const ROOMS_STORAGE_KEY = 'tro_thainguyen_rooms_v1';
const FAV_STORAGE_KEY = 'tro_thainguyen_favorites_v1';
const APPOINTMENTS_STORAGE_KEY = 'tro_thainguyen_appointments_v1';
const REPORTS_STORAGE_KEY = 'tro_thainguyen_reports_v1';

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const { currentUser, isAdmin } = useAuth();

  // Rooms list
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem(ROOMS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SEED_ROOMS;
  });

  // Filters
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Selected Room for detail view
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Comparison
  const [compareList, setCompareList] = useState<string[]>([]);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['room-tn-01', 'room-tn-02'];
  });

  // History
  const [viewHistory, setViewHistory] = useState<string[]>(['room-tn-01', 'room-tn-02', 'room-tn-03']);

  // Appointments
  const [appointments, setAppointments] = useState<ViewingAppointment[]>(() => {
    try {
      const saved = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_APPOINTMENTS;
  });

  // Reports
  const [reports, setReports] = useState<ViolationReport[]>(() => {
    try {
      const saved = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REPORTS;
  });

  // Sync to storage
  useEffect(() => {
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
  }, [reports]);

  // Selected Room Object
  const selectedRoom = useMemo(() => {
    if (!selectedRoomId) return undefined;
    return rooms.find((r) => r.id === selectedRoomId);
  }, [selectedRoomId, rooms]);

  // Compare Rooms
  const compareRooms = useMemo(() => {
    return rooms.filter((r) => compareList.includes(r.id));
  }, [compareList, rooms]);

  // Filter Logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Only approved rooms are shown to regular public
      if (!isAdmin && room.approvalStatus !== 'approved') {
        return false;
      }

      // Keyword search
      if (filters.keyword.trim()) {
        const kw = filters.keyword.toLowerCase().trim();
        const matchTitle = room.title.toLowerCase().includes(kw);
        const matchAddress = room.location.address.toLowerCase().includes(kw);
        const matchWard = room.location.ward.toLowerCase().includes(kw);
        const matchUni = room.location.nearUniversities.some((u) => u.name.toLowerCase().includes(kw));
        const matchDesc = room.description.toLowerCase().includes(kw);
        if (!matchTitle && !matchAddress && !matchWard && !matchUni && !matchDesc) {
          return false;
        }
      }

      // District
      if (filters.district && filters.district !== 'Tất cả' && room.location.district !== filters.district) {
        return false;
      }

      // Ward
      if (filters.ward && filters.ward !== 'Tất cả' && filters.ward !== 'Tất cả phường/xã' && room.location.ward !== filters.ward) {
        return false;
      }

      // University
      if (filters.university && filters.university !== 'Tất cả') {
        const nearUni = room.location.nearUniversities.some((u) => u.name.toLowerCase().includes(filters.university.toLowerCase()));
        if (!nearUni) return false;
      }

      // Room Type
      if (filters.roomType && filters.roomType !== 'all' && room.roomType !== filters.roomType) {
        return false;
      }

      // Price Range
      if (room.costs.rent < filters.minPrice || room.costs.rent > filters.maxPrice) {
        return false;
      }

      // Area Range
      if (room.area < filters.minArea || room.area > filters.maxArea) {
        return false;
      }

      // Max Deposit
      if (filters.maxDeposit && room.costs.deposit > filters.maxDeposit) {
        return false;
      }

      // Status
      if (filters.status && filters.status !== 'all' && room.status !== filters.status) {
        return false;
      }

      // Amenities (must have all selected amenities)
      if (filters.amenities.length > 0) {
        const hasAll = filters.amenities.every((a) => room.amenities.includes(a));
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.costs.rent - b.costs.rent;
        case 'price_desc':
          return b.costs.rent - a.costs.rent;
        case 'area_asc':
          return a.area - b.area;
        case 'area_desc':
          return b.area - a.area;
        case 'views':
          return b.views - a.views;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [rooms, filters, isAdmin]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    showToast('Đã xóa tất cả bộ lọc', 'info');
  };

  const quickSearch = (keyword: string, district?: string, roomType?: string) => {
    setFilters((prev) => ({
      ...prev,
      keyword: keyword || '',
      district: district || 'Tất cả',
      roomType: roomType || 'all',
    }));
  };

  // Compare handlers
  const toggleCompare = (roomId: string) => {
    setCompareList((prev) => {
      if (prev.includes(roomId)) {
        showToast('Đã bỏ phòng khỏi danh sách so sánh', 'info');
        return prev.filter((id) => id !== roomId);
      }
      if (prev.length >= 4) {
        showToast('Chỉ có thể so sánh tối đa 4 phòng cùng lúc', 'error');
        return prev;
      }
      showToast('Đã thêm vào danh sách so sánh', 'success');
      return [...prev, roomId];
    });
  };

  const removeCompare = (roomId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== roomId));
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Đã xóa danh sách so sánh', 'info');
  };

  // Favorite handlers
  const toggleFavorite = (roomId: string) => {
    setFavorites((prev) => {
      if (prev.includes(roomId)) {
        showToast('Đã xóa phòng khỏi danh sách yêu thích', 'info');
        return prev.filter((id) => id !== roomId);
      }
      showToast('Đã lưu phòng vào danh sách yêu thích ❤️', 'success');
      return [...prev, roomId];
    });
  };

  const isFavorite = (roomId: string) => favorites.includes(roomId);

  // History
  const addToHistory = (roomId: string) => {
    setViewHistory((prev) => {
      const filtered = prev.filter((id) => id !== roomId);
      return [roomId, ...filtered].slice(0, 20);
    });
    // Increment view count
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, views: r.views + 1 } : r))
    );
  };

  // Appointments
  const bookAppointment = (data: Omit<ViewingAppointment, 'id' | 'createdAt' | 'status'>) => {
    const newAppointment: ViewingAppointment = {
      ...data,
      id: 'app-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast('Đặt lịch xem phòng thành công! Chủ trọ sẽ sớm liên hệ xác nhận.', 'success');
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    );
    showToast('Đã hủy lịch hẹn xem phòng', 'info');
  };

  // Reports
  const submitReport = (data: Omit<ViolationReport, 'id' | 'createdAt' | 'status'>) => {
    const newReport: ViolationReport = {
      ...data,
      id: 'rep-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);
    showToast('Đã gửi báo cáo vi phạm. Ban quản trị sẽ xác minh trong 24h.', 'success');
  };

  const resolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'resolved' } : r))
    );
    showToast('Đã đánh dấu đã xử lý báo cáo vi phạm', 'success');
  };

  const dismissReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'dismissed' } : r))
    );
    showToast('Đã bác bỏ báo cáo vi phạm', 'info');
  };

  // CRUD
  const createRoom = (data: Omit<Room, 'id' | 'slug' | 'views' | 'createdAt' | 'updatedAt' | 'approvalStatus'>) => {
    const newRoom: Room = {
      ...data,
      id: 'room-' + Date.now(),
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      approvalStatus: isAdmin ? 'approved' : 'pending',
    };
    setRooms((prev) => [newRoom, ...prev]);
    if (isAdmin) {
      showToast('Đăng tin phòng thành công và đã hiển thị ngay!', 'success');
    } else {
      showToast('Đã gửi tin đăng! Tin đang chờ Ban quản trị duyệt (thường dưới 15 phút).', 'success');
    }
  };

  const updateRoom = (roomId: string, data: Partial<Room>) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, ...data, updatedAt: new Date().toISOString() } : r))
    );
    showToast('Cập nhật thông tin phòng thành công!', 'success');
  };

  const deleteRoom = (roomId: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
    setCompareList((prev) => prev.filter((id) => id !== roomId));
    setFavorites((prev) => prev.filter((id) => id !== roomId));
    showToast('Đã xóa phòng trọ khỏi hệ thống', 'info');
  };

  const toggleRoomStatus = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const nextStatus = r.status === 'available' ? 'rented' : 'available';
          const msg = nextStatus === 'rented' ? 'Đã đổi trạng thái sang: ĐÃ CHO THUÊ' : 'Đã đổi trạng thái sang: CÒN TRỐNG';
          showToast(msg, 'success');
          return { ...r, status: nextStatus, updatedAt: new Date().toISOString() };
        }
        return r;
      })
    );
  };

  // Admin Actions
  const approveRoom = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, approvalStatus: 'approved', updatedAt: new Date().toISOString() } : r))
    );
    showToast('Đã duyệt tin đăng phòng thành công!', 'success');
  };

  const rejectRoom = (roomId: string, reason: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId
          ? { ...r, approvalStatus: 'rejected', rejectionReason: reason, updatedAt: new Date().toISOString() }
          : r
      )
    );
    showToast('Đã từ chối tin đăng kèm lý do', 'info');
  };

  const toggleVerifyRoom = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const nextVerified = !r.isVerified;
          showToast(nextVerified ? 'Đã cấp tích xanh [ĐÃ XÁC MINH] cho phòng!' : 'Đã gỡ tích xanh xác minh.', 'success');
          return { ...r, isVerified: nextVerified };
        }
        return r;
      })
    );
  };

  const importRoomsFromData = (imported: Partial<Room>[]): number => {
    let count = 0;
    const newItems: Room[] = [];
    imported.forEach((item, index) => {
      if (item.title && item.costs?.rent) {
        newItems.push({
          id: 'imported-' + Date.now() + '-' + index,
          title: item.title,
          slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: item.description || 'Phòng trọ nhập từ danh sách dữ liệu.',
          roomType: item.roomType || 'single',
          area: item.area || 20,
          capacity: item.capacity || 2,
          costs: {
            rent: item.costs.rent,
            deposit: item.costs.deposit || item.costs.rent,
            electricity: item.costs.electricity || 3500,
            electricityType: 'counter',
            water: item.costs.water || 25000,
            waterType: 'counter',
            internet: item.costs.internet || 70000,
            parking: item.costs.parking || 0,
            serviceFee: item.costs.serviceFee || 0,
          },
          location: item.location || {
            address: 'Đường Lương Ngọc Quyến, TP. Thái Nguyên',
            ward: 'Quang Trung',
            district: 'TP. Thái Nguyên',
            city: 'Thái Nguyên',
            coordinates: { lat: 21.588, lng: 105.83 },
            nearUniversities: [{ name: 'Đại học Thái Nguyên', distanceKm: 0.5 }],
          },
          amenities: item.amenities || ['private_bathroom', 'wifi', 'camera'],
          images: item.images && item.images.length > 0 ? item.images : [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&auto=format&fit=crop&q=80'
          ],
          rules: item.rules || ['Giờ giấc tự do'],
          landlord: item.landlord || {
            id: 'landlord-import',
            name: 'Chủ trọ liên kết',
            phone: '0988000999',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
            joinDate: '2026-10-27',
            isVerified: true,
            responseTime: 'Trong 1 giờ',
            rating: 4.8,
            reviewCount: 5,
          },
          status: 'available',
          isVerified: true,
          isFeatured: false,
          views: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          approvalStatus: 'approved',
        });
        count++;
      }
    });

    if (count > 0) {
      setRooms((prev) => [...newItems, ...prev]);
      showToast(`Đã nhập thành công ${count} phòng trọ vào hệ thống!`, 'success');
    }
    return count;
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        filteredRooms,
        filters,
        updateFilters,
        resetFilters,
        quickSearch,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        compareList,
        toggleCompare,
        removeCompare,
        clearCompare,
        compareRooms,
        favorites,
        toggleFavorite,
        isFavorite,
        viewHistory,
        addToHistory,
        appointments,
        bookAppointment,
        cancelAppointment,
        reports,
        submitReport,
        resolveReport,
        dismissReport,
        createRoom,
        updateRoom,
        deleteRoom,
        toggleRoomStatus,
        approveRoom,
        rejectRoom,
        toggleVerifyRoom,
        importRoomsFromData,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRooms = () => {
  const context = useContext(RoomContext);
  if (!context) throw new Error('useRooms must be used within RoomProvider');
  return context;
};
