import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
// IMPORT Component con vào
import { MarketBoard } from '../market/market-board';

// Hiển thị Thông tin cá nhân (Chủ quan) và tổng hợp các công cụ cần thiết cho người dùng đó.
// Nó hiển thị gì?
// - Tài sản cá nhân: Số dư $10,000 (Demo), lãi/lỗ của người dùng.
// - Thông tin User: Tên, cấp độ tài khoản.
// - Công cụ: Ô tìm kiếm, nút nạp tiền, rút tiền.
// - MarketBoard: Nó nhúng cái MarketBoardComponent vào bên trong nó để người dùng tiện theo dõi giá.
@Component({
  selector: 'app-dashboard',
  standalone: true,
  // Khai báo component con ở đây
  imports: [CommonModule, MarketBoard],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
