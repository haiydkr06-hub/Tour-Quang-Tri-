import bcrypt from 'bcryptjs';
import type { StoredUser, AuthResponse, UserRole } from './types';

// Băm mật khẩu bảo mật (bcrypt salt rounds = 10)
const SALT_ROUNDS = 10;
const hash = (pwd: string) => bcrypt.hashSync(pwd, SALT_ROUNDS);

// Danh sách người dùng khởi tạo với 5 vai trò phân quyền
const INITIAL_USERS: StoredUser[] = [
  {
    id: 'u-admin-1',
    name: 'Nguyễn Quản Trị (Admin)',
    email: 'admin@quangtri.vn',
    phone: '0912000001',
    role: 'ADMIN',
    passwordHash: hash('admin123'),
  },
  {
    id: 'u-cust-1',
    name: 'Hoàng Hải Yến (Khách Du Lịch)',
    email: 'customer@quangtri.vn',
    phone: '0912000002',
    role: 'CUSTOMER',
    passwordHash: hash('customer123'),
  },
  {
    id: 'u-part-1',
    name: 'Công ty Lữ hành Miền Trung (Partner)',
    email: 'partner@quangtri.vn',
    phone: '0912000003',
    role: 'PARTNER',
    passwordHash: hash('partner123'),
  },
  {
    id: 'u-guide-1',
    name: 'Lê Văn Hướng (HDV Thành Cổ & Vịnh Mốc)',
    email: 'guide@quangtri.vn',
    phone: '0912000004',
    role: 'GUIDE',
    passwordHash: hash('guide123'),
  },
  {
    id: 'u-driver-1',
    name: 'Trần Văn Lái (Tài Xế Tour Đường 9)',
    email: 'driver@quangtri.vn',
    phone: '0912000005',
    role: 'DRIVER',
    passwordHash: hash('driver123'),
  },
];

let USERS_DATABASE: StoredUser[] = [...INITIAL_USERS];

export async function backendLogin(input: unknown): Promise<AuthResponse> {
  await new Promise((r) => setTimeout(r, 80));
  if (typeof input !== 'object' || input === null) {
    return { success: false, message: 'Dữ liệu không hợp lệ' };
  }

  const { identifier, password } = input as Record<string, unknown>;
  if (typeof identifier !== 'string' || typeof password !== 'string') {
    return { success: false, message: 'Tên đăng nhập và mật khẩu là bắt buộc' };
  }

  const cleanId = identifier.trim().toLowerCase();
  const user = USERS_DATABASE.find(
    (u) => u.email.toLowerCase() === cleanId || u.phone === cleanId
  );

  if (!user) {
    return { success: false, message: 'Tài khoản không tồn tại trên hệ thống' };
  }

  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    return { success: false, message: 'Mật khẩu không chính xác' };
  }

  const token = `jwt_mock_${user.id}_${Date.now()}`;
  const { passwordHash: _, ...userProfile } = user;

  return {
    success: true,
    user: userProfile,
    token,
    message: 'Đăng nhập thành công',
  };
}

export async function backendRegister(input: unknown): Promise<AuthResponse> {
  await new Promise((r) => setTimeout(r, 100));
  if (typeof input !== 'object' || input === null) {
    return { success: false, message: 'Dữ liệu không hợp lệ' };
  }

  const data = input as Record<string, unknown>;
  const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  const password = typeof data.password === 'string' ? data.password : '';

  if (!fullName || !email || !phone || !password) {
    return { success: false, message: 'Vui lòng điền đầy đủ các trường bắt buộc' };
  }

  const exists = USERS_DATABASE.some(
    (u) => u.email.toLowerCase() === email || u.phone === phone
  );
  if (exists) {
    return { success: false, message: 'Email hoặc số điện thoại đã được đăng ký' };
  }

  const newUser: StoredUser = {
    id: `u-cust-${Date.now().toString().slice(-5)}`,
    name: fullName,
    email,
    phone,
    role: 'CUSTOMER' as UserRole,
    passwordHash: hash(password),
    createdAt: new Date().toISOString(),
  };

  USERS_DATABASE = [...USERS_DATABASE, newUser];
  const { passwordHash: _, ...userProfile } = newUser;
  const token = `jwt_mock_${newUser.id}_${Date.now()}`;

  return {
    success: true,
    user: userProfile,
    token,
    message: 'Đăng ký tài khoản thành công',
  };
}

export async function backendForgotPassword(input: unknown): Promise<{ success: boolean; message: string }> {
  await new Promise((r) => setTimeout(r, 60));
  if (typeof input !== 'object' || input === null) {
    return { success: false, message: 'Dữ liệu không hợp lệ' };
  }

  const { email } = input as Record<string, unknown>;
  if (typeof email !== 'string') {
    return { success: false, message: 'Email không hợp lệ' };
  }

  const user = USERS_DATABASE.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) {
    return { success: false, message: 'Email này chưa được đăng ký trên hệ thống' };
  }

  return {
    success: true,
    message: `Đã gửi mã khôi phục mật khẩu 6 số tới ${user.email}. Vui lòng kiểm tra hòm thư.`,
  };
}
