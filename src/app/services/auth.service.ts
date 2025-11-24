// Sử dụng Signals để quản lý trạng thái User (Reactive programming hiện đại) 
// và xử lý an toàn cho SSR (kiểm tra môi trường Browser trước khi gọi LocalStorage).

import { HttpClient } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AuthResponse, LoginRequest, RegisterRequest } from "../models/auth.model";
import { isPlatformBrowser } from "@angular/common";
import { Observable, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private http = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router)
    
    // URL Backend
    private readonly API_URL = 'http://localhost:8080/api/auth';
    private readonly TOKEN_KEY = 'auth-token';
    private readonly USER_KEY = 'auth-user';

    // State management bằng Signal (New in Angular 16+)
    currentUser = signal<AuthResponse | null>(null);

    constructor(){
        // Khôi phục trạng thái login nếu user F5 lại trang (chỉ chạy ở Browser)
        if (isPlatformBrowser(this.platformId)){
            const savedUser = sessionStorage.getItem(this.USER_KEY);

            if (savedUser) {
                this.currentUser.set(JSON.parse(savedUser));
            }
        }
    }


    // ----- API CALLS -----
    register(data: RegisterRequest): Observable<string> {
        // Backend trả về text plain cho register success
        return this.http.post(`${this.API_URL}/register`, data, { responseType: 'text' });
    }

    login(data: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, data).pipe(
            tap(response => {
                // Login thành công thì lưu data
                this.saveSession(response);
            })
        );
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.clear();
        }

        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }


    // --- HELPER METHODS ---
    private saveSession(user: AuthResponse): void {
        // Cập nhật Signal
        this.currentUser.set(user);

        // Lưu vào SessionStorage (chỉ chạy ở Browser để tránh lỗi SSR)
        if (isPlatformBrowser(this.platformId)){
            sessionStorage.setItem(this.TOKEN_KEY, user.token);
        }
    }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)){
            return sessionStorage.getItem(this.TOKEN_KEY);
        }

        return null;
    }

    isLoggedIn(): boolean {
        return !!this.currentUser();
    }
}