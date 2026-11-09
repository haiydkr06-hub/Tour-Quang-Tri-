# PROMPTS.md — Nhật ký prompt của nhóm

## Sprint 1 (Khởi tạo, Bộ Tuyến & Giao diện Cơ bản)

### Prompt 1
- **Mục đích:** Dựng khung dự án Vite + React 19 + TypeScript strict mode, cấu hình Tailwind CSS 4 Design Tokens.
- **Prompt đã dùng:** "done" (Kích hoạt Phase 1 sau khi duyệt Kế hoạch 8 Phase).
- **Kết quả AI trả về (tóm tắt):** Sinh các tệp cấu hình Vite, tsconfig strict mode, index.css với biến CSS (--color-primary, --color-surface, --color-ink), thiết lập React Router 8 Data Mode.
- **Nhóm đã sửa gì và vì sao:** Bổ sung .gitignore bỏ các tệp buildinfo.
- **Bài học rút ra:** Cần cấu hình chuẩn alias `@/*` ngay từ đầu để import đồng nhất.

### Prompt 2
- **Mục đích:** Thiết lập State Management (Zustand & Context API) và Bộ UI Components dùng chung.
- **Prompt đã dùng:** "done" (Kích hoạt Phase 2 và Phase 3).
- **Kết quả AI trả về (tóm tắt):** Tạo ThemeContext (sáng/tối), authStore, cartStore, RoleGuard bảo vệ tuyến; bộ Presentational UI (Button, TextField, Card, Badge, Select, Modal, Navbar, Footer) < 150 dòng/tệp.
- **Nhóm đã sửa gì và vì sao:** Tách Navbar thành presentational component độc lập nhận props từ RootLayout để đảm bảo quy tắc import một chiều.
- **Bài học rút ra:** Import một chiều giúp ngăn ngừa triệt để lỗi circular dependency.

---

## Sprint 2 (Tính Năng Người Dùng, Tự Thiết Kế Tour & Thanh Toán)

### Prompt 3
- **Mục đích:** Xây dựng HomePage với thanh trượt giá, TourDetailPage và Trình tạo Tour cá nhân hóa (Custom Tour Builder).
- **Prompt đã dùng:** "done" (Kích hoạt Phase 4 và Phase 5).
- **Kết quả AI trả về (tóm tắt):** Tạo feature tours và custom-tour với mock data di tích Quảng Trị, thanh trượt lọc giá, tính toán chi phí realtime vé + xe + HDV.
- **Nhóm đã sửa gì và vì sao:** Ép kiểu `Number(useParams().id)` sang số để tra cứu an toàn theo AGENTS.md.
- **Bài học rút ra:** Tính toán giá realtime trên client giúp tăng trải nghiệm người dùng vượt bậc.

### Prompt 4
- **Mục đích:** Xây dựng luồng Đặt vé Checkout với Controlled Form và xác thực biên giới bằng Zod.
- **Prompt đã dùng:** "done" (Kích hoạt Phase 6).
- **Kết quả AI trả về (tóm tắt):** Tạo checkoutFormSchema (Zod), validateCheckoutForm nhận unknown và trả về lỗi cụ thể từng trường; tự động điều hướng về `/` nếu giỏ tour rỗng.
- **Nhóm đã sửa gì và vì sao:** Điều chỉnh cú pháp message trong z.enum tương thích Zod v3.24+.
- **Bài học rút ra:** Zod schema validation tại biên giới bảo vệ ứng dụng khỏi dữ liệu rác trước khi submit.

---

## Sprint 3 (Đối Tác, Quản Trị Hệ Thống & Hoàn Thiện)

### Prompt 5
- **Mục đích:** Xây dựng Khu vực Đối tác (`/partner`) và Bảng Quản trị Admin (`/admin`).
- **Prompt đã dùng:** "done" (Kích hoạt Phase 7 và Phase 8).
- **Kết quả AI trả về (tóm tắt):** Tạo PartnerDashboard (nhận chuyến, báo cáo hoàn thành, FAQ hỗ trợ di tích) và AdminDashboard (CRUD tour, duyệt đơn booking, biểu đồ cột thống kê doanh thu).
- **Nhóm đã sửa gì và vì sao:** Tích hợp RoleGuard kiểm tra quyền truy cập chặt chẽ cho cả hai tuyến.
- **Bài học rút ra:** Kiến trúc Feature-based giúp mở rộng các phân hệ Admin/Partner độc lập, dễ bảo trì.

---

## Sprint 4 (Nâng cấp Hệ thống Xác thực & Phân 5 Quyền RBAC)

### Prompt 6
- **Mục đích:** Xây dựng Backend API bảo mật (bcryptjs), 5 quyền RBAC (`ADMIN`, `CUSTOMER`, `PARTNER`, `GUIDE`, `DRIVER`), Zod schemas, TextField toggle mật khẩu & aria, trang LoginPage, RegisterPage, và điều hướng thông minh.
- **Prompt đã dùng:** "done" (Kích hoạt tuần tự 5 Phase nâng cấp xác thực).
- **Kết quả AI trả về (tóm tắt):** Hoàn thiện backend API engine với bcrypt hashing; nâng cấp TextField accessibility; tạo schemas Zod; xây dựng LoginPage và RegisterPage; tối ưu RoleGuard tự động lưu URL đích và điều hướng chính xác theo 5 vai trò.
- **Nhóm đã sửa gì và vì sao:** Bổ sung tính năng nhận diện `redirectTo` từ URL search params để người dùng sau khi đăng nhập được đưa ngay về trang đang xem dở.
- **Bài học rút ra:** Cơ chế phân quyền nhiều tầng (Store + RoleGuard + UI Filter) mang lại độ bảo mật cao và trải nghiệm người dùng xuyên suốt.


---

## Sprint 5 (Rà soát & Hoàn thiện theo PRD / ROUTES / AGENTS)

### Prompt 7
- **Mục đích:** Rà soát toàn bộ dự án so với PRD, TASKS, ROUTES, AGENTS.md và sửa những phần còn thiếu.
- **Prompt đã dùng:** "D:\Tour QuangTri bạn hãy xem file này giúp tôi còn thiếu những gì và làm gì để hoàn thiện hơn" → sau đó "bạn hãy sữa giúp cho mình" (Claude Code).
- **Kết quả AI trả về (tóm tắt):** Phát hiện 18 vấn đề (thiếu kéo thả, bộ lọc giá không được gắn vào trang, thiếu `/my-bookings`, `/admin` chuyển sai trang đăng nhập, không có test, đơn mất khi F5, màu cứng, import chéo feature, script `typecheck` không kiểm tra tệp nào, menu tài khoản trỏ tới 3 trang không tồn tại...). Đã sửa: kéo thả lịch trình, `/tours` có bộ lọc trên URL, `/my-bookings`, kho đơn localStorage + Zod, `src/lib/booking`, Design Tokens, lazy routes, nâng React Router lên 8.5.1, 32 test Vitest.
- **Nhóm đã sửa gì và vì sao:** (nhóm điền sau khi review)
- **Bài học rút ra:** Cần chạy test/typecheck thật (`tsc -b`) — `tsc --noEmit` với tsconfig dạng references không kiểm tra tệp nào nên "0 lỗi" là giả.

### Prompt 8
- **Mục đích:** Hoàn thiện các phần còn lại sau đợt rà soát: nối dữ liệu giữa Khách – Admin – Đối tác, thống kê thật, xử lý `server/`.
- **Prompt đã dùng:** "bạn hãy làm tiếp cho mình nhé" (Claude Code).
- **Kết quả AI trả về (tóm tắt):** Đơn đã duyệt tự sinh chuyến cho HDV/Tài xế; đối tác báo hoàn thành thì đơn khách hoàn thành; biểu đồ & KPI Admin tính từ đơn thật; thêm `npm run server` + test API; test tích hợp xuyên 3 vai trò (46 test).
- **Nhóm đã sửa gì và vì sao:** (nhóm điền sau khi review)
- **Bài học rút ra:** Tách logic thành hàm thuần (`tripsFromBookings`, `buildMonthlyStats`) giúp viết test dễ và tránh số liệu viết cứng.
