import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  // Biến UI Control
  showPassword: boolean = false;
  showLanguageMenu: boolean = false;
  isDarkMode: boolean = false;

  constructor() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  switchLanguage(lang: string) {
    console.log('Switching language to:', lang);
    this.showLanguageMenu = false;
  }

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  loginSocial(provider: string) {
    alert(`Tính năng đăng nhập bằng ${provider} đang được phát triển!`);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Login error:', err);

        if (err.status === 401) {
          // Lỗi 401: Sai User hoặc Password (Backend gộp chung)
          this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không chính xác!';

          // UX Tốt: Xóa ô mật khẩu để người dùng nhập lại ngay
          this.loginForm.get('password')?.setValue('');
        } else if (err.status === 400) {
          // Lỗi 400: Dữ liệu gửi đi bị thiếu hoặc sai định dạng
          this.errorMessage = typeof err.error === 'string' ? err.error : 'Dữ liệu không hợp lệ.';
        } else if (err.status === 0) {
          // Lỗi 0: Không kết nối được tới Backend (Server tắt)
          this.errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';
        } else {
          // Các lỗi khác (500, 403...)
          this.errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        }
      },
    });
  }
}
