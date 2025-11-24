import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // import các module cần thiết
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

  constructor() {
    // Nếu đã login, đá sang dashboard
    if (this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) true;

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;


    this.authService.login({ username, password }).subscribe({
      next: (res) => {
        this.isLoading = false;

        // Login thành công -> Chuyển hướng
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;

        // Hiển thị lỗi từ backend (nếu có)
        this.errorMessage = err.error?.message || 'Login Failed ! Please check your credentials';
        console.error(err);
      }
    });
  }

}
