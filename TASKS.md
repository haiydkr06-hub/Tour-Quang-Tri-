# TASKS — Lát cắt dọc (Slices)

## Slice 1: Khởi tạo Bộ Tuyến (Router) và Layout [Sprint 1]
- **Người phụ trách:** (Tên Kiến trúc sư)
- **Tuyến:** Toàn bộ hệ thống
- **Tiêu chí xong:** Cấu hình `createBrowserRouter` thành công. Các tuyến `/`, `/admin`, `*` hoạt động. `ProtectedRoute` điều hướng chính xác khi chưa đăng nhập. Test khói xanh.
- **Trạng thái:** [ ] Spec [ ] Prompt [ ] Generate [ ] Review [ ] Test [ ] Commit

## Slice 2: Xem danh sách Tour (HomePage) [Sprint 1]
- **Người phụ trách:** (Tên người làm Giao diện)
- **Tuyến:** `/`
- **Tiêu chí xong:** Áp dụng mô hình Container/View. Hiển thị đủ danh sách tour; thanh trượt bộ lọc giá hoạt động; có trạng thái rỗng "Không tìm thấy tour".
- **Trạng thái:** [ ] Spec [ ] Prompt [ ] Generate [ ] Review [ ] Test [ ] Commit

## Slice 3: Trình tạo Tour Cá nhân (Custom Tour Builder) [Sprint 2]
- **Người phụ trách:** (Tên người làm Logic/State)
- **Tuyến:** `/custom-tour`
- **Tiêu chí xong:** Sử dụng Zustand để lưu state số người, số ngày, điểm đến. Giao diện cập nhật tổng tiền theo thời gian thực (real-time).
- **Trạng thái:** [ ] Spec [ ] Prompt [ ] Generate [ ] Review [ ] Test [ ] Commit

## Slice 4: Biểu mẫu Thanh toán Đặt tour [Sprint 2]
- **Người phụ trách:** (Tên người làm Form)
- **Tuyến:** `/checkout`
- **Tiêu chí xong:** Biểu mẫu có kiểm soát (Controlled Form). Xác thực bằng Zod schema. Thiếu state sẽ bị đẩy về trang chủ.
- **Trạng thái:** [ ] Spec [ ] Prompt [ ] Generate [ ] Review [ ] Test [ ] Commit