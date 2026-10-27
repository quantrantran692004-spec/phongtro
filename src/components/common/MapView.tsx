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

    // Initialize Map
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

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add University Landmark Markers
    THAI_NGUYEN_UNIVERSITIES.forEach((uni) => {
      const uniIcon = L.divIcon({
        className: 'custom-uni-marker',
        html: `
          <div style="background-color: #0f766e; color: white; padding: 4px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); border: 2px solid white; display: flex; align-items: center; gap: 4px; white-space: nowrap;">
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
          <div style="font-family: inherit; font-size: 13px;">
            <b style="color: #0f766e;">${uni.name}</b>
            <p style="margin: 4px 0 0 0; color: #475569;">${uni.address}</p>
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
            background-color: ${isSelected ? '#15803d' : '#1e293b'};
            color: white;
            padding: 5px 9px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 800;
            box-shadow: 0 8px 16px -2px rgba(0,0,0,0.3);
            border: 2px solid ${isSelected ? '#86efac' : '#ffffff'};
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: transform 0.2s;
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          ">
            <span>🏠</span>
            <span>${priceText}</span>
          </div>
        `,
        iconSize: [85, 32],
        iconAnchor: [42, 16],
      });

      const marker = L.marker([room.location.coordinates.lat, room.location.coordinates.lng], { icon: roomIcon })
        .addTo(map);

      // Popup Content
      const popupContent = document.createElement('div');
      popupContent.style.fontFamily = 'inherit';
      popupContent.style.width = '200px';
      popupContent.innerHTML = `
        <div style="border-radius: 8px; overflow: hidden; margin-bottom: 8px;">
          <img src="${room.images[0]}" style="width: 100%; height: 95px; object-fit: cover; display: block;" />
        </div>
        <div style="font-size: 11px; font-weight: 700; color: #15803d; margin-bottom: 2px;">
          ${priceText} • ${room.area}m²
        </div>
        <div style="font-size: 12px; font-weight: 600; color: #0f172a; line-height: 1.3; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${room.title}
        </div>
        <button id="btn-view-${room.id}" style="width: 100%; background-color: #16a34a; color: white; border: none; border-radius: 6px; padding: 6px 0; font-size: 11px; font-weight: 700; cursor: pointer;">
          Xem phòng này
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

    // If a room is selected, pan to it
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
    <div className="w-full h-full min-h-[450px] relative rounded-2xl overflow-hidden shadow-soft border border-slate-200">
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '450px' }} />
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-slate-800">
          <span className="w-3 h-3 rounded-full bg-slate-900 inline-block"></span>
          <span>Phòng trọ</span>
        </span>
        <span className="flex items-center gap-1.5 text-teal-800">
          <span className="w-3 h-3 rounded-full bg-teal-700 inline-block"></span>
          <span>Trường Đại Học</span>
        </span>
      </div>
    </div>
  );
};
