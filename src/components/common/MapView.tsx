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
          <div style="background-color: #1F5B42; color: white; padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.18); border: 2px solid white; display: flex; align-items: center; gap: 4px; white-space: nowrap;">
            <span>🎓</span>
            <span>${uni.shortName}</span>
          </div>
        `,
        iconSize: [95, 28],
        iconAnchor: [47, 14],
      });

      const uniMarker = L.marker([uni.coordinates.lat, uni.coordinates.lng], { icon: uniIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: inherit; font-size: 12px; padding: 2px;">
            <b style="color: #1F5B42; font-size: 13px;">${uni.name}</b>
            <p style="margin: 3px 0 0 0; color: #52524A;">${uni.address}</p>
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
            background-color: ${isSelected ? '#1F5B42' : '#181816'};
            color: white;
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
            box-shadow: 0 6px 12px -2px rgba(0,0,0,0.25);
            border: 2px solid ${isSelected ? '#99C1AD' : '#ffffff'};
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 3px;
            transition: transform 0.2s;
            transform: ${isSelected ? 'scale(1.12)' : 'scale(1)'};
          ">
            <span>🏠</span>
            <span>${priceText}</span>
          </div>
        `,
        iconSize: [80, 28],
        iconAnchor: [40, 14],
      });

      const marker = L.marker([room.location.coordinates.lat, room.location.coordinates.lng], { icon: roomIcon })
        .addTo(map);

      const popupContent = document.createElement('div');
      popupContent.style.fontFamily = 'inherit';
      popupContent.style.width = '190px';
      popupContent.innerHTML = `
        <div style="border-radius: 8px; overflow: hidden; margin-bottom: 6px;">
          <img src="${room.images[0]}" style="width: 100%; height: 90px; object-fit: cover; display: block;" />
        </div>
        <div style="font-size: 11px; font-weight: 800; color: #1F5B42; margin-bottom: 2px;">
          ${priceText} • ${room.area}m²
        </div>
        <div style="font-size: 11px; font-weight: 600; color: #181816; line-height: 1.3; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${room.title}
        </div>
        <button id="btn-view-${room.id}" style="width: 100%; background-color: #23654B; color: white; border: none; border-radius: 6px; padding: 5px 0; font-size: 11px; font-weight: 700; cursor: pointer;">
          Xem phòng
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
    <div className="w-full h-full min-h-[450px] relative rounded-2xl overflow-hidden shadow-subtle border border-stone-200">
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '450px' }} />
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs border border-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-stone-800">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block"></span>
          <span>Phòng trọ</span>
        </span>
        <span className="flex items-center gap-1.5 text-brand-700">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-600 inline-block"></span>
          <span>Trường Đại Học</span>
        </span>
      </div>
    </div>
  );
};
