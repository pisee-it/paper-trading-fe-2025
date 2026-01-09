import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // <--- QUAN TRỌNG NHẤT
import { HeaderComponent } from '../header/header';

// Giải pháp Main Layout (Cái Khung Tranh): Hãy tưởng tượng Main Layout là một cái Khung Tranh.
// Header: Là viền trên của khung (Cố định).
// Router Outlet: Là phần vải trắng ở giữa (Thay đổi).

// Chứa gì: Thẻ <app-header> (cố định) và <router-outlet> (thay đổi).
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="main-wrapper">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .main-wrapper {
        /* 1. XÓA dòng padding-top: 80px cũ đi */
        /* padding-top: 80px; <--- XÓA hoặc Comment lại */

        /* 2. Giữ nguyên các thuộc tính khác */
        min-height: 100vh;
        background-color: #fafafa;
        box-sizing: border-box;
        width: 100%;
      }
    `,
  ],
})
export class MainLayoutComponent {}
