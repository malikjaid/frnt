import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthTokenInterceptor, sharedInterceptor } from './shared/interpector/shared.interceptor';
import { ToastrModule, provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync('animations'), provideHttpClient(withInterceptors([sharedInterceptor, AuthTokenInterceptor])), provideToastr({
    timeOut:1000
  })]
};
