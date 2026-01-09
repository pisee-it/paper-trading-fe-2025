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
        <h2><i class="bi bi-graph-up-arrow text-primary"></i> Thị Trường Crypto</h2>
      </div>

      <app-market-board></app-market-board>
    </div>
  `,
})
export class MarketPage {}
