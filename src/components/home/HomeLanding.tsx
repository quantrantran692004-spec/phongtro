import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Building2,
  ChevronDown,
  CheckCircle2,
  Compass,
  GraduationCap,
  Headphones,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Users,
  RefreshCw,
} from 'lucide-react';
import heroImage from '../../assets/anhmoi.png';
import { WARDS_BY_DISTRICT } from '../../data/locations';
import { useRooms } from '../../context/RoomContext';

interface HomeLandingProps {
  onSearchSubmit: () => void;
  onOpenGuide: () => void;
}

type QuickCategory = 'all' | 'studio' | 'university' | 'samsung';
type SearchDropdownId = 'ward' | 'price';

interface SearchDropdownOption {
  value: string;
  label: string;
}

interface SearchDropdownProps {
  id: SearchDropdownId;
  label: string;
  value: string;
  options: SearchDropdownOption[];
  icon: React.ElementType;
  open: boolean;
  onOpen: (id: SearchDropdownId) => void;
  onClose: (id: SearchDropdownId) => void;
  onChange: (value: string) => void;
  className?: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  id,
  label,
  value,
  options,
  icon: Icon,
  open,
  onOpen,
  onClose,
  onChange,
  className = '',
}) => {
  const selectedOption = options.find((option) => option.value === value) ?? options[0];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{ left: number; top: number; width: number; maxHeight: number } | null>(null);

  useLayoutEffect(() => {
    if (!open) return;

    const updatePlacement = () => {
      const trigger = dropdownRef.current?.querySelector('button');
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      setMenuPosition({
        left: rect.left,
        top: rect.bottom + 8,
        width: rect.width,
        maxHeight: Math.min(156, Math.max(112, window.innerHeight - rect.bottom - 20)),
      });
    };

    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);
    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current?.contains(target) || document.querySelector(`[data-home-dropdown="${id}"]`)?.contains(target)) return;
      onClose(id);
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [id, open, onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`group relative min-w-0 ${open ? 'z-30' : 'z-0'} ${className}`}
      onMouseEnter={() => onOpen(id)}
    >
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onFocus={() => onOpen(id)}
        onClick={() => onOpen(id)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') onClose(id);
          if (event.key === 'ArrowDown') onOpen(id);
        }}
        className="flex min-h-[52px] w-full min-w-0 items-center gap-2 rounded-xl px-2 py-2.5 text-left transition-colors duration-200 hover:bg-teal-50/70 focus-visible:bg-teal-50/80 focus-visible:outline-none lg:rounded-none lg:px-3"
      >
        <Icon className="h-4 w-4 shrink-0 text-slate-500 transition-colors duration-200 group-hover:text-teal-700 group-focus-within:text-teal-700" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 transition-colors duration-200 group-hover:text-teal-800 group-focus-within:text-teal-800">{label}</span>
          <span className="mt-1 block truncate text-xs font-semibold text-slate-900">{selectedOption?.label}</span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180 text-teal-700' : ''}`} aria-hidden="true" />
      </button>

      {open && menuPosition && createPortal(
        <div
            data-home-dropdown={id}
            style={{ left: menuPosition.left, top: menuPosition.top, width: menuPosition.width, maxHeight: menuPosition.maxHeight }}
            role="listbox"
            aria-label={label}
            data-lenis-prevent
            className="fixed z-[1000] overflow-y-auto overscroll-contain rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-xl shadow-slate-900/15 ring-1 ring-black/5"
            onKeyDown={(event) => {
              if (event.key === 'Escape') onClose(id);
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  onClose(id);
                }}
                className={`block min-h-9 w-full rounded-lg px-3 py-2 text-left text-xs transition-colors duration-150 hover:bg-teal-50 hover:text-teal-800 focus-visible:bg-teal-50 focus-visible:outline-none ${value === option.value ? 'bg-teal-50/80 font-semibold text-teal-800' : 'text-slate-700'}`}
              >
                {option.label}
              </button>
            ))}
        </div>,
        document.body
      )}
    </div>
  );
};

const quickCategories: Array<{ id: QuickCategory; label: string; icon: React.ElementType }> = [
  { id: 'all', label: 'Tất cả phòng', icon: Home },
  { id: 'studio', label: 'Studio & Căn hộ', icon: Building2 },
  { id: 'university', label: 'Gần trường ĐH', icon: GraduationCap },
  { id: 'samsung', label: 'KCN Samsung', icon: MapPin },
];

const trustPoints = [
  { title: 'Ảnh thật', detail: 'Thông tin rõ ràng', icon: CheckCircle2 },
  { title: 'Chủ trọ xác thực', detail: 'Kết nối trực tiếp', icon: ShieldCheck },
  { title: 'Vị trí thuận tiện', detail: 'Gần trường & nơi làm', icon: Compass },
  { title: 'Hỗ trợ nhanh', detail: 'Cẩm nang miễn phí', icon: Headphones },
];

export const HomeLanding: React.FC<HomeLandingProps> = ({ onSearchSubmit, onOpenGuide }) => {
  const { rooms, filters, updateFilters } = useRooms();
  const [activeCategory, setActiveCategory] = useState<QuickCategory>('all');
  const [keyword, setKeyword] = useState(filters.keyword);
  const [ward, setWard] = useState(filters.ward || 'Tất cả');
  const [roomType, setRoomType] = useState(filters.roomType || 'all');
  const [priceTier, setPriceTier] = useState('all');
  const [openDropdown, setOpenDropdown] = useState<SearchDropdownId | null>(null);

  const locationOptions = Array.from(
    new Set([
      ...Object.values(WARDS_BY_DISTRICT).flat(),
      ...rooms.map((room) => room.location.ward),
    ])
  )
    .filter((area) => area && area !== 'Tất cả' && area !== 'Tất cả phường/xã')
    .sort((a, b) => a.localeCompare(b, 'vi'));

  const wardOptions: SearchDropdownOption[] = [
    { value: 'Tất cả', label: 'Toàn Thái Nguyên' },
    ...locationOptions.map((area) => ({ value: area, label: area })),
  ];
  const priceOptions: SearchDropdownOption[] = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: 'under_1_5m', label: 'Dưới 1,5 triệu' },
    { value: 'from_1_5m_to_3m', label: '1,5–3 triệu' },
    { value: 'above_3m', label: 'Trên 3 triệu' },
  ];

  const selectCategory = (category: QuickCategory) => {
    const presets: Record<QuickCategory, { keyword: string; ward: string; roomType: string }> = {
      all: { keyword: '', ward: 'Tất cả', roomType: 'all' },
      studio: { keyword: '', ward: 'Tất cả', roomType: 'studio' },
      university: { keyword: 'ĐH', ward: 'Tất cả', roomType: 'all' },
      samsung: { keyword: 'Samsung', ward: 'Phổ Yên', roomType: 'all' },
    };
    const preset = presets[category];

    setActiveCategory(category);
    setKeyword(preset.keyword);
    setWard(preset.ward);
    setRoomType(preset.roomType);
    setPriceTier('all');

    updateFilters({
      ...preset,
      district: 'Tất cả',
      university: 'Tất cả',
      minPrice: 0,
      maxPrice: 10000000,
      minArea: 0,
      maxArea: 100,
      amenities: [],
      status: 'all',
      maxDeposit: 10000000,
    });
    onSearchSubmit();
  };

  const submitSearch = () => {
    const priceRanges: Record<string, { minPrice: number; maxPrice: number }> = {
      all: { minPrice: 0, maxPrice: 10000000 },
      under_1_5m: { minPrice: 0, maxPrice: 1500000 },
      from_1_5m_to_3m: { minPrice: 1500000, maxPrice: 3000000 },
      above_3m: { minPrice: 3000000, maxPrice: 10000000 },
    };

    updateFilters({
      keyword,
      ward,
      roomType,
      district: 'Tất cả',
      university: 'Tất cả',
      ...priceRanges[priceTier],
    });
    onSearchSubmit();
  };

  const metrics = [
    { value: '12.000+', label: 'phòng trọ đang đăng', icon: Home },
    { value: '50.000+', label: 'người đã tìm được phòng', icon: Users },
    { value: '4.9/5', label: 'Đánh giá từ người dùng', icon: Star },
    { value: 'Phục vụ 24/7', label: 'mọi lúc mọi nơi', icon: RefreshCw },
  ];

  return (
    <section
      aria-label="Trang chủ Trọ Thái Nguyên"
      data-motion-cinematic
      data-motion-sequence="hero"
      className={`relative isolate min-h-[clamp(860px,100vh,1040px)] bg-slate-900 ${openDropdown ? 'z-30' : ''}`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={heroImage}
          data-motion-hero="image"
          data-motion-cinematic-image
          alt=""
          className="hero-cinematic-image absolute inset-0 h-full w-full object-cover object-[62%_center] saturate-[0.92] lg:object-center"
        />
        <div className="hero-atmosphere-layer absolute inset-0 bg-gradient-to-r from-white/45 via-white/12 to-transparent sm:from-white/35 lg:from-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/5" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[clamp(860px,100vh,1040px)] w-full max-w-[1440px] flex-col px-4 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-28 lg:px-12 xl:px-20">
        <div className="max-w-3xl">
          <div data-motion-step="label" className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-950 sm:text-xs">
            <span className="h-px w-8 bg-teal-800" />
            <span>Nền tảng tìm phòng trọ uy tín</span>
          </div>

          <h1 data-motion-step="headline" data-motion-split className="max-w-3xl font-serif text-2xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-[clamp(2.5rem,4vw,3.75rem)]">
            Kiến tạo không gian sống
            <span className="block text-teal-700">Chuẩn mực & Minh bạch</span>
          </h1>
          <div aria-hidden="true" className="mt-3 h-12 sm:mt-4 sm:h-14" />
          <div data-motion-step="stagger" className="mt-4 grid max-w-3xl grid-cols-2 items-center gap-x-3 gap-y-3 sm:mt-6 sm:flex sm:gap-0">
            {trustPoints.map(({ title, detail, icon: Icon }, index) => (
              <div
                className={`flex min-w-0 items-center gap-2.5 sm:flex-1 sm:py-1 ${index === 0 ? 'sm:pl-0 sm:pr-3' : 'sm:border-l sm:border-teal-950/20 sm:px-3'}`}
                key={title}
              >
                <Icon
                  className="h-6 w-6 shrink-0 text-teal-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                <div className="text-[10px] leading-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)] sm:text-[11px]">
                  <div className="font-semibold text-slate-900">{title}</div>
                  <div className="mt-0.5 text-slate-700">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section aria-label="Tìm phòng trọ" className="mt-5 w-full max-w-[1080px] sm:mt-8 lg:mt-10">
          <div data-motion-step="panel" className="rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl shadow-slate-950/15 backdrop-blur-xl sm:rounded-3xl sm:p-4">
            <div className="no-scrollbar mb-3 flex gap-1 overflow-x-auto border-b border-slate-200 pb-3 sm:gap-2">
              {quickCategories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectCategory(id)}
                  aria-pressed={activeCategory === id}
                  className={`group inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-3 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(15,118,110,0.16)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 sm:px-4 ${
                    activeCategory === id
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-900/15 hover:bg-teal-800'
                      : 'text-slate-700 hover:bg-teal-50 hover:text-teal-800'
                  }`}
                >
                  <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
              className="grid grid-cols-2 gap-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-center lg:gap-0"
            >
              <label className="group col-span-2 flex min-w-0 cursor-text items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-teal-50/60 focus-within:bg-teal-50/80 lg:col-span-1 lg:border-r lg:border-slate-200 lg:rounded-r-none">
                <Search className="h-4 w-4 shrink-0 text-slate-500 transition-colors duration-200 group-hover:text-teal-700 group-focus-within:text-teal-700" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 transition-colors duration-200 group-hover:text-teal-800 group-focus-within:text-teal-800">Từ khóa / Trường ĐH</span>
                  <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="VD: ĐH Y Dược, Samsung"
                    className="mt-1 w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>

              <SearchDropdown
                id="ward"
                label="Khu vực"
                value={ward}
                options={wardOptions}
                icon={MapPin}
                open={openDropdown === 'ward'}
                onOpen={setOpenDropdown}
                onClose={(id) => setOpenDropdown((current) => current === id ? null : current)}
                onChange={setWard}
                className="lg:border-r lg:border-slate-200"
              />
              <SearchDropdown
                id="price"
                label="Mức giá"
                value={priceTier}
                options={priceOptions}
                icon={SlidersHorizontal}
                open={openDropdown === 'price'}
                onOpen={setOpenDropdown}
                onClose={(id) => setOpenDropdown((current) => current === id ? null : current)}
                onChange={setPriceTier}
              />

              <div className="col-span-2 flex items-center justify-end gap-2 border-t border-slate-100 pt-2 lg:col-span-1 lg:border-0 lg:pt-0 lg:pl-3">
                <button
                  type="button"
                  onClick={submitSearch}
                  aria-label="Mở bộ lọc tìm kiếm"
                  title="Mở bộ lọc tìm kiếm"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-50 hover:text-teal-800 hover:shadow-md active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="submit"
                  data-motion-magnetic
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-teal-700 px-5 text-xs font-bold uppercase tracking-wide text-white shadow-sm shadow-teal-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg hover:shadow-teal-900/20 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 md:flex-initial sm:px-7"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Tìm kiếm <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </div>

        </section>

        <div className="flex-1" />

        <div data-motion-step="footer" className="mt-auto flex flex-col gap-4 pt-8 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          <div className="flex items-center lg:w-44 lg:flex-none">
            <div className="w-60">
              <svg className="h-20 w-full overflow-visible text-white drop-shadow-md" viewBox="0 0 260 80" role="img" aria-label="Không chỉ là nơi ở mà là một trải nghiệm sống">
                <title>Không chỉ là nơi ở mà là một trải nghiệm sống</title>
                <defs>
                  <path id="quote-line-one" d="M4 24 Q82 13 171 20" />
                  <path id="quote-line-two" d="M10 50 Q115 40 237 46" />
                </defs>
                <text className="font-script" fill="currentColor" fontSize="25">
                  <textPath href="#quote-line-one">Không chỉ là nơi ở</textPath>
                </text>
                <text className="font-script" fill="currentColor" fontSize="24">
                  <textPath href="#quote-line-two">mà là một trải nghiệm sống</textPath>
                </text>
                <path d="M2 71C51 66 91 64 137 65C183 67 222 66 258 62" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M22 76C48 69 71 66 94 66" fill="none" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-3 lg:flex lg:flex-1 lg:justify-center lg:gap-0">
            {metrics.map(({ value, label, icon: Icon }, index) => (
              <div
                className={`flex min-w-0 items-center gap-2 px-2 sm:gap-3 sm:px-3 lg:flex-1 lg:px-2 xl:px-3 ${index > 0 ? 'lg:border-l lg:border-white/30' : ''}`}
                key={label}
              >
                <Icon className="h-6 w-6 shrink-0 text-white sm:h-7 sm:w-7" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="whitespace-nowrap text-xs font-extrabold leading-tight sm:text-sm">{value}</div>
                  <div className="text-[9px] leading-tight text-white/85 sm:text-[10px]">{label}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenGuide}
            className="inline-flex min-h-12 items-center gap-2 self-end rounded-full border border-teal-200/30 bg-[#07343c]/95 px-3 text-white shadow-[0_5px_18px_rgba(2,24,32,0.38),0_0_15px_rgba(45,212,191,0.18)] transition-colors hover:bg-[#08434b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-4 lg:self-auto lg:shrink-0"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 to-teal-500 text-teal-800 shadow-[0_0_12px_rgba(45,212,191,0.32)] ring-1 ring-white/25">
              <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3.5a8.5 8.5 0 0 0-7.2 13.02L3.5 20.5l4.16-1.25A8.5 8.5 0 1 0 12 3.5Z" fill="white" />
                <circle cx="8.7" cy="12" r="1.05" fill="#087b79" />
                <circle cx="12" cy="12" r="1.05" fill="#087b79" />
                <circle cx="15.3" cy="12" r="1.05" fill="#087b79" />
              </svg>
              <span className="chat-status-light absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-[#07343c] bg-emerald-300 shadow-[0_0_7px_2px_rgba(52,211,153,0.8)]" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-xs font-bold">Chat ngay</span>
              <span className="block text-[10px] text-teal-100">Hỗ trợ nhanh</span>
            </span>
          </button>
        </div>
      </div>
      <div data-motion-step="cue" aria-hidden="true" className="pointer-events-none absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75 lg:flex">
        <span>Cuộn khám phá</span>
        <span className="motion-scroll-cue relative h-4 w-px overflow-hidden bg-white/35">
          <span className="absolute left-0 top-0 h-1.5 w-px bg-white" />
        </span>
      </div>
    </section>
  );
};
