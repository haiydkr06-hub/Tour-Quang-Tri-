# ROUTES — Quản lý Tour Quảng Trị

## Bảng tuyến

| Đường dẫn | Màn hình | Ai vào | Dữ liệu | Trạng thái cần xử lý | Đi tiếp |
|---|---|---|---|---|---|
| `/` | `HomePage` | Mọi người | Danh sách tour, điểm đến | có dữ liệu, rỗng (khi lọc) | `/tours/:id`, `/custom-tour` |
| `/tours/:id` | `TourDetailPage` | Mọi người | Một tour theo `id` | có dữ liệu, không tìm thấy (404) | `/checkout` |
| `/custom-tour` | `CustomTourBuilderPage`| Mọi người | Danh sách điểm, HDV | có dữ liệu, rỗng (chưa chọn điểm) | `/checkout` |
| `/checkout` | `CheckoutPage` | Mọi người | state từ store (Tour, HDV, Xe) | thiếu state thì về `/` | `/my-bookings` |
| `/partner`| `PartnerDashboard` | Đã đăng nhập (Partner)| Lịch trình cá nhân | chưa đăng nhập thì sang `/login` | — |
| `/admin` | `AdminDashboard` | Đã đăng nhập (Admin) | Thống kê hệ thống | chưa đăng nhập thì sang `/admin/login`| — |
| `/admin/login` | `AdminLoginPage` | Mọi người | — | sai tài khoản/mật khẩu | `/admin` |
| `*` | `NotFoundPage` | Mọi người | — | — | `/` |

## Sơ đồ luồng (Mermaid)

```mermaid
flowchart LR
    Home["/ Trang chủ"] -->|Xem chi tiết| Detail["/tours/:id"]
    Home -->|Tự thiết kế| Custom["/custom-tour"]
    Detail -->|Đặt vé| Checkout["/checkout"]
    Custom -->|Thanh toán| Checkout
    Checkout -->|Hoàn tất| Bookings["/my-bookings"]
    
    AdminRoute["/admin"] -->|Chưa đăng nhập| AdminLogin["/admin/login"]
    AdminLogin -->|Đăng nhập đúng| AdminRoute
    
    PartnerRoute["/partner"] -->|Chưa đăng nhập| PartnerLogin["/login"]
    
    Any["URL không hợp lệ"] --> NotFound["* 404"]
```