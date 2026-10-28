import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Room } from '../../types';
import { THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { formatCurrency } from '../../utils/formatters';

interface MapViewProps {
  rooms: Room[];
  selectedRoomId?: string | null;
  onSelectRoom: (roomId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ rooms, selectedRoomId, onSelectRoom }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [21.587, 105.825],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add University Landmark Markers
    THAI_NGUYEN_UNIVERSITIES.forEach((uni) => {
      const uniIcon = L.divIcon({
        className: 'custom-uni-marker',
        html: `
          <div style="
            background-color: #0F172A;
            color: #F8FAFC;
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            box-shadow: 0 6px 16px rgba(15,23,42,0.25);
            border: 2px solid #FCD34D;
            display: flex;
            align-items: center;
            gap: 4px;
            white-space: nowrap;
          ">
            <span>🎓</span>
            <span>${uni.shortName}</span>
          </div>
        `,
        iconSize: [100, 30],
        iconAnchor: [50, 15],
      });

      const uniMarker = L.marker([uni.coordinates.lat, uni.coordinates.lng], { icon: uniIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: inherit; font-size: 12px; padding: 4px;">
            <b style="color: #0F172A; font-size: 13px;">${uni.name}</b>
            <p style="margin: 4px 0 0 0; color: #64748B;">${uni.address}</p>
          </div>
        `);
      markersRef.current.push(uniMarker);
    });

    // Add Room Markers
    rooms.forEach((room) => {
      const isSelected = room.id === selectedRoomId;
      const priceText = formatCurrency(room.costs.rent, true);

      const roomIcon = L.divIcon({
        className: 'custom-room-marker',
        html: `
          <div style="
            background-color: ${isSelected ? '#0F172A' : '#ffffff'};
            color: ${isSelected ? '#FCD34D' : '#0F172A'};
            padding: 5px 11px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 800;
            box-shadow: 0 8px 20px rgba(0,0,0,0.18);
            border: 2px solid ${isSelected ? '#F59E0B' : '#E2E8F0'};
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
          ">
            <span>🏠</span>
            <span>${priceText}</span>
          </div>
        `,
        iconSize: [88, 30],
        iconAnchor: [44, 15],
      });

      const marker = L.marker([room.location.coordinates.lat, room.location.coordinates.lng], { icon: roomIcon })
        .addTo(map);

      const popupContent = document.createElement('div');
      popupContent.style.fontFamily = 'inherit';
      popupContent.style.width = '210px';
      popupContent.innerHTML = `
        <div style="border-radius: 12px; overflow: hidden; margin-bottom: 8px;">
          <img src="${room.images[0]}" style="width: 100%; height: 100px; object-fit: cover; display: block;" />
        </div>
        <div style="font-size: 13px; font-weight: 800; color: #0F172A; margin-bottom: 2px;">
          ${priceText} <span style="font-size: 11px; color: #64748B; font-weight: 500;">• ${room.area}m²</span>
        </div>
        <div style="font-size: 12px; font-weight: 600; color: #334155; line-height: 1.35; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${room.title}
        </div>
        <button id="btn-view-${room.id}" style="width: 100%; background-color: #0F172A; color: white; border: none; border-radius: 9999px; padding: 7px 0; font-size: 11px; font-weight: 700; cursor: pointer; transition: background 0.2s;">
          Xem phòng ngay →
        </button>
      `;

      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-view-${room.id}`);
        if (btn) {
          btn.onclick = () => onSelectRoom(room.id);
        }
      });

      markersRef.current.push(marker);
    });

    if (selectedRoomId) {
      const targetRoom = rooms.find((r) => r.id === selectedRoomId);
      if (targetRoom) {
        map.flyTo([targetRoom.location.coordinates.lat, targetRoom.location.coordinates.lng], 15, {
          duration: 1,
        });
      }
    }
  }, [rooms, selectedRoomId, onSelectRoom]);

  return (
    <div className="w-full h-full min-h-[500px] relative rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-slate-200">
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '500px' }} />
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-xl px-4 py-2 rounded-full shadow-md border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-3.5">
        <span className="flex items-center gap-1.5 text-slate-900">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block shadow-xs"></span>
          <span>Phòng trọ</span>
        </span>
        <span className="flex items-center gap-1.5 text-amber-700">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs"></span>
          <span>Trường Đại Học</span>
        </span>
      </div>
    </div>
  );
};
