# Nhật Ký Phát Triển Dự Án: Tour Du Lịch Quảng Trị (phu-xuan-react)

## 1. Khởi tạo & Đọc ngữ cảnh ban đầu
- **Thời gian**: 2026-11-07
- **Tài liệu đã đọc và phân tích kỹ lưỡng**:
  - `AGENTS.md`: Luật làm việc nghiêm ngặt (React 19, TypeScript strict, React Router 8 Data Mode, Zustand, Tailwind CSS 4 Design Tokens, Zod, Feature-based import một chiều, cấm `any`, component < 150 dòng, mock data tại `service.ts`).
  - `PRD.md`: Đặc tả bài toán Đặt tour Quảng Trị (Custom Tour), người dùng (Khách tham quan, Đối tác HDV/Tài xế, Quản trị viên Admin), 5 user stories, các thực thể (`Tour`, `Guide`, `Booking`).
  - `ROUTES.md`: Bảng tuyến và luồng chuyển hướng (`/`, `/tours/:id`, `/custom-tour`, `/checkout`, `/partner`, `/admin`, `/admin/login`, `* 404`).
  - `TASKS.md`: Danh sách lát cắt dọc (Slice 1: Router & Layout; Slice 2: HomePage; Slice 3: Custom Tour Builder; Slice 4: Checkout Form).
  - `PROMPTS.md`: Nhật ký tương tác prompt theo sprint.
  - `readme.md`: Tổng quan dự án, tiêu chuẩn kỹ thuật và lệnh thực thi.
  - `AI-DECLARATION.md`: Khai báo phần việc có AI hỗ trợ.

---

## 2. Nhật ký chi tiết Giai đoạn 1 (8 Phase cơ bản - Hoàn thành)
- Đã hoàn tất 8 Phase nền tảng: Core & Routing, State Management, UI Components, Public Pages, Custom Tour Builder, Checkout & Validation, Support & Partner, Admin Dashboard.
- Toàn bộ 8 commit đã được đồng bộ lên remote repository GitHub.

---

## 3. Giai đoạn 2: Nâng cấp Hệ thống Xác thực & Phân quyền 5 Vai Trò (5 Phases)

### ✅ Phase 1: Backend API & Security (Hoàn thành)
- **Thời gian hoàn thành**: 2026-11-08
- **Nội dung thực hiện**:
  1. Cài đặt thư viện bảo mật mã hóa mật khẩu `bcryptjs` và `@types/bcryptjs`, cùng nền tảng `express` và `@types/express`.
  2. Xây dựng cơ chế phân 5 quyền chính thức trong hệ thống: `ADMIN`, `CUSTOMER`, `PARTNER`, `GUIDE`, `DRIVER`.
  3. Xây dựng dịch vụ Backend API & Security (`src/features/auth/backend.ts`): Băm mật khẩu chuẩn bảo mật một chiều với `bcryptjs` (salt rounds = 10); 5 tài khoản demo có mật khẩu đã mã hóa; các API `backendLogin`, `backendRegister`, `backendForgotPassword`.
  4. Xây dựng server Node.js/Express (`server/index.ts`) cung cấp REST endpoints.
  5. Cập nhật `src/features/auth/service.ts`, `src/features/auth/store.ts`, `RoleGuard.tsx` và `routes.tsx`.
  6. Vibe Coding Check: Typecheck & Build xanh 100%. Đã push Git repo.

### ✅ Phase 2: UI Components & Validation (Hoàn thành)
- **Thời gian hoàn thành**: 2026-11-08
- **Nội dung thực hiện**:
  1. Nâng cấp [`src/components/ui/TextField.tsx`](file:///d:/Tour%20QuangTri/src/components/ui/TextField.tsx):
     - Tích hợp nút ẩn/hiện mật khẩu (SVG icons, HTML ngữ nghĩa `<button type="button">`, Design Tokens).
     - Chuẩn hóa các thuộc tính accessibility (`aria-invalid={Boolean(error)}`, `aria-describedby`, `role="alert"` cho thông báo lỗi).
     - Tự động thêm padding phải (`pr-10`) khi trường nhập là mật khẩu để tránh đè chữ.
  2. Xây dựng bộ Zod Schemas (`src/features/auth/schemas.ts`):
     - `loginSchema`: Xác thực tên đăng nhập/email và mật khẩu.
     - `registerSchema`: Xác thực họ tên, email, số điện thoại chuẩn Việt Nam (10 chữ số), độ phức tạp mật khẩu (chữ + số), mật khẩu xác nhận trùng khớp, và bắt buộc đồng ý điều khoản.
     - `forgotPasswordSchema`: Xác thực định dạng email nhận mã khôi phục.
     - Các hàm kiểm tra an toàn: `validateLoginForm`, `validateRegisterForm`, `validateForgotPasswordForm` nhận dữ liệu kiểu `unknown` và thu hẹp an toàn qua Zod.
  3. Kiểm tra chất lượng code (Vibe Coding Loop):
     - `npm run typecheck`: Xanh (0 lỗi).
     - `npm run build`: Xanh (Build thành công trong 3.09s).
- **Trạng thái**: Đã sẵn sàng chuyển sang Phase 3 (Login Interface).
