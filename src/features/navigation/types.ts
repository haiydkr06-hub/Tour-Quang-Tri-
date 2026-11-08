/**
 * Kiểu dữ liệu đại diện cho mục con trong Mega Menu (Khám phá)
 */
export interface MegaMenuChild {
  id: string;
  label: string;
  to: string;
  description: string;
  image: string;
}

/**
 * Kiểu dữ liệu cho từng mục điều hướng trên Header
 */
export interface NavItem {
  id: string;
  label: string;
  to?: string;
  end?: boolean;
  children?: MegaMenuChild[];
}
