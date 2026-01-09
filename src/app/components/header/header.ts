import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Viết code 1 lần, dùng chung cho toàn bộ dự án. Khi muốn sửa menu, chỉ cần sửa đúng 1 file này.

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'], // Hoặc .css tùy dự án
})
export class HeaderComponent {
  // Logic xử lý giao diện Header
  showLanguageMenu = false;
  isDarkMode = false; // Mặc định hoặc lấy từ localStorage

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  switchLanguage(lang: string) {
    console.log('Switch language to:', lang);
    this.showLanguageMenu = false;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Thêm logic lưu vào localStorage hoặc service theme ở đây nếu cần
  }
}
