# PRD — Hệ thống Đặt Tour và Dịch vụ Du lịch Quảng Trị

## 1. Vấn đề (2–3 câu)
Du khách đến Quảng Trị gặp khó khăn trong việc tự lên lịch trình linh hoạt và tìm kiếm hướng dẫn viên bản địa chất lượng cao. Hệ thống hiện tại thiếu nền tảng tích hợp cho phép khách hàng vừa đặt tour trọn gói, vừa có thể tự thiết kế lịch trình cá nhân (chọn điểm đến, số ngày, thuê xe và Hướng dẫn viên).

## 2. Người dùng chính
- **Khách tham quan (User)**: Người tìm kiếm, tự thiết kế lịch trình và đặt tour/dịch vụ.
- **Đối tác (Partner)**: Hướng dẫn viên và Tài xế muốn nhận chuyến và quản lý lịch trình.
- **Quản trị viên (Admin)**: Người điều hành toàn bộ hệ thống, quản lý dữ liệu tour, đối tác và đơn đặt hàng.

## 3. Năm user story
1. Là Khách tham quan, tôi muốn kéo thả chọn các địa danh (Thành Cổ, Vĩ tuyến 17), để tạo ra lịch trình tour mang tính cá nhân hóa.
2. Là Khách tham quan, tôi muốn xem danh sách Hướng dẫn viên kèm đánh giá, để chọn người đồng hành phù hợp cho chuyến đi.
3. Là Đối tác (HDV), tôi muốn xem lịch các chuyến đã được phân công, để chủ động sắp xếp thời gian làm việc.
4. Là Khách tham quan, tôi muốn thanh toán gộp chung Tour, tiền xe và tiền HDV, để tiết kiệm thời gian thao tác.
5. Là Quản trị viên, tôi muốn xem biểu đồ tổng số lượng đặt tour, để nắm bắt tình hình kinh doanh.

## 4. Thực thể dữ liệu
- **Tour**: `id`, `name`, `description`, `price`, `locations`, `duration`.
- **Guide (HDV)**: `id`, `name`, `languages`, `rating`, `avatar`, `pricePerDay`.
- **Booking (Đơn đặt)**: `id`, `userId`, `tourId`, `guideId`, `vehicleType`, `totalPrice`, `status`.

## 5. Danh sách tuyến dự kiến (chưa lập trình)
- `/` (Trang chủ tìm kiếm)
- `/tours/:id` (Chi tiết tour - Tuyến động)
- `/custom-tour` (Trình tạo tour cá nhân)
- `/checkout` (Thanh toán gộp)
- `/admin` và `/admin/*` (Khu vực quản trị - Cần đăng nhập)
- `/partner` (Khu vực đối tác - Cần đăng nhập)

## 6. Ngoài phạm vi
Những gì nhóm CHƯA làm: Tích hợp cổng thanh toán thật (VNPay, Momo) - chỉ dùng dữ liệu giả lập xử lý luồng; Gửi email xác nhận thật; Chat realtime.
