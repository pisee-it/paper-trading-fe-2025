import { Routes } from '@angular/router';
import { authGuard } from './helpers/auth.guard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { MarketPage } from './components/market/market-page';

// 1. Import Layout Component (bạn kiểm tra lại đường dẫn import này cho đúng với cấu trúc folder của bạn nhé)
import { MainLayoutComponent } from './components/main-layout/main-layout';

export const routes: Routes = [
  {
    // Route Cha: Luôn load MainLayout (có chứa Header)
    path: '',
    component: MainLayoutComponent,
    children: [
      // --- Public Routes ---
      {
        path: 'login',
        component: Login,
        title: 'Build Your Way - PiSeeTrading',
      },
      {
        path: 'register',
        component: Register,
        title: 'Register - PiSee Crypto Paper Trading',
      },

      // --- Protected Routes ---
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard], // Guard giữ nguyên
        title: 'Dashboard',
      },

      // --- Market Route (Ai cũng vào được) ---
      {
        path: 'market',
        component: MarketPage,
      },

      // --- Redirect mặc định ---
      // Khi vào trang chủ (path: ''), redirect về dashboard (hoặc login tùy ý bạn)
      // Nó nằm trong children để đảm bảo vẫn load trong ngữ cảnh Layout
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // --- Catch-all Route ---
  // Nếu nhập link sai bất kỳ, redirect về login
  { path: '**', redirectTo: 'login' },
];
