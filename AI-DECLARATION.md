# AI-DECLARATION.md — Khai báo phần việc có AI hỗ trợ

Công cụ AI đã dùng: Gemini 3.8 Flash (High) / Antigravity Assistant

| Tệp / Chức năng | Mức hỗ trợ của AI | Người giải thích (Sinh viên) |
|---|---|---|
| `docs/*.md` (Bộ tài liệu PRD, ROUTES, TASKS) | Sinh toàn bộ theo mô tả | Trưởng nhóm |
| `src/app/routes.tsx` & `router.tsx` (React Router 8 Data Mode) | Sinh toàn bộ | Thành viên Kiến trúc |
| `src/app/RootLayout.tsx` & `src/components/Navbar.tsx` | Sinh toàn bộ | Thành viên Giao diện |
| `src/context/ThemeContext.tsx` (Giao diện Sáng/Tối) | Sinh toàn bộ | Thành viên State |
| `src/components/ui/*` (Button, TextField có toggle mật khẩu & aria, Card, Badge, Select, Modal) | Sinh toàn bộ | Thành viên Giao diện |
| `src/features/auth/*` (Zustand auth 5 roles, bcrypt hashing, Zod schemas, REST backend API) | Sinh toàn bộ | Thành viên Backend/State |
| `src/pages/public/LoginPage.tsx` (Controlled Form, 5 vai trò demo, quên mật khẩu) | Sinh toàn bộ | Thành viên Giao diện |
| `src/pages/public/RegisterPage.tsx` (Đăng ký CUSTOMER, Zod validation biên giới) | Sinh toàn bộ | Thành viên Form/Logic |
| `src/features/cart/*` (Zustand giỏ hàng & tính tiền gộp) | Sinh toàn bộ | Thành viên State |
| `src/features/tours/*` (HomePage, TourDetail, Slider lọc giá) | Sinh toàn bộ | Thành viên Giao diện |
| `src/features/custom-tour/*` (Tự thiết kế tour, tính giá real-time) | Sinh toàn bộ | Thành viên Logic |
| `src/features/checkout/*` (Controlled Form, Zod boundary validation) | Sinh toàn bộ | Thành viên Form/Logic |
| `src/features/partner/*` (PartnerDashboard, nhận chuyến theo role GUIDE/DRIVER) | Sinh toàn bộ | Thành viên Chức năng |
| `src/features/admin/*` (AdminDashboard, CRUD tour, duyệt đơn, KPI) | Sinh toàn bộ | Thành viên Quản trị |

**Mức hỗ trợ:** Sinh toàn bộ / Sinh rồi sửa nhiều / Sinh rồi sửa ít / Tự viết.

**Cam kết:** 
Các thành viên trong nhóm xác nhận đã đọc, hiểu rõ logic luồng dữ liệu và có khả năng giải thích được mọi tệp mã nguồn ghi ở trên theo đúng Luật số 2 và số 3 của học phần.
