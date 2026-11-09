import type { HistoricalDestination, TourGuide, VehicleOption } from './types';

export const MOCK_DESTINATIONS: HistoricalDestination[] = [
  {
    id: 'thanh-co',
    name: 'Thành Cổ Quảng Trị',
    region: 'TX. Quảng Trị',
    description: 'Chiến trường 81 ngày đêm khốc liệt mùa hè đỏ lửa 1972, biểu tượng tinh thần bất khuất.',
    entryFee: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=600&q=80',
    timeRequired: '2 - 3 giờ',
  },
  {
    id: 'hien-luong',
    name: 'Cầu Hiền Lương — Sông Bến Hải (Vĩ tuyến 17)',
    region: 'Vĩnh Linh - Do Linh',
    description: 'Giới tuyến quân sự chia cắt hai miền Nam - Bắc Việt Nam suốt 20 năm ròng rã.',
    entryFee: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    timeRequired: '2 giờ',
  },
  {
    id: 'vinh-moc',
    name: 'Địa đạo Vịnh Mốc',
    region: 'Huyện Vĩnh Linh',
    description: 'Kỳ quan sống ngầm dưới lòng đất 3 tầng của quân và dân Vĩnh Linh trước mưa bom B52.',
    entryFee: 60000,
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    timeRequired: '2.5 giờ',
  },
  {
    id: 'truong-son',
    name: 'Nghĩa trang Liệt sĩ Quốc gia Trường Sơn',
    region: 'Huyện Gio Linh',
    description: 'Nơi an nghỉ của hơn 10.000 liệt sĩ đã chiến đấu và hi sinh trên tuyến đường mòn Hồ Chí Minh.',
    entryFee: 0,
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80',
    timeRequired: '2 giờ',
  },
  {
    id: 'ta-con',
    name: 'Sân bay Tà Cơn — Khe Sanh',
    region: 'Huyện Hướng Hóa',
    description: 'Căn cứ điểm quân sự chiến lược đường 9 Khe Sanh với các xác máy bay trực thăng và xe tăng còn nguyên vẹn.',
    entryFee: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    timeRequired: '2 giờ',
  },
  {
    id: 'la-vang',
    name: 'Trung tâm Hành hương Đức Mẹ La Vang',
    region: 'Huyện Hải Lăng',
    description: 'Thánh địa tôn giáo và kiến trúc cổ kính nổi tiếng bậc nhất miền Trung.',
    entryFee: 0,
    imageUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=600&q=80',
    timeRequired: '1.5 giờ',
  },
];

export const MOCK_GUIDES: TourGuide[] = [
  {
    id: 101,
    name: 'Nguyễn Văn Hùng',
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    rating: 4.9,
    reviewsCount: 142,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    pricePerDay: 500000,
    specialty: 'Chuyên gia nghiên cứu lịch sử Vĩ tuyến 17 và Thành Cổ',
  },
  {
    id: 102,
    name: 'Lê Thị Thu Mai',
    languages: ['Tiếng Việt', 'Tiếng Pháp'],
    rating: 5.0,
    reviewsCount: 98,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    pricePerDay: 550000,
    specialty: 'Thuyết minh viên kỳ cựu tại Địa đạo Vịnh Mốc & Cửa Tùng',
  },
  {
    id: 103,
    name: 'Trần Hữu Thắng',
    languages: ['Tiếng Việt'],
    rating: 4.8,
    reviewsCount: 76,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    pricePerDay: 450000,
    specialty: 'Cựu chiến binh am hiểu sâu sắc chiến trường Đường 9 Khe Sanh',
  },
];

export const MOCK_VEHICLES: VehicleOption[] = [
  {
    id: 'car-4',
    name: 'Xe Sedan 4 Chỗ (Vios / Accent)',
    seats: 4,
    pricePerDay: 700000,
    description: 'Thích hợp cho gia đình nhỏ hoặc nhóm 2 - 3 khách tham quan',
  },
  {
    id: 'suv-7',
    name: 'Xe SUV 7 Chỗ (Innova / Fortuner)',
    seats: 7,
    pricePerDay: 900000,
    description: 'Rộng rãi, êm ái, phù hợp cho nhóm bạn 4 - 6 người',
  },
  {
    id: 'van-16',
    name: 'Xe Van 16 Chỗ (Ford Transit)',
    seats: 16,
    pricePerDay: 1300000,
    description: 'Lựa chọn tối ưu cho đoàn gia đình lớn, hội cựu chiến binh',
  },
];

export async function getHistoricalDestinations(): Promise<HistoricalDestination[]> {
  await new Promise((r) => setTimeout(r, 60));
  return MOCK_DESTINATIONS;
}

export async function getTourGuides(): Promise<TourGuide[]> {
  await new Promise((r) => setTimeout(r, 60));
  return MOCK_GUIDES;
}

export async function getVehicleOptions(): Promise<VehicleOption[]> {
  await new Promise((r) => setTimeout(r, 60));
  return MOCK_VEHICLES;
}
