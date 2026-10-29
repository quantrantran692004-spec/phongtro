import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Trash2, 
  Upload, 
  Download, 
  FileText, 
  AlertTriangle, 
  BarChart3, 
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useRooms } from '../../context/RoomContext';
import { formatCurrency } from '../../utils/formatters';

interface AdminPortalProps {
  onSelectRoom: (roomId: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onSelectRoom }) => {
  const { 
    rooms, 
    approveRoom, 
    rejectRoom, 
    toggleVerifyRoom, 
    deleteRoom, 
    reports, 
    resolveReport, 
    dismissReport,
    importRoomsFromData 
  } = useRooms();

  const [activeTab, setActiveTab] = useState<'overview' | 'approval' | 'reports' | 'import'>('overview');
  const [rejectReason, setRejectReason] = useState('Thông tin phòng chưa rõ ràng, vui lòng bổ sung ảnh chụp thực tế.');
  const [rejectingRoomId, setRejectingRoomId] = useState<string | null>(null);

  // CSV States
  const [csvContent, setCsvContent] = useState('');
  const [parsedPreview, setParsedPreview] = useState<any[]>([]);
  const [importErrors, setImportErrors] = useState<string[]>([]);

  const totalRooms = rooms.length;
  const approvedRooms = rooms.filter((r) => r.approvalStatus === 'approved').length;
  const pendingRooms = rooms.filter((r) => r.approvalStatus === 'pending');
  const verifiedRooms = rooms.filter((r) => r.isVerified).length;
  const pendingReports = reports.filter((r) => r.status === 'pending');

  const handleDownloadSampleCsv = () => {
    const csvHeader = "title,rent,area,ward,address,electricity,water\n";
    const sampleRows = 
      "Phòng trọ mới xây cổng phụ ĐH Nông Lâm,1200000,20,Quyết Thắng,Tổ 10 Xã Quyết Thắng,3000,20000\n" +
      "Chung cư mini view hồ Xương Rồng full đồ,2600000,35,Phan Đình Phùng,Đường Phan Đình Phùng,3500,60000\n" +
      "Studio cao cấp gần ĐH Kinh tế Tân Thịnh,2200000,28,Tân Thịnh,Đường Z115 P. Tân Thịnh,3300,25000\n";
    
    const blob = new Blob([csvHeader + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "mau_nhap_phong_tro_thai_nguyen.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleParseCsv = () => {
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) {
      setImportErrors(['File CSV phải có ít nhất 1 dòng tiêu đề và 1 dòng dữ liệu']);
      return;
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const errors: string[] = [];
    const parsed: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(',').map((v) => v.trim());
      
      const title = values[headers.indexOf('title')] || values[0];
      const rent = Number(values[headers.indexOf('rent')] || values[1]);
      const area = Number(values[headers.indexOf('area')] || values[2]);
      const ward = values[headers.indexOf('ward')] || values[3] || 'Quang Trung';
      const address = values[headers.indexOf('address')] || values[4] || 'TP. Thái Nguyên';
      const electricity = Number(values[headers.indexOf('electricity')] || values[5] || 3200);
      const water = Number(values[headers.indexOf('water')] || values[6] || 25000);

      if (!title) {
        errors.push(`Dòng ${i + 1}: Thiếu tiêu đề phòng trọ`);
      } else if (!rent || isNaN(rent)) {
        errors.push(`Dòng ${i + 1}: Giá thuê không hợp lệ`);
      } else {
        parsed.push({
          title,
          costs: { rent, deposit: rent, electricity, water },
          area: area || 20,
          location: {
            address,
            ward,
            district: 'TP. Thái Nguyên',
            city: 'Thái Nguyên',
            coordinates: { lat: 21.588, lng: 105.83 },
            nearUniversities: [{ name: 'Đại học Thái Nguyên', distanceKm: 0.8 }],
          },
        });
      }
    }

    setImportErrors(errors);
    setParsedPreview(parsed);
  };

  const handleExecuteImport = () => {
    if (parsedPreview.length > 0) {
      importRoomsFromData(parsedPreview);
      setParsedPreview([]);
      setCsvContent('');
      setActiveTab('overview');
    }
  };

  const handleExportCsv = () => {
    let csv = "ID,TieuDe,GiaThue,DienTich,KhuVuc,DiaChi,TrangThai,LuotXem\n";
    rooms.forEach((r) => {
      csv += `"${r.id}","${r.title.replace(/"/g, '""')}",${r.costs.rent},${r.area},"${r.location.ward}","${r.location.address.replace(/"/g, '""')}","${r.status}",${r.views}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `danh_sach_phong_tro_thai_nguyen_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full mb-2 border border-teal-200/80 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Cổng Quản Trị Hệ Thống (Admin Portal)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bảng Điều Khiển Vận Hành Trọ Thái Nguyên
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Kiểm duyệt tin đăng, giám sát xác thực CCCD/Sổ đỏ chính chủ và xử lý báo cáo vi phạm
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-teal-600" />
              <span>Xuất dữ liệu CSV</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 border-b border-slate-200 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-teal-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Tổng quan & Chỉ số</span>
          </button>

          <button
            onClick={() => setActiveTab('approval')}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 relative ${
              activeTab === 'approval'
                ? 'bg-teal-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Duyệt tin đăng</span>
            {pendingRooms.length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1">
                {pendingRooms.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reports'
                ? 'bg-teal-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Báo cáo vi phạm</span>
            {pendingReports.length > 0 && (
              <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1">
                {pendingReports.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'import'
                ? 'bg-teal-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Nhập CSV hàng loạt</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tổng số phòng</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">{totalRooms}</div>
                <span className="text-xs text-teal-700 font-semibold mt-1 block">{approvedRooms} phòng đã duyệt</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Chờ duyệt tin</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 tabular-nums">{pendingRooms.length}</div>
                <span className="text-xs text-slate-400 mt-1 block">Cần xử lý kịp thời</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Đã xác minh</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 tabular-nums">{verifiedRooms}</div>
                <span className="text-xs text-slate-400 mt-1 block">Có tích xanh chính chủ</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Báo cáo vi phạm</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1 tabular-nums">{pendingReports.length}</div>
                <span className="text-xs text-slate-400 mt-1 block">Chờ xem xét giải quyết</span>
              </div>
            </div>

            {/* Master Table */}
            <div className="bg-white rounded-3xl border border-stone-200/80 shadow-card p-5 sm:p-6">
              <h2 className="font-display text-base sm:text-lg font-bold text-stone-900 mb-3.5">
                Toàn bộ danh sách phòng trọ trong hệ thống ({rooms.length})
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-400 uppercase text-[10px] font-bold">
                      <th className="pb-2.5">Phòng trọ</th>
                      <th className="pb-2.5">Giá & Diện tích</th>
                      <th className="pb-2.5">Khu vực</th>
                      <th className="pb-2.5">Trạng thái</th>
                      <th className="pb-2.5">Xác minh</th>
                      <th className="pb-2.5 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {rooms.map((room) => (
                      <tr key={room.id} className="hover:bg-stone-50/70 transition">
                        <td className="py-2.5 pr-2">
                          <div className="flex items-center gap-2.5">
                            <img src={room.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover border border-stone-200" />
                            <div>
                              <div className="font-bold text-stone-900 line-clamp-1 max-w-xs">{room.title}</div>
                              <div className="text-[11px] text-stone-400">{room.landlord.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5">
                          <div className="font-bold text-brand-700">{formatCurrency(room.costs.rent, true)}</div>
                          <div className="text-xs text-stone-400">{room.area} m²</div>
                        </td>
                        <td className="py-2.5 text-stone-700 font-medium">
                          {room.location.ward}
                        </td>
                        <td className="py-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            room.status === 'available' ? 'bg-brand-50 text-brand-800' : 'bg-stone-200 text-stone-700'
                          }`}>
                            {room.status === 'available' ? 'CÒN TRỐNG' : 'ĐÃ THUÊ'}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <button
                            onClick={() => toggleVerifyRoom(room.id)}
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg border transition ${
                              room.isVerified
                                ? 'bg-brand-50 text-brand-800 border-brand-300'
                                : 'bg-stone-100 text-stone-400 border-stone-200 hover:bg-brand-50'
                            }`}
                            title="Cấp / Hủy tích xanh"
                          >
                            <ShieldCheck className="w-3 h-3" />
                            <span>{room.isVerified ? 'Đã xác minh' : 'Chưa'}</span>
                          </button>
                        </td>
                        <td className="py-2.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onSelectRoom(room.id)}
                              className="p-1.5 text-stone-600 hover:text-brand-700 rounded-lg hover:bg-stone-100"
                              title="Xem chi tiết"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Xóa phòng trọ này?')) {
                                  deleteRoom(room.id);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPROVAL */}
        {activeTab === 'approval' && (
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-card p-5 sm:p-6">
            <h2 className="font-display text-base sm:text-lg font-bold text-stone-900 mb-4">
              Tin đăng chờ phê duyệt ({pendingRooms.length})
            </h2>

            {pendingRooms.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs sm:text-sm">
                <CheckCircle2 className="w-10 h-10 text-brand-600 mx-auto mb-2" />
                <span>Không có tin nào chờ duyệt. Hệ thống đã xử lý xong!</span>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRooms.map((room) => (
                  <div key={room.id} className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={room.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-stone-900 text-sm">{room.title}</div>
                        <div className="text-stone-500 mt-0.5">
                          Giá: <strong>{formatCurrency(room.costs.rent)}</strong> • {room.area}m² • {room.location.ward}
                        </div>
                        <div className="text-stone-400 mt-0.5">
                          Đăng bởi: {room.landlord.name} ({room.landlord.phone})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => approveRoom(room.id)}
                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Duyệt tin</span>
                      </button>

                      <button
                        onClick={() => setRejectingRoomId(room.id)}
                        className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 font-bold rounded-xl flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Từ chối</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REPORTS */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-card p-5 sm:p-6">
            <h2 className="font-display text-base sm:text-lg font-bold text-stone-900 mb-4">
              Báo cáo vi phạm từ người dùng ({reports.length})
            </h2>

            {reports.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs sm:text-sm">
                Không có báo cáo vi phạm nào.
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-bold text-rose-700 text-[10px] uppercase bg-rose-100 px-2 py-0.5 rounded">
                          {rep.reason}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          rep.status === 'resolved' ? 'bg-brand-50 text-brand-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {rep.status === 'resolved' ? 'Đã giải quyết' : 'Chờ xử lý'}
                        </span>
                      </div>
                      <div className="font-bold text-stone-900 text-sm">{rep.roomTitle}</div>
                      <p className="text-stone-600 mt-1 italic bg-white p-2 rounded-xl border border-stone-200">
                        "{rep.description}"
                      </p>
                      <div className="text-[10px] text-stone-400 mt-1">
                        Bởi: {rep.reporterName} • {rep.reporterPhone || 'Không có SĐT'}
                      </div>
                    </div>

                    {rep.status === 'pending' && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => resolveReport(rep.id)}
                          className="px-3 py-1.5 bg-brand-600 text-white font-bold rounded-xl"
                        >
                          Đã xử lý
                        </button>
                        <button
                          onClick={() => dismissReport(rep.id)}
                          className="px-3 py-1.5 bg-stone-200 text-stone-700 font-bold rounded-xl"
                        >
                          Bác bỏ
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CSV IMPORT */}
        {activeTab === 'import' && (
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-card p-5 sm:p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h2 className="font-display text-base sm:text-lg font-bold text-stone-900">
                  Nhập dữ liệu phòng trọ hàng loạt từ CSV
                </h2>
                <button
                  onClick={handleDownloadSampleCsv}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200/80 px-2.5 py-1 rounded-xl hover:bg-brand-100 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải file CSV mẫu</span>
                </button>
              </div>
              <p className="text-xs text-stone-500">
                Cho phép nạp nhanh danh mục phòng trọ từ file Excel/CSV với bước kiểm tra lỗi và xem trước.
              </p>
            </div>

            <div>
              <textarea
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                placeholder="title,rent,area,ward,address,electricity,water&#10;Phòng trọ mới xây ĐH Nông Lâm,1200000,20,Quyết Thắng,Tổ 10 Quyết Thắng,3000,20000"
                rows={5}
                className="w-full p-3 font-mono text-xs bg-stone-50 border border-stone-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-brand-500"
              />

              <div className="mt-2.5 flex items-center gap-3">
                <button
                  onClick={handleParseCsv}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Kiểm tra & Xem trước (Parse CSV)
                </button>
                <button
                  onClick={() => {
                    setCsvContent(
                      "title,rent,area,ward,address,electricity,water\n" +
                      "Phòng trọ sinh viên gần cổng ĐH Sư Phạm,1400000,22,Quang Trung,Ngõ 20 Lương Ngọc Quyến,3200,25000\n" +
                      "Studio mini ban công thoáng Làng ĐH Tân Thịnh,2500000,32,Tân Thịnh,Đường Z115 Tân Thịnh,3500,60000\n" +
                      "Phòng khép kín sạch đẹp ĐH Kỹ Thuật Công Nghiệp,1300000,20,Tích Lương,Đường 3/2 P. Tích Lương,3000,20000"
                    );
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  Dán nhanh dữ liệu mẫu
                </button>
              </div>
            </div>

            {importErrors.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-2xl text-xs space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Phát hiện các lỗi trong file:</span>
                </div>
                {importErrors.map((err, idx) => (
                  <p key={idx}>• {err}</p>
                ))}
              </div>
            )}

            {parsedPreview.length > 0 && (
              <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900">
                    Xem trước hợp lệ ({parsedPreview.length} phòng)
                  </h3>
                  <button
                    onClick={handleExecuteImport}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Nạp ngay {parsedPreview.length} phòng
                  </button>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {parsedPreview.map((item, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                      <span className="font-bold text-stone-900">{item.title}</span>
                      <span className="text-brand-700 font-extrabold">{formatCurrency(item.costs.rent)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {rejectingRoomId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-3">
            <h3 className="font-bold text-sm text-stone-900">Từ chối tin đăng phòng</h3>
            <p className="text-xs text-stone-500">Lý do từ chối gửi tới chủ trọ:</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectingRoomId(null)}
                className="px-3 py-1.5 text-xs text-stone-400 hover:bg-stone-100 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  rejectRoom(rejectingRoomId, rejectReason);
                  setRejectingRoomId(null);
                }}
                className="px-3.5 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
