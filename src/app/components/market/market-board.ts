import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketService } from '../../services/market.service';
import { CoinDisplay, MarketPriceResponse } from '../../models/market.model';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Conditional } from '@angular/compiler';

// Tập trung hiển thị Dữ liệu thị trường (Khách quan).
// Bao gồm:
// - Danh sách các đồng Coin
// - Giá hiện tại
// - Biểu đồ nhỏ
// - Nút hành động nhanh ("Giao dịch")

@Component({
  selector: 'app-market-board', // Tên thẻ để nhúng
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../market/market-board.html',
  styleUrls: ['../market/market-board.scss'],
})
export class MarketBoard implements OnInit, OnDestroy {
  marketService = inject(MarketService);

  coins: CoinDisplay[] = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 0 },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 0 },
  ];

  private pollingSubscription!: Subscription;

  ngOnInit(): void {
    this.startPriceUpdates();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  startPriceUpdates() {
    this.pollingSubscription = interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.marketService.getMarketPrices())
      )
      .subscribe({
        next: (data) => this.updateCoinPrices(data),
        error: (err) => console.error('Lỗi Market:', err),
      });
  }

  updateCoinPrices(data: MarketPriceResponse) {
    this.coins.forEach((coin) => {
      if (data[coin.id]) coin.price = data[coin.id];
    });
  }
}
