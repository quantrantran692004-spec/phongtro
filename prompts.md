# Awesome AI Prompts & Engineering Guidelines for Web Frontend

> Bộ sưu tập prompt và quy chuẩn phát triển phần mềm được tuyển chọn từ repository [convertscout/awesome-ai-prompts](https://github.com/convertscout/awesome-ai-prompts).

---

## 1. Top 10 Nguyên Tắc Cursor AI Coding (Best Cursor Rules)

Quy chuẩn tối ưu khi làm việc với AI coding assistant (Cursor / Claude / Copilot):

1. **Modular Code (<300 lines)**:
   > *"Ưu tiên functional components; chia nhỏ file dưới 300 dòng và sử dụng named exports thay vì default export."*
2. **Error Handling & Feedback**:
   > *"Bọc toàn bộ các lời gọi bất đồng bộ (async calls) trong try-catch; thông báo lỗi thân thiện cho người dùng qua Toast notification (Sonner / Toast UI)."*
3. **Strict TypeScript**:
   > *"Bật strict mode; định nghĩa interface rõ ràng cho tất cả props component, payload và response từ API."*
4. **Testing**:
   > *"Đặt file `.test.ts(x)` cùng thư mục component; nhắm tới độ phủ >80% cho phần business logic cốt lõi."*
5. **Comments**:
   > *"Giải thích lý do 'Tại sao' (Why) thay vì diễn giải 'Làm gì' (What). Sử dụng JSDoc cho các public API / helper utility functions."*
6. **State Management**:
   > *"Giữ state ở mức cục bộ (colocate state); chỉ đẩy lên cấp cha khi 2+ component con đồng cấp cần dùng. Ưu tiên TanStack React Query cho server state."*
7. **Performance**:
   > *"Lazy-load các route và modal nặng; memoize các phép tính phức tạp (`useMemo`); ảo hóa danh sách dài (`react-virtualized` / `@tanstack/react-virtual`)."*
8. **Accessibility (A11y)**:
   > *"Sử dụng Semantic HTML trước tiên (`<nav>`, `<main>`, `<button>`, `<section>`); chỉ thêm thuộc tính ARIA khi cần thiết; đảm bảo hỗ trợ điều hướng bàn phím và screen reader."*
9. **Security**:
   > *"Sanitize dữ liệu đầu vào; không bao giờ tin tưởng dữ liệu từ client; bảo vệ trước XSS và lỗ hổng CSRF; không lộ API key / secret trong mã nguồn client."*
10. **Git Hygiene**:
    > *"Thực hiện atomic commit (mỗi commit giải quyết một mục đích cụ thể); tuân thủ Conventional Commits (`feat:`, `fix:`, `refactor:`); rebase/squash gọn gàng trước khi merge."*

---

## 2. Prompt Mẫu Xây Dựng UI & Tailwind CSS Component

### Prompt Tạo Giao Diện Form & Xác Thực (Authentication Flow)
```text
Tạo hệ thống trang đăng nhập / đăng ký và quản lý tài khoản hoàn chỉnh với:
1. Giao diện:
   - Form với 2 tab Đăng nhập và Đăng ký.
   - Validation trường nhập liệu (Email, Mật khẩu, Số điện thoại) với thông báo lỗi thời gian thực.
   - Trạng thái loading trên nút bấm (spinner + disabled) trong lúc gửi request.
   - Thông báo kết quả qua Toast notification (sử dụng Sonner hoặc shadcn/ui toast).
2. Công nghệ:
   - Sử dụng Tailwind CSS với các utility class chuẩn, responsive cho cả Mobile và Desktop.
   - Tận dụng các component chuẩn: Input, Button, Card, Tabs, Label.
   - Quản lý form với React Hook Form và Zod schema validation.
```

### Prompt Cấu Hình Tailwind CSS Chuẩn
```text
Cấu hình Tailwind CSS cho dự án:
- Hỗ trợ đầy đủ dark mode qua class variant ('class').
- Tích hợp plugin tailwindcss-animate cho các hiệu ứng chuyển động mượt mà.
- Mở rộng bảng màu (palette) với thang độ xám chuẩn và 1 màu accent nổi bật.
- Cấu hình content paths quét toàn bộ file: src/app/**/*.{ts,tsx}, src/components/**/*.{ts,tsx}.
```

---

## 3. Prompt Code Review Tự Động (AI Code Review Assistant)

Sử dụng prompt sau để AI đánh giá chất lượng mã nguồn Frontend:

```text
Hãy review đoạn mã Frontend/Tailwind này theo 5 tiêu chí:

1. Tính đúng đắn (Correctness):
   - Có lỗi logic hay case ngoại lệ (edge cases) chưa xử lý không?
   - Xử lý null/undefined đã an toàn chưa?
   - Có race condition trong các async request không?

2. Bảo mật (Security):
   - Đã validate và sanitize dữ liệu người dùng chưa?
   - Có nguy cơ XSS qua dangerouslySetInnerHTML không?
   - Có vô tình làm lộ token, API key hoặc thông tin nhạy cảm không?

3. Hiệu năng (Performance):
   - Có xảy ra re-render không cần thiết không?
   - Có cần dùng useMemo / useCallback / React.memo không?
   - Import bundle có bị phình to không (cần dynamic import / lazy load không)?

4. Khả năng bảo trì (Maintainability):
   - Code có bị trùng lặp không (DRY)?
   - Component có quá dài (>300 dòng) không?
   - Đặt tên biến và tách hàm đã rõ nghĩa chưa?

5. Best Practices & Giao diện (UI/UX & Accessibility):
   - Đã xử lý đầy đủ các trạng thái Loading, Empty State, Error State chưa?
   - Responsive tốt trên các kích thước màn hình chưa?
   - Đạt tiêu chuẩn tương phản màu sắc và khả năng điều hướng bàn phím chưa?

Định dạng câu trả lời theo các mục:
### Lỗi nghiêm trọng (Critical Issues) 🚨
### Cảnh báo cần lưu ý (Warnings) ⚠️
### Đề xuất tối ưu (Suggestions) 💡
### Điểm làm tốt (Positive Notes) ✅
```
