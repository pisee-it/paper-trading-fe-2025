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

    <div class="global-background"></div>

    <main class="main-wrapper">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      /* Nền cố định */
      .global-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -100; /* Số âm lớn để chắc chắn nằm dưới cùng */

        /* GHI CỨNG ĐƯỜNG DẪN TẠI ĐÂY ĐỂ TRÁNH LỖI BIẾN */
        background-image: url('/assets/images/bg-auth.jpg');

        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      /* Lớp phủ màu đen mờ */
      .global-background::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6); /* Đen mờ 60% */
        z-index: -99; /* Nằm trên ảnh nền 1 chút */
      }

      .main-wrapper {
        position: relative;
        width: 100%;
        min-height: 100vh;
      }
    `,
  ],
})
export class MainLayoutComponent {}
