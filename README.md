# 🏡 Trọ Thái Nguyên - Nền tảng tìm kiếm phòng trọ thông minh & uy tín

> Nền tảng tìm kiếm, đối chiếu và quản lý phòng trọ chuyên biệt dành cho sinh viên các trường Đại học Thái Nguyên (ĐH Y Dược, ĐH Sư Phạm, ICTU, TNUT, TUEBA, Nông Lâm) và kỹ sư, người lao động tại KCN Samsung Phổ Yên (SEVT), KCN Điềm Thụy, Sông Công.

---

## 🌟 1. Điểm nổi bật & Triết lý thiết kế

1. **Bản sắc & Thẩm mỹ cao cấp**:
   * Tone màu xanh đồi chè Thái Nguyên (`brand: emerald/teal`) kết hợp sắc cam ấm (`warm: amber`) tượng trưng cho mái ấm bình yên.
   * Tuân thủ triết lý thiết kế tối giản, đáng tin cậy chuẩn **Toss Design System** kết hợp **Tailwind CSS**.
   * Hoàn toàn sử dụng tiếng Việt tự nhiên, trực quan, không dùng văn bản mẫu placeholder sơ sài.

2. **Chức năng 100% hoạt động thực tế (No Fake UI)**:
   * **Bản đồ tương tác (Interactive Leaflet Map)**: Hiển thị pins phòng trọ và vị trí các trường ĐH Thái Nguyên kèm popup xem chi tiết.
   * **Bảng tính minh bạch "Chi phí tháng đầu"**: Cho phép người thuê kéo thanh trượt điều chỉnh số người ở, ước tính số số điện dùng hàng tháng để biết trước chính xác tổng chi phí (tiền cọc + tiền phòng + điện nước + wifi).
   * **So sánh phòng đa chiều (Comparison Tool)**: Đối chiếu song song 2 - 4 phòng về giá, diện tích, tiền cọc, chi phí dịch vụ và từng tiện nghi cụ thể.
   * **Đặt lịch hẹn xem phòng trực tiếp (Viewing Appointments)**: Đăng ký lịch hẹn với ngày giờ cụ thể, chuyển tiếp thông tin tới chủ trọ qua Zalo / SĐT.
   * **Báo cáo tin xấu & lừa đảo (Scam Reporting)**: Hệ thống tiếp nhận phản ánh về tin giả, sai giá, ép cọc online và chuyển tới Ban Quản Trị giải quyết.
   * **Cổng quản lý Chủ trọ (Landlord Portal)**: Thống kê lượt xem, quản lý danh sách phòng, bật/tắt trạng thái Còn phòng / Đã cho thuê chỉ với 1 click, wizard đăng tin 4 bước.
   * **Cổng Quản trị viên (Admin Console)**: Duyệt tin đăng, từ chối kèm lý do, cấp huy hiệu xác minh tích xanh, quản lý báo cáo vi phạm, **nhập dữ liệu hàng loạt từ file CSV với trình kiểm tra lỗi & xem trước**.

---

## 🚀 2. Hướng dẫn chạy dự án

### Yêu cầu môi trường
* Node.js version 18+ (khuyên dùng Node 20+)
* npm version 9+

### Cài đặt & Khởi chạy

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy máy chủ phát triển (Development Server)
npm run dev

# Mở trình duyệt tại: http://localhost:3000
```

### Xây dựng bản phát hành (Production Build)

```bash
npm run build
```

---

## 👥 3. Tài khoản Demo (Chuyển đổi 1-chạm)

Hệ thống tích hợp sẵn nút chuyển đổi nhanh vai trò ngay trên thanh thông báo đầu trang (Top Banner) và trong modal Đăng nhập:

| Vai trò | Người dùng | Email | Quyền hạn |
|---|---|---|---|
| 🎓 **Sinh viên / Người thuê** | Nguyễn Văn An (ĐH Y Dược) | `an.sinhvien@tump.edu.vn` | Tìm kiếm, lưu phòng yêu thích, đặt lịch xem phòng, so sánh phòng |
| 🏡 **Chủ nhà trọ** | Cô Lan Tân Thịnh | `colan.tro@gmail.com` | Quản lý tin đăng, đổi trạng thái phòng trống, tạo phòng mới, xem lịch hẹn |
| 🛡️ **Quản trị viên (Admin)** | Admin Trọ Thái Nguyên | `admin@trothainguyen.vn` | Duyệt tin, cấp tích xanh, xử lý báo cáo vi phạm, nhập/xuất CSV |

---

## 📁 4. Cấu trúc thư mục dự án

```
phongtro/
├── .cursor/rules/             # Các bộ quy tắc cursorrules chuẩn
├── .cursorrules               # File chỉ định AI sinh code chuẩn Frontend
├── prompts.md                 # Hướng dẫn prompt engineering cho dự án
├── rules.md                   # Tài liệu chuẩn thiết kế UI/UX & Tailwind
├── index.html                 # File HTML chính với Google Fonts & Leaflet
├── package.json               # Cấu hình dự án & dependencies
├── tailwind.config.js         # Theme màu chè Thái Nguyên & Design tokens
├── vite.config.ts             # Cấu hình Vite & path aliases
└── src/
    ├── types/                 # Định nghĩa TypeScript Domain Types
    ├── data/                  # Dữ liệu phòng trọ, trường ĐH Thái Nguyên, tiện nghi
    ├── context/               # Quản lý trạng thái: RoomContext, AuthContext, ToastContext
    ├── utils/                 # Formatters tiền tệ, khoảng cách, ngày tháng
    ├── components/
    │   ├── common/            # Header, Footer, RoomCard, MapView, CompareBar
    │   ├── home/              # Hero, UniversityShortcuts, Featured, SafeRentGuide
    │   ├── search/            # FilterSidebar, SearchPage
    │   ├── detail/            # RoomDetailView, CostCalculator, BookingModal, ReportModal
    │   ├── compare/           # ComparisonModal
    │   ├── landlord/          # LandlordPortal, RoomFormModal
    │   ├── admin/             # AdminPortal (KPIs, Duyệt tin, Báo cáo, CSV Import)
    │   ├── user/              # AuthModal, UserProfileModal
    │   └── info/              # GuideModal (Cẩm nang an toàn)
    ├── App.tsx                # Component điều phối chính
    └── main.tsx               # Entry point
```

---

## 📜 5. Bản quyền & Giấy phép
Dự án được xây dựng phục vụ cộng đồng sinh viên và người lao động tại Thái Nguyên.
