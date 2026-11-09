import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
// Trong test dùng RouterProvider của 'react-router' để tránh nạp 2 bản (ESM/CJS) của thư viện
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { routes } from './routes';
import { ThemeProvider } from '@/context/ThemeContext';
import { useAuthStore } from '@/features/auth/store';
import { useCartStore } from '@/features/cart/store';

/**
 * Test khói (smoke test) cho bộ tuyến — Slice 1 trong TASKS.md:
 * mỗi tuyến chính hiển thị được, chuyển hướng bảo vệ đúng như ROUTES.md.
 */
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

async function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  await act(async () => {
    root.render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>,
    );
  });
  return router;
}

const pageText = () => container.textContent ?? '';

beforeEach(() => {
  localStorage.clear();
  useAuthStore.getState().logout();
  useCartStore.getState().clearCart();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  // jsdom không có matchMedia (ThemeContext dùng để đọc chế độ sáng/tối của hệ điều hành)
  window.matchMedia = vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  })) as unknown as typeof window.matchMedia;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('Smoke test bộ tuyến', () => {
  it('"/" hiển thị trang chủ', async () => {
    const router = await renderAt('/');
    expect(router.state.location.pathname).toBe('/');
    expect(container.querySelector('header')).not.toBeNull();
  });

  it('"/admin" khi chưa đăng nhập → chuyển sang "/admin/login"', async () => {
    const router = await renderAt('/admin');
    await vi.waitFor(() => expect(router.state.location.pathname).toBe('/admin/login'));
  });

  it('"/partner" khi chưa đăng nhập → chuyển sang "/login"', async () => {
    const router = await renderAt('/partner');
    await vi.waitFor(() => expect(router.state.location.pathname).toBe('/login'));
  });

  it('"/checkout" khi giỏ hàng rỗng → về "/"', async () => {
    const router = await renderAt('/checkout');
    await vi.waitFor(() => expect(router.state.location.pathname).toBe('/'));
  });

  it('"/tours" lọc không ra kết quả → hiện trạng thái rỗng', async () => {
    await renderAt('/tours?q=khong-ton-tai-tour-nay');
    await vi.waitFor(() => expect(pageText()).toContain('Không tìm thấy tour phù hợp'));
  });

  it('"/tours?max=..." chỉ hiện tour trong khoảng giá', async () => {
    await renderAt('/tours?max=600000');
    await vi.waitFor(() => expect(pageText()).toMatch(/Tìm thấy\s*1\s*chuyến tour/));
  });

  it('"/my-bookings" hiển thị trang đơn của tôi', async () => {
    await renderAt('/my-bookings');
    await vi.waitFor(() => expect(pageText()).toContain('Đơn Đặt Tour Của Tôi'));
  });

  it('URL không tồn tại → trang 404', async () => {
    await renderAt('/duong-dan-khong-ton-tai');
    await vi.waitFor(() => expect(container.querySelector('a[href="/"]')).not.toBeNull());
    expect(pageText()).toMatch(/404|không tìm thấy/i);
  });
});
