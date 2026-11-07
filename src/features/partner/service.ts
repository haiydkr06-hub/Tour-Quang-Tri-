import type { PartnerTrip, FaqItem, TripStatus } from './types';

let MOCK_PARTNER_TRIPS: PartnerTrip[] = [
  {
    id: 'TRIP-QT-101',
    tourTitle: 'Ký ức 81 Ngày Đêm — Thành Cổ Quảng Trị',
    destinations: ['Thành Cổ Quảng Trị', 'Sông Thạch Hãn', 'Bảo tàng Quảng Trị'],
    customerName: 'Đoàn Cựu chiến binh Hà Nội (Trần Văn Bình)',
    customerPhone: '0988776655',
    guestCount: 6,
    startDate: '2026-11-12',
    days: 1,
    roleType: 'guide',
    payout: 500000,
    status: 'assigned',
    specialNotes: 'Đoàn cần chuẩn bị hoa tươi và đèn hoa đăng thả sông Thạch Hãn',
  },
  {
    id: 'TRIP-QT-102',
    tourTitle: 'Huyền Thoại Lòng Đất — Địa Đạo Vịnh Mốc',
    destinations: ['Địa đạo Vịnh Mốc', 'Cửa Tùng', 'Mũi Lay'],
    customerName: 'Gia đình chị Nguyễn Thu Hà',
    customerPhone: '0912334455',
    guestCount: 4,
    startDate: '2026-11-15',
    days: 1,
    roleType: 'guide',
    payout: 600000,
    status: 'assigned',
    specialNotes: 'Có 1 trẻ em 8 tuổi, cần thuyết minh sinh động',
  },
  {
    id: 'TRIP-QT-103',
    tourTitle: 'Giới Tuyến Quân Sự — Cầu Hiền Lương & Sông Bến Hải',
    destinations: ['Cầu Hiền Lương', 'Sông Bến Hải', 'Đồn Công An Vũ Trang'],
    customerName: 'Nhóm nghiên cứu lịch sử Đại học Huế',
    customerPhone: '0905123456',
    guestCount: 5,
    startDate: '2026-11-03',
    days: 1,
    roleType: 'guide',
    payout: 550000,
    status: 'completed',
    specialNotes: 'Chuyến đi đã hoàn tất tốt đẹp, khách đánh giá 5 sao',
  },
];

export const MOCK_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Quy định trang phục khi tham quan Thành Cổ và Nghĩa trang Liệt sĩ?',
    answer: 'Thành Cổ và các nghĩa trang là nơi an nghỉ linh thiêng của hàng vạn anh hùng liệt sĩ. Du khách bắt buộc mặc trang phục lịch sự, kín đáo (áo có tay, quần dài qua đầu gối), giữ trật tự và không xả rác.',
    category: 'etiquette',
  },
  {
    id: 'faq-2',
    question: 'Thời điểm thích hợp nhất trong năm để du lịch Quảng Trị?',
    answer: 'Thời gian lý tưởng là từ tháng 3 đến tháng 8 hàng năm (thời tiết khô ráo, thuận tiện thăm Vịnh Mốc và sông Thạch Hãn). Đặc biệt dịp tháng 4 và tháng 7 là mùa Lễ hội Thống nhất non sông và Tri ân các anh hùng.',
    category: 'weather',
  },
  {
    id: 'faq-3',
    question: 'Đoàn khách có thể thay đổi lịch trình trong ngày được không?',
    answer: 'Với tour tự thiết kế (Custom Tour), quý khách có thể trao đổi trực tiếp với Hướng dẫn viên bản địa để điều chỉnh thứ tự các điểm sao cho phù hợp với sức khỏe và thời gian của đoàn.',
    category: 'booking',
  },
];

export async function getPartnerTrips(): Promise<PartnerTrip[]> {
  await new Promise((r) => setTimeout(r, 60));
  return [...MOCK_PARTNER_TRIPS];
}

export async function updatePartnerTripStatus(
  tripId: string,
  newStatus: TripStatus
): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 60));
  const trip = MOCK_PARTNER_TRIPS.find((t) => t.id === tripId);
  if (trip) {
    trip.status = newStatus;
    return true;
  }
  return false;
}

export async function getFaqs(): Promise<FaqItem[]> {
  await new Promise((r) => setTimeout(r, 40));
  return MOCK_FAQS;
}
