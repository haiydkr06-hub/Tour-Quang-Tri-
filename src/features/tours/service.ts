import type { Tour, TourFilter } from './types';

export const MOCK_TOURS: Tour[] = [
  {
    id: 1,
    name: 'Ký ức 81 Ngày Đêm — Thành Cổ Quảng Trị',
    description: 'Thăm viếng đài tưởng niệm Thành Cổ, chứng tích chiến trường khốc liệt năm 1972 và thả hoa đăng tri ân bên bờ sông Thạch Hãn.',
    price: 650000,
    locations: ['Thành Cổ Quảng Trị', 'Sông Thạch Hãn', 'Bảo tàng Quảng Trị'],
    duration: '1 Ngày',
    imageUrl: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 128,
    isFeatured: true,
    highlights: ['Lễ dâng hương đài tưởng niệm', 'Nghe thuyết minh ký ức 81 ngày đêm', 'Thả hoa đăng sông Thạch Hãn'],
    itinerary: [
      { time: '08:00', activity: 'Đón khách tại thị xã Quảng Trị' },
      { time: '09:00', activity: 'Dâng hương tưởng niệm các anh hùng tại Thành Cổ' },
      { time: '11:30', activity: 'Thưởng thức bữa trưa đặc sản bánh lọc, nem lụi Mai Lĩnh' },
      { time: '14:00', activity: 'Tham quan Bảo tàng Chứng tích Chiến tranh' },
      { time: '16:30', activity: 'Lễ thả hoa đăng tri ân tại bờ nam sông Thạch Hãn' },
    ],
  },
  {
    id: 2,
    name: 'Hành Trình Giới Tuyến Quân Sự — Vĩ Tuyến 17',
    description: 'Khám phá Cầu Hiền Lương - Sông Bến Hải lịch sử, Đồn Công an vũ trang và Cột cờ giới tuyến biểu tượng chia cắt hai miền suốt 20 năm.',
    price: 850000,
    locations: ['Cầu Hiền Lương', 'Sông Bến Hải', 'Cột Cờ Giới Tuyến'],
    duration: '1 Ngày',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 95,
    isFeatured: true,
    highlights: ['Chiêm ngưỡng Cầu Hiền Lương sơn 2 màu', 'Cụm tượng đài Khát vọng đoàn tụ', 'Nhà trưng bày hiện vật Hiệp định Genève'],
    itinerary: [
      { time: '08:00', activity: 'Khởi hành từ Đông Hà đi Vĩnh Linh' },
      { time: '09:15', activity: 'Tham quan Cụm di tích đôi bờ Hiền Lương - Bến Hải' },
      { time: '12:00', activity: 'Nghỉ ngơi, ăn trưa ẩm thực vùng đất lửa' },
      { time: '13:30', activity: 'Thăm Nhà trưng bày Vĩ tuyến 17 và dàn loa phóng thanh' },
      { time: '16:00', activity: 'Kết thúc chuyến tham quan và đưa khách về' },
    ],
  },
  {
    id: 3,
    name: 'Huyền Thoại Lòng Đất — Địa Đạo Vịnh Mốc',
    description: 'Trải nghiệm công trình kỳ vĩ sâu dưới lòng đất làng Vịnh Mốc — nơi quân dân sinh sống và chiến đấu kiên cường dưới mưa bom bão đạn.',
    price: 900000,
    locations: ['Địa đạo Vịnh Mốc', 'Bãi biển Cửa Tùng', 'Mũi Lay'],
    duration: '1 Ngày',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 210,
    isFeatured: true,
    highlights: ['Xuống 3 tầng hầm địa đạo sâu gần 30m', 'Xem giếng nước, phòng hộ sinh trong lòng đất', 'Ngắm hải đăng Mũi Lay'],
    itinerary: [
      { time: '08:00', activity: 'Xuất phát từ Đông Hà đi huyện Vĩnh Linh' },
      { time: '09:30', activity: 'Khám phá hệ thống ngầm Địa đạo Vịnh Mốc' },
      { time: '12:00', activity: 'Thưởng thức hải sản tươi sống bãi tắm Cửa Tùng' },
      { time: '14:30', activity: 'Check-in ngọn Hải đăng Mũi Lay cổ kính' },
      { time: '16:30', activity: 'Trở về điểm hẹn ban đầu' },
    ],
  },
  {
    id: 4,
    name: 'Về Nguồn Tri Ân — Nghĩa Trang Trường Sơn & Đường 9',
    description: 'Chuyến viếng thăm đầy thiêng liêng tới hai nghĩa trang quốc gia lớn nhất cả nước, nơi an nghỉ của hàng vạn chiến sĩ anh dũng hi sinh.',
    price: 750000,
    locations: ['Nghĩa trang Trường Sơn', 'Nghĩa trang Quốc gia Đường 9'],
    duration: '1 Ngày',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 164,
    isFeatured: false,
    highlights: ['Dâng hương hơn 10.000 phần mộ', 'Thỉnh chuông cầu nguyện hòa bình', 'Nghe kể chuyện huyền thoại bộ đội Trường Sơn'],
    itinerary: [
      { time: '08:00', activity: 'Đón đoàn tại khách sạn TP. Đông Hà' },
      { time: '09:00', activity: 'Dâng hương tại Nghĩa trang Liệt sĩ Quốc gia Đường 9' },
      { time: '11:30', activity: 'Dùng bữa trưa truyền thống tại Gio Linh' },
      { time: '13:30', activity: 'Lễ viếng Nghĩa trang Liệt sĩ Quốc gia Trường Sơn' },
      { time: '16:30', activity: 'Đoàn trở về lại TP. Đông Hà' },
    ],
  },
  {
    id: 5,
    name: 'Khúc Tráng Ca Đường 9 — Khe Sanh & Làng Vây',
    description: 'Hành trình ngược về miền tây Quảng Trị thăm sân bay Tà Cơn, Căn cứ Khe Sanh và Cửa khẩu Quốc tế Lao Bảo.',
    price: 1100000,
    locations: ['Sân bay Tà Cơn', 'Căn cứ Khe Sanh', 'Cửa khẩu Lao Bảo'],
    duration: '1 Ngày',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 88,
    isFeatured: false,
    highlights: ['Trực thăng và xe tăng còn nguyên vẹn tại Tà Cơn', 'Khám phá thung lũng Khe Sanh', 'Mua sắm tại trung tâm thương mại Lao Bảo'],
    itinerary: [
      { time: '07:30', activity: 'Khởi hành theo đường 9 huyền thoại lên Hướng Hóa' },
      { time: '09:30', activity: 'Thăm Di tích Lịch sử Sân bay Tà Cơn' },
      { time: '12:00', activity: 'Thưởng thức ẩm thực miền sơn cước thị trấn Khe Sanh' },
      { time: '13:30', activity: 'Ghé thăm Cửa khẩu Quốc tế Lao Bảo' },
      { time: '16:00', activity: 'Đoàn về lại trung tâm tỉnh' },
    ],
  },
];

export const ALL_LOCATIONS = [
  'Tất cả địa danh',
  'Thành Cổ Quảng Trị',
  'Cầu Hiền Lương',
  'Địa đạo Vịnh Mốc',
  'Nghĩa trang Trường Sơn',
  'Sân bay Tà Cơn',
];

export async function getTours(filter?: TourFilter): Promise<Tour[]> {
  await new Promise((resolve) => setTimeout(resolve, 80)); // Giả lập độ trễ mạng
  if (!filter) return MOCK_TOURS;

  return MOCK_TOURS.filter((tour) => {
    const matchesSearch =
      filter.searchQuery.trim() === '' ||
      tour.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(filter.searchQuery.toLowerCase());

    const matchesPrice = filter.maxPrice <= 0 || tour.price <= filter.maxPrice;

    const matchesLocation =
      filter.selectedLocation === '' ||
      filter.selectedLocation === 'Tất cả địa danh' ||
      tour.locations.some((loc) => loc.includes(filter.selectedLocation));

    return matchesSearch && matchesPrice && matchesLocation;
  });
}

export async function getTourById(id: number): Promise<Tour | null> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return MOCK_TOURS.find((tour) => tour.id === id) ?? null;
}
