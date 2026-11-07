# AGENTS.md — Luật làm việc nghiêm ngặt cho trợ lý AI

## Dự án
Tên: phu-xuan-react — Quản lý Tour Du lịch Quảng Trị (Custom Tour)
Mục tiêu: Xây dựng hệ thống đặt tour cá nhân hóa, thuê HDV và phân quyền Admin/Partner.

## Công nghệ (KHÔNG tự ý đổi, không thêm thư viện khi chưa hỏi)
- React 19 + TypeScript (strict) + Vite
- React Router 8 (Data Mode)
- Zustand (Global State: Giỏ hàng, Đăng nhập) + Context (Theme)
- Tailwind CSS 4 (Dùng token css: `var(--color-primary)`)
- Zod (Kiểm chứng dữ liệu biên giới)

## Điều hướng (React Router 8)
- Import từ `"react-router"`; chỉ `RouterProvider` import từ `"react-router/dom"`. KHÔNG dùng gói `react-router-dom` cũ.
- Định tuyến mảng `RouteObject[]` ở `src/app/routes.tsx`.
- Khởi tạo router MỘT LẦN ở `src/app/router.tsx` bằng `createBrowserRouter(routes)`.
- Tham số URL (useParams) là chuỗi: ép kiểu sang số trước khi tra cứu dữ liệu.
- Chuyển trang lúc render dùng `<Navigate replace />`, sự kiện người dùng dùng `<Link>` hoặc `useNavigate`.

## Cấu trúc thư mục (Feature-based)
- Tính năng: `src/features/<tên>/{components,hooks,store.ts,types.ts}`
- Component thuần túy (UI): `src/components/ui/` (Button, Card, TextField).
- Quy tắc import MỘT CHIỀU: `pages -> features -> components -> lib`. Tính năng này không gọi trực tiếp thành phần bên trong thư mục tính năng khác.

## Quy ước Mã nguồn (TypeScript & React)
- Cấm dùng `any`. Dữ liệu chưa biết dùng `unknown` và thu hẹp kiểu bằng Zod hoặc typeof.
- Chỉ dùng Function Components và Hooks. Không Class components.
- Mỗi component một tệp, dưới 150 dòng; dài hơn phải tách.
- Mọi dữ liệu (Mock data) đặt ở `src/features/<tên>/service.ts` để gọi giả lập, cấm viết cứng vào trong Component.

## Giao diện (UI)
- Dùng màu từ token CSS đã định nghĩa (`primary`, `surface`, `ink`). KHÔNG dùng mã màu cứng như `bg-[#0f766e]` hay `text-slate-700`.
- Thiết kế HTML ngữ nghĩa: Nút là `<button>`, liên kết là `<a>` hoặc `<Link>`. Không dùng `<div onClick>`.

## Quy trình làm việc (Vibe Coding)
1. Trước khi sinh mã, AI phải liệt kê kế hoạch ngắn các tệp sẽ tạo/sửa.
2. Không tự ý xoá hay cấu hình lại Vite/TypeScript khi chưa có yêu cầu.
3. Mã sinh ra phải đi kèm giải thích ngắn gọn bằng tiếng Việt.