// Sau khi đã có AuthService, chúng ta cần một cơ chế để chặn người dùng chưa đăng nhập truy cập vào các trang nội bộ.
// Chúng ta sử dụng CanActivateFn để kiểm tra trạng thái đăng nhập.

import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Kiểm tra nếu đã login thì cho qua
    if (authService.isLoggedIn()){
        return true;
    }

    // Nếu chưa login, đá về trang Login
    router.navigate(['/login']);

    return false;
}