import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  // --- CÁC BIẾN UI CONTROL (MỚI BỔ SUNG) ---
  showPassword: boolean = false; // Để toggle ẩn/hiện mật khẩu
  showLanguageMenu: boolean = false; // Để toggle menu ngôn ngữ
  isDarkMode: boolean = false; // Để toggle chế độ sáng/tối

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      fullName: ['', Validators.required],
    });
  }

  // --- CÁC HÀM UI LOGIC (MỚI BỔ SUNG) ---

  // 1. Chức năng Ẩn/Hiện mật khẩu
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // 2. Chức năng Bật/Tắt menu ngôn ngữ
  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  // 3. Chức năng Chọn ngôn ngữ (ẩn menu sau khi chọn)
  switchLanguage(lang: string) {
    console.log('Switching language to:', lang);
    this.showLanguageMenu = false;
    // Sau này có thể gọi TranslateService tại đây
  }

  // 4. Chức năng Chế độ Sáng/Tối
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Logic thêm class vào body để đổi màu toàn trang (nếu đã setup CSS global)
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // --- LOGIC SUBMIT FORM (GIỮ NGUYÊN) ---
  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Giả sử response trả về text thành công, hoặc bạn có thể hardcode thông báo
        this.successMessage = typeof response === 'string' ? response : 'Đăng ký thành công!';

        // Delay 2s rồi chuyển về login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;

        // Lấy message lỗi từ backend
        this.errorMessage = typeof err.error === 'string' ? err.error : 'Registration failed!';
        console.error(err);
      },
    });
  }
}
