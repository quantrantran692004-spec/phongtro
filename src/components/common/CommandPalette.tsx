import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  Building, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Plus, 
  Scale, 
  X 
} from 'lucide-react';
import { useRooms } from '../../context/RoomContext';
import { THAI_NGUYEN_UNIVERSITIES } from '../../data/locations';
import { formatCurrency } from '../../utils/formatters';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom: (roomId: string) => void;
  onNavigate: (tab: 'home' | 'search' | 'landlord' | 'admin') => void;
  onOpenCompare: () => void;
  onOpenPostRoom: () => void;
  onOpenGuide: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectRoom,
  onNavigate,
  onOpenCompare,
  onOpenPostRoom,
  onOpenGuide,
}) => {
  const { rooms, updateFilters } = useRooms();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // will be handled by parent if wired
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered search results
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      // Default quick actions & popular universities
      return [
        {
          type: 'action',
          id: 'act-search-all',
          title: 'Khám phá tất cả phòng trọ Thái Nguyên',
          category: 'Điều hướng',
          icon: Search,
          action: () => { onNavigate('search'); onClose(); }
        },
        {
          type: 'action',
          id: 'act-cheap',
          title: 'Tìm phòng trọ giá sinh viên dưới 1.5 triệu',
          category: 'Gợi ý nhanh',
          icon: Sparkles,
          action: () => {
            updateFilters({ minPrice: 0, maxPrice: 1500000, keyword: '' });
            onNavigate('search');
            onClose();
          }
        },
        {
          type: 'action',
          id: 'act-y-duoc',
          title: 'Phòng trọ gần Đại học Y Dược Thái Nguyên',
          category: 'Khu vực ĐH',
          icon: GraduationCap,
          action: () => {
            updateFilters({ university: 'Trường Đại học Y Dược - ĐH Thái Nguyên', keyword: '' });
            onNavigate('search');
            onClose();
          }
        },
        {
          type: 'action',
          id: 'act-samsung',
          title: 'Phòng trọ gần KCN Samsung Yên Bình Phổ Yên',
          category: 'Khu công nghiệp',
          icon: Building,
          action: () => {
            updateFilters({ ward: 'TX. Phổ Yên', keyword: 'Samsung' });
            onNavigate('search');
            onClose();
          }
        },
        {
          type: 'action',
          id: 'act-guide',
          title: 'Cẩm nang thuê trọ & cách tránh bị lừa cọc',
          category: 'Hướng dẫn',
          icon: BookOpen,
          action: () => { onOpenGuide(); onClose(); }
        },
      ];
    }

    // Search in rooms
    const matchedRooms = rooms
      .filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.location.address.toLowerCase().includes(q) ||
        r.location.ward.toLowerCase().includes(q) ||
        r.location.nearUniversities.some(u => u.name.toLowerCase().includes(q))
      )
      .slice(0, 5)
      .map(r => ({
        type: 'room',
        id: r.id,
        title: r.title,
        subtitle: `${r.location.ward} • ${formatCurrency(r.costs.rent, true)}`,
        category: 'Phòng trọ phù hợp',
        icon: Building,
        action: () => { onSelectRoom(r.id); onClose(); }
      }));

    // Search in universities
    const matchedUnis = THAI_NGUYEN_UNIVERSITIES
      .filter(u => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q) || u.badge.toLowerCase().includes(q))
      .slice(0, 3)
      .map(u => ({
        type: 'uni',
        id: u.id,
        title: u.name,
        subtitle: `${u.ward} • Cách trung tâm ~1km`,
        category: 'Trường Đại học / Cao đẳng',
        icon: GraduationCap,
        action: () => {
          updateFilters({ university: u.name, keyword: '' });
          onNavigate('search');
          onClose();
        }
      }));

    return [...matchedRooms, ...matchedUnis];
  }, [query, rooms, updateFilters, onNavigate, onSelectRoom, onOpenGuide, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-white rounded-lg shadow-card-hover border border-[#E5E2D9] overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-4 border-b border-[#E5E2D9]">
              <Search className="w-5 h-5 text-[#23483D] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Tìm nhanh trường học, phòng trọ, phường xã (VD: Y Dược, Tân Thịnh, Z115...)"
                className="w-full py-4 px-3 text-sm sm:text-base font-medium text-[#252725] placeholder-[#B0B2AF] focus:outline-none bg-transparent"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded text-[#777B78] hover:text-[#252725] hover:bg-[#FAF9F7] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 space-y-1">
              {results.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#777B78] font-normal">
                  Không tìm thấy kết quả nào khớp với "{query}"
                </div>
              ) : (
                results.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left px-3.5 py-3 rounded-md flex items-center justify-between transition-all ${
                        isSelected 
                          ? 'bg-[#E8EEE9] text-[#23483D] font-semibold' 
                          : 'hover:bg-[#FAF9F7] text-[#252725]'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#23483D] text-white' : 'bg-[#EFEEE8] text-[#777B78]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-medium truncate leading-snug">
                            {item.title}
                          </div>
                          {(item as any).subtitle && (
                            <div className="text-xs text-[#777B78] font-normal truncate mt-0.5">
                              {(item as any).subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-brand-700' : 'text-stone-300'}`} />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Keyboard Footer Guide */}
            <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] shadow-2xs font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] shadow-2xs font-mono">↓</kbd>
                  <span>Di chuyển</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] shadow-2xs font-mono">↵</kbd>
                  <span>Chọn</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] shadow-2xs font-mono">ESC</kbd>
                  <span>Đóng</span>
                </span>
              </div>
              <span className="text-brand-800 font-bold">Trọ Thái Nguyên Command</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
