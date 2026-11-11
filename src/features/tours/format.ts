/** Định dạng tiền Việt: 650000 → "650.000₫" */
export const formatVND = (value: number): string => `${value.toLocaleString('vi-VN')}₫`;

/** Ngày dạng YYYY-MM-DD (dữ liệu tour) → DD/MM/YYYY; chuỗi lạ thì giữ nguyên. */
export function formatTourDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : isoDate;
}

/** % giảm so với giá gốc, null nếu không có giá gốc cao hơn. */
export function discountPercent(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
