import type { HistoricalDestination, TourGuide, VehicleOption } from './types';

export interface CustomTourPriceInput {
  destinations: Pick<HistoricalDestination, 'entryFee'>[];
  guests: number;
  days: number;
  guide: Pick<TourGuide, 'pricePerDay'> | null;
  vehicle: Pick<VehicleOption, 'pricePerDay'> | null;
}

export interface CustomTourPrice {
  tickets: number;
  guide: number;
  vehicle: number;
  total: number;
}

/**
 * Tính giá tour tự thiết kế (thanh toán gộp — user story 4):
 * vé tham quan × số khách + HDV × số ngày + xe × số ngày.
 * Hàm thuần, dùng chung cho thanh tổng kết và bước tạo giỏ hàng.
 */
export function calculateCustomTourPrice({
  destinations,
  guests,
  days,
  guide,
  vehicle,
}: CustomTourPriceInput): CustomTourPrice {
  const tickets = destinations.reduce((sum, d) => sum + d.entryFee, 0) * guests;
  const guideCost = (guide?.pricePerDay ?? 0) * days;
  const vehicleCost = (vehicle?.pricePerDay ?? 0) * days;
  return { tickets, guide: guideCost, vehicle: vehicleCost, total: tickets + guideCost + vehicleCost };
}
