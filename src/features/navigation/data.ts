import type { NavItem } from './types';

/**
 * Danh sách các mục điều hướng chính trên hệ thống Tour Quảng Trị
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'nav-home',
    label: 'Trang chủ',
    to: '/',
    end: true,
  },
  {
    id: 'nav-explore',
    label: 'Khám phá',
    children: [
      {
        id: 'dest-dong-ha',
        label: 'TP. Đông Hà',
        to: '/#kham-pha',
        description: 'Trung tâm tỉnh lỵ sôi động, cửa ngõ xuất phát các tour và thiên đường ẩm thực',
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'dest-thanh-co',
        label: 'Thành cổ Quảng Trị',
        to: '/tours/1',
        description: 'Khúc tráng ca 81 ngày đêm bất tử bên dòng Thạch Hãn linh thiêng',
        image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'dest-vinh-moc',
        label: 'Địa đạo Vịnh Mốc',
        to: '/tours/3',
        description: 'Kỳ tích làng hầm sống và chiến đấu phi thường sâu 30m trong lòng đất',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'dest-con-co',
        label: 'Đảo Cồn Cỏ',
        to: '/tours/4',
        description: 'Hòn ngọc xanh giữa trùng khơi, lặn ngắm san hô đỏ và hải đăng lịch sử',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'dest-khe-sanh',
        label: 'Khe Sanh — Tà Cơn',
        to: '/tours/5',
        description: 'Chiến trường đường 9 huyền thoại mùa khô 1968 và bản làng miền tây',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'nav-tours',
    label: 'Tour du lịch',
    to: '/tours',
  },
  {
    id: 'nav-hire',
    label: 'Thuê HDV & Xe',
    to: '/custom-tour',
  },
  {
    id: 'nav-about',
    label: 'Giới thiệu',
    to: '/about',
  },
  {
    id: 'nav-contact',
    label: 'Liên hệ',
    to: '/contact',
  },
];
