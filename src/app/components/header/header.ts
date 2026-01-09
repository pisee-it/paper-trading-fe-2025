import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Đảm bảo đường dẫn đúng tới file Service của bạn

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html', // Chú ý đuôi file là .component.html nếu bạn đặt tên chuẩn
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  // 1. Inject AuthService (Thay vì dùng Router trực tiếp để check token)
  private authService = inject(AuthService);

  // --- LOGIC CŨ (GIỮ NGUYÊN 100%) ---
  showLanguageMenu = false;
  showUserMenu = false;
  showLogoutModal = false;

  // Lấy Signal gốc từ Service
  currentUser = this.authService.currentUser;

  // Tự động tính toán trạng thái đăng nhập (True/False)
  // computed sẽ tự động lắng nghe thay đổi từ AuthService
  isLoggedIn = computed(() => !!this.currentUser());

  // Tự động lấy tên và email từ User đang đăng nhập
  userName = computed(() => this.currentUser()?.username || 'Người dùng');
  userEmail = computed(() => this.currentUser()?.email || '');

  // --- CÁC HÀM TOGGLE (GIỮ NGUYÊN) ---

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
    this.showUserMenu = false;
  }

  switchLanguage(lang: string) {
    console.log('Switch language to:', lang);
    this.showLanguageMenu = false;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    this.showLanguageMenu = false;
  }

  // --- HÀM LOGOUT CẬP NHẬT ---
  // logout() {
  //   console.log('Đăng xuất...');

  //   // Đóng menu trước cho gọn
  //   this.showUserMenu = false;

  //   // Gọi sang Service để xử lý xóa token và chuyển trang
  //   // Service đã xử lý check SSR nên gọi ở đây an toàn tuyệt đối
  //   this.authService.logout();
  // }

  // 2. Hàm khi bấm nút "Đăng xuất" ở Menu -> Chỉ mở Modal
  initiateLogout(event: Event) {
    event.stopPropagation(); // <--- DÒNG QUAN TRỌNG NHẤT: Ngăn không cho click lan ra wrapper
    event.preventDefault(); // Ngăn hành vi mặc định (nếu thẻ a có href)

    this.showUserMenu = false; // Đóng menu ngay lập tức
    this.showLogoutModal = true; // Mở modal
  }

  // 3. Hàm khi bấm nút "Đồng ý" trong Modal
  confirmLogout() {
    this.showLogoutModal = false;
    this.authService.logout(); // Lúc này mới gọi Service để logout thật
  }

  // 4. Hàm khi bấm "Hủy bỏ"
  cancelLogout() {
    this.showLogoutModal = false;
  }
}
