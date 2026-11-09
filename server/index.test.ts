// @vitest-environment node
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import app from './index';

let server: Server;
let baseUrl = '';

beforeAll(async () => {
  server = await new Promise<Server>((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => {
  server.close();
});

const post = (path: string, body: unknown) =>
  fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('API Express giả lập (server/index.ts)', () => {
  it('đăng nhập đúng trả về hồ sơ không kèm mật khẩu băm', async () => {
    const res = await post('/api/auth/login', { identifier: 'admin@quangtri.vn', password: 'admin123' });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { success: boolean; user: Record<string, unknown> };
    expect(data.success).toBe(true);
    expect(data.user.role).toBe('ADMIN');
    expect(data.user).not.toHaveProperty('passwordHash');
  });

  it('sai mật khẩu → 401, thiếu dữ liệu → 400', async () => {
    expect((await post('/api/auth/login', { identifier: 'admin@quangtri.vn', password: 'sai' })).status).toBe(401);
    expect((await post('/api/auth/login', {})).status).toBe(400);
  });

  it('đăng ký email trùng → 409', async () => {
    const res = await post('/api/auth/register', {
      fullName: 'Ai Đó',
      email: 'customer@quangtri.vn',
      phone: '0999999999',
      password: 'matkhau123',
    });
    expect(res.status).toBe(409);
  });
});
