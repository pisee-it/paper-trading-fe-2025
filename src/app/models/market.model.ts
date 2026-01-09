// Interface hứng dữ liệu thô từ Backend (Map<String, BigDecimal>)
// Ví dụ: { "bitcoin": 96000.5, "ethereum": 2700.1 }
export interface MarketPriceResponse {
  [key: string]: number;
}

// Interface dùng để hiển thị lên màn hình (để dễ dùng vòng lặp *ngFor)
export interface CoinDisplay {
  id: string; // ID dùng để map với dữ liệu backend (vd: bitcoin)
  symbol: string; // Ký hiệu hiển thị (vd: BTC)
  name: string; // Tên hiển thị (vd: Bitcoin)
  price: number; // Giá trị hiển thị
  image?: string; // (Mở rộng) Sau này có thể thêm link ảnh logo
}
