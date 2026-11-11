# Hệ thống Quản lý và Đặt Tour Du lịch Quảng Trị

Dự án xuyên suốt học phần **Web FrontEnd nâng cao** (INT.7.18)  
**Trường Đại học Phú Xuân — Khoa Công nghệ thông tin**  
**Người phụ trách:** Hồ Hải Ý 

🌐 **Demo trực tuyến:** https://tour-quang-tri.vercel.app — tài khoản demo xem mục [🔑 Tài khoản demo](#-tài-khoản-demo).

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
* **Kiểm chứng Dữ liệu:** Zod schema validation tại biên giới hệ thống (form, dữ liệu đọc từ localStorage).
* **Kiểm thử:** Vitest + jsdom (unit test logic và smoke test bộ tuyến).

## ⚙️ Cài đặt và Chạy dự án

**Yêu cầu hệ thống:**

* Node.js từ `22.22.0` trở lên.
* Trình quản lý gói `npm`.

**Các bước cài đặt:**

1. Clone dự án về máy:

```bash
   git clone https://github.com/haiydkr06-hub/Tour-Quang-Tri-.git
   cd Tour-Quang-Tri-
   ```

2. Cài đặt các thư viện phụ thuộc:

```bash
   npm install
   ```

3. Khởi chạy dự án ở môi trường phát triển (Development):

```bash
   npm run dev
   ```

   *Mở trình duyệt tại `http://localhost:5173`.*

## 🔑 Tài khoản demo

| Vai trò | Email | Mật khẩu | Vào trang |
|---|---|---|---|
| Quản trị viên | `admin@quangtri.vn` | `admin123` | `/admin` |
| Khách du lịch | `customer@quangtri.vn` | `customer123` | `/my-bookings` |
| Đối tác lữ hành | `partner@quangtri.vn` | `partner123` | `/partner` |
| Hướng dẫn viên | `guide@quangtri.vn` | `guide123` | `/partner` |
| Tài xế | `driver@quangtri.vn` | `driver123` | `/partner` |

> Dữ liệu là giả lập phía trình duyệt (mock + localStorage); không có cổng thanh toán và email thật (xem mục *Ngoài phạm vi* trong `docs/PRD.md`).

## ✨ Chức năng chính (ứng với 5 user story)

1. **Kéo thả lịch trình** (`/custom-tour`): kéo địa danh vào "Lịch trình của bạn", kéo để đổi thứ tự (có nút ↑ ↓ ✕ cho bàn phím).
2. **Chọn HDV kèm đánh giá**: thẻ HDV hiển thị số sao, số lượt đánh giá, ngôn ngữ, giá/ngày.
3. **Lịch chuyến của Đối tác** (`/partner`): HDV/Tài xế xem các chuyến được phân công.
4. **Thanh toán gộp** (`/checkout`): Tour + tiền xe + tiền HDV trong một đơn; xem lại tại `/my-bookings`.
5. **Biểu đồ đặt tour** (`/admin`): thống kê số đơn theo tháng, duyệt/hủy đơn.

Ngoài ra: tìm & lọc tour theo từ khóa, địa danh, thanh trượt giá tại `/tours` (bộ lọc lưu trên URL); giao diện Sáng/Tối.

## 📂 Kiến trúc Thư mục (Feature-Based)

Dự án áp dụng mô hình phân tách theo tính năng (Feature-based) để dễ dàng mở rộng và tránh xung đột khi làm việc nhóm:

```text
src/
├── app/               # Lõi khởi tạo (router.tsx, routes.tsx, Providers, RootLayout)
├── components/        # UI thuần túy, dùng chung (Button, TextField, Card, Modal)
├── features/          # Cụm tính năng chứa nghiệp vụ riêng (tours, checkout, admin, auth, ...)
│   └── \[feature]/     # Mỗi feature tự chứa components, hooks, store.ts, types.ts
├── lib/               # Mã dùng chung giữa các feature (kiểu Booking, kho lưu đơn)
├── pages/             # Các component cấp cao (Container) được lắp ráp để gắn vào Router
└── index.css          # Định nghĩa Design Tokens cho Tailwind
```

## 🛠 Các lệnh (Scripts) thường dùng

* `npm run dev`: Chạy server phát triển cục bộ.
* `npm run build`: Biên dịch dự án ra thư mục `dist` (dùng cho production).
* `npm run typecheck`: Rà soát toàn bộ lỗi kiểu dữ liệu TypeScript (Bắt buộc chạy và sửa sạch lỗi trước khi commit).
* `npm test`: Chạy toàn bộ kiểm thử tự động (Vitest).
* `npm run test:watch`: Chạy test ở chế độ theo dõi khi đang code.
* `npm run server`: Chạy API Express giả lập tại `http://localhost:5000` (tùy chọn, xem bên dưới).

## 🔄 Luồng dữ liệu giữa các vai trò

Dữ liệu đơn được lưu trong `localStorage` của trình duyệt (`src/lib/booking/repository.ts`), nên **cả 3 vai trò dùng chung một nguồn dữ liệu** khi demo trên cùng trình duyệt:

1. **Khách** đặt tour (có thể thuê HDV và xe) → đơn ở trạng thái *Chờ duyệt*, xem tại `/my-bookings`.
2. **Admin** duyệt đơn tại `/admin` → biểu đồ và doanh thu cập nhật theo đơn thật.
3. Đơn đã duyệt tự động thành **chuyến của Đối tác** tại `/partner` (HDV thấy chuyến dẫn đoàn, Tài xế thấy chuyến xe).
4. Đối tác báo *Hoàn thành* → đơn của khách chuyển sang *Đã hoàn thành*.

> Muốn làm lại từ đầu: mở DevTools → Application → Local Storage → xóa các khóa bắt đầu bằng `qt_`.

## 🖥️ Về thư mục `server/`

Frontend **không phụ thuộc** server: đăng nhập chạy bằng backend giả lập ngay trong trình duyệt (`src/features/auth/backend.ts`), nhờ vậy có thể deploy tĩnh (Vercel/Netlify).
`server/index.ts` là bản **API Express tương đương** (đăng nhập, đăng ký, quên mật khẩu, mật khẩu băm bằng bcrypt) để minh họa cách tách backend thật; chạy bằng `npm run server` (Node ≥ 22.22 chạy trực tiếp tệp `.ts`) và có test riêng tại `server/index.test.ts`.

## 📝 Nhật ký và Trợ lý AI

Dự án áp dụng quy trình **Vibe Coding** với sự hỗ trợ của AI. Vui lòng tham khảo:

* `docs/PRD.md`: Tài liệu đặc tả yêu cầu sản phẩm.
* `docs/ROUTES.md`: Sơ đồ luồng và danh sách tuyến đường.
* `AGENTS.md`: Bộ quy tắc bắt buộc dành cho trợ lý lập trình AI.
* `PROMPTS.md`: Nhật ký tương tác với AI của nhóm.
* `AI-DECLARATION.md`: Bảng khai báo chi tiết các phần việc có sử dụng AI.

