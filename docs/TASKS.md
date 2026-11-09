# TASKS — Lát cắt dọc (Slices)

> **Quy ước trạng thái:** đã đánh dấu những bước có bằng chứng trong mã nguồn / test.
> **Review** và **Commit** để nhóm tự đánh dấu sau khi thành viên phụ trách đọc lại và commit.
> Kiểm thử: `npm test` (Vitest) · `npm run typecheck` · `npm run build`.

## Slice 1: Khởi tạo Bộ Tuyến (Router) và Layout [Sprint 1]
- **Người phụ trách:** (nhóm điền tên)
- **Tuyến:** Toàn bộ hệ thống
- **Tiêu chí xong:** Cấu hình `createBrowserRouter` thành công. Các tuyến `/`, `/admin`, `*` hoạt động. `RoleGuard` điều hướng chính xác khi chưa đăng nhập (`/admin` → `/admin/login`, `/partner` → `/login`). Test khói xanh (`src/app/routes.smoke.test.tsx`).
- **Trạng thái:** [x] Spec [x] Prompt [x] Generate [ ] Review [x] Test [ ] Commit

## Slice 2: Xem & lọc danh sách Tour [Sprint 1]
- **Người phụ trách:** (nhóm điền tên)
- **Tuyến:** `/tours` (ô tìm kiếm ở `/` chuyển sang đây kèm bộ lọc)
- **Tiêu chí xong:** Áp dụng mô hình Container/View (`ToursPage` ↔ `TourFilter`, `TourListView`). Hiển thị đủ danh sách tour; thanh trượt bộ lọc giá hoạt động; bộ lọc lưu trên URL; có trạng thái rỗng "Không tìm thấy tour phù hợp".
- **Trạng thái:** [x] Spec [x] Prompt [x] Generate [ ] Review [x] Test [ ] Commit

## Slice 3: Trình tạo Tour Cá nhân (Custom Tour Builder) [Sprint 2]
- **Người phụ trách:** (nhóm điền tên)
- **Tuyến:** `/custom-tour`
- **Tiêu chí xong:** Zustand lưu số người, số ngày, điểm đến **theo thứ tự**. Kéo thả địa danh vào "Lịch trình của bạn" và kéo để sắp xếp (có nút ↑ ↓ ✕ cho bàn phím). Tổng tiền cập nhật real-time qua hàm thuần `calculateCustomTourPrice`.
- **Trạng thái:** [x] Spec [x] Prompt [x] Generate [ ] Review [x] Test [ ] Commit

## Slice 4: Biểu mẫu Thanh toán Đặt tour [Sprint 2]
- **Người phụ trách:** (nhóm điền tên)
- **Tuyến:** `/checkout`
- **Tiêu chí xong:** Biểu mẫu có kiểm soát (Controlled Form). Xác thực bằng Zod schema. Thiếu state sẽ bị đẩy về trang chủ. Đặt xong chuyển sang `/my-bookings`.
- **Trạng thái:** [x] Spec [x] Prompt [x] Generate [ ] Review [x] Test [ ] Commit

## Slice 5: Đơn đặt tour của tôi [Sprint 3]
- **Người phụ trách:** (nhóm điền tên)
- **Tuyến:** `/my-bookings`
- **Tiêu chí xong:** Đơn lưu bền vững (localStorage, đọc lại qua Zod). Khách đăng nhập thấy đơn theo tài khoản, khách vãng lai thấy đơn đặt từ trình duyệt này. Có trạng thái đang tải và rỗng.
- **Trạng thái:** [x] Spec [x] Prompt [x] Generate [ ] Review [x] Test [ ] Commit

## Slice 6: Xác thực & phân quyền 5 vai trò [Sprint 3]
- **Người phụ trách:** (nhóm điền tên)
- **Tuyến:** `/login`, `/register`, `/admin/login`
- **Tiêu chí xong:** Đăng nhập/đăng ký có Zod validation, 5 tài khoản demo, chuyển hướng theo vai trò và theo `?redirectTo=`.
- **Trạng thái:** [x] Spec [x] Prompt [x] Generate [ ] Review [ ] Test [ ] Commit

## Slice 7: Kênh Đối tác [Sprint 3]
- **Người phụ trách:** (nhóm điền tên)
- **Tuyến:** `/partner`
- **Tiêu chí xong:** HDV/Tài xế xem lịch chuyến được phân công — chuyến sinh tự động từ đơn khách đã được Admin duyệt (`tripsFromBookings`); cập nhật trạng thái chuyến lưu bền vững; báo hoàn thành thì đơn của khách hoàn thành.
- **Trạng thái:** [x] Spec [x] Prompt [x] Generate [ ] Review [x] Test [ ] Commit

## Slice 8: Quản trị hệ thống [Sprint 3]
- **Người phụ trách:** (nhóm điền tên)
- **Tuyến:** `/admin`
- **Tiêu chí xong:** Biểu đồ số lượng đặt tour theo tháng tính từ đơn thật + số liệu lịch sử (`buildMonthlyStats`), % tăng trưởng doanh thu tính thật, CRUD tour, duyệt/hủy đơn (trạng thái lưu bền vững).
- **Trạng thái:** [x] Spec [x] Prompt [x] Generate [ ] Review [x] Test [ ] Commit
