import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketPriceResponse } from '../models/market.model';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  // Đảm bảo port 8080 khớp với Backend Spring Boot của bạn
  private apiUrl = 'http://localhost:8080/api/market/prices';

  constructor(private http: HttpClient) {}

  // Hàm gọi API lấy giá
  // Backend mặc định đã lấy "bitcoin,ethereum" nên không cần truyền param nếu không muốn thay đổi
  getMarketPrices(): Observable<MarketPriceResponse> {
    return this.http.get<MarketPriceResponse>(this.apiUrl);
  }
}
