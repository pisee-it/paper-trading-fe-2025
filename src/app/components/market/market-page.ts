import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Import Component dùng chung
import { MarketBoard } from './market-board';

@Component({
  selector: 'app-market-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MarketBoard],
  template: `
    <div class="container" style="padding-top: 100px;">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="page-title">
          <i class="bi bi-graph-up-arrow text-success"></i> Thị Trường Crypto
        </h2>
      </div>

      <app-market-board></app-market-board>
    </div>
  `,
  // Thêm đoạn này để style cho tiêu đề
  styles: [
    `
      .page-title {
        color: #e8f2ff; /* Màu chữ sáng (giống Header/Login) */
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Đổ bóng nhẹ để nổi trên nền chart */
      }
    `,
  ],
})
export class MarketPage {}
