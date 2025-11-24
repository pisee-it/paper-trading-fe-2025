import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './helpers/auth.interceptor';

// FIX ERROR: NG0908
import 'zone.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Đăng ký HttpClient và AuthInterceptor tại đây
    provideHttpClient(
      withFetch(), // Tối ưu cho SSR
      withInterceptors([authInterceptor])
    )
  ]
};