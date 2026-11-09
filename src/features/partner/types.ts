export type TripStatus = 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export type PartnerRoleType = 'guide' | 'driver';

export interface PartnerTrip {
  id: string;
  tourTitle: string;
  destinations: string[];
  customerName: string;
  customerPhone: string;
  guestCount: number;
  startDate: string;
  days: number;
  roleType: PartnerRoleType;
  payout: number;
  status: TripStatus;
  specialNotes?: string;
  /** Mã đơn đặt tour sinh ra chuyến này (nếu chuyến được phân công từ đơn khách đặt) */
  bookingId?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'etiquette' | 'booking' | 'weather';
}
