import { Routes } from '@angular/router';
import { authGuard } from './helpers/auth.guard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    // Public Routes (Không cần đăng nhập)
    {
        path: 'login',
        component: Login,
        title: 'Login - PiSee Crypto Paper Trading'
    },
    {
        path: 'register',
        component: Register,
        title: 'Register - PiSee Crypto Paper Trading'
    },

    // Protected Routes (Cần đăng nhập)
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard], // <--- Áp dụng Guard tại đây
        title: 'Dashboard'
    },

    // Redirect mặc định
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
