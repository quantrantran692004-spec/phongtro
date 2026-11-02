# 🏡 TRỌ THÁI NGUYÊN — HỆ THỐNG PHÒNG TRỌ CHÍNH CHỦ & MINH BẠCH SỐ 1 THÁI NGUYÊN

> Nền tảng tra cứu, minh bạch hóa chi phí và kết nối trực tiếp chủ nhà trọ với sinh viên 8 trường Đại học, Cao đẳng tại Thái Nguyên và kỹ sư, người lao động tại KCN Samsung Phổ Yên (SEVT), KCN Sông Công, Điềm Thụy.

[![Production Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)]()
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)]()
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_/_Supabase-336791.svg)]()
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)]()

---

## 🌟 1. Tổng quan & Triết lý thiết kế

1. **Bản sắc nhận diện thương hiệu Tân Cương Evergreen**:
   - Tông màu xanh đồi chè Tân Cương Thái Nguyên (`#23654B`) kết hợp sắc cam gốm ấm áp (`#F97316`) mang lại cảm giác an tâm, tin cậy và ấm cúng như ở nhà.
   - Font chữ tối ưu hóa cho tiếng Việt có dấu: **Be Vietnam Pro** kết hợp **Plus Jakarta Sans** cho các thông số số liệu sắc nét.
   - Bố cục theo phong cách **Editorial Real-Estate Discovery** hiện đại, khoảng cách cân đối, không dùng dark mode chủ đạo, tạo chiều sâu với các hiệu ứng kính mờ (backdrop-blur) và bóng đổ mềm tự nhiên.

2. **Chức năng 100% nghiệp vụ thực tế (No Placeholder UI)**:
   - **Thanh tìm kiếm thông minh đa tiêu chí**: Tìm theo tên trường ĐH (Y Dược, Sư Phạm, CNTT...), phường/xã (Tân Thịnh, Quang Trung, Z115, Phổ Yên), khoảng giá và loại phòng.
   - **Bản đồ tương tác Leaflet (Interactive Map)**: Định vị chính xác từng phòng trọ và vị trí 8 trường ĐH trọng điểm trên địa bàn tỉnh.
   - **Bảng tính dự toán chi phí tháng đầu (Cost Calculator)**: Tính toán tự động tổng chi phí gồm: Tiền phòng + Tiền cọc + Tiền điện (theo số kWh) + Tiền nước + Wifi + Phí dịch vụ.
   - **Bộ công cụ so sánh đa chiều (Comparison)**: Đặt 2 - 4 phòng lên bàn cân so sánh từng tiêu chí: diện tích, tiền phòng, điện nước, tiện nghi và khoảng cách đến trường.
   - **Đặt lịch hẹn xem phòng trực tiếp (Appointments)**: Hẹn giờ cụ thể, gửi thông tin tức thời và mở kết nối Zalo/điện thoại tới chủ nhà trọ.
   - **Báo cáo vi phạm & tin ảo (Scam Reporting)**: Người dùng có thể gắn cờ phòng đã cho thuê nhưng không hạ tin, phòng kê giá điện nước sai, hoặc cò mồi giả danh.
   - **Kênh Quản lý Chủ Trọ (Landlord Portal)**: Thống kê số lượt xem, quản lý danh sách phòng, 1-click chuyển đổi trạng thái "Còn phòng" / "Đã thuê", bộ wizard đăng tin 4 bước có kiểm tra dữ liệu.
   - **Bảng Quản Trị Hệ Thống (Admin Console)**: Duyệt duyệt/từ chối tin, cấp tích xanh xác minh thực địa, xử lý báo cáo vi phạm, **nhập dữ liệu hàng loạt từ tệp CSV với trình xem trước và kiểm tra lỗi**.

---

## 🏛️ 2. Kiến trúc kỹ thuật (Technical Architecture)

Hệ thống được thiết kế theo mô hình **Decoupled 3-Tier Architecture**, sẵn sàng chuyển đổi từ chế độ xem trước (Offline Mock Store) sang hệ thống Production (PostgreSQL / Supabase / REST API) chỉ với **1 biến môi trường**:

```
[ Frontend: React 18 + TS + Tailwind ]
                │
         [ Service Layer ]
  (src/services/roomService.ts, authService.ts, uploadService.ts)
         │                         │
  [ VITE_USE_MOCK_DATA=true ]   [ VITE_USE_MOCK_DATA=false ]
         │                         │
  ┌──────▼────────────┐     ┌──────▼────────────┐
  │ LocalStorage      │     │ REST API Server   │
  │ Offline Store     │     │ hoặc Supabase BaaS│
  │ (Pre-seeded DB)   │     │ (PostgreSQL 15+)  │
  └───────────────────┘     └───────────────────┘
```

### Cấu trúc mã nguồn:
```
phongtro/
├── .env.example               # Mẫu cấu hình biến môi trường
├── .env                       # Biến môi trường local development
├── Dockerfile                 # Multi-stage Docker build (Node -> Nginx Alpine)
├── docker-compose.yml         # Khởi chạy toàn bộ hệ thống bằng 1 lệnh
├── nginx.conf                 # Cấu hình Nginx tối ưu: Gzip, Caching, SPA fallback
├── database/                  # Thiết kế cơ sở dữ liệu
│   ├── schema.sql             # SQL Schema hoàn chỉnh (Users, Rooms, Costs, Appointments, Reports, RLS)
│   ├── migrations/            # Script Migration phiên bản
│   │   └── 001_initial_schema.sql
│   └── seeds/                 # Dữ liệu khởi tạo thực tế cho Thái Nguyên
│       └── 001_thai_nguyen_seed.sql
└── src/
    ├── services/              # Tầng trừu tượng dữ liệu (Data Access Layer)
    │   ├── apiClient.ts       # Axios/Fetch HTTP client có JWT Interceptor
    │   ├── roomService.ts     # Nghiệp vụ phòng trọ, lọc, CRUD, đặt lịch, báo cáo
    │   ├── authService.ts     # Nghiệp vụ xác thực người dùng, đổi quyền
    │   └── uploadService.ts   # Xử lý upload ảnh (kiểm tra dung lượng, định dạng)
    ├── context/               # Global state (RoomContext, AuthContext, ToastContext)
    ├── components/
    │   ├── home/              # HeroSearch, UniversityShortcuts, FeaturedRooms, AreaExplorer...
    │   ├── search/            # SearchPage, FilterSidebar, Interactive Map
    │   ├── detail/            # RoomDetailView, CostCalculator, BookingModal, ReportModal
    │   ├── landlord/          # LandlordPortal, RoomFormModal
    │   ├── admin/             # AdminPortal, CSV Import/Export Preview
    │   └── common/            # Header, Footer, RoomCard...
    └── types/                 # Domain Types & Interfaces
```

---

## 🚀 3. Hướng dẫn chạy dự án

### Cách 1: Khởi chạy trên máy cục bộ (Node.js)

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy Development Server
npm run dev

# Trình duyệt truy cập: http://localhost:3000
```

### Cách 2: Chạy bằng Docker & Docker Compose (Khuyên dùng cho Production)

```bash
# Khởi chạy container Nginx độc lập trên cổng 80:
docker-compose up -d --build

# Kiểm tra log:
docker-compose logs -f web
```

### Cách 3: Kiểm tra Build Production thủ công

```bash
npm run build
# Bản build hoàn thiện sẽ nằm tại thư mục dist/
```

---

## 👥 4. Tài khoản Demo kiểm thử tức thì (Demo Switcher)

Hệ thống tích hợp sẵn nút đổi vai trò nhanh trên thanh Menu Header hoặc trong hộp thoại Đăng nhập:

| Vai trò | Tên người dùng | Email | Khả năng thao tác |
|---|---|---|---|
| 🎓 **Sinh viên / Người thuê** | An (ĐH Y Dược Thái Nguyên) | `an.sinhvien@tump.edu.vn` | Tìm kiếm, xem bản đồ, dự toán chi phí, đặt lịch hẹn, lưu phòng, so sánh |
| 🏡 **Chủ nhà trọ** | Cô Lan (Tân Thịnh) | `colan.tro@gmail.com` | Quản lý danh sách phòng, bật/tắt phòng trống, tạo phòng trọ mới, xem lịch hẹn |
| 🛡️ **Quản trị viên (Admin)** | Ban Quản Trị Hệ Thống | `admin@trothainguyen.vn` | Duyệt tin, cấp tích xanh, giải quyết khiếu nại, nhập dữ liệu hàng loạt bằng file CSV |

---

## 🗄️ 5. Chuẩn bị kết nối Cơ sở dữ liệu (PostgreSQL / Supabase)

Ứng dụng hiện chạy mock data trong trình duyệt. Luồng phòng đã tách qua `RoomService`; ảnh được nén ở giao diện, và khi tắt mock sẽ tải lên endpoint `/upload` rồi lưu URL ảnh cùng tin phòng qua API. Dự án hiện **chưa kèm backend/API server**, nên chỉ tạo database hoặc đổi cờ môi trường chưa làm dữ liệu đi vào DB.

### Bước 1: Khởi tạo Database
1. Tạo PostgreSQL hoặc project Supabase.
2. Chạy `database/schema.sql`; dữ liệu mẫu trong `database/seeds/001_thai_nguyen_seed.sql` là tùy chọn.
3. Backend cần ghi các trường phòng và chi phí, tiện nghi, ảnh (`room_images`), nội quy, địa điểm lân cận theo schema. File ảnh nên được lưu ở object storage; database chỉ lưu URL.

### Bước 2: Cung cấp REST API cho giao diện

Backend cần triển khai các endpoint:

| Method | Endpoint | Chức năng |
|---|---|---|
| `GET` | `/rooms` | Trả danh sách phòng theo cấu trúc `Room` của giao diện |
| `POST` | `/rooms` | Tạo tin và trả phòng đã lưu |
| `PUT` | `/rooms/:id` | Cập nhật phòng, gồm trạng thái và duyệt tin |
| `DELETE` | `/rooms/:id` | Xóa phòng và dữ liệu liên quan |
| `POST` | `/upload` | Nhận `multipart/form-data`, lưu ảnh và trả `{ url, filename, size }` |
| `POST` | `/rooms/batch-import` | Nhập danh sách phòng |

API trả dữ liệu trực tiếp hoặc theo dạng `{ "success": true, "data": ... }`. Backend phải xác thực chủ phòng/quản trị và giữ khóa database hoặc Supabase service-role ở phía máy chủ; không đưa khóa bí mật vào biến `VITE_*`.

### Bước 3: Bật API mode khi backend sẵn sàng

Trong `.env`:

```env
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

Hiện tại `.env` vẫn để mock mode. Khi có API server, đổi cấu hình và khởi động lại Vite để luồng phòng/ảnh dùng máy chủ thay cho `localStorage`.

---

## 🌐 6. Hướng dẫn cấu hình Tên miền & SSL Nginx trên VPS

1. Trỏ bản ghi DNS:
   - `A` `trothainguyen.vn` -> IP máy chủ VPS của bạn.
   - `CNAME` `www.trothainguyen.vn` -> `trothainguyen.vn`.
2. Cài đặt chứng chỉ SSL miễn phí bằng Certbot:
   ```bash
   sudo certbot --nginx -d trothainguyen.vn -d www.trothainguyen.vn
   ```
3. Cấu hình Nginx tự động gia hạn chứng chỉ HTTPS định kỳ.

---

## 📞 7. Liên hệ & Hỗ trợ kỹ thuật

- **Trọ Thái Nguyên Platform**
- Hotline: `0988.123.456`
- Zalo Hỗ trợ: `0988.123.456`
- Email: `hotro@trothainguyen.vn`
- Địa chỉ: Đường Lương Thế Vinh, Phường Tân Thịnh, TP. Thái Nguyên.
