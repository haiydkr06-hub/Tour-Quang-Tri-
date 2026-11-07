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
