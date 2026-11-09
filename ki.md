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

## 2. Nhật ký chi tiết Giai đoạn 1 & 2 (Đã hoàn thành và đẩy Git)
- Đã hoàn tất 8 Phase nền tảng Core, UI, State, Router, Public Pages, Custom Tour Builder, Checkout, Partner & Admin.
- Đã hoàn tất 5 Phase nâng cấp Xác thực & Phân quyền 5 vai trò (ADMIN, CUSTOMER, PARTNER, GUIDE, DRIVER) với mã hóa mật khẩu bcrypt, Zod schemas và auto-redirection.

---

## 3. Giai đoạn 3: Tái thiết kế toàn diện Trang chủ dành cho KHÁCH HÀNG (`/`)
- Hoàn thành đầy đủ 5 Phase:
  - Phase 1: Phân tích & Thiết kế Kiến trúc Trang chủ
  - Phase 2: Header Sticky, Banner Carousel & Booking Widget
  - Phase 3: Danh mục địa điểm, Tour Card Tabs, Bộ sưu tập Chủ đề & Bản đồ Tương tác
  - Phase 4: Đánh giá khách hàng, Cẩm nang du lịch & Footer chuyên nghiệp
  - Phase 5: Tối ưu Responsive, UI/UX, Rà soát Quy chuẩn Toàn diện & Kiểm thử (commit `53140ef`)

---

## 4. Giai đoạn 4: Cấu trúc Dữ liệu & Thanh điều hướng (Header/Navigation) chuẩn A11y & Scroll-linked
- **Thời gian**: 2026-11-08
- **Nội dung thực hiện**:
  1. `src/features/navigation/types.ts`: Định nghĩa kiểu dữ liệu `MegaMenuChild` và `NavItem` (hỗ trợ `to`, `end`, `children`).
  2. `src/features/navigation/data.ts`: Tạo hằng số `NAV_ITEMS` chuẩn xác với 5 mục (Trang chủ, Khám phá kèm Mega Menu 5 danh thắng Quảng Trị: Đông Hà, Thành Cổ, Vịnh Mốc, Cồn Cỏ, Khe Sanh, Tour du lịch, Giới thiệu, Liên hệ).
  3. `src/features/navigation/components/MegaMenuDropdown.tsx`: Dropdown Mega Menu hiển thị hình ảnh thu nhỏ, tên điểm đến và mô tả ngắn khi hover/focus.
  4. `src/features/navigation/components/MobileNavDrawer.tsx`: Menu di động chuẩn A11y disclosure pattern (`aria-controls`, `aria-expanded`), tự động đóng khi bấm phím `Escape` hoặc khi click bất kỳ `NavLink` nào, hỗ trợ accordion mở rộng danh mục con.
  5. `src/features/navigation/components/DesktopNavLinks.tsx`: Điều hướng desktop hiển thị mảng `NAV_ITEMS.map()`, dùng `<NavLink>` với thuộc tính `end` và active styles token CSS (`text-primary font-bold`).
  6. `src/components/Navbar.tsx`: Nâng cấp Header ngữ nghĩa `<header role="banner">` và `<nav aria-label="Điều hướng chính">`, hiệu ứng Scroll-linked (cuộn > 50px đổi nền sang `bg-surface/95` và chữ `text-ink`), kết nối Zustand Auth Store (`user`, `role`, avatar, menu tài khoản).
  7. `src/pages/public/{ToursPage,AboutPage,ContactPage}.tsx` & `src/app/routes.tsx`: Hoàn thiện trang và định tuyến tương ứng để tất cả các mục điều hướng hoạt động 100% không gặp lỗi 404.
- **Kiểm thử**: `npm run typecheck` (0 lỗi) và `npm run build` (0 lỗi).


---

## 5. Giai đoạn 5: Rà soát & hoàn thiện theo PRD/ROUTES/AGENTS (Claude Code)
- **Thời gian**: 2026-11-09
- **Nội dung thực hiện**:
  1. User story 1 — kéo thả: `ItineraryBuilder.tsx` (HTML5 drag & drop, nút ↑ ↓ ✕), store có `addDestination/moveDestination/removeDestination`, lịch trình giữ đúng thứ tự tới đơn đặt.
  2. Slice 2 — `/tours` dùng `TourFilter` + `TourListView` (Container/View), bộ lọc lưu trên URL; ô tìm kiếm trang chủ chuyển sang `/tours?…`; thanh trượt giá tối đa 2.000.000 đ ("Không giới hạn").
  3. Tuyến `/my-bookings` + kho đơn `src/lib/booking/repository.ts` (localStorage, Zod khi đọc); menu tài khoản trỏ đúng trang (trước đó trỏ /profile, /my-tours, /booking-history không tồn tại).
  4. `/admin` chưa đăng nhập → `/admin/login` (`AdminLoginPage`), các trang tải bằng `lazy`.
  5. AGENTS.md: bỏ import chéo feature (kiểu dùng chung chuyển sang `src/lib/booking`), thay màu cứng bằng token (`on-media`, `scrim`, `danger-foreground`, thêm `primary-dark/light` vốn đang dùng mà chưa khai báo), `Card onClick` → `<button>`.
  6. Nâng `react-router` 7.18 → 8.5.1 (đúng mô tả công nghệ), `react` ≥ 19.2.7 theo yêu cầu của RR8; thêm favicon.
  7. Kiểm thử: Vitest + jsdom, 32 test (logic + smoke test bộ tuyến); script `typecheck` đổi thành `tsc -b`.
- **Kiểm thử**: `npm run typecheck` (0 lỗi), `npm test` (32/32), `npm run build` (thành công).

- **Bổ sung (cùng ngày)**:
  8. Đối tác: chuyến sinh từ đơn đã duyệt (`src/features/partner/bookingTrips.ts`), trạng thái chuyến lưu localStorage, hoàn thành chuyến → đơn khách `completed`.
  9. Admin: `buildMonthlyStats` gộp số liệu lịch sử với đơn thật; KPI doanh thu / lượt đặt / % tăng trưởng không còn viết cứng.
  10. `server/`: thêm `npm run server`, test API `server/index.test.ts`; ghi rõ trong readme frontend không phụ thuộc server.
  11. Test tích hợp `src/app/bookingFlow.test.ts` (Khách → Admin → Đối tác → Khách). Tổng 46 test.
  12. Kiểm tra giao diện bằng Edge headless (sáng + tối): sửa lớp phủ ảnh dùng `from-ink/via-ink` (ở chế độ tối `ink` là màu sáng → ảnh bị phủ trắng, chữ không đọc được) sang `scrim`; nút mũi tên banner đè lên tiêu đề → tăng lề ngang.
  13. Thay 2 ảnh Unsplash đã bị gỡ (404) ở Nghĩa trang Trường Sơn, TP. Đông Hà, La Vang.
  14. Thêm `<ScrollRestoration />` vào `RootLayout`: chuyển trang cuộn lên đầu, link `/#id` ở footer cuộn đúng mục.
  15. Đổi nhãn "Yêu thích" thành "Giỏ tour" (mục này thực chất dẫn tới `/checkout`).
  16. Test kéo thả `ItineraryBuilder.test.tsx` (giả lập sự kiện drag/drop + DataTransfer). Tổng 51 test.
