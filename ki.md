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
     - Các hàm kiểm tra an toàn: `validateLoginForm`, `validateRegisterForm`, `validateForgotPasswordForm` nhận kiểu `unknown` và thu hẹp an toàn qua Zod.
  3. Vibe Coding Check: Typecheck & Build xanh 100%. Đã push Git repo.

### ✅ Phase 3: Login Interface (Hoàn thành)
- **Thời gian hoàn thành**: 2026-11-08
- **Nội dung thực hiện**:
  1. Dựng trang Đăng nhập công khai [`src/pages/public/LoginPage.tsx`](file:///d:/Tour%20QuangTri/src/pages/public/LoginPage.tsx):
     - Áp dụng mô hình Biểu mẫu có kiểm soát (**Controlled Form**).
     - Các trường nhập liệu: Email/Tên đăng nhập, Mật khẩu (có nút ẩn/hiện), Checkbox Ghi nhớ đăng nhập (Remember me).
     - Rà soát dữ liệu đầu vào bằng `validateLoginForm` (Zod schema) hiển thị lỗi chuẩn xác theo từng trường.
     - Trạng thái `isLoading` xử lý mượt mà khi người dùng submit.
     - Tích hợp cụm nút chọn nhanh 5 tài khoản demo tương ứng 5 vai trò (`ADMIN`, `CUSTOMER`, `PARTNER`, `GUIDE`, `DRIVER`).
     - Tự động điều hướng thông minh theo quyền: `ADMIN` ➔ `/admin`, `PARTNER`/`GUIDE`/`DRIVER` ➔ `/partner`, `CUSTOMER` ➔ `/`.
  2. Xây dựng modal khôi phục mật khẩu [`src/features/auth/components/ForgotPasswordModal.tsx`](file:///d:/Tour%20QuangTri/src/features/auth/components/ForgotPasswordModal.tsx) kết nối trực tiếp với `forgotPasswordApi`.
  3. Cập nhật `routes.tsx` bổ sung tuyến `/login` và cập nhật liên kết đăng nhập trên `Navbar.tsx`.
  4. Vibe Coding Check: Typecheck & Build xanh 100%. Đã push Git repo.

### ✅ Phase 4: Register Interface (Hoàn thành)
- **Thời gian hoàn thành**: 2026-11-08
- **Nội dung thực hiện**:
  1. Dựng trang Đăng ký tài khoản Khách du lịch [`src/pages/public/RegisterPage.tsx`](file:///d:/Tour%20QuangTri/src/pages/public/RegisterPage.tsx) dành cho vai trò `CUSTOMER`:
     - Mô hình Biểu mẫu có kiểm soát (**Controlled Form**) đầy đủ các trường: Họ và tên, Email, Số điện thoại, Mật khẩu, Xác nhận mật khẩu, và Checkbox đồng ý Điều khoản & Quy chế di tích.
     - Kiểm chứng biên giới bằng `validateRegisterForm` (Zod): kiểm tra regex số điện thoại Việt Nam (10 số, đầu 03/05/07/08/09), mật khẩu bắt buộc có cả chữ và số, xác nhận mật khẩu trùng khớp và bắt buộc tick đồng ý điều khoản.
     - Nút ẩn/hiện mật khẩu cho cả 2 ô Mật khẩu và Xác nhận mật khẩu.
     - Kết nối với `registerApi`: băm mật khẩu bảo mật bằng bcrypt, tự động gán vai trò `CUSTOMER` và lưu phiên vào `authStore` rồi điều hướng về Trang chủ.
  2. Cập nhật `routes.tsx` định tuyến trang `/register`.
  3. Vibe Coding Check: Typecheck & Build xanh 100%. Đã push Git repo.

### ✅ Phase 5: Zustand & Routing (Hoàn thành)
- **Thời gian hoàn thành**: 2026-11-08
- **Nội dung thực hiện**:
  1. Cập nhật toàn diện Zustand Store (`src/features/auth/store.ts`):
     - Quản lý trạng thái xác thực `isAuthenticated`, thông tin `user`, mã phiên `token` và vai trò `role` theo 5 quyền (`ADMIN`, `CUSTOMER`, `PARTNER`, `GUIDE`, `DRIVER`).
     - Đồng bộ hóa lưu trữ phiên đăng nhập bền vững (`localStorage`) và tự động nạp lại khi tải trang.
     - Cung cấp các selector chuyên biệt: `useIsAdmin`, `useIsPartner`, `useIsCustomer`, `useCurrentRole`.
  2. Nâng cấp bộ bảo vệ tuyến `RoleGuard.tsx`:
     - Tự động nhận diện đường dẫn hiện tại và lưu vào param `redirectTo` khi người dùng chưa đăng nhập.
     - Tự động kiểm tra quyền hạn mảng linh hoạt: `requiredRole={['PARTNER', 'GUIDE', 'DRIVER']}` hoặc đơn lẻ `requiredRole="ADMIN"`.
     - Ngăn chặn truy cập trái phép bằng cách chuyển hướng về `/` đối với người dùng không đủ quyền.
  3. Tối ưu hóa trải nghiệm điều hướng thông minh (Auto-redirection):
     - Tại `LoginPage` và `RegisterPage`: nếu người dùng đã đăng nhập, tự động điều hướng sang dashboard tương ứng thay vì hiển thị lại form.
     - Sau khi đăng nhập, hệ thống ưu tiên đưa người dùng đến trang họ đang cố truy cập dở qua `redirectTo`, hoặc theo đúng vai trò.
  4. Nâng cấp thanh điều hướng `Navbar.tsx` & `PartnerDashboard.tsx`:
     - Hiển thị huy hiệu vai trò chi tiết theo màu token: `ADMIN` (Quản trị viên), `CUSTOMER` (Khách du lịch), `PARTNER` (Đối tác lữ hành), `GUIDE` (HDV bản địa), `DRIVER` (Tài xế).
     - Điều chỉnh giao diện `PartnerDashboard` phù hợp với nghiệp vụ riêng của từng đối tác (HDV vs Tài xế).
  5. Cập nhật hồ sơ tài liệu: `AI-DECLARATION.md`, `PROMPTS.md` và `ki.md`.
  6. Kiểm tra chất lượng code (Vibe Coding Loop):
     - `npm run typecheck`: Xanh (0 lỗi).
     - `npm run build`: Xanh (Build thành công trong 2.05s).
- **Trạng thái**: Hoàn tất trọn vẹn toàn bộ 5 Phase của Giai đoạn 2. Hệ thống xác thực và phân 5 quyền RBAC hoạt động ổn định, bảo mật và đồng bộ 100%!
