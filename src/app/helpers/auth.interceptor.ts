// Sử dụng Functional Interceptor (cách mới nhất) thay vì Class HttpInterceptor

import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    // Nếu có token, clone request và gắn header Authorization
    if (token) {
        const clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next(clonedReq);
    }

    // Nếu không có token, giữ nguyên request
    return next(req);
}