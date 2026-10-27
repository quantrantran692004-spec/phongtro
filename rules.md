# Web Frontend, UI Design & Tailwind CSS Rules

> Tổng hợp từ các bộ rule chuẩn của repository [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) chuyên biệt cho:
> 1. **Web Frontend Architecture & Modern JavaScript / TypeScript**
> 2. **UI Design System (Toss-Style Minimalist, High-Trust UI)**
> 3. **Tailwind CSS & Component Styling Standards**

---

## 1. Web Frontend & Code Architecture

### 1.1 Nguyên tắc phát triển chung
* **Luôn viết code đầy đủ, thực thi được ngay**: Không để lại `TODO`, hàm giữ chỗ (placeholder) hoặc thiếu sót logic.
* **Tư duy từng bước (Step-by-step)**: Xác định rõ cấu trúc component, luồng dữ liệu (props, state, events) trước khi viết code.
* **Ưu tiên tính rõ ràng và khả năng đọc (Readability)**: Code tường minh, đặt tên biến có ý nghĩa với trợ động từ mô tả trạng thái (ví dụ: `isLoading`, `hasError`, `isOpen`, `canSubmit`).
* **Mô hình lập trình hàm (Functional & Declarative)**:
  * Tránh dùng class; sử dụng functional component kết hợp hooks.
  * Ưu tiên tính module hóa và khả năng tái sử dụng (DRY), hạn chế trùng lặp code.
* **Cấu trúc file component**:
  1. Imports (thư viện bên ngoài -> components -> utilities/hooks -> types).
  2. Định nghĩa Types / Interfaces.
  3. Exported Component chính.
  4. Subcomponents nội bộ (nếu nhỏ) hoặc tách file riêng.
  5. Helper functions & static constants.

### 1.2 TypeScript Guidelines
* Bắt buộc định kiểu nghiêm ngặt (Strict typing) cho toàn bộ code; ưu tiên `interface` hơn `type` cho cấu trúc dữ liệu và props.
* Tránh sử dụng `enum`, thay vào đó sử dụng `const maps` hoặc union string literals (`type Status = 'pending' | 'success' | 'failed'`).
* Tránh dùng `any`; sử dụng `unknown` kết hợp type guards nếu dữ liệu động từ API.

---

## 2. UI Design System Guidelines (Toss-Style Minimalism)

### 2.1 Định hướng thiết kế (Design Direction)
* **High-trust, Minimalist Product UI**: Xây dựng giao diện đáng tin cậy, bố cục phân cấp rõ ràng, khoảng cách thoáng đãng (generous spacing), hạn chế tối đa các chi tiết trang trí thừa thãi.
* **Nguyên tắc màu sắc tiết chế (Restrained Color)**:
  * Chỉ dùng **1 màu chủ đạo (Accent Color)** cho các hành động chính (Primary Action), trạng thái được chọn (Selected State), hoặc link điều hướng.
  * Toàn bộ cấu trúc khung và bề mặt còn lại sử dụng thang độ xám (Grayscale hierarchy).
  * Tránh đổ bóng quá mạnh (dramatic shadows) hoặc gradient lòe loẹt.
* **Màu ngữ nghĩa (Semantic Status Colors)**:
  * Chỉ dùng cho thông báo trạng thái: `Success` (xanh lá), `Warning` (vàng/cam), `Error` (đỏ), `Info` (xanh dương).
  * Không bao giờ truyền đạt thông tin trạng thái chỉ bằng màu sắc (luôn kèm theo text hoặc icon).

### 2.2 Typography (Kiểu chữ)
* Tuân thủ thang kích thước chặt chẽ (Type scale): Page Title -> Section Title -> Body Text -> Supporting Text -> Metadata/Caption.
* Ưu tiên thay đổi độ đậm (`font-weight`) và sắc thái xám (`text-gray-500`, `text-gray-900`) để phân cấp thông tin trước khi tăng kích thước chữ quá lớn.
* **Không dùng màu đen tuyệt đối (#000000)** cho văn bản; sử dụng gam xám đậm (ví dụ `text-slate-800` hoặc `text-neutral-900`).
* Với các khối hiển thị số liệu / metrics: Làm con số nổi bật rõ rệt, đơn vị đi kèm nhỏ hơn nhưng vẫn dễ đọc.

### 2.3 Bố cục & Nhịp điệu không gian (Layout & Rhythm)
* Dùng các khoảng cách chuẩn (Spacing tokens: 4, 8, 12, 16, 24, 32, 48px). Không tùy tiện dùng giá trị khoảng cách tùy hứng.
* Nội dung liên quan đặt gần nhau; các khối tách biệt được phân tách bằng khoảng trắng thoáng thay vì lạm dụng viền chia cắt.
* Nhịp điệu khối chuẩn: **Tóm tắt (Summary) -> Chi tiết (Details) -> Hành động (Action) -> Ngữ cảnh phụ (Context)**.
* Căn chỉnh lề (alignment) các trường input form, nhãn và nút bấm thẳng hàng, dễ quét mắt.

### 2.4 Thẻ (Cards) & Bề mặt (Surfaces)
* Chỉ gom nhóm vào Card khi nội dung thực sự cần một bề mặt độc lập. Tránh lồng ghép Card trong Card (nested cards).
* Bo góc (Border radius) nhất quán và vừa phải (thường là `rounded-lg` hoặc `rounded-xl`).
* Đổ bóng nhẹ (`shadow-sm`) hoặc đường viền thanh mảnh (`border border-slate-200`), tránh dùng cả bóng đậm lẫn viền dày cùng lúc.

### 2.5 Hỗ trợ Dark Mode & Khả năng tiếp cận (Accessibility - A11y)
* Khi làm Dark Mode: Không đảo ngược màu một cách máy móc mà xây dựng lại bảng xám (Grayscale) trên nền tối, giảm độ chói của màu Accent.
* Đạt độ tương phản tối thiểu chuẩn WCAG AA cho văn bản và nút bấm.
* Luôn có trạng thái Focus rõ ràng (`focus-visible:ring-2`) phục vụ điều hướng bàn phím.
* Kích thước vùng bấm (Tap targets) trên màn hình cảm ứng tối thiểu 44x44px.

---

## 3. Tailwind CSS & Component Styling Standards

### 3.1 Cấu trúc & Cách dùng Utility Classes
* **Ưu tiên Utility Classes**: Tối đa hóa việc dùng các utility class có sẵn của Tailwind, hạn chế viết CSS tùy biến riêng lẻ.
* **Sắp xếp thứ tự class khoa học**:
  1. Layout & Display (`flex`, `grid`, `block`, `relative`, `absolute`)
  2. Positioning & Box Model (`top`, `inset`, `z-index`)
  3. Sizing (`w-`, `h-`, `max-w-`, `min-h-`)
  4. Spacing (`p-`, `m-`, `gap-`, `space-x-`)
  5. Typography (`font-`, `text-`, `leading-`, `tracking-`)
  6. Visual / Colors (`bg-`, `border-`, `rounded-`, `shadow-`)
  7. State & Variants (`hover:`, `focus:`, `active:`, `disabled:`, `dark:`, `sm:`, `md:`, `lg:`)

### 3.2 Responsive Design (Mobile-First)
* Mặc định style cho thiết bị di động trước, sau đó dùng các breakpoint mở rộng dần:
  * `sm:` (640px)
  * `md:` (768px - Tablet)
  * `lg:` (1024px - Desktop)
  * `xl:` (1280px - Large Desktop)
* Tránh viết giá trị cố định (hardcoded pixel width/height) làm vỡ giao diện trên màn hình nhỏ.

### 3.3 Hiệu ứng chuyển động (Animation & Transitions)
* Dùng transition mượt mà, thời gian phản hồi ngắn cho tương tác hover/click: `transition duration-150 ease-in-out`.
* Tránh các hiệu ứng chuyển động chậm chạp hoặc rung lắc gây mất tập trung.
* Tôn trọng cài đặt giảm chuyển động của người dùng (`motion-safe:` / `motion-reduce:`).

### 3.4 Tích hợp UI Components (shadcn/ui style)
* Sử dụng hoặc lấy cảm hứng từ cấu trúc component của Radix UI / shadcn/ui:
  * Phân tách logic accessibility và style giao diện.
  * Hỗ trợ variant linh hoạt thông qua `cva` (class-variance-authority) hoặc `clsx`/`tailwind-merge`.
* Giữ component nhất quán trong toàn bộ hệ thống dự án.

---

## 4. Tóm tắt các lỗi cần tránh (Common Pitfalls)
1. ❌ Không lạm dụng quá nhiều màu sắc sặc sỡ trong cùng một màn hình.
2. ❌ Không tạo các khoảng cách tùy hứng (ví dụ `mt-[13px]`, `p-[7px]`) khi đã có thang đo chuẩn.
3. ❌ Không dùng văn bản màu đen kịt `#000000` trên nền trắng kịt `#ffffff`.
4. ❌ Không nhồi nhét tất cả logic vào một file; luôn tách nhỏ component và hook khi vượt quá 150-200 dòng.
5. ❌ Không bỏ sót các trạng thái: `Loading`, `Empty State`, `Error State`, `Disabled State`.
