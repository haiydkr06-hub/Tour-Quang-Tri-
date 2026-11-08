import express from 'express';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

const SALT_ROUNDS = 10;
const hash = (pwd: string) => bcrypt.hashSync(pwd, SALT_ROUNDS);

interface ServerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'CUSTOMER' | 'PARTNER' | 'GUIDE' | 'DRIVER';
  passwordHash: string;
}

const users: ServerUser[] = [
  { id: '1', name: 'Admin Quảng Trị', email: 'admin@quangtri.vn', phone: '0912000001', role: 'ADMIN', passwordHash: hash('admin123') },
  { id: '2', name: 'Khách Du Lịch', email: 'customer@quangtri.vn', phone: '0912000002', role: 'CUSTOMER', passwordHash: hash('customer123') },
  { id: '3', name: 'Đối Tác Lữ Hành', email: 'partner@quangtri.vn', phone: '0912000003', role: 'PARTNER', passwordHash: hash('partner123') },
  { id: '4', name: 'HDV Bản Địa', email: 'guide@quangtri.vn', phone: '0912000004', role: 'GUIDE', passwordHash: hash('guide123') },
  { id: '5', name: 'Tài Xế Du Lịch', email: 'driver@quangtri.vn', phone: '0912000005', role: 'DRIVER', passwordHash: hash('driver123') },
];

// Endpoint Đăng nhập
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body as { identifier?: string; password?: string };
  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin đăng nhập' });
  }

  const cleanId = identifier.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === cleanId || u.phone === cleanId);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ success: false, message: 'Tài khoản hoặc mật khẩu không đúng' });
  }

  const { passwordHash: _, ...profile } = user;
  return res.json({ success: true, user: profile, token: `jwt_${user.id}_${Date.now()}` });
});

// Endpoint Đăng ký (Dành cho CUSTOMER)
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, phone, password } = req.body as Record<string, string>;
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền đủ thông tin' });
  }

  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase() || u.phone === phone);
  if (exists) {
    return res.status(409).json({ success: false, message: 'Email hoặc số điện thoại đã tồn tại' });
  }

  const newUser: ServerUser = {
    id: `u-${Date.now()}`,
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    role: 'CUSTOMER',
    passwordHash: hash(password),
  };
  users.push(newUser);

  const { passwordHash: _, ...profile } = newUser;
  return res.status(201).json({ success: true, user: profile, token: `jwt_${newUser.id}_${Date.now()}` });
});

// Endpoint Quên mật khẩu
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body as { email?: string };
  const user = users.find((u) => u.email.toLowerCase() === (email ?? '').trim().toLowerCase());
  if (!user) {
    return res.status(404).json({ success: false, message: 'Email chưa đăng ký' });
  }
  return res.json({ success: true, message: `Mã OTP xác nhận đã gửi tới ${user.email}` });
});

const PORT = 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Auth Server running on http://localhost:${PORT}`);
  });
}

export default app;
