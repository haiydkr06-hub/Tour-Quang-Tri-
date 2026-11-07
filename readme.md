# Hệ thống Quản lý và Đặt Tour Du lịch Quảng Trị

Dự án xuyên suốt học phần **Web FrontEnd nâng cao** (INT.7.18)  
**Trường Đại học Phú Xuân — Khoa Công nghệ thông tin**

## 📖 Giới thiệu Dự án

Hệ thống đặt tour du lịch cá nhân hóa (Customized Tour Booking) dành riêng cho các địa danh lịch sử tại Quảng Trị (Thành Cổ, Vĩ tuyến 17, Địa đạo Vịnh Mốc...). Hệ thống cho phép:

* **Khách tham quan:** Tìm kiếm tour, tự thiết kế lịch trình (chọn điểm đến, số ngày, số lượng người), thuê Hướng dẫn viên và xe di chuyển.
* **Đối tác (Hướng dẫn viên/Tài xế):** Quản lý lịch trình làm việc cá nhân.
* **Quản trị viên:** Quản lý toàn bộ dữ liệu hệ thống (Tour, Đơn đặt, Đối tác).

## 🚀 Công nghệ Sử dụng

Dự án tuân thủ nghiêm ngặt các quy chuẩn kỹ thuật Frontend hiện đại:

* **Core:** React 19 + TypeScript (chế độ strict).
* **Build Tool:** Vite.
* **Định tuyến (Routing):** React Router 8 (Data Mode) quản lý điều hướng dựa trên trạng thái URL.
* **Quản lý Trạng thái:** Zustand (Global State cho giỏ hàng/phiên đăng nhập) \& Context API (Theme Sáng/Tối).
* **Giao diện (UI):** Tailwind CSS 4 kết hợp hệ thống Design Tokens tự định nghĩa (`primary`, `surface`, `ink`).
* **Kiểm chứng Dữ liệu:** Zod schema validation tại biên giới hệ thống.

## ⚙️ Cài đặt và Chạy dự án

**Yêu cầu hệ thống:**

* Node.js từ `22.22.0` trở lên.
* Trình quản lý gói `npm`.

**Các bước cài đặt:**

1. Clone dự án về máy:

```bash
   git clone https://github.com/<username>/phu-xuan-react.git
   cd phu-xuan-react
   ```

2. Cài đặt các thư viện phụ thuộc:

```bash
   npm install
   ```

3. Khởi chạy dự án ở môi trường phát triển (Development):

```bash
   npm run dev
   ```

   *Trình duyệt sẽ tự động mở tại `http://localhost:5173`.*

## 📂 Kiến trúc Thư mục (Feature-Based)

Dự án áp dụng mô hình phân tách theo tính năng (Feature-based) để dễ dàng mở rộng và tránh xung đột khi làm việc nhóm:

```text
src/
├── app/               # Lõi khởi tạo (router.tsx, routes.tsx, Providers, RootLayout)
├── components/        # UI thuần túy, dùng chung (Button, TextField, PageLayout)
├── features/          # Cụm tính năng chứa nghiệp vụ riêng (tours, checkout, admin, auth, ...)
│   └── \[feature]/     # Mỗi feature tự chứa components, hooks, store.ts, types.ts
├── pages/             # Các component cấp cao được lắp ráp để gắn vào Router
└── index.css          # Định nghĩa Design Tokens cho Tailwind
```

## 🛠 Các lệnh (Scripts) thường dùng

* `npm run dev`: Chạy server phát triển cục bộ.
* `npm run build`: Biên dịch dự án ra thư mục `dist` (dùng cho production).
* `npm run typecheck`: Rà soát toàn bộ lỗi kiểu dữ liệu TypeScript (Bắt buộc chạy và sửa sạch lỗi trước khi commit).
* `npm test`: Chạy kiểm thử tự động (nếu có).

## 📝 Nhật ký và Trợ lý AI

Dự án áp dụng quy trình **Vibe Coding** với sự hỗ trợ của AI. Vui lòng tham khảo:

* `docs/PRD.md`: Tài liệu đặc tả yêu cầu sản phẩm.
* `docs/ROUTES.md`: Sơ đồ luồng và danh sách tuyến đường.
* `AGENTS.md`: Bộ quy tắc bắt buộc dành cho trợ lý lập trình AI.
* `PROMPTS.md`: Nhật ký tương tác với AI của nhóm.
* `AI-DECLARATION.md`: Bảng khai báo chi tiết các phần việc có sử dụng AI.

