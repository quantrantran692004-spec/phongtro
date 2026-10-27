import { apiClient } from './apiClient';
import { Room, FilterState, ViewingAppointment, ViolationReport } from '../types';
import { SEED_ROOMS } from '../data/seedRooms';

const STORAGE_ROOMS_KEY = 'tro_thainguyen_rooms_v1';
const STORAGE_APPOINTMENTS_KEY = 'tro_thainguyen_appointments_v1';
const STORAGE_REPORTS_KEY = 'tro_thainguyen_reports_v1';

export class RoomService {
  /**
   * Initialize local store if not present
   */
  private getLocalRooms(): Room[] {
    const raw = localStorage.getItem(STORAGE_ROOMS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_ROOMS_KEY, JSON.stringify(SEED_ROOMS));
      return SEED_ROOMS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_ROOMS;
    }
  }

  private setLocalRooms(rooms: Room[]) {
    localStorage.setItem(STORAGE_ROOMS_KEY, JSON.stringify(rooms));
  }

  /**
   * Fetch all rooms with optional filters
   */
  async getRooms(filter?: Partial<FilterState>): Promise<Room[]> {
    if (!apiClient.isMockEnabled) {
      const queryParams = new URLSearchParams();
      if (filter) {
        Object.entries(filter).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== '') {
            if (Array.isArray(val)) {
              queryParams.append(key, val.join(','));
            } else {
              queryParams.append(key, String(val));
            }
          }
        });
      }
      const res = await apiClient.get<Room[]>(`/rooms?${queryParams.toString()}`);
      if (res.success && res.data) {
        return res.data;
      }
      console.warn('API getRooms failed, falling back to local data:', res.error);
    }

    // Mock fallback / Local store
    let rooms = this.getLocalRooms();
    if (!filter) return rooms;

    return rooms.filter((r) => {
      if (filter.ward && filter.ward !== 'Tất cả' && r.location.ward !== filter.ward) {
        return false;
      }
      if (filter.district && filter.district !== 'Tất cả' && r.location.district !== filter.district) {
        return false;
      }
      if (filter.roomType && filter.roomType !== 'all' && r.roomType !== filter.roomType) {
        return false;
      }
      if (filter.minPrice !== undefined && r.costs.rent < filter.minPrice) {
        return false;
      }
      if (filter.maxPrice !== undefined && r.costs.rent > filter.maxPrice) {
        return false;
      }
      if (filter.minArea !== undefined && r.area < filter.minArea) {
        return false;
      }
      if (filter.maxArea !== undefined && r.area > filter.maxArea) {
        return false;
      }
      if (filter.status && filter.status !== 'all' && r.status !== filter.status) {
        return false;
      }
      if (filter.amenities && filter.amenities.length > 0) {
        const hasAll = filter.amenities.every((aId) => r.amenities.includes(aId));
        if (!hasAll) return false;
      }
      if (filter.keyword) {
        const q = filter.keyword.toLowerCase().trim();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchAddr = r.location.address.toLowerCase().includes(q);
        const matchWard = r.location.ward.toLowerCase().includes(q);
        const matchUni = r.location.nearUniversities.some((u) => u.name.toLowerCase().includes(q));
        if (!matchTitle && !matchAddr && !matchWard && !matchUni) return false;
      }
      return true;
    });
  }

  /**
   * Fetch single room by ID
   */
  async getRoomById(id: string): Promise<Room | null> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.get<Room>(`/rooms/${id}`);
      if (res.success && res.data) {
        return res.data;
      }
    }
    const rooms = this.getLocalRooms();
    return rooms.find((r) => r.id === id) || null;
  }

  /**
   * Create a new room
   */
  async createRoom(room: Omit<Room, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<Room> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.post<Room>('/rooms', room);
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error(res.error || 'Lỗi khi tạo phòng');
    }

    const newRoom: Room = {
      ...room,
      id: `room-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: 0,
    };

    const rooms = [newRoom, ...this.getLocalRooms()];
    this.setLocalRooms(rooms);
    return newRoom;
  }

  /**
   * Update room
   */
  async updateRoom(id: string, updates: Partial<Room>): Promise<Room> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.put<Room>(`/rooms/${id}`, updates);
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error(res.error || 'Lỗi cập nhật phòng');
    }

    const rooms = this.getLocalRooms();
    const index = rooms.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Không tìm thấy phòng');

    const updatedRoom: Room = {
      ...rooms[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    rooms[index] = updatedRoom;
    this.setLocalRooms(rooms);
    return updatedRoom;
  }

  /**
   * Delete room
   */
  async deleteRoom(id: string): Promise<void> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.delete(`/rooms/${id}`);
      if (!res.success) throw new Error(res.error || 'Lỗi xóa phòng');
      return;
    }

    const rooms = this.getLocalRooms().filter((r) => r.id !== id);
    this.setLocalRooms(rooms);
  }

  /**
   * Batch import rooms (for CSV admin import)
   */
  async importRooms(roomsToImport: Partial<Room>[]): Promise<Room[]> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.post<Room[]>('/rooms/batch-import', { rooms: roomsToImport });
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error(res.error || 'Lỗi nhập hàng loạt');
    }

    const current = this.getLocalRooms();
    const created: Room[] = roomsToImport.map((r, i) => ({
      ...r,
      id: r.id || `import-${Date.now()}-${i}`,
      title: r.title || 'Phòng trọ mới nhập',
      slug: r.slug || `phong-tro-${Date.now()}-${i}`,
      description: r.description || '',
      roomType: r.roomType || 'single',
      area: r.area || 20,
      capacity: r.capacity || 2,
      costs: r.costs || {
        rent: 1500000,
        deposit: 1000000,
        electricity: 3500,
        electricityType: 'counter',
        water: 30000,
        waterType: 'person',
        internet: 50000,
        parking: 0,
      },
      location: r.location || {
        address: 'Thái Nguyên',
        ward: 'P. Tân Thịnh',
        district: 'TP. Thái Nguyên',
        city: 'Thái Nguyên',
        coordinates: { lat: 21.5855, lng: 105.8198 },
        nearUniversities: [],
      },
      amenities: r.amenities || [],
      images: r.images && r.images.length > 0 ? r.images : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
      rules: r.rules || ['Giữ gìn vệ sinh chung', 'Không làm ồn sau 23h'],
      landlord: r.landlord || {
        id: 'landlord-admin',
        name: 'Ban Quản Trị',
        phone: '0988123456',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        joinDate: '2026-01-01',
        isVerified: true,
        responseTime: 'Trong 15 phút',
        rating: 5.0,
        reviewCount: 1,
      },
      status: r.status || 'available',
      isVerified: r.isVerified || false,
      isFeatured: r.isFeatured || false,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      approvalStatus: r.approvalStatus || 'approved',
    }));

    this.setLocalRooms([...created, ...current]);
    return created;
  }

  /**
   * Submit viewing appointment
   */
  async createAppointment(appointment: Omit<ViewingAppointment, 'id' | 'createdAt' | 'status'>): Promise<ViewingAppointment> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.post<ViewingAppointment>('/appointments', appointment);
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error(res.error || 'Lỗi đặt lịch hẹn');
    }

    const raw = localStorage.getItem(STORAGE_APPOINTMENTS_KEY);
    const list: ViewingAppointment[] = raw ? JSON.parse(raw) : [];

    const newApp: ViewingAppointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_APPOINTMENTS_KEY, JSON.stringify([newApp, ...list]));
    return newApp;
  }

  /**
   * Submit violation report
   */
  async createReport(report: Omit<ViolationReport, 'id' | 'createdAt' | 'status'>): Promise<ViolationReport> {
    if (!apiClient.isMockEnabled) {
      const res = await apiClient.post<ViolationReport>('/reports', report);
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error(res.error || 'Lỗi gửi phản ánh');
    }

    const raw = localStorage.getItem(STORAGE_REPORTS_KEY);
    const list: ViolationReport[] = raw ? JSON.parse(raw) : [];

    const newRep: ViolationReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_REPORTS_KEY, JSON.stringify([newRep, ...list]));
    return newRep;
  }
}

export const roomService = new RoomService();
